/* ROBOTIA V3 · Banc de correccio docent.
   Eina local de lectura i preparacio de files per al full privat.
   No envia dades de l'alumnat a serveis externs ni publica notes. */
(function initRobotiaCorrectionWorkbench(){
"use strict";
const app=window.ROBOTIA_CLOUD_APP;
const host=document.getElementById("v3-teacher-panel");
if(!app||!host)return;
const SHEET="https://docs.google.com/spreadsheets/d/1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4/edit";
const RUBRICS={
 flux:{label:"Diagrames de flux",items:[["Seqüència i estructura",.30],["Decisions, bucles i variables",.40],["Claredat i prova",.30]]},
 microbit:{label:"Programació micro:bit",items:[["Funcionament",.40],["Estructures de programació",.35],["Proves i autonomia",.25]]},
 sensors:{label:"Sensors i actuadors",items:[["Muntatge",.30],["Programa i control",.40],["Proves i documentació",.30]]},
 robot:{label:"Robot final",items:[["Funcionament i fiabilitat",.40],["Programació i integració",.30],["Procés de treball en equip",.30]]}
};
const styles=document.createElement("style");
styles.textContent=".v3-corrector{margin:20px 0;border:1px solid #bbd3ee;padding:18px;border-radius:14px;background:#f9fbff}.v3-corrector h3{margin:0 0 10px}.v3-corrector-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.v3-corrector label{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:700;color:#334155}.v3-corrector input,.v3-corrector select,.v3-corrector textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #b6c9df;background:#fff;font:inherit}.v3-corrector input[type=file]{padding:7px}.v3-corrector .full{grid-column:1/-1}.v3-corrector .actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.v3-corrector .review-card{padding:12px;background:#fff;border:1px solid #d6e3ee;border-radius:10px;margin:12px 0}.v3-corrector .review-card p{margin:4px 0}.v3-corrector .criteria{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.v3-corrector .status{background:#eaf4ff;padding:11px;border-radius:8px;font-weight:650;white-space:pre-wrap}.v3-corrector .meta-line{display:block;font-size:12px;color:#64748b;margin:5px 0}.v3-corrector .evidence-list{list-style:disc;margin:8px 0 0 20px;padding:0}.v3-corrector .evidence-list li{margin:4px 0}.v3-corrector .warn{color:#9a3412;font-weight:700}.v3-corrector button[disabled]{opacity:.5;cursor:not-allowed}@media(max-width:760px){.v3-corrector-grid,.v3-corrector .criteria{grid-template-columns:1fr}}";
document.head.appendChild(styles);
const root=document.createElement("section");
root.className="v3-corrector";
root.innerHTML=[
"<h3>📝 Corrector de reptes · preparació de notes</h3>",
"<p>Importa el <b>portafoli.json</b> d'un alumne des del Drive, revisa'n les evidències i prepara una correcció amb la rúbrica del departament. Les notes només passaran al registre quan les enganxis al full docent; <b>no es publiquen automàticament.</b></p>",
"<div class='actions'><label class='btn secondary' style='display:inline-flex;cursor:pointer'>📂 Importar portafoli .json / .robotiaportfolio<input type='file' id='v3-corr-file' accept='.json,.robotiaportfolio,application/json' hidden></label><button type='button' class='btn ghost' id='v3-corr-self'>Carregar el meu portafoli de prova</button><a class='btn secondary' target='_blank' rel='noopener noreferrer' href='"+SHEET+"#gid=1269118972'>👥 Portafolis d'alumnes ↗</a></div>",
"<p id='v3-corr-info' class='status' role='status'>Esperant un portafoli. Les dades es processen localment al navegador.</p>",
"<div class='v3-corrector-grid'>",
"<label>Correu institucional de l'alumne<input type='email' id='v3-corr-email' placeholder='alumne@instituticaria.cat'></label>",
"<label>Nom de l'alumne<input id='v3-corr-student' placeholder='Nom i cognoms'></label>",
"<label class='full'>Repte a corregir<select id='v3-corr-challenge'><option value=''>Primer importa un portafoli</option></select></label>",
"</div>",
"<div class='review-card' id='v3-corr-evidence'><p>Les evidències del repte apareixeran aquí.</p></div>",
"<h3>Valoració amb rúbrica</h3>",
"<p>Introdueix una nota de 0 a 10 a cada indicador. Es calcularà una proposta ponderada segons els pesos del full «Rúbriques». La decisió definitiva sempre és del docent.</p>",
"<div class='criteria' id='v3-corr-rubric'></div>",
"<div class='v3-corrector-grid' style='margin-top:12px'>",
"<div><p id='v3-corr-calculated' style='font-weight:800'>Proposta segons rúbrica: pendent</p><button type='button' class='btn ghost' id='v3-corr-apply'>Aplicar proposta a la nota docent</button></div>",
"<label>Nota docent definitiva /10<input id='v3-corr-grade' type='number' min='0' max='10' step='0.1' placeholder='0–10'></label>",
"<label class='full'>Comentari per a l'alumne<textarea id='v3-corr-public' rows='3' placeholder='Què ha funcionat? Què cal millorar?'></textarea></label>",
"<label class='full'>Anotació privada del professor<textarea id='v3-corr-private' rows='3' placeholder='Només es conservarà al registre docent; no és per a l'alumne.'></textarea></label>",
"<label>Proposta prèvia d'IA (si n'hi ha)<input id='v3-corr-ai' type='number' min='0' max='10' step='0.1' placeholder='Opcional, mai automàtica'></label>",
"<label>Revisor<input id='v3-corr-reviewer' value='Jordi Lesan Genárez'></label>",
"</div>",
"<div class='actions'><button type='button' class='btn primary' id='v3-corr-copy'>Copiar fila de correcció</button><button type='button' class='btn secondary' id='v3-corr-download'>Descarregar fila TSV</button><a class='btn ghost' href='"+SHEET+"#gid=15321901' target='_blank' rel='noopener noreferrer'>Obrir Correccions ↗</a></div>",
"<p id='v3-corr-result' class='status' role='status'>Les files preparades tenen «Publicar? = No» per defecte. Si ja existeix una correcció d'aquest repte, actualitza la fila anterior en lloc de crear-ne un duplicat.</p>"
].join("");
host.prepend(root);
const el=id=>root.querySelector("#"+id);
let portfolio=null,items=[],active=null;
const drafts=new Map();
function setMessage(message){el("v3-corr-result").textContent=message}
function asNumber(x){
 if(x===null||x===undefined||String(x).trim()==="")return null;
 const n=Number(String(x).replace(",","."));
 return Number.isFinite(n)&&n>=0&&n<=10?n:null;
}
function selectedId(){return el("v3-corr-challenge").value}
function getRubric(){return RUBRICS[active?.category]||RUBRICS.flux}
function currentKey(){return [el("v3-corr-email").value.trim().toLowerCase(),active?.id||selectedId()].join("|")}
function rememberDraft(){
 if(!active)return;
 drafts.set(currentKey(),{
   grade:el("v3-corr-grade").value,
   ai:el("v3-corr-ai").value,
   note:el("v3-corr-public").value,
   private:el("v3-corr-private").value,
   scores:[...root.querySelectorAll(".v3-corr-score")].map(n=>n.value)
 });
}
function applyDraft(){
 const d=drafts.get(currentKey())||{};
 el("v3-corr-grade").value=d.grade||"";
 el("v3-corr-ai").value=d.ai||"";
 el("v3-corr-public").value=d.note||"";
 el("v3-corr-private").value=d.private||"";
 root.querySelectorAll(".v3-corr-score").forEach((node,i)=>node.value=(d.scores||[])[i]||"");
 calculate();
}
function calculate(){
 const rubric=getRubric();
 const inputs=[...root.querySelectorAll(".v3-corr-score")];
 const values=inputs.map(x=>asNumber(x.value));
 const complete=values.length===3&&values.every(x=>x!==null);
 const note=complete?Math.round(values.reduce((sum,n,i)=>sum+n*rubric.items[i][1],0)*10)/10:null;
 el("v3-corr-calculated").textContent=note===null?"Proposta segons rúbrica: pendent":("Proposta segons rúbrica: "+note.toLocaleString("ca-ES")+" / 10");
 return note;
}
function renderRubric(){
 const r=getRubric();
 el("v3-corr-rubric").replaceChildren();
 r.items.forEach(([label,weight],i)=>{
   const block=document.createElement("label");block.textContent=label+" ("+Math.round(weight*100)+"%)";
   const field=document.createElement("input");
   field.type="number";field.min="0";field.max="10";field.step="0.5";field.placeholder="0–10";field.className="v3-corr-score";
   field.addEventListener("input",()=>{calculate();rememberDraft()});
   block.append(field);el("v3-corr-rubric").append(block);
 });
}
function safeSharedLink(value){
 try{
   const u=new URL(String(value||"").trim());
   return u.protocol==="https:"&&u.hostname.toLowerCase()==="makecode.microbit.org"&&(/^\/_[a-z0-9-]{4,}$/i.test(u.pathname)||/^\/S[a-z0-9-]{8,}$/i.test(u.pathname)||/^\/\d{4,6}(?:-\d{4,6}){3}$/i.test(u.pathname)||u.hash.startsWith("#pub:"))?u.href:"";
 }catch{return ""}
}
function addDetail(container,title,text){
 const p=document.createElement("p"),b=document.createElement("b");
 b.textContent=title+": ";p.append(b,document.createTextNode(text||"—"));container.append(p);
}
function addLink(container,label,href){
 const p=document.createElement("p"),a=document.createElement("a");
 a.textContent=label+" ↗";a.target="_blank";a.rel="noopener noreferrer";a.href=href;p.append(a);container.append(p);
}
function renderEvidence(){
 const target=el("v3-corr-evidence");target.replaceChildren();
 if(!active){target.textContent="Selecciona un repte.";return}
 const a=active.activity,p=a.project||{},r=a.reflection||{};
 addDetail(target,"Categoria",getRubric().label);
 addDetail(target,"Estat",a.progressRecord?.completed?"Entregat, pendent de validació docent":"Iniciat / encara no consta completat");
 if(p.nodes?.length)addDetail(target,"Diagrama",p.nodes.length+" blocs i "+(p.edges||[]).length+" connexions");
 addDetail(target,"Treball",a.workId||p.workId||"Sense identificador");
 if(r.notes)addDetail(target,"Anotacions",r.notes);
 if(r.difficulties)addDetail(target,"Dificultats",r.difficulties);
 if(r.successes)addDetail(target,"Aprenentatges",r.successes);
 if(r.makeCodeUrl){
   const url=safeSharedLink(r.makeCodeUrl);
   if(url)addLink(target,"Obrir programa MakeCode compartit",url);
   else addDetail(target,"Avís MakeCode","L'enllaç no és una publicació compartida verificable: "+String(r.makeCodeUrl).slice(0,160));
 }
 if(r.codeText){
   const details=document.createElement("details"),summary=document.createElement("summary"),pre=document.createElement("pre");
   summary.textContent="Veure el codi JavaScript adjunt";pre.textContent=String(r.codeText).slice(0,20000);
   pre.style.cssText="max-height:320px;overflow:auto;white-space:pre-wrap;font-size:12px;";
   details.append(summary,pre);target.append(details);
 }
 if(Array.isArray(r.attachments)&&r.attachments.length){
   const ul=document.createElement("ul");ul.className="evidence-list";
   r.attachments.forEach(att=>{
     const li=document.createElement("li");
     if(typeof att.data==="string"&&/^data:(?:image\/|application\/pdf|application\/octet-stream|text\/)/i.test(att.data)){
       const a=document.createElement("a");a.href=att.data;a.download=String(att.name||"evidencia");a.textContent=String(att.name||"Adjunt");li.append(a);
     }else li.textContent=String(att.name||"Adjunt sense descàrrega");
     ul.append(li);
   });target.append(ul);
 }
 if(p.nodes?.length){
   const b=document.createElement("button");b.type="button";b.className="btn ghost";b.textContent="Descarregar diagrama .robotia";
   b.addEventListener("click",()=>{const data=new Blob([JSON.stringify(p,null,2)],{type:"application/json"});const url=URL.createObjectURL(data);const a=document.createElement("a");a.href=url;a.download="ROBOTIA_"+active.id+".robotia";a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)});
   target.append(b);
 }
 if(!p.nodes?.length&&!r.makeCodeUrl&&!r.codeText&&!r.attachments?.length){
   const warning=document.createElement("p");warning.className="warn";warning.textContent="Aquest repte no té evidències revisables dins del portafoli.";target.append(warning);
 }
}
function selectChallenge(){
 rememberDraft();
 active=items.find(i=>i.id===selectedId())||null;
 renderRubric();renderEvidence();applyDraft();
}
function loadData(data,origin){
 if(!data||typeof data!=="object"||(!data.activities&&!data.reflections&&!data.projects))throw Error("El fitxer no conté un portafoli ROBOTIA");
 if(data.identity?.email&&!/^[a-z0-9._%+-]+@instituticaria\.cat$/i.test(data.identity.email))throw Error("El correu del portafoli no és institucional");
 portfolio=data;items=[];
 const keys=new Set([...Object.keys(data.activities||{}),...Object.keys(data.reflections||{}),...Object.keys(data.projects||{})]);
 for(const id of keys){
   if(!/^[a-z0-9_-]{1,32}$/i.test(id))continue;
   const rec=data.activities?.[id]||{};
   const a={...rec,reflection:rec.reflection||data.reflections?.[id]||{},project:rec.project||data.projects?.[id]||null,progressRecord:rec.progressRecord||data.progress?.[id]||{},workId:rec.workId||rec.project?.workId||""};
   const type=rec.challengeMeta?.category||a.project?.challengeMeta?.category||(/^(f)/.test(id)?"flux":/^(m)/.test(id)?"microbit":/^(s)/.test(id)?"sensors":"robot");
   items.push({id,category:RUBRICS[type]?type:"robot",title:rec.challengeMeta?.title||a.project?.title||id,activity:a});
 }
 items.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
 if(data.identity?.email)el("v3-corr-email").value=data.identity.email;
 if(data.identity?.name)el("v3-corr-student").value=data.identity.name;
 const drop=el("v3-corr-challenge");drop.replaceChildren();
 items.forEach(item=>{const opt=document.createElement("option");opt.value=item.id;opt.textContent=item.title+" · "+item.id;drop.append(opt)});
 active=null;el("v3-corr-info").textContent="✓ "+origin+" · "+items.length+" reptes disponibles · "+(data.identity?.name||"alumne sense nom");
 if(items.length){active=items[0];renderRubric();renderEvidence();applyDraft()}
 else {el("v3-corr-evidence").textContent="Aquest portafoli no conté reptes.";setMessage("No hi ha activitats per corregir.")}
}
function cleanCell(value){
 let str=String(value===null||value===undefined?"":value);
 str=str.replace(/[\r\n\t]+/g," ").trim().slice(0,1800);
 if(/^[=+\-@]/.test(str))str="'"+str;
 return str;
}
function buildRow(){
 if(!portfolio||!active)throw Error("Carrega un portafoli i selecciona un repte");
 const email=el("v3-corr-email").value.trim().toLowerCase();
 if(!/^[a-z0-9._%+-]+@instituticaria\.cat$/.test(email))throw Error("El correu institucional no és vàlid");
 if(portfolio.identity?.email&&portfolio.identity.email.toLowerCase()!==email)throw Error("El correu no coincideix amb el del portafoli importat");
 const raw=el("v3-corr-grade").value,grade=asNumber(raw),ai=asNumber(el("v3-corr-ai").value);
 if(raw.trim()&&grade===null)throw Error("La nota docent ha de ser entre 0 i 10");
 if(el("v3-corr-ai").value.trim()&&ai===null)throw Error("La nota IA ha de ser entre 0 i 10");
 const pub=el("v3-corr-public").value.trim(),priv=el("v3-corr-private").value.trim();
 if(grade===null&&!pub&&!priv)throw Error("Introdueix una nota o un comentari per crear la correcció");
 const a=active.activity;
 return [email,active.id,active.title,active.category,a.workId||a.project?.workId||"",
  "Revisió docent · pendent de publicar",ai===null?"":ai.toString(),grade===null?"":grade.toString(),pub,priv,
  "No",new Date().toISOString().slice(0,10),el("v3-corr-reviewer").value.trim(),
  safeSharedLink(a.reflection?.makeCodeUrl)||"",a.updatedAt||a.project?.updatedAt||a.progressRecord?.completedAt||""].map(cleanCell);
}
async function copyRow(){
 try{
   const row=buildRow(),text=row.join("\t");
   if(!navigator.clipboard?.writeText)throw Error("El navegador no permet copiar automàticament: utilitza «Descarregar fila TSV»");
   await navigator.clipboard.writeText(text);
   setMessage("✓ Fila copiada. A «Correccions», fes clic a la primera cel·la A d'una FILA NOVA i enganxa-la (Ctrl+V). Si l'alumne i el repte ja tenen correcció, actualitza la fila existent. El camp «Publicar?» continua a «No».");
 }catch(e){setMessage("⚠️ "+e.message)}
}
function downloadRow(){
 try{
   const csv=buildRow().join("\t")+"\n";
   const blob=new Blob(["\ufeff"+csv],{type:"text/tab-separated-values;charset=utf-8"});
   const uri=URL.createObjectURL(blob),a=document.createElement("a");
   a.href=uri;a.download="ROBOTIA_correccio_"+active.id+".tsv";a.click();
   setTimeout(()=>URL.revokeObjectURL(uri),5000);
   setMessage("✓ Fitxer TSV descarregat. Revisa i incorpora la fila al full privat. No s'ha publicat cap nota.");
 }catch(e){setMessage("⚠️ "+e.message)}
}
el("v3-corr-file").addEventListener("change",async event=>{
 const file=event.target.files?.[0];if(!file)return;
 if(file.size>10*1024*1024){setMessage("⚠️ El portafoli supera 10 MB. Descarrega una còpia més petita.");return}
 try{loadData(JSON.parse(await file.text()),file.name);setMessage("Importat. Ja pots corregir i preparar la nota.")}
 catch(e){setMessage("⚠️ Error en importar: "+e.message)}
});
el("v3-corr-self").addEventListener("click",()=>{try{loadData(app.makePortfolioBundle(),"portafoli local de prova");setMessage("Portafoli local carregat. No s'ha desat res a Google.")}catch(e){setMessage("⚠️ "+e.message)}});
el("v3-corr-challenge").addEventListener("change",selectChallenge);
el("v3-corr-apply").addEventListener("click",()=>{const val=calculate();if(val===null){setMessage("Puntua primer tots els criteris de la rúbrica.");return}el("v3-corr-grade").value=val;rememberDraft();setMessage("Proposta copiada a la nota docent. Pots ajustar-la abans de copiar la fila.")});
["v3-corr-grade","v3-corr-ai","v3-corr-public","v3-corr-private"].forEach(id=>el(id).addEventListener("input",rememberDraft));
el("v3-corr-copy").addEventListener("click",()=>void copyRow());
el("v3-corr-download").addEventListener("click",downloadRow);
renderRubric();
})();