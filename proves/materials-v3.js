(function initMaterialLibrary(){
  "use strict";
  const $=s=>document.querySelector(s), page=$("#learn-sensors"), robot=$("#learn-robot");
  if(!page||!robot)return;
  const catalog=[
    ["microshield","🧩","Micro:Shield","Placa d'extensió","Diferents tipus de connectors","Insereix la micro:bit a la ranura. Localitza els GVS de 3,3 V, els de servos, els GVS amb selector 3,3/5 V i els ports de motors DC. No són intercanviables.","Comprova la bateria, l'interruptor general, el voltatge i els pins abans d'encendre.","Placa"],
    ["pir","👁️","Sensor PIR","Moviment","P1 (exemple bàsic)","Connecta el PIR a un GVS P1: G→GND, V→alimentació admesa pel sensor i S→pin P1. Extension tinker-kit, bloc motion detector.","Prova moviment i absència de moviment, després d'esperar l'estabilització del PIR.","GVS"],
    ["neopixel","🌈","NeoPixel","LEDs RGB","P8 (exemple bàsic)","Tira de 10 LED al GVS P8, verificant GND i la tensió. Extensions → NeoPixel. Inicialitza tira de 10 LEDs al pin P8.","Prova primer tota la tira amb un sol color.","GVS"],
    ["humitat","💧","Sensor d'humitat","Humitat","P2 (exemple bàsic)","Connecta el sensor al GVS P2 segons el mòdul. Afegeix tinker-kit; crea variable Humitat, llegeix el valor, arrodoneix i mostra.","Mesura dues condicions d'humitat i ajusta el llindar.","GVS"],
    ["ultrasons","📡","Ultrasons","Distància","Segons model","Identifica els connectors del sensor. Un HC-SR04 pot tenir TRIG i ECHO separats; altres models són de connector únic. Consulta el model i la compatibilitat de tensions.","Prova primer amb un objecte a 5 cm i després a 20 cm.","Mòdul"],
    ["servo","↪️","Servomotor","Posició angular","S2 (guia barrera)","Port de servomotor de la Micro:Shield: comprova GND, alimentació i senyal. A la guia de barrera es fa servir S2. Programa posicions 30° i 90°.","Prova sense càrrega i ajusta l'angle per no forçar les peces.","SERVO"],
    ["led","💡","LED extern","Llum","P0 / P1 exemple","Un mòdul LED GVS es connecta a un pin digital compatible. Si és un LED nu, respecta polaritat i afegeix resistència adequada. Escriu 1/0 per encendre/apagar.","Prova l'encesa amb el botó A i l'aturada amb B.","GVS"],
    ["so","🎙️","Nivell de so","Sensor integrat","micro:bit V2","Si tens micro:bit V2, el micròfon integrat no necessita cable. El bloc «nivell de so» retorna 0–255. 80 és un llindar de prova, NO són decibels.","Compara ambient tranquil, parla i aplaudiment.","INTERN"],
    ["buzzer","🔊","Brunzidor","So","Micro:Shield","Comprova l'interruptor PIN0–buzzer i la placa. Evita connectar simultàniament altres mòduls que utilitzin el mateix pin.","Fes una alarma curta i una ordre d'aturada.","INTEGRAT"],
    ["motor","⚙️","Motor DC","Gir","Ports motors DC","Connecta el motor a un port de motor DC de la Micro:Shield, amb controlador i bateria; MAI a un pin GVS de senyal. Comprova polaritat i motor abans de muntar.","Prova endavant, enrere i aturada amb rodes a l'aire.","MOTOR"],
    ["radio","📻","Ràdio","Comunicació","Dues micro:bit","No cal cable. Assigna el mateix grup de ràdio a emissor i receptor; envia text o números i programa el bloc «en rebre».","Abans d'activar motors, mostra a la matriu LED les ordres rebudes.","SENSE CABLE"],
    ["rele","🚰","Relé i bomba","Commutació","P2 exemple avançat","El mòdul relé rep un senyal de control des de P2; la bomba s'alimenta pel seu circuit de baixa tensió passant pels contactes del relé. Mai des d'un pin de micro:bit.","Prova el relé sense aigua primer; separa el circuit de les gotes.","RELÉ"]
  ];
  function illustration(item){
    const type=item[8];
    if(type==="INTERN"||type==="SENSE CABLE")return '<div class="v3-wire-free">📶 No requereix cablejat entre plaques ni sensors externs.</div>';
    const mid = type==="MOTOR"?"PORT MOTOR DC":type==="SERVO"?"CONNECTOR SERVOS":type==="RELÉ"?"PIN CONTROL + RELÉ":type==="INTEGRAT"?"MICRO:SHIELD":type==="Placa"?"CONNECTORS":type==="Mòdul"?"TRIG / ECHO (segons model)":"G · V · S";
    return `<div class="v3-connect-diagram"><div class="v3-cd-row"><div><b>micro:bit</b><span>Micro:Shield</span></div><div class="v3-cd-wires"><i></i><i></i><i></i></div><div><b>${mid}</b><span>${item[2]}</span></div></div><small>Esquema orientatiu. Consulta el model, la tensió i la posició dels connectors abans de fer el muntatge.</small></div>`;
  }
  const box=document.createElement("section");box.className="v3-component-section";
  box.innerHTML=`<h2>Biblioteca de sensors, actuadors i connexions</h2>
  <p>Selecciona el component que tens. Cada fitxa indica on es connecta i què has de provar abans d'entregar el repte.</p>
  <input type="search" id="v3-component-filter" aria-label="Cercar sensors i actuadors" placeholder="Cerca PIR, servo, NeoPixel, motor, Micro:Shield...">
  <div class="v3-component-cards">${catalog.map(item=>`<details data-keywords="${(item[2]+" "+item[3]+" "+item[0]).toLowerCase()}" class="v3-component-card"><summary><span class="v3-comp-emoji">${item[1]}</span><span><b>${item[2]}</b><small>${item[3]} · ${item[4]}</small></span><em>⌄</em></summary><div class="v3-comp-details"><p><b>Com es connecta:</b> ${item[5]}</p>${illustration(item)}<p><b>Com es comprova:</b> ${item[6]}</p></div></details>`).join("")}</div>`;
  page.append(box);
  box.querySelector("#v3-component-filter").addEventListener("input",e=>{
    const q=e.target.value.toLowerCase().trim();
    box.querySelectorAll("[data-keywords]").forEach(card=>card.hidden=!!q&&!card.dataset.keywords.includes(q));
  });
  const urls=[
  ["🧩","Micro:Shield","Fotografies dels connectors i interruptors","https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/10/Micro_shield.pdf"],
  ["🔎","Sensors bàsics","Fotos i fitxes del kit de sensors bàsic","https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/10/Conjunt-de-sensors-i-actuadors-secundaria_Basic-1.pdf"],
  ["⚙️","Sensors avançats","Inventari il·lustrat dels actuadors i sensors avançats","https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/10/Conjunt-de-sensors-i-actuadors-secundaria_Avancat.pdf"],
  ["📚","Manual Micro:Shield","Ports, alimentació i funcions","https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"]
  ];
  const docs=document.createElement("section");docs.className="v3-component-docs";
  docs.innerHTML=`<h2>Manuals il·lustrats</h2><p>Fotografies dels materials, diagrames de connexió i especificacions dels kits de l'institut.</p><div class="v3-pdf-cards">${urls.map(u=>`<a href="${u[3]}" target="_blank" rel="noopener noreferrer"><span>${u[0]}</span><b>${u[1]}</b><small>${u[2]}</small><strong>Obrir fitxa PDF ↗</strong></a>`).join("")}</div>`;
  page.append(docs);
  const recipes=[
    {title:"🚗 Cotxe teledirigit",sub:"2 micro:bit · Micro:Shield · 2 motors",materials:"2 micro:bit, Micro:Shield amb bateria, 2 motors DC amb rodes, xassís, roda lliure, cables, cartó o estructura impresa, eines.",
    steps:["Munta la base i comprova que les rodes giren lliurement.","Connecta els motors als PORTS DE MOTOR de la Micro:Shield, mai directament als pins GVS.","Crea 2 projectes MakeCode: un per al comandament i un per al receptor.","Posa el mateix grup de ràdio a les dues plaques (p. ex. grup 7); comprova que el receptor mostra els missatges.","Programa el comandament: B envia ENDAVANT, A envia STOP, A+B envia ENRERE i les inclinacions envien DRETA/ESQUERRA.","Al receptor, quan arriba cada ordre, controla els motors amb els blocs i el controlador de la Micro:Shield; STOP ha d'aturar-los.","Alça el robot: prova ENDAVANT, STOP, ENRERE, DRETA i ESQUERRA amb les rodes a l'aire.","Munta la carcassa, fixa els cables i fes la prova final al terra."],
    evidence:"Els dos programes, fotos del circuit, vídeo de les cinc ordres i explicació de les millores."},
    {title:"🪄 Caixa que s'obre sola",sub:"2 micro:bit · ràdio · servo",materials:"2 micro:bit, Micro:Shield, servo, bateria, caixa de cartó, frontissa o tapa lleugera, cables.",
    steps:["Construeix una caixa amb una tapa que es pugui moure sense força.","Connecta el servo al port de servomotors de la Micro:Shield i comprova l'alimentació.","Configura el mateix grup de ràdio a les dues micro:bit.","Al comandament, A envia OBRE i B envia TANCA.","Al receptor, mou el servo a dos angles diferents segons l'ordre rebuda.","Prova el servo primer sense connectar la tapa i ajusta el recorregut per no forçar les peces.","Amaga el circuit, decora la caixa i prova el truc davant d'algú."],
    evidence:"Dos programes, foto del servo i vídeo obrint i tancant."},
    {title:"✨ Vareta que encén una llum a distància",sub:"Ràdio · acceleròmetre · NeoPixel",materials:"2 micro:bit, Micro:Shield, mòdul LED o NeoPixel compatible, cables, bateria i estructura de cartó.",
    steps:["Dissenya la vareta i el lloc on es veurà la llum.","Connecta el LED o NeoPixel al seu connector adequat (per exemple, NeoPixel P8 si la guia és compatible).","Configura el mateix grup de ràdio a les dues micro:bit.","Al comandament, amb l'esdeveniment «sacsejar», envia LLUM.","Al receptor, en rebre LLUM, encén el LED dos segons i apaga'l.","Prova-ho abans de decorar, després prepara el truc."],
    evidence:"Dos programes, foto del muntatge i vídeo de l'efecte."},
    {title:"🌋 Volcà de llums i so",sub:"Ràdio · LED · brunzidor",materials:"2 micro:bit, Micro:Shield, NeoPixel/LED, brunzidor compatible, cables, bateria i estructura de cartó.",
    steps:["Construeix un volcà de cartó amb espai per posar-hi una llum.","Connecta els LEDs al pin adequat i revisa el funcionament del brunzidor de la Micro:Shield.","Posa el mateix grup de ràdio als dos programes.","Al comandament, A envia ERUPCIO i B envia ATURA.","Al receptor, ERUPCIO encén llums i so breu; ATURA ho apaga.","Prova primer els components fora del volcà i després integra-ho a l'estructura."],
    evidence:"Dos programes, foto del circuit i vídeo de l'erupció."}
  ];
  const projectBox=document.createElement("section");projectBox.className="v3-recipe-box";
  projectBox.innerHTML=`<h2>Projectes complets per construir</h2><p>Tria un projecte, consulta els materials i segueix els passos. També pots inventar-ne un de propi.</p>${recipes.map((r,i)=>`<details class="v3-recipe" ${i===0?"open":""}><summary><b>${r.title}</b><small>${r.sub}</small></summary><div><p><b>Materials:</b> ${r.materials}</p><ol>${r.steps.map(x=>`<li>${x}</li>`).join("")}</ol><p class="v3-recipe-evidence"><b>Què has d'entregar:</b> ${r.evidence}</p></div></details>`).join("")}`;
  robot.append(projectBox);
  const css=document.createElement("style");
  css.textContent=`
    .v3-component-section,.v3-component-docs,.v3-recipe-box{margin:26px 0}
    .v3-component-section>p,.v3-component-docs>p,.v3-recipe-box>p{color:#536278;font-size:14px;line-height:1.65}
    #v3-component-filter{width:100%;max-width:460px;background:#fff;border:1px solid #cad7e4;border-radius:10px;padding:12px;font-size:15px;margin-bottom:16px}
    .v3-component-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .v3-component-card{background:white;border:1px solid #dce5ef;border-radius:13px;overflow:hidden}
    .v3-component-card[hidden]{display:none!important}
    .v3-component-card summary{cursor:pointer;display:flex;align-items:center;gap:10px;padding:14px;min-height:76px;list-style:none}
    .v3-component-card summary::-webkit-details-marker{display:none}
    .v3-comp-emoji{font-size:25px;background:#edf5ff;border-radius:9px;padding:8px}
    .v3-component-card summary b,.v3-component-card summary small{display:block}
    .v3-component-card summary small{font-size:11px;margin-top:4px;color:#64748b}
    .v3-component-card summary em{margin-left:auto;color:#71859b}
    .v3-comp-details{padding:12px 15px;border-top:1px solid #e2e8f0}
    .v3-comp-details p{font-size:13px;line-height:1.6;color:#43556a}
    .v3-connect-diagram{background:#f3f8fd;border-radius:10px;border:1px solid #d9e5ef;padding:10px}
    .v3-cd-row{display:flex;gap:8px;align-items:center}
    .v3-cd-row>div:first-child,.v3-cd-row>div:last-child{padding:9px 5px;background:white;border:1px solid #c0d0de;border-radius:7px;min-height:65px;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .v3-cd-row b{font-size:11px}.v3-cd-row span{font-size:10px}
    .v3-cd-wires{width:33px;display:grid;gap:6px}
    .v3-cd-wires i{height:3px;background:#111827}.v3-cd-wires i:nth-child(2){background:#c97b28}.v3-cd-wires i:nth-child(3){background:#2364a3}
    .v3-connect-diagram small{display:block;color:#61768e;font-size:10px;line-height:1.4;margin-top:8px}
    .v3-wire-free{background:#f3f8fd;padding:12px;border-radius:10px}
    .v3-pdf-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
    .v3-pdf-cards a{display:flex;flex-direction:column;gap:8px;background:white;border:1px solid #dce5ef;border-radius:14px;padding:16px;text-decoration:none;color:inherit}
    .v3-pdf-cards a>span{font-size:29px}.v3-pdf-cards a b{font-size:15px}.v3-pdf-cards a small{color:#64748b;line-height:1.5}
    .v3-pdf-cards strong{color:#1d4ed8;font-size:12px;margin-top:auto}
    .v3-recipe{border:1px solid #d4e0ea;border-radius:14px;background:#fff;margin:12px 0;overflow:hidden}
    .v3-recipe summary{display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;cursor:pointer;list-style:none;padding:16px}
    .v3-recipe summary::-webkit-details-marker{display:none}
    .v3-recipe summary small{color:#64748b}.v3-recipe>div{border-top:1px solid #dbe5ee;padding:16px 20px;color:#45596d;font-size:14px;line-height:1.7}
    .v3-recipe li{margin:9px 0}
    .v3-recipe-evidence{background:#eaf8ed;padding:12px;border-radius:9px}
    @media(max-width:960px){.v3-component-cards{grid-template-columns:repeat(2,1fr)}.v3-pdf-cards{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:570px){.v3-component-cards,.v3-pdf-cards{grid-template-columns:1fr}}
  `;
  document.head.append(css);
})();