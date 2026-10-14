(function initTeacherHelp(){
 const $=s=>document.querySelector(s);
 const sheet="https://docs.google.com/spreadsheets/d/1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4/edit";
 const root=$("#viewPortfolio");
 if(!root)return;
 const box=document.createElement("section");
 box.className="card v3-teacher-panel";
 box.id="v3-teacher-panel";
 box.hidden=true;
 box.innerHTML=`
 <h2>👨‍🏫 Eines del professor</h2>
 <p>Registre docent privat. Les notes i comentaris per a l'alumnat no es publiquen automàticament fins que s'activi la connexió segura al servidor.</p>
 <a class="btn primary" href="${sheet}" target="_blank" rel="noopener noreferrer">Obrir tauler de qualificacions ↗</a>
 <div class="v3-teacher-flow">
   <article><b>Alumnes</b><p>Consulta els portafolis i les notes de flux, micro:bit, sensors, actitud i robot final.</p></article>
   <article><b>Correccions</b><p>Per cada repte, escriu o modifica la nota, el comentari per a l'alumne i l'anotació privada.</p></article>
   <article><b>Observacions</b><p>Afegeix comentaris generals per alumne i separa els missatges públics dels privats.</p></article>
   <article><b>Publicació</b><p>Revisa i valida les notes; la publicació dins de ROBOTIA continuarà pendent de la connexió del servidor.</p></article>
 </div>
 <h3>📨 Proposar un repte personal o enviar un missatge</h3>
 <p>Prepara un correu individual al Gmail institucional. Allà pots adjuntar fitxers del teu ordinador o documents de Drive. No s'enviarà res fins que premis «Envia» a Gmail.</p>
 <div class="v3-comm-fields">
  <label>Correu de l'alumne<input id="v3-recipient" type="email" autocomplete="off" placeholder="alumne@instituticaria.cat"></label>
  <label>Assumpte<input id="v3-subject" type="text" maxlength="150" placeholder="Repte personal de Robòtica"></label>
  <label class="v3-full">Missatge i instruccions<textarea id="v3-message" rows="5" placeholder="Què vols proposar i com s'ha d'entregar?"></textarea></label>
  <label class="v3-full">Enllaç d'un document a Drive (opcional)<input id="v3-attachment" type="url" placeholder="https://docs.google.com/document/d/..."></label>
 </div>
 <div class="v3-comm-actions">
 <button type="button" class="btn primary" id="v3-compose">Preparar correu individual ↗</button>
 <a class="btn secondary" href="https://drive.google.com/drive/my-drive" target="_blank" rel="noopener noreferrer">Pujar fitxer a Drive ↗</a>
 <a class="btn secondary" href="${sheet}#gid=15321905" target="_blank" rel="noopener noreferrer">Encàrrecs personals ↗</a>
 <a class="btn secondary" href="${sheet}#gid=15321906" target="_blank" rel="noopener noreferrer">Comunicacions ↗</a>
 </div>
 <p class="v3-teacher-note">Si comparteixes un document per enllaç, dona-hi accés només a l'alumne destinatari. Si vols enviar un arxiu del PC, adjunta'l des de Gmail quan obris el missatge. Les respostes arribaran al teu correu institucional.</p>
 <p id="v3-compose-status" role="status"></p>
 `;
 root.append(box);
 window.addEventListener("robotia:teacherSession",e=>{
   box.hidden=String(e.detail?.email||"").toLowerCase()!=="jlesan@instituticaria.cat";
 });
 $("#v3-compose").addEventListener("click",()=>{
   const email=$("#v3-recipient").value.trim().toLowerCase();
   const subject=$("#v3-subject").value.trim();
   const msg=$("#v3-message").value.trim();
   const file=$("#v3-attachment").value.trim();
   const status=$("#v3-compose-status");
   if(!/^[a-z0-9._%+-]+@instituticaria\.cat$/.test(email)){status.textContent="Introdueix un correu institucional vàlid.";return}
   if(!subject||!msg){status.textContent="Cal escriure l'assumpte i el missatge.";return}
   if(file&&!/^https:\/\//.test(file)){status.textContent="L'enllaç al document ha de començar per https://";return}
   const body=msg+(file?"\n\nMaterial del repte: "+file:"");
   const gmail="https://mail.google.com/mail/?authuser="+encodeURIComponent("jlesan@instituticaria.cat")+
       "&view=cm&fs=1&to="+encodeURIComponent(email)+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
   window.open(gmail,"_blank","noopener,noreferrer");
   status.textContent="Correu preparat: revisa'l i envia'l des de Gmail. Anota l'enviament al registre docent.";
 });
 const css=document.createElement("style");
 css.textContent=`
 .v3-teacher-panel{padding:24px;margin:20px 0;border:1px solid #93b8dd}
 .v3-teacher-panel[hidden]{display:none!important}
 .v3-teacher-panel h2{font-size:21px;margin:0 0 10px}
 .v3-teacher-panel h3{font-size:18px;margin:22px 0 10px}
 .v3-teacher-panel p{font-size:14px;line-height:1.6;color:#526278}
 .v3-teacher-panel>a{display:inline-flex;margin:8px 0}
 .v3-teacher-flow{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0}
 .v3-teacher-flow article{border:1px solid #dce7f1;border-radius:12px;padding:15px;background:#f8fbff}
 .v3-teacher-flow b{font-size:14px}
 .v3-teacher-flow p{font-size:13px}
 .v3-teacher-note{background:#edf6ff;padding:12px;border-radius:9px}
 .v3-comm-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}
 .v3-comm-fields label{font-size:13px;font-weight:750;color:#39536c;display:flex;flex-direction:column;gap:7px}
 .v3-comm-fields input,.v3-comm-fields textarea{width:100%;padding:12px;border-radius:8px;border:1px solid #c3d1df;font:inherit}
 .v3-comm-fields .v3-full{grid-column:1/-1}
 .v3-comm-actions{display:flex;flex-wrap:wrap;gap:9px;margin:12px 0}
 .v3-comm-actions a{text-decoration:none}
 #v3-compose-status{font-weight:700;color:#075580}
 @media(max-width:700px){.v3-teacher-flow,.v3-comm-fields{grid-template-columns:1fr}}
 `;
 document.head.append(css);
})();