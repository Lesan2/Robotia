/* ROBOTIA cloud add-on. Does not replace original editor or existing exports. */
(()=>{
'use strict';
const app=window.ROBOTIA_CLOUD_APP;
const config=window.ROBOTIA_CLOUD_CONFIG||{};
if(!app){console.error('ROBOTIA: manca el pont intern de l’aplicació original');return}
const $=s=>document.querySelector(s);
const cloud={token:'',email:'',revision:0,shared:{},bridge:null,ready:false,seq:0,pending:new Map(),saving:false,savedSig:'',timer:0,poll:0,blocked:false};
const disabled=!/^\d+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i.test(config.clientId||'')||!/^https:\/\/script\.google\.com\/(?:a\/macros\/instituticaria\.cat\/s\/|macros\/s\/)[\w-]+\/exec$/.test(config.bridgeUrl||'');
const html=`<section id="robotia-cloud" class="card" style="padding:18px;margin:15px 0;border:1px solid #93c5fd;border-radius:15px">
 <h2 style="margin-top:0">☁️ ROBOTIA · Núvol <small style="font-size:12px;color:#64748b">PROVES</small></h2>
 <p id="cloud-message" role="status">Preparant la connexió…</p><div id="cloud-login"></div>
 <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">
 <button class="btn secondary" id="cloud-load" disabled>Carregar / fusionar</button>
 <button class="btn primary" id="cloud-save" disabled>Desar al núvol</button>
 <button class="btn secondary" id="cloud-invite" disabled>Compartir activitat</button>
 <button class="btn secondary" id="cloud-inbox" disabled>📩 Invitacions <span id="cloud-invite-count"></span></button>
 <button class="btn secondary" id="cloud-out" disabled>Desconnectar</button></div>
 <p style="font-size:12px;color:#64748b">Les còpies .robotiaportfolio i el desament local continuen disponibles. Si el núvol falla, descarrega una còpia manual.</p>
 </section>`;
$('#portfolioOwner')?.insertAdjacentHTML('beforebegin',html);
const message=t=>{$('#cloud-message').textContent=t};
const active=()=>!!cloud.email&&!cloud.blocked;
function buttons(){['load','out'].forEach(k=>{$('#cloud-'+k).disabled=!cloud.email});['save','invite','inbox'].forEach(k=>{$('#cloud-'+k).disabled=!active()})}
function call(method,args){return new Promise((resolve,reject)=>{
 if(!cloud.ready)return reject(Error('El pont de Google encara no està preparat'));
 const id=++cloud.seq;const timeout=setTimeout(()=>{cloud.pending.delete(id);reject(Error('La connexió ha superat el temps d’espera'))},45000);
 cloud.pending.set(id,{resolve,reject,timeout});cloud.bridge.contentWindow.postMessage({robotiaBridge:1,id,method,args},'*');
})}
function stable(obj){return JSON.stringify(obj,(key,value)=>['exportedAt','updatedAt','appBuild'].includes(key)?undefined:value)}
function snapshot(){const p=app.makePortfolioBundle();p.identity.email=cloud.email;return p}
function localHasWork(){const b=app.makePortfolioBundle();return Object.keys(b.activities||{}).length>0||Object.keys(b.projects||{}).length>0}
function downloadLocal(){app.exportPortfolioBundle()}
function syncSharedFromInfo(r){
 cloud.shared=r.shared||{};
 const remote=r.portfolio;if(!remote)return remote;
 // Un treball compartit té una sola còpia central. Les activitats no compartides no es toquen.
 for(const item of Object.values(cloud.shared)){
   if(!Object.prototype.hasOwnProperty.call(remote.activities||{},item.challengeId))continue;
   if(remote.activities[item.challengeId].workId!==item.id)continue;
   remote.activities[item.challengeId]=JSON.parse(JSON.stringify(item.activity));
   if(item.activity.project)remote.projects[item.challengeId]=item.activity.project;
   if(item.activity.reflection)remote.reflections[item.challengeId]=item.activity.reflection;
   if(item.activity.progressRecord)remote.progress[item.challengeId]=item.activity.progressRecord;
 }
 return remote;
}
async function cloudInfo(){const r=await call('cloudInfo',[cloud.token]);if(r.email!==cloud.email)throw Error('Identitat de sessió incorrecta');return r}
async function enter(token){
 cloud.token=token;cloud.blocked=true;buttons();message('Verificant el compte institucional…');
 try{
   const registration=await call('cloudRegister',[token]);cloud.email=registration.email;
   const info=await cloudInfo();cloud.revision=info.revision;syncSharedFromInfo(info);
   cloud.blocked=!!info.portfolio;buttons();$('#cloud-invite-count').textContent=info.invites?.length||'';
   if(!app.state.identity.name){
     app.activateIdentity({name:registration.name,team:'',className:''});
     app.renderChallenges();app.renderPortfolio();
   }
   if(info.portfolio){
     message('Sessió: '+cloud.email+' · Hi ha un portafoli al núvol. Prem «Carregar / fusionar» per recuperar-lo abans de continuar.');
     // No substituïm una versió local sense consentiment explícit.
     if(!localHasWork())await load(true,info);
   }else{
     message('Sessió: '+cloud.email+' · Encara no tens portafoli al núvol. Desarem el treball actual.');
     markDirty();
   }
 }catch(err){cloud.blocked=true;buttons();message('⚠️ '+err.message)}
}
async function load(auto=false,knownInfo=null){
 if(!cloud.email)return;
 cloud.blocked=true;buttons();
 try{
  message('Comprovant el portafoli del núvol…');const info=knownInfo||await cloudInfo();cloud.revision=info.revision;
  const incoming=syncSharedFromInfo(info);
  if(!incoming){cloud.blocked=false;buttons();message('No hi ha encara cap portafoli al núvol.');return}
  const localName=app.state.identity.name;
  if(localName&&localName.localeCompare(incoming.identity?.name||'',undefined,{sensitivity:'base'})!==0){
    message('⚠️ Aquest ordinador té un perfil local diferent: exporta’l abans de canviar de compte.');
    if(!confirm('Hi ha treballs d’un altre perfil en aquest ordinador. Vols descarregar-ne una còpia i canviar al teu compte institucional?')){message('Carrega el teu portafoli abans de desar al núvol.');return}
    downloadLocal();app.activateIdentity({name:incoming.identity.name,team:incoming.identity.team||'',className:incoming.identity.className||'',email:cloud.email});
  }
  if(!auto&&localHasWork()){
    downloadLocal();
    if(!confirm('Hem descarregat una còpia del treball local. Ara fusionarem el portafoli del núvol amb els teus treballs. Vols continuar?')){message('Carrega el teu portafoli abans de desar al núvol.');return}
  }
  if(!app.state.identity.name){app.activateIdentity({name:incoming.identity.name,team:incoming.identity.team||'',className:incoming.identity.className||'',email:cloud.email})}
  await new Promise(resolve=>app.importPortfolioBundle(new File([JSON.stringify(incoming)],'ROBOTIA_NUVOL.robotiaportfolio',{type:'application/json'}),resolve));
  cloud.savedSig=stable(snapshot());cloud.blocked=false;
  message('✓ Portafoli del núvol carregat / fusionat. Revisa els reptes; conserva la còpia descarregada si n’hi havia.');
  $('#cloud-invite-count').textContent=info.invites?.length||'';buttons();
 }catch(err){message('⚠️ Error en carregar: '+err.message)}
}
function markDirty(){if(!active())return;clearTimeout(cloud.timer);cloud.timer=setTimeout(()=>{void save(true)},6500)}
async function save(automatic=false){
 if(!active()||cloud.saving||!app.state.identity.name)return;
 if(cloud.poll)clearTimeout(cloud.poll);
 const p=snapshot();const sig=stable(p);
 if(automatic&&sig===cloud.savedSig)return;
 cloud.saving=true;message('☁️ Desant al núvol…');
 try{
  const revs=Object.fromEntries(Object.values(cloud.shared).map(x=>[x.id,x.revision]));
  const r=await call('cloudSave',[cloud.token,p,cloud.revision,revs]);
  if(r.conflict||r.sharedConflict){
    cloud.blocked=true;buttons();downloadLocal();
    message('⚠️ Una altra sessió ha modificat el portafoli o l’activitat compartida. S’ha descarregat una còpia local: recarrega i fusiona abans de continuar.');
    return;
  }
  cloud.revision=r.revision;
  for(const [id,revision] of Object.entries(r.sharedRevisions||{}))if(cloud.shared[id])cloud.shared[id].revision=revision;
  cloud.savedSig=sig;message('✓ Desat al núvol · '+new Date().toLocaleTimeString('ca-ES'));
 }catch(err){message('⚠️ No s’ha pogut desar: '+err.message+'. Conserva i descarrega el teu portafoli.');}
 finally{cloud.saving=false}
}
async function invite(){
 if(!active()||cloud.saving)return;
 const p=snapshot(),options=Object.entries(p.activities||{}).filter(([,a])=>a.project?.nodes?.length);
 if(!options.length){message('Primer crea un diagrama en un repte i desa’l al núvol.');return}
 const id=prompt('Repte per compartir (escriu l’ID):\n'+options.map(([id,a])=>id+' · '+(a.challengeMeta?.title||id)).join('\n'));
 if(!id)return;if(!p.activities[id]?.project?.nodes?.length){message('Repte no trobat o sense diagrama.');return}
 const to=prompt('Correu institucional del company o companya:');if(!to)return;
 try{await save(false);if(!active())return;
  const r=await call('cloudInvite',[cloud.token,to,id]);
  message('📩 Invitació enviada a '+to+'. La podrà acceptar des de casa un altre dia.');
 }catch(err){message('⚠️ No s’ha pogut convidar: '+err.message)}
}
async function inbox(){
 if(!active())return;
 try{const r=await cloudInfo();$('#cloud-invite-count').textContent=r.invites?.length||'';
  if(!r.invites?.length){message('No tens invitacions pendents.');return}
  for(const item of r.invites){
    if(!confirm(item.from+' t’ha convidat a treballar en «'+item.title+'».\n\nAcceptes l’activitat? Cancel·lar la deixa pendent.'))continue;
    if(localHasWork())downloadLocal();
    await save(false);if(!active())return;
    const ack=await call('cloudAccept',[cloud.token,item.id,'accept']);
    cloud.revision=ack.revision;cloud.blocked=true;buttons();
    message('✓ Invitació acceptada. Ara carrega / fusiona el portafoli del núvol per veure l’activitat.');
  }
 }catch(err){message('⚠️ Invitacions: '+err.message)}
}
function logout(){
 clearTimeout(cloud.timer);if(window.google?.accounts?.id)google.accounts.id.disableAutoSelect();
 cloud.token='';cloud.email='';cloud.ready=!!cloud.bridge;cloud.blocked=true;cloud.shared={};cloud.savedSig='';buttons();
 message('Sessió desconnectada. Les dades locals continuen en aquest navegador.');
}
function init(){
 $('#cloud-load').onclick=()=>void load();$('#cloud-save').onclick=()=>void save(false);
 $('#cloud-invite').onclick=()=>void invite();$('#cloud-inbox').onclick=()=>void inbox();$('#cloud-out').onclick=logout;
 if(disabled){message('Núvol en preparació. Configura l’ID de Google i el desplegament d’Apps Script; mentrestant, utilitza les còpies locals.');return}
 cloud.bridge=document.createElement('iframe');cloud.bridge.src=config.bridgeUrl;cloud.bridge.hidden=true;cloud.bridge.title='ROBOTIA núvol';document.body.appendChild(cloud.bridge);
 window.addEventListener('message',event=>{
  if(event.source!==cloud.bridge.contentWindow||event.data?.robotiaBridge!==1)return;
  if(event.data.ready){cloud.ready=true;message('Connexió preparada. Entra amb el compte de l’institut.');return}
  const r=cloud.pending.get(event.data.id);if(!r)return;cloud.pending.delete(event.data.id);clearTimeout(r.timeout);
  event.data.error?r.reject(Error(event.data.error)):r.resolve(event.data.result);
 });
 const initGoogle=()=>{
  if(!window.google?.accounts?.id){setTimeout(initGoogle,350);return}
  google.accounts.id.initialize({client_id:config.clientId,callback:r=>void enter(r.credential),auto_select:false,hd:'instituticaria.cat'});
  google.accounts.id.renderButton($('#cloud-login'),{type:'standard',size:'large',theme:'outline',text:'signin_with',locale:'ca'});
 };initGoogle();
 document.addEventListener('input',markDirty);document.addEventListener('change',markDirty);
 setInterval(()=>{if(active())void save(true)},25000);
}
init();
})();
