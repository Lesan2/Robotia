(function initMaterialLibrary(){
  "use strict";
  const $=s=>document.querySelector(s), page=$("#learn-sensors"), robot=$("#learn-robot");
  if(!page||!robot)return;
  const catalog=[
  [
    "microshield",
    "🧩",
    "Micro:Shield",
    "Placa de connexions",
    "GVS 3,3 V, blaus 3,3/5 V, S0–S8, motors",
    "Identifica els GVS de 3,3 V (P0,P1,P2,P3,P4,P6,P7,P8), els ports S i els blaus P12–P15/P19/P20. Els ports M3/M4 reserven P4–P7; P1 comparteix senyal amb S1.",
    "Comprova alimentació, selector 3V3/5V, P0/BUZZER i G/V/S abans d'endollar.",
    "Placa"
  ],
  [
    "collision",
    "🛑",
    "Sensor de col·lisió KS0021",
    "Digital 0/1",
    "P1 (GVS, 3,3 V)",
    "G al GND de P1, V al 3,3 V i S al P1. Val 0 quan es prem i 1 quan està lliure. No posis un servo al port S1 alhora.",
    "Prem i allibera el sensor i mostra valors 0/1.",
    "GVS"
  ],
  [
    "pir",
    "👁️",
    "PIR KS0052",
    "Moviment digital",
    "P2 (GVS, 3,3 V)",
    "Connecta G/V/S a P2 amb 3,3 V. Digital: 1 = moviment. Espera 5–10 segons d'estabilització i recorda que la detecció pot persistir.",
    "Comprova la lectura abans i després de moure't.",
    "GVS"
  ],
  [
    "llum",
    "☀️",
    "TEMT6000",
    "Llum analògica",
    "P0 (GVS, 3,3 V)",
    "G/V/S al pin P0 analògic. Posa selector P0/BUZZER a P0; MakeCode llegeix analog P0 entre 0 i 1023. No és un valor en volts.",
    "Compara llum i foscor amb lectures reals.",
    "GVS"
  ],
  [
    "humitat",
    "💧",
    "Sonda d'humitat del terra",
    "Analògica",
    "P0 (GVS, 3,3 V, segons versió)",
    "Comprova que la sonda admet 3,3 V; connecta-la a P0 i posa P0/BUZZER a P0. Valors 0–1023 a calibrar en sec i humit, sense mullar l'electrònica.",
    "Anota dues lectures i explica quin llindar has triat.",
    "GVS"
  ],
  [
    "oled",
    "📟",
    "OLED KS0271",
    "I²C, 128×64",
    "SCL P19 i SDA P20; 3,3 V",
    "Connecta quatre fils individuals: GND, VCC 3,3 V, SCL P19 i SDA P20. Selector dels pins blaus a 3V3. A MakeCode extensió SSD1306 OLED, inicialitza només a l'inici.",
    "Mostra HOLA i després dades d'un sensor sense parpelleig.",
    "OLED"
  ],
  [
    "neopixel",
    "🌈",
    "NeoPixel integrats",
    "4 LED RGB interns",
    "P16 sense cables",
    "Inicialitza 4 NeoPixel al pin intern P16, tipus GRB, i executa «mostrar» després de canviar colors. No necessita tira externa ni cable.",
    "Mostra vermell, verd i blau i apaga els quatre LED.",
    "INTERN"
  ],
  [
    "servo",
    "↪️",
    "Servomotor KS0194",
    "Angle fins a 180°",
    "S8 (= P8); potència adequada",
    "GND/G, V d'alimentació adequada i senyal S8. El servo és nominal 4,8–6 V i pot tremolar amb la bateria de 3,7 V. No utilitzis S1 amb un sensor al P1.",
    "Prova 30° i 90° sense càrrega mecànica.",
    "SERVO"
  ],
  [
    "motor",
    "⚙️",
    "Motor groc amb roda",
    "DC amb driver",
    "M3+/M3− (o M4)",
    "L'extrem blanc JST no encaixa als borns blaus. Necessites adaptador JST a fils i tornavís. M3/M4 ocupen pins P4–P7. Prova amb bateria i Microshield ON.",
    "Fes girar, atura i inverteix el sentit amb la roda aixecada.",
    "MOTOR"
  ],
  [
    "buzzer",
    "🔊",
    "Brunzidor de Microshield",
    "So integrat",
    "P0/BUZZER a BUZZER",
    "Posa el selector en BUZZER per utilitzar el brunzidor intern a P0. No connectis simultàniament el TEMT6000 ni altres sensors a P0.",
    "Fes un to curt i una instrucció d'aturada.",
    "INTERN"
  ],
  [
    "ultrasons",
    "📡",
    "HC-SR04",
    "Distància digital temporal",
    "TRIG P14; ECHO P15 amb reductor",
    "Alimenta el HC-SR04 amb 5 V i GND comú. TRIG cap a P14. ECHO cap a P15 NOMÉS amb adaptador 5→3,3 V; no connectis mai directament ECHO. Selector blau a 5V implica no connectar OLED de 3,3 V allà.",
    "Compara lectures a 5 i 20 cm després de preparar el circuit.",
    "Mòdul"
  ],
  [
    "linia",
    "🛤️",
    "Tres seguidors KS0050",
    "Digital TTL 5 V",
    "P12/P13/P14 amb adaptadors 5→3,3 V",
    "Els sensors de línia són de 5 V. Cada senyal S necessita un adaptador 5→3,3 V; el selector blau en 5V NO transforma el senyal. Evita OLED 3,3 V al mateix banc blau.",
    "Compara blanc i negre només quan hi hagi els tres adaptadors.",
    "GVS"
  ],
  [
    "lm35",
    "🌡️",
    "LM35",
    "Temperatura analògica",
    "P0, connexió condicionada",
    "Verifica abans l'alimentació nominal del mòdul (habitualment 5 V) i mesura que la sortida cap a P0 no superi 3,3 V. Conversió pròpia: 10 mV/°C.",
    "El docent valida tensió abans de connectar a micro:bit.",
    "GVS"
  ],
  [
    "tira",
    "✨",
    "Tira externa de 30 LED",
    "WS2812B, 5 V",
    "Cable corrector + font 5 V",
    "Per a 30 NeoPixel cal el cable corrector GVS del kit i una font de 5 V suficient; DIN necessita senyal compatible. No la connectis com si fos una tira de 10 LEDs a GVS 3,3 V.",
    "Prova amb brillantor baixa quan el material estigui preparat.",
    "GVS"
  ],
  [
    "so",
    "🎙️",
    "Micròfon de micro:bit V2",
    "Nivell de so incorporat",
    "micro:bit V2",
    "Només en micro:bit V2; retorna un valor 0–255, que no són decibels, i no necessita cable.",
    "Compara silenci, parla i aplaudiment.",
    "INTERN"
  ],
  [
    "radio",
    "📻",
    "Ràdio micro:bit",
    "Emissor i receptor",
    "2 micro:bit",
    "Fixa el mateix grup ràdio a totes dues plaques. Crea i entrega els dos programes. El receptor ha de gestionar les ordres i reaccionar.",
    "Prova les dues micro:bit amb els programes separats.",
    "SENSE CABLE"
  ]
];
  function illustration(item){
 const type=item[8];
 if(type==="INTERN")return '<div class="v3-wire-free">🧩 Component incorporat a la placa: no requereix cables externs. Comprova els interruptors i els pins compartits.</div>';
 if(type==="SENSE CABLE")return '<div class="v3-wire-free">📶 La ràdio no requereix cables. Les dues micro:bit han de fer servir el mateix grup i dos programes compatibles.</div>';
 if(type==="Placa")return '<div class="v3-wire-free"><b>Micro:Shield:</b> connectors GVS de sensors, connectors específics de servo, ports de motor DC i font d’alimentació. Tria el port segons el dispositiu.</div>';
 const wires=type==="OLED"?["GND","VCC 3,3 V","SCL P19","SDA P20"]:type==="MOTOR"?["MOTOR +","MOTOR −"]:type==="RELÉ"?["GND","Vcc del mòdul","S = control P2"]:type==="Mòdul"?["GND","5 V","TRIG","ECHO 5→3,3 V"]:["GND = G","V = tensió compatible","S = senyal"];
 const label=type==="OLED"?"BUS I²C, 4 FILS":type==="MOTOR"?"PORT MOTOR DC":type==="SERVO"?"CONNECTOR SERVO":type==="RELÉ"?"ENTRADA DEL RELÉ":type==="Mòdul"?"SENSOR HC-SR04":"GVS";
 const note=type==="OLED"?"La pantalla OLED necessita 4 fils independents i selector blau 3V3.":type==="MOTOR"?"El controlador i la bateria alimenten el motor; no utilitzis pins GVS.":type==="RELÉ"?"L'alimentació de la bomba passa pels contactes del relé, en un circuit separat; mai pels pins de micro:bit.":type==="Mòdul"?"Verifica si el mòdul porta TRIG i ECHO separats i comprova la tensió dels senyals.":"Comprova la tensió del component i orienta G, V i S correctament.";
 return `<div class="v3-connect-diagram"><div class="v3-cd-row"><div><b>Micro:Shield</b><span>${label}</span></div><div class="v3-cd-lines">${wires.map((w,i)=>`<div><i class="line-${i}"></i><small>${w}</small></div>`).join("")}</div><div><b>${item[2]}</b><span>${item[4]}</span></div></div><small>${note} Esquema orientatiu: revisa el connector real del kit abans d'endollar.</small></div>`;
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
    .v3-cd-lines{width:95px;display:grid;gap:4px}
    .v3-cd-lines>div{display:flex;align-items:center;gap:4px}
    .v3-cd-lines i{width:23px;height:3px;display:block;background:#111827;flex-shrink:0}
    .v3-cd-lines .line-1{background:#c97b28}.v3-cd-lines .line-2{background:#2364a3}.v3-cd-lines .line-3{background:#7c3aed}
    .v3-cd-lines small{font-size:9px;line-height:1.2;color:#40546a}
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