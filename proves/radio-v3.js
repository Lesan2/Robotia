(function initRadioLessons(){
 const mic=document.querySelector("#learn-microbit"),sen=document.querySelector("#learn-sensors");
 if(!mic||!sen)return;
 const a=document.createElement("section");a.className="radio-lessons";
 a.innerHTML=`<h2>📻 Dues micro:bit que es comuniquen per ràdio</h2>
 <p>Una placa fa de <b>comandament o emissora</b> i l'altra de <b>receptora</b>. Cada placa té el seu propi programa. La ràdio permet enviar números o text, però no envia directament so ni mou motors per si sola.</p>
 <div class="radio-visual"><div><strong>🎮 MICRO:BIT 1</strong><span>Botó A → envia 1</span><span>Botó B → envia 2</span></div><b>📡 GRUP 7</b><div><strong>🤖 MICRO:BIT 2</strong><span>En rebre 1 → cor ❤️</span><span>En rebre 2 → cara 🙂</span></div></div>
 <ol><li>Obre MakeCode i crea un projecte EMISSOR.</li><li>En «en iniciar», fixa grup de ràdio 7.</li><li>Posa l'acció «en prémer A → ràdio envia número 1». Amb B envia 2.</li><li>Crea un projecte RECEPTOR amb el mateix grup 7.</li><li>En «ràdio en rebre número», comprova si és 1 o 2 i mostra el dibuix corresponent.</li><li>Prova les dues micro:bit i entrega <b>els dos programes</b>.</li></ol>
 <p><a href="https://makecode.microbit.org/reference/radio" target="_blank" rel="noopener noreferrer">Obrir els blocs de ràdio de MakeCode ↗</a></p>`;
 mic.append(a);
 const b=document.createElement("section");b.className="radio-lessons";
 b.innerHTML=`<h2>🎮 Fer un comandament per a sensors i actuadors</h2>
 <p>La primera micro:bit envia ordres. La segona controla el material connectat a la Micro:Shield, segons el programa que rep.</p>
 <div class="radio-visual"><div><strong>🎮 COMANDAMENT</strong><span>A → envia «OBRE»</span><span>B → envia «TANCA»</span></div><b>📡 GRUP 7</b><div><strong>⚙️ RECEPTOR</strong><span>Rebre OBRE → servo a 30°</span><span>Rebre TANCA → servo a 90°</span></div></div>
 <ol><li>Connecta el servo al port de servo de la Micro:Shield, amb GND, alimentació i senyal correctes.</li><li>Posa el mateix grup de ràdio en les dues micro:bit.</li><li>Al comandament, envia OBRE amb A i TANCA amb B.</li><li>Al receptor, comprova el text rebut i mou el servo a l'angle adequat.</li><li>Prova el moviment sense càrrega i després utilitza el servo en una barrera o una caixa.</li></ol>
 <p><b>Altres variants:</b> activar un NeoPixel, encendre un LED, rebre una alarma PIR o fer avançar un cotxe. Quan hi ha motors, afegeix una ordre clara d'<b>ATURADA</b> i una aturada si es perd el senyal.</p>`;
 sen.append(b);
 const style=document.createElement("style");style.textContent=`
 .radio-lessons{border:1px solid #d5e3ed;border-radius:15px;background:#f5fbff;margin:22px 0;padding:20px}
 .radio-lessons h2{font-size:19px;margin:0 0 9px}
 .radio-lessons p,.radio-lessons li{font-size:14px;color:#495b6c;line-height:1.65}
 .radio-lessons li{margin:7px 0}
 .radio-visual{display:flex;justify-content:center;gap:13px;align-items:center;flex-wrap:wrap;margin:18px 0}
 .radio-visual>div{background:#fff;border:1px solid #bad1e5;border-radius:13px;padding:14px;display:flex;flex-direction:column;gap:7px;min-width:185px}
 .radio-visual strong{font-size:13px;color:#17456b}.radio-visual span{font-size:12px;color:#41566c}
 .radio-visual>b{color:#1d4ed8;font-size:14px}
 `;document.head.append(style);
})();