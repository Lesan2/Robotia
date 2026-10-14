(function setupTeacherContact(){
 const portfolio=document.querySelector("#viewPortfolio");
 if(!portfolio)return;
 const container=document.createElement("div");container.className="card student-help-mail";
 container.innerHTML=`
 <h2>💬 Consultar un dubte al professor</h2>
 <p>Pots fer una pregunta sobre un repte o explicar què no funciona. També pots adjuntar un programa .hex, una fotografia o un vídeo al correu.</p>
 <label>Repte o assumpte<input id="studentMailTopic" type="text" placeholder="Ex.: Servo per ràdio"></label>
 <label>Què vols explicar?<textarea id="studentMailText" rows="3" placeholder="He provat de... i em passa que..."></textarea></label>
 <button class="btn secondary" type="button" id="studentMailButton">Escriure al professor ↗</button>
 <p id="studentMailStatus" role="status"></p>`;
 portfolio.append(container);
 const $=s=>container.querySelector(s);
 $("#studentMailButton").addEventListener("click",()=>{
 const subject=$("#studentMailTopic").value.trim()||"Dubte de Robòtica";
 const message=$("#studentMailText").value.trim();
 const name=window.ROBOTIA_CLOUD_APP?.state?.identity?.name||"";
 const body=(name?"Alumne: "+name+"\n\n":"")+(message||"Hola, tinc un dubte sobre aquest repte.")+
    "\n\nPuc adjuntar els meus fitxers o fotografies des de Gmail.";
 const url="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent("jlesan@instituticaria.cat")+
   "&su="+encodeURIComponent("ROBOTIA · "+subject)+"&body="+encodeURIComponent(body);
 window.open(url,"_blank","noopener,noreferrer");
 $("#studentMailStatus").textContent="Revisa el correu, afegeix els fitxers si cal i prem Envia a Gmail.";
 });
 const style=document.createElement("style");style.textContent=`
 .student-help-mail{padding:20px;margin:20px 0}
 .student-help-mail h2{font-size:19px}.student-help-mail p{font-size:13px;line-height:1.6;color:#546277}
 .student-help-mail label{display:flex;flex-direction:column;gap:5px;margin:12px 0;font-size:13px;font-weight:700;color:#36526d}
 .student-help-mail input,.student-help-mail textarea{padding:11px;border:1px solid #c4d3df;border-radius:9px;font:inherit}
 #studentMailStatus{font-weight:700;color:#155c83}
 `;document.head.append(style);
})();