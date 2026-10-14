(function initTeacherHelp(){
 const $=s=>document.querySelector(s);
 const url="https://docs.google.com/spreadsheets/d/1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4/edit";
 const root=$("#viewPortfolio");
 if(!root)return;
 const box=document.createElement("section");
 box.className="card v3-teacher-panel";
 box.id="v3-teacher-panel";
 box.hidden=true;
 box.innerHTML=`<h2>👨‍🏫 Eines del professor</h2>
 <p>Registre privat de qualificacions i observacions. Només les valoracions marcades per publicar es podran fer visibles a l'alumnat quan estigui activada la sincronització docent.</p>
 <a class="btn primary" href="${url}" target="_blank" rel="noopener noreferrer">Obrir tauler de correccions ↗</a>
 <div class="v3-teacher-flow">
 <article><b>1. Alumnes</b><p>Consulta cada portafoli i escriu les tres notes de pràctiques: flux, micro:bit i sensors/actuadors. El projecte final i l'actitud van a part.</p></article>
 <article><b>2. Correccions</b><p>Una fila per repte. Introdueix o modifica nota /10, comentari per a l'alumne i una anotació privada.</p></article>
 <article><b>3. Observacions</b><p>Comentaris generals per alumne: seguiment, dificultats i millores. Separa el missatge públic del privat.</p></article>
 <article><b>4. Publicació</b><p>Per defecte, «No». Revisa les valoracions abans de canviar-ho a «Sí». La publicació automàtica encara necessita la connexió del servidor.</p></article>
 </div>
 <p class="v3-teacher-note"><b>Correcció amb IA:</b> pots revisar amb ChatGPT els fitxers del portafoli i guardar la proposta a «Correccions». La nota docent es manté separada fins que la confirmis.</p>`;
 root.append(box);
 window.addEventListener("robotia:teacherSession",ev=>{
   box.hidden=String(ev.detail?.email||"").toLowerCase()!=="jlesan@instituticaria.cat";
 });
 const css=document.createElement("style");
 css.textContent=`
 .v3-teacher-panel{padding:24px;margin:20px 0;border:1px solid #93b8dd}
 .v3-teacher-panel[hidden]{display:none!important}
 .v3-teacher-panel h2{font-size:21px;margin:0 0 10px}
 .v3-teacher-panel>p{font-size:14px;line-height:1.55;color:#526278}
 .v3-teacher-panel>a{display:inline-flex;margin:8px 0}
 .v3-teacher-flow{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0}
 .v3-teacher-flow article{border:1px solid #dce7f1;border-radius:12px;padding:15px;background:#f8fbff}
 .v3-teacher-flow b{font-size:14px}
 .v3-teacher-flow p{font-size:13px;line-height:1.5;color:#546579}
 .v3-teacher-note{background:#edf6ff;padding:12px;border-radius:9px}
 @media(max-width:700px){.v3-teacher-flow{grid-template-columns:1fr}}
 `;document.head.append(css);
})();