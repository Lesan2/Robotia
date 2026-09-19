/** ROBOTIA · Núvol. PROVES: no activar per a alumnes sense autorització del centre.
 * Desplegar com a aplicació web: executa com a propietari, accés als usuaris autoritzats.
 * Propietats del script obligatòries:
 * ROBOTIA_FOLDER_ID = carpeta de PROVES
 * ROBOTIA_CLIENT_ID = ID de client OAuth 2.0 (aplicació web per a lesan2.github.io)
 */
const RC = Object.freeze({domain:'instituticaria.cat',root:'ROBOTIA_FOLDER_ID',client:'ROBOTIA_CLIENT_ID',maxBytes:7000000});
const copy_ = obj => JSON.parse(JSON.stringify(obj));
function doGet(){return HtmlService.createHtmlOutputFromFile('Bridge').setTitle('ROBOTIA · Pont segur').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)}
function prop_(key){const val=PropertiesService.getScriptProperties().getProperty(key);if(!val)throw Error('Falta configurar '+key);return val}
function root_(){return DriveApp.getFolderById(prop_(RC.root))}
function auth_(token){
  if(typeof token!=='string'||token.length>7000||token.length<50)throw Error('Inicia sessió amb Google');
  const res=UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(token),{muteHttpExceptions:true});
  if(res.getResponseCode()!==200)throw Error('La sessió ha caducat. Torna a iniciar sessió.');
  const p=JSON.parse(res.getContentText());const email=String(p.email||'').toLowerCase();
  if(p.aud!==prop_(RC.client)||String(p.email_verified)!=='true'||p.hd!==RC.domain||!email.endsWith('@'+RC.domain)||!p.sub||Number(p.exp)*1000<Date.now())throw Error('Cal iniciar sessió amb el compte institucional');
  // Sub és estable per compte. Mai no s'accepta una adreça enviada pel client com a identitat.
  return {email:email,sub:p.sub,name:String(p.name||email.split('@')[0]).slice(0,120)};
}
function name_(sub){return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,sub)).replace(/=/g,'').slice(0,43)}
function folder_(parent,name,create){const q=parent.getFoldersByName(name);return q.hasNext()?q.next():(create?parent.createFolder(name):null)}
function users_(create){return folder_(root_(),'USUARIS_PROVES',create)}
function userFolder_(u,create){const parent=users_(create);return parent?folder_(parent,name_(u.sub),create):null}
function shared_(create){return folder_(root_(),'ACTIVITATS_COMPARTIDES_PROVES',create)}
function invites_(create){return folder_(root_(),'INVITACIONS_PROVES',create)}
function file_(folder,name){if(!folder)return null;const q=folder.getFilesByName(name);return q.hasNext()?q.next():null}
function get_(folder,name,fallback){const f=file_(folder,name);if(!f)return fallback;return JSON.parse(f.getBlob().getDataAsString('UTF-8'))}
function put_(folder,name,obj){if(!folder)throw Error('No es pot escriure al Drive');const s=JSON.stringify(obj);if(s.length>RC.maxBytes)throw Error('Fitxer massa gran per desar al núvol: descarrega el portafoli i redueix els adjunts');const f=file_(folder,name);if(f)f.setContent(s);else folder.createFile(name,s,MimeType.PLAIN_TEXT)}
function check_(p,u){if(!p||p.app!=='ROBOTIA FlowLab Portfolio'||!p.activities||typeof p.activities!=='object'||Array.isArray(p.activities)||!p.identity||typeof p.identity.name!=='string'||!p.identity.name.trim()||String(p.identity.email||'').toLowerCase()!==u.email)throw Error('Portafoli no vàlid o identitat no coincident');return p}
function data_(u){const f=userFolder_(u,false);return get_(f,'portafoli.json',null)}
function listInvites_(u){const folder=invites_(false),out=[];if(!folder)return out;const iter=folder.getFiles();while(iter.hasNext()){
  const f=iter.next();try{const v=JSON.parse(f.getBlob().getDataAsString('UTF-8'));if(v.to===u.email&&v.status==='pending')out.push({id:f.getId(),from:v.from,title:v.title,challengeId:v.challengeId,createdAt:v.createdAt})}catch(e){console.warn('Invitació il·legible',e)}
}return out}
function listShared_(u){const f=shared_(false),out={};if(!f)return out;const it=f.getFiles();while(it.hasNext()){
  const doc=it.next();try{const w=JSON.parse(doc.getBlob().getDataAsString('UTF-8'));if(w.members&&Object.prototype.hasOwnProperty.call(w.members,u.email)){out[w.id]={id:w.id,challengeId:w.challengeId,revision:w.revision,updatedAt:w.updatedAt,activity:w.activity}}}catch(e){console.warn(e)}
}return out}
function cloudInfo(token){const u=auth_(token),f=userFolder_(u,false);const p=get_(f,'portafoli.json',null);const m=get_(f,'meta.json',{revision:0});return {email:u.email,name:u.name,portfolio:p,revision:m.revision||0,invites:listInvites_(u),shared:listShared_(u)}}
function signature_(value){return JSON.stringify(value,(k,v)=>['exportedAt','updatedAt','appBuild'].includes(k)?undefined:v)}
function cloudSave(token,p,baseRevision,sharedRevisions){const u=auth_(token);check_(p,u);if(!Number.isInteger(baseRevision)||baseRevision<0)throw Error('Revisió incorrecta');
  const lock=LockService.getScriptLock();lock.waitLock(25000);try{
    const folder=userFolder_(u,true),m=get_(folder,'meta.json',{revision:0}),current=get_(folder,'portafoli.json',null);
    if(m.revision!==baseRevision)return {conflict:true,revision:m.revision,portfolio:current};
    const workFolder=shared_(false),workFiles=[],sharedRevs=sharedRevisions||{};
    if(workFolder){const all=workFolder.getFiles();while(all.hasNext()){
      const file=all.next(),w=JSON.parse(file.getBlob().getDataAsString('UTF-8'));
      if(!w.members||!Object.prototype.hasOwnProperty.call(w.members,u.email))continue;
      const act=p.activities[w.challengeId];if(!act||act.workId!==w.id)continue;
      // Rebutja silenciosament MAI: si l'altre alumne ha editat, retornem conflicte.
      if(Number(sharedRevs[w.id])!==w.revision)return {sharedConflict:true,challengeId:w.challengeId,sharedRevision:w.revision};
      if(signature_(act)!==signature_(w.activity))workFiles.push({file,w,activity:copy_(act)});
    }}
    for(const x of workFiles){x.w.activity=x.activity;x.w.revision++;x.w.updatedAt=new Date().toISOString();x.file.setContent(JSON.stringify(x.w))}
    const now=new Date().toISOString();put_(folder,'portafoli.json',p);const revision=m.revision+1;put_(folder,'meta.json',{revision,updatedAt:now});
    return {revision,updatedAt:now,sharedRevisions:Object.fromEntries(workFiles.map(x=>[x.w.id,x.w.revision]))};
  }finally{lock.releaseLock()}
}
function cloudInvite(token,toEmail,challengeId){const u=auth_(token),to=String(toEmail||'').trim().toLowerCase();
  if(!/^[^@\s]+@instituticaria\.cat$/.test(to)||to===u.email)throw Error('Indica un altre correu institucional vàlid');
  const p=data_(u),activity=p&&p.activities&&p.activities[challengeId];if(!activity||!activity.workId||!activity.project||!Array.isArray(activity.project.nodes))throw Error('Primer desa el repte amb un diagrama al núvol');
  const inv={from:u.email,to,status:'pending',challengeId,workId:activity.workId,title:String(activity.challengeMeta?.title||challengeId).slice(0,100),createdAt:new Date().toISOString()};
  const file=invites_(true).createFile('invitacio.json',JSON.stringify(inv),MimeType.PLAIN_TEXT);return {id:file.getId(),status:'pending'};
}
function cloudAccept(token,id,action){const u=auth_(token);if(typeof id!=='string'||!/^[-\w]{10,100}$/.test(id))throw Error('Identificador invàlid');
  const lock=LockService.getScriptLock();lock.waitLock(25000);try{
    const invFolder=invites_(false);if(!invFolder)throw Error('No hi ha invitacions');let f;try{f=DriveApp.getFileById(id)}catch(e){throw Error('Invitació no trobada')}
    const parents=f.getParents();if(!parents.hasNext()||parents.next().getId()!==invFolder.getId())throw Error('Invitació no trobada');
    const inv=JSON.parse(f.getBlob().getDataAsString('UTF-8'));if(inv.to!==u.email||inv.status!=='pending')throw Error('Aquesta invitació no està disponible');
    if(action==='reject'){inv.status='rejected';f.setContent(JSON.stringify(inv));return {status:'rejected'}}
    if(action!=='accept')throw Error('Acció no vàlida');
    const folder=userFolder_(u,true),mine=get_(folder,'portafoli.json',null),meta=get_(folder,'meta.json',{revision:0});
    if(!mine)throw Error('Primer identifica’t i desa el teu portafoli al núvol');
    const sender={email:inv.from};
    // La carpeta de l'emissor es localitza per la dada de registre de l'usuari, NO per un email escrit al client.
    const index=get_(root_(),'index_usuaris.json',{}),senderFolder=index[inv.from]?users_(false)&&folder_(users_(false),index[inv.from],false):null;
    const owner=senderFolder?get_(senderFolder,'portafoli.json',null):null;
    const act=owner&&owner.activities&&owner.activities[inv.challengeId];
    if(!act||act.workId!==inv.workId||!act.project)throw Error('L’activitat original ja no està disponible');
    const existing=mine.activities&&mine.activities[inv.challengeId];if(existing&&existing.workId!==inv.workId)throw Error('Ja tens un altre treball d’aquest repte. Exporta’l i resol el conflicte abans d’acceptar.');
    const sid=inv.workId,store=shared_(true),wfile=file_(store,name_(sid)+'.json');
    let w=wfile?JSON.parse(wfile.getBlob().getDataAsString('UTF-8')):null;
    if(w&&(!w.members||!w.members[inv.from]||w.id!==sid))throw Error('Projecte compartit no vàlid');
    if(!w){w={id:sid,challengeId:inv.challengeId,members:{[inv.from]:true},revision:1,updatedAt:new Date().toISOString(),activity:copy_(act)}}
    w.members[u.email]=true;
    w.activity.owners=[...new Set([...(w.activity.owners||[]),mine.identity.name])];
    if(w.activity.project)w.activity.project.owners=[...new Set([...(w.activity.project.owners||[]),mine.identity.name])];
    const merged=copy_(w.activity);
    mine.activities=mine.activities||{};mine.projects=mine.projects||{};mine.reflections=mine.reflections||{};mine.progress=mine.progress||{};
    mine.activities[inv.challengeId]=merged;mine.projects[inv.challengeId]=merged.project;
    mine.reflections[inv.challengeId]=merged.reflection||{};mine.progress[inv.challengeId]=merged.progressRecord||{};
    if(!wfile)put_(store,name_(sid)+'.json',w);else wfile.setContent(JSON.stringify(w));
    const now=new Date().toISOString();put_(folder,'portafoli.json',mine);put_(folder,'meta.json',{revision:meta.revision+1,updatedAt:now});
    inv.status='accepted';inv.acceptedAt=now;f.setContent(JSON.stringify(inv));return {status:'accepted',revision:meta.revision+1};
  }finally{lock.releaseLock()}
}
// Registre intern creat només després de verificar el token; necessari per trobar invitacions emeses.
function cloudRegister(token){const u=auth_(token),root=root_(),lock=LockService.getScriptLock();lock.waitLock(25000);try{
  const id=name_(u.sub),index=get_(root,'index_usuaris.json',{});if(index[u.email]&&index[u.email]!==id)throw Error('Identitat duplicada');index[u.email]=id;put_(root,'index_usuaris.json',index);return {email:u.email,name:u.name};
}finally{lock.releaseLock()}}
