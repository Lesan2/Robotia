(function initFeedbackUI(){
"use strict";
const $=s=>document.querySelector(s);
let verifiedEmail="",published=null;
const form=document.querySelector("#viewV3Grades");
if(!form)return;
const card=document.createElement("section");card.className="card v3-feedback-card";card.id="v3-feedback-card";
card.innerHTML="<h2>Comentaris i qualificacions del professor</h2><p>Les valoracions apareixeran aquí quan el professor les hagi publicat.</p>";
form.append(card);
const personal=document.createElement("section");personal.className="v3-shortcut-feedback";
personal.innerHTML='<button class="btn secondary" id="btnViewTeacherNotes" type="button">💬 Consultar correccions i observacions</button>';
$("#portfolioList")?.after(personal);
$("#btnViewTeacherNotes")?.addEventListener("click",()=>{$("#btnV3Grades")?.click();setTimeout(()=>card.scrollIntoView({behavior:"smooth",block:"start"}),80)});
const challengeLab=document.createElement("div");challengeLab.id="v3-diagram-feedback";challengeLab.className="v3-feedback-small";
$("#challengeMeta")?.after(challengeLab);
const practical=document.createElement("div");practical.id="v3-practical-feedback";practical.className="v3-feedback-small";
$("#practicalDeliverables")?.after(practical);
const scoreMap={flux:"Diagrames de flux",microbit:"Programació micro:bit",sensors:"Sensors i actuadors",practices:"Pràctiques (50%)",attitude:"Actitud (20%)",robot:"Projecte final (30%)",final:"Nota global del curs"};
function message(element,text){
 element.replaceChildren();
 const p=document.createElement("p");p.textContent=text;element.append(p);
}
function addComment(container,label,note){
 const block=document.createElement("div");block.className="v3-teacher-comment";
 const head=document.createElement("strong");head.textContent=label;
 const p=document.createElement("p");p.textContent=note;
 block.append(head,p);container.append(block);
}
function refreshNotes(){
 card.replaceChildren();
 const title=document.createElement("h2");title.textContent="Comentaris i qualificacions del professor";card.append(title);
 const refresh=document.createElement("button");
 refresh.type="button";refresh.className="btn secondary v3-feedback-refresh";
 refresh.textContent="↻ Actualitzar notes i comentaris";
 refresh.addEventListener("click",()=>window.dispatchEvent(new Event("robotia:refreshFeedback")));
 card.append(refresh);
 if(published?.unavailable){
   const p=document.createElement("p");p.textContent="Ara mateix no s'han pogut consultar les valoracions. El teu portafoli continua disponible.";card.append(p);
   refreshPerChallenge();return;
 }
 if(!published){
 const p=document.createElement("p");p.textContent="Encara no tens valoracions publicades. Les entregues estan pendents de revisió docent.";card.append(p);
 }else{
 const grades=published.grades||{};
 const wrap=document.createElement("div");wrap.className="v3-feedback-grades";
 for(const [key,display] of Object.entries(scoreMap)){
 const n=grades[key];if(typeof n!=="number"||n<0||n>10)continue;
 const item=document.createElement("div");item.className="v3-feedback-score";
 const heading=document.createElement("span");heading.textContent=display;
 const value=document.createElement("b");value.textContent=n.toLocaleString("ca-ES")+" / 10";
 item.append(heading,value);wrap.append(item);
 const el=document.querySelector('[data-teacher-grade="'+key+'"]');if(el)el.textContent=value.textContent;
 }
 card.append(wrap);
 const gen=document.createElement("h3");gen.textContent="Anotacions generals";card.append(gen);
 const general=Array.isArray(published.general)?published.general:[];
 if(!general.length){const p=document.createElement("p");p.textContent="Sense comentaris generals publicats.";card.append(p)}
 for(const item of general){
   if(!item)continue;
   const label=[item.type||"Observació",item.date||"",Number.isFinite(item.grade)?("Nota: "+item.grade+"/10"):""].filter(Boolean).join(" · ");
   if(item.comment||Number.isFinite(item.grade))addComment(card,label,item.comment||"Valoració publicada pel professor.");
 }
 const head=document.createElement("h3");head.textContent="Correccions per exercici";card.append(head);
 const entries=Array.isArray(published.exercises)?published.exercises:[];
 if(!entries.length){const p=document.createElement("p");p.textContent="Encara no hi ha correccions per exercici publicades.";card.append(p)}
 for(const item of entries){
 if(!item||typeof item.comment!=="string")continue;
 addComment(card,(item.title||item.id||"Repte")+(Number.isFinite(item.grade)?" · "+item.grade+"/10":""),item.comment);
 }
 }
 refreshPerChallenge();
}
function refreshPerChallenge(){
 const app=window.ROBOTIA_CLOUD_APP;
 const id=app?.state?.currentChallenge?.id;
 const practicalId=app?.state?.practicalId;
 for(const [element,key] of [[challengeLab,id],[practical,practicalId]]){
 if(!element)continue;
 const match=published?.exercises?.find(x=>x.id===key && (x.comment||Number.isFinite(x.grade)));
 if(match){
 element.replaceChildren();addComment(element,"💬 Nota del professor"+(Number.isFinite(match.grade)?" · "+match.grade+"/10":""),match.comment||"Valoració publicada.");
 }else message(element,"💬 Encara no hi ha cap correcció docent publicada d'aquest repte.");
 }
}
window.addEventListener("robotia:teacherSession",event=>{
 const address=event.detail?.email||"";
 if(verifiedEmail!==address){
   published=null;
   document.querySelectorAll("[data-teacher-grade]").forEach(el=>{el.textContent="Pendent"});
   refreshNotes();
 }
 verifiedEmail=address;
 let teacherButton=$("#v3TeacherLink");
 if(!teacherButton){
 teacherButton=document.createElement("a");teacherButton.id="v3TeacherLink";teacherButton.className="btn secondary";
 teacherButton.href="https://docs.google.com/spreadsheets/d/1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4/edit";
 teacherButton.target="_blank";teacherButton.rel="noopener noreferrer";teacherButton.textContent="Tauler docent privat ↗";
 $("#robotia-cloud")?.append(teacherButton);
 }
 teacherButton.hidden=address.toLowerCase()!=="jlesan@instituticaria.cat";
 if(!address){published=null;refreshNotes();}
});
window.addEventListener("robotia:publishedFeedback",event=>{
 const obj=event.detail;
 if(!verifiedEmail||!obj||obj.email!==verifiedEmail)return;
 published=obj;
 refreshNotes();
});
const modal=$("#modalPractical");
if(modal)new MutationObserver(refreshPerChallenge).observe(modal,{attributes:true,attributeFilter:["open"]});
const lab=$("#viewLab");
if(lab)new MutationObserver(refreshPerChallenge).observe(lab,{attributes:true,attributeFilter:["class"]});
$("#btnV3Grades")?.addEventListener("click",refreshNotes);
const css=document.createElement("style");css.textContent=`
.v3-feedback-card{padding:22px;margin:22px 0}.v3-feedback-refresh{display:inline-flex;margin:0 0 16px}.v3-feedback-card h2{font-size:20px}.v3-feedback-card h3{font-size:16px;margin-top:22px}
.v3-feedback-card p{color:#546176;font-size:14px;line-height:1.65}
.v3-feedback-grades{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}
.v3-feedback-score{border-radius:10px;background:#edf6ff;padding:14px;display:flex;flex-direction:column;gap:5px;min-width:145px}
.v3-feedback-score span{font-size:12px}.v3-feedback-score b{font-size:20px}
.v3-teacher-comment{background:#f5faff;border-left:3px solid #2563eb;border-radius:7px;padding:12px;margin:9px 0}
.v3-teacher-comment p{margin:6px 0}.v3-feedback-small{margin:9px 0;color:#506176;font-size:13px}
.v3-feedback-small p{font-size:13px}
.v3-shortcut-feedback{margin:12px 0}
#v3TeacherLink{display:inline-block;margin:8px 0 0 2px;text-decoration:none}
#v3TeacherLink[hidden]{display:none!important}
`;document.head.append(css);
refreshNotes();
})();