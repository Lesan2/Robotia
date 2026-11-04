/* ROBOTIA V3: aprofundiment pedagògic d'Aprendre.
   Contingut educatiu llegit a les guies del kit Bàsic Micro:Shield del centre.
   Afegeix només seccions d'aprenentatge; no escriu notes ni portafolis. */
(function enhanceLessons(){
"use strict";
const $=s=>document.querySelector(s);
const flux=$("#learn-flux"),micro=$("#learn-microbit"),sensors=$("#learn-sensors");
if(!flux||!micro||!sensors)return;
const link=(href,title)=>'<a href="'+href+'" target="_blank" rel="noopener noreferrer">'+title+' ↗</a>';
const doc="https://makecode.microbit.org/";
const styles=document.createElement("style");
styles.textContent=[
 ".edu-more{margin:24px 0;border:1px solid #cbdcef;background:#f8fbff;border-radius:16px;padding:20px}",
 ".edu-more h2{font-size:24px;margin:0 0 10px}.edu-more h3{font-size:18px;margin:12px 0 8px}",
 ".edu-more p,.edu-more li{font-size:14px;line-height:1.7;color:#40556e}",
 ".edu-more .intro{font-size:15px;max-width:920px}",
 ".edu-lesson-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:17px 0}",
 ".edu-lesson-card{border:1px solid #dae5f1;background:#fff;border-radius:13px;padding:17px;min-width:0}",
 ".edu-lesson-card>h3{margin-top:0}.edu-lesson-card ul,.edu-lesson-card ol{padding-left:22px}",
 ".edu-tag{font-size:12px;font-weight:800;background:#eef4ff;border-radius:6px;padding:3px 7px;color:#1e497e;display:inline-block;margin:3px 3px 5px 0}",
 ".edu-example{background:#fff;border:1px solid #dae5f1;border-radius:13px;padding:16px;margin:14px 0}",
 ".edu-example svg{width:100%;max-width:850px;height:auto;display:block;margin:9px auto;border:1px solid #d9e5ef;background:#fbfdff;border-radius:10px}",
 ".edu-pseudocode{white-space:pre-wrap;background:#ecf2fd;color:#16395e;border-radius:10px;padding:13px;font-size:13px;line-height:1.7;overflow:auto}",
 ".edu-code{white-space:pre;overflow:auto;background:#132139;color:#d7efff;border-radius:10px;padding:15px;font-size:12px;line-height:1.7}",
 ".edu-help{border-left:3px solid #2563eb;background:#edf4ff;border-radius:5px;padding:10px 14px;margin:11px 0}",
 ".edu-help.warning{border-left-color:#b45309;background:#fff8e8}",
 ".edu-block-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}",
 ".edu-block-list details{border:1px solid #d7e3ef;border-radius:10px;background:#fff;padding:12px 14px}",
 ".edu-block-list summary{cursor:pointer;font-weight:800;color:#1e3d66;font-size:14px}",
 ".edu-block-list details p{margin:7px 0}.edu-block-list a,.edu-example a{font-size:13px;font-weight:700}",
 ".edu-makecode-steps{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}",
 ".edu-makecode-steps span{background:#e9efff;border-radius:9px;padding:9px;font-weight:750;font-size:12px}",
 ".edu-kit-chip{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:12px 0}",
 ".edu-kit-chip span{background:#fff;border:1px solid #d6e3f0;padding:8px 11px;border-radius:9px;font-size:13px;font-weight:750}",
 ".edu-kit-card{background:#fff;border:1px solid #cfe1f0;border-radius:12px;margin:13px 0;overflow:hidden}",
 ".edu-kit-card summary{cursor:pointer;padding:17px;font-weight:800;color:#153758}",
 ".edu-kit-card summary small{display:block;font-weight:500;margin-top:4px;color:#576983}",
 ".edu-kit-card .body{border-top:1px solid #e5edf5;padding:15px 19px}",
 ".edu-kit-card .body ol{padding-left:24px}.edu-kit-card .body li{margin:8px 0}",
 ".edu-checks{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.edu-checks div{padding:10px;border-radius:9px;background:#f1f6fc;font-size:13px}",
 ".edu-label-badge{background:#16466c;color:#fff;font-weight:800;border-radius:9px;padding:4px 8px;font-size:12px}",
 ".edu-examples-toolbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
 ".edu-copy{cursor:pointer;border:1px solid #b4c7df;background:#ecf4ff;border-radius:8px;padding:7px 10px;color:#16466c;font-weight:750}",
 ".edu-copy[disabled]{opacity:.5}.edu-copy-status{font-size:12px;color:#165c43;min-height:15px}",
 "@media(max-width:800px){.edu-lesson-grid,.edu-block-list{grid-template-columns:1fr}.edu-checks{grid-template-columns:1fr}.edu-more{padding:14px}}"
].join("\n");
document.head.append(styles);
function section(parent,title,intro,id){
 const root=document.createElement("section");root.className="edu-more";root.id=id;
 const h=document.createElement("h2");h.textContent=title;root.append(h);
 const p=document.createElement("p");p.className="intro";p.textContent=intro;root.append(p);
 parent.prepend(root);return root;
}
function markup(root,html){const d=document.createElement("div");d.innerHTML=html;root.append(d);return d}
function svgElem(name,attrs={},value){
 const el=document.createElementNS("http://www.w3.org/2000/svg",name);
 Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
 if(value!==undefined)el.textContent=String(value);return el;
}
function flowDiagram(host,example){
 const nodes=new Map(example.nodes.map(n=>[n[0],n]));
 const svg=svgElem("svg",{viewBox:"0 0 760 "+example.height,role:"img","aria-label":example.accessible});
 const defs=svgElem("defs");
 const marker=svgElem("marker",{id:"edu-arr-"+example.id,markerWidth:10,markerHeight:10,refX:8,refY:4,orient:"auto",markerUnits:"strokeWidth"});
 marker.append(svgElem("path",{d:"M 0 0 L 8 4 L 0 8 Z",fill:"#365978"}));defs.append(marker);svg.append(defs);
 function port(node,side){
  const [id,type,x,y,w=185,h=56]=node;
  if(side==="left")return[x-w/2,y];if(side==="right")return[x+w/2,y];
  if(side==="top")return[x,y-h/2];return[x,y+h/2];
 }
 example.edges.forEach(e=>{
  const a=nodes.get(e[0]),b=nodes.get(e[1]);if(!a||!b)return;
  const start=port(a,e[2]||"bottom"),end=port(b,e[3]||"top");
  const path=e[4]||("M "+start[0]+" "+start[1]+" L "+end[0]+" "+end[1]);
  svg.append(svgElem("path",{d:path,stroke:"#365978","stroke-width":3,fill:"none","marker-end":"url(#edu-arr-"+example.id+")"}));
  if(e[5]){
   const x=Number(e[6]||((start[0]+end[0])/2)),y=Number(e[7]||((start[1]+end[1])/2-9));
   svg.append(svgElem("text",{x,y,"text-anchor":"middle","font-size":15,"font-weight":800,fill:e[5]==="SÍ"?"#166534":"#9b3020"},e[5]));
  }
 });
 const colors={start:["#dcfce7","#15803d"],io:["#f3e8ff","#7e22ce"],process:["#dbeafe","#2563eb"],decision:["#fef3c7","#d97706"]};
 example.nodes.forEach(n=>{
  const [id,type,x,y,w=185,h=56,label=""]=n,cols=colors[type]||colors.process;
  const group=svgElem("g");const attrs={fill:cols[0],stroke:cols[1],"stroke-width":2};
  let shape;
  if(type==="start")shape=svgElem("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:h/2,...attrs});
  else if(type==="decision")shape=svgElem("polygon",{points:x+","+(y-h/2)+" "+(x+w/2)+","+y+" "+x+","+(y+h/2)+" "+(x-w/2)+","+y,...attrs});
  else if(type==="io")shape=svgElem("polygon",{points:(x-w/2+19)+","+(y-h/2)+" "+(x+w/2)+","+(y-h/2)+" "+(x+w/2-19)+","+(y+h/2)+" "+(x-w/2)+","+(y+h/2),...attrs});
  else shape=svgElem("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:10,...attrs});
  group.append(shape);
  const lines=String(label).split("|");
  lines.forEach((text,i)=>group.append(svgElem("text",{x,y:y+(i-(lines.length-1)/2)*18+5,"text-anchor":"middle","font-size":lines.length>2?13:15,"font-weight":700,fill:"#1c3349"},text)));
  svg.append(group);
 });host.append(svg);
}
const flow=section(flux,"Variables, entrades, sortides i càlculs amb exemples","Aprèn a decidir quin símbol toca utilitzar i com canvien els valors d'una variable durant l'execució d'un programa.","edu-flow");
markup(flow,'<div class="edu-lesson-grid">'+
'<article class="edu-lesson-card"><h3>1 · Entrada i sortida (paral·lelogram)</h3><p><b>ENTRADA:</b> el programa rep dades: llegir un sensor, esperar que l’usuari introdueixi un número, detectar un botó.</p><p><b>SORTIDA:</b> el programa envia resultats: mostra un número o missatge, escriu un valor en pantalla.</p><p><span class="edu-tag">ENTRADA: llegir P2</span> <span class="edu-tag">SORTIDA: mostra humitat</span></p><p>Una lectura de sensor és una <b>entrada</b>. Una comprovació amb un rombe és una <b>decisió</b>.</p></article>'+
'<article class="edu-lesson-card"><h3>2 · Variable i càlcul (rectangle)</h3><p>Una variable és una capsa amb nom i un valor. Primer la <b>creem/inicialitzem</b>, després <b>consultem</b> o <b>modifiquem</b> el seu contingut.</p><p>Exemple: <code>comptador = 0</code> i després <code>comptador = comptador + 1</code>.</p><p>Al diagrama estàndard, una assignació o una operació són un <b>procés (rectangle)</b>. El símbol «variable» de l’editor de ROBOTIA és una ajuda gràfica i funciona com un procés.</p></article>'+
'<article class="edu-lesson-card"><h3>3 · Decisió (rombe)</h3><p>Comprova una condició, com <code>Humitat &lt; 30?</code>, i separa el camí en <b>SÍ</b> i <b>NO</b>. El rombe no guarda dades ni calcula per si sol: compara i decideix.</p></article>'+
'<article class="edu-lesson-card"><h3>4 · Bucle i repetició</h3><p>En un diagrama el bucle és una <b>fletxa de retorn</b>. La variable pot canviar en cada volta; assegura’t que en algun moment la condició permet sortir del bucle.</p><p><b>Exemple:</b> mentre quedin preguntes, llegir resposta, sumar punts, tornar a preguntar.</p></article></div>');
const examples=[
{id:"counter",height:580,accessible:"Comptador: inici, comptador igual zero, entrada prémer botó A, augmentar comptador, mostrar i final",title:"Exemple A · Comptador de pulsacions",lead:"La variable comença a 0, cada pulsació d'A afegeix una unitat i després es mostra el resultat.",nodes:[
["n1","start",380,40,128,54,"INICI"],["n2","process",380,130,260,60,"comptador = 0"],["n3","io",380,230,275,60,"ENTRADA: prémer A"],["n4","process",380,330,315,65,"comptador = comptador + 1"],["n5","io",380,432,280,65,"SORTIDA: mostra comptador"],["n6","start",380,535,130,54,"FI"]],edges:[["n1","n2"],["n2","n3"],["n3","n4"],["n4","n5"],["n5","n6"]],after:"El bloc «comptador = 0» és un rectangle perquè assigna un valor. El botó és una entrada, no una decisió. És un exemple d'una sola pulsació; en un programa que escolta múltiples pulsacions, l'esdeveniment es pot repetir."},
{id:"loop",height:590,accessible:"Càlcul de suma acumulada amb entrada d'un número, suma i repetició de la lectura",title:"Exemple B · Sumar nombres en un bucle",lead:"La variable suma conserva l'acumulat. Cada entrada aporta un número nou i una decisió determina si repetim.",nodes:[
["a","start",380,38,120,53,"INICI"],["b","process",380,118,220,55,"suma = 0"],["c","io",380,210,265,62,"ENTRADA: llegir número"],["d","process",380,315,295,65,"suma = suma + número"],["e","decision",380,415,236,105,"Més números?"],["f","io",380,510,268,55,"SORTIDA: mostra suma"],["g","start",380,574,126,45,"FI"]],edges:[
["a","b"],["b","c"],["c","d"],["d","e"],
["e","c","left","left","M 262 415 L 120 415 L 120 210 L 247 210","SÍ",175,392],
["e","f","bottom","top",null,"NO",412,474],["f","g"]],after:"Quan la resposta és SÍ, la fletxa torna al bloc d'entrada. Amb NO, mostra la suma i acaba. Sense inicialitzar «suma», el resultat podria ser incorrecte."},
{id:"humidity",height:570,accessible:"Lectura de sensor, guardar humitat i condició menor que 30 amb dues sortides",title:"Exemple C · Sensor d'humitat i decisió",lead:"La lectura del sensor és una entrada; desar-la i arrodonir-la són càlculs; comparar-la amb 30 és una decisió.",nodes:[
["a","start",380,36,115,55,"INICI"],["b","io",380,125,300,65,"ENTRADA: llegir sensor P2"],["c","process",380,229,325,65,"Humitat = arrodoneix(lectura)"],["d","decision",380,340,225,107,"Humitat < 30?"],["e","process",135,465,234,66,"LED vermell"],["f","process",625,465,234,66,"LED verd"]],edges:[
["a","b"],["b","c"],["c","d"],
["d","e","left","top","M 267.5 340 L 135 340 L 135 432","SÍ",218,318],
["d","f","right","top","M 492.5 340 L 625 340 L 625 432","NO",545,318]
],after:"Exemple de llindar didàctic. Quan es treballa amb el sensor real, cal calibrar els valors i provar les dues condicions."}
];
for(const ex of examples){
 const item=document.createElement("article");item.className="edu-example";
 const h=document.createElement("h3");h.textContent=ex.title;item.append(h);
 const t=document.createElement("p");t.textContent=ex.lead;item.append(t);
 flowDiagram(item,ex);const aft=document.createElement("p");aft.className="edu-help";aft.textContent=ex.after;item.append(aft);flow.append(item);
}
markup(flow,'<p class="edu-help warning"><b>Tria el símbol correcte:</b> «llegir» i «mostrar» → entrada/sortida; «assignar» i «calcular» → procés; «és més gran?» → decisió; «repetir» → fletxa de retorn. A ROBOTIA pots provar-ho directament amb el simulador.</p>');
// MICRO:BIT
const mic=section(micro,"Guia completa de blocs MakeCode · de zero a projectes reals","Localitza cada família de blocs, entén què fa i copia exemples per provar-los al simulador o amb la placa.","edu-makecode");
markup(mic,'<p><a href="#edu-makecode-dictionary">🔎 Ves al diccionari cercable dels blocs ↓</a></p>');
markup(mic,'<div class="edu-makecode-steps"><span>1 · Obre MakeCode</span><span>2 · Tria «Blocs»</span><span>3 · Busca la categoria</span><span>4 · Crea i prova</span><span>5 · Comparteix el projecte</span></div>'+
'<p>'+link("https://makecode.microbit.org/","Obrir l’editor MakeCode")+' · '+link("https://makecode.microbit.org/blocks/variables","Guia oficial de variables")+' · '+link("https://makecode.microbit.org/blocks/loops","Guia oficial de bucles")+'</p>');
const categories=[
["Bàsic","blau","«en iniciar», «per sempre», «mostra número», «mostra icona», «pausa»","Quan vols començar, mostrar dades o executar contínuament una acció.","basic"],
["Entrada","rosa","«en prémer A/B», «en sacsejar», «llum», «temperatura», «botó premut»","Per reaccionar a una acció o llegir un sensor intern.","input"],
["LED","lila","«encén punt x,y», «apaga punt», «brillantor», «gràfic de barres»","Per controlar els 25 LEDs de la pantalla.","led"],
["Música","taronja","«toca un to», «melodia», «canvia tempo», «pausa»","Per generar sons i ritmes (segons l'altaveu o brunzidor disponible).","music"],
["Lògica","blau","«si / si no», «=», «<», «>», «i», «o», «no»","Per comparar dades, triar alternatives i combinar condicions.","blocks/logic"],
["Variables","vermell","«crea una variable», «assigna a ...», «canvia ... per», «valor de...»","Per guardar un valor i tornar-lo a usar o modificar.","blocks/variables"],
["Bucles","verd","«repeteix N vegades», «per a ... de ... a ...», «mentre»","Per executar diverses vegades les mateixes ordres.","blocks/loops"],
["Matemàtiques","lila","«+», «−», «×», «÷», «arrodoneix», «aleatori», «resta»","Per operar amb nombres, decidir llindars o generar atzar.","math"],
["Ràdio","rosa","«estableix grup», «envia número/text», «quan es rep»","Per comunicar dues micro:bit amb el mateix grup.","radio"],
["Pins","avançat","«llegeix pin digital», «llegeix pin analògic», «escriu pin digital», «servo»","Per llegir sensors externs i controlar senyals als connectors.","pins"],
["Serial","avançat","«escriu línia», «escriu número», «redirecciona USB»","Per enviar lectures a l'ordinador i registrar dades.","serial"],
["Joc","avançat","«crea sprite», «mou», «puntuació», «temps»","Per fer minijocs amb la matriu LED.","game"],
["Funcions","avançat","«crear funció», «cridar funció»","Per dividir un programa llarg en accions reutilitzables.",""],
["Llistes / arrays","avançat","«crear array», «afegir element», «obtenir element»","Per desar diversos valors en una mateixa estructura.",""],
["Extensions","mòduls externs","«tinker-kit», «NeoPixel», «microshield», «Sonar» segons el material","Per incorporar els blocs específics del kit de sensors i actuadors.",""]];
const wrap=markup(mic,'<h3>Diccionari de categories de blocs</h3><p>Obre cada apartat per veure blocs típics, quan convé usar-los i la documentació.</p><div class="edu-block-list" id="edu-block-catalog"></div>');
const catalog=wrap.querySelector("#edu-block-catalog");
categories.forEach(([name,color,blocks,purpose,path])=>{
 const d=document.createElement("details");
 const sum=document.createElement("summary");sum.textContent=name+" · "+color;d.append(sum);
 const p=document.createElement("p");p.textContent=purpose;d.append(p);
 const b=document.createElement("p");b.innerHTML="<strong>Blocs habituals:</strong> "+blocks;d.append(b);
 if(path){const a=document.createElement("p"),href=path.startsWith("blocks/")?doc+path:doc+"reference/"+path;a.innerHTML=link(href,"Veure blocs oficials");d.append(a)}
 else{const info=document.createElement("p");info.textContent="A MakeCode: desplega «Avançat» o «Extensions» per localitzar aquesta família.";d.append(info)}
 catalog.append(d);
});
markup(mic,'<div class="edu-lesson-grid">'+
'<article class="edu-lesson-card"><h3>Variable: crear, assignar, llegir i canviar</h3><ol><li>Variables → <b>Crear una variable</b> → posa-li «comptador».</li><li>Dins «en iniciar»: <b>assigna comptador a 0</b>.</li><li>Dins «en prémer botó A»: <b>canvia comptador en 1</b>.</li><li>Per mostrar-la: <b>mostra número [comptador]</b>.</li><li>Amb B pots fer <b>canvia comptador en -1</b>.</li></ol><p><b>Important:</b> «assigna ... a 1» substitueix el valor; «canvia ... en 1» el suma al valor que tenia.</p></article>'+
'<article class="edu-lesson-card"><h3>Bucles: «per sempre» no és «repeteix»</h3><p><b>Per sempre:</b> el contingut s’executa contínuament.</p><p><b>Repeteix 4 vegades:</b> es fa quatre cops i després acaba.</p><p><b>Per a índex de 0 a 4:</b> repeteix cinc vegades i pots usar «índex».</p><p><b>Mentre condició:</b> repeteix només mentre la condició sigui certa. Si la condició no canvia, el programa pot quedar en un bucle infinit.</p></article>'+
'<article class="edu-lesson-card"><h3>Esdeveniment o lectura contínua?</h3><p>«En prémer A» és un <b>esdeveniment</b>: el codi s’executa quan passa. «Botó A està premut?» és una <b>condició</b> que pots consultar dins «si» o «mentre».</p><p>«Nivell de llum» retorna un <b>valor</b> que pots guardar en una variable, comparar o mostrar.</p></article>'+
'<article class="edu-lesson-card"><h3>Condicions i matemàtiques</h3><p>Exemple: <code>si temperatura &gt; 28</code> encén una alarma; si no, mostra una icona correcta. Per rangs, combina dues comparacions amb <b>i</b>.</p><p>Exemple: <code>humitat &gt;= 30 i humitat &lt;= 60</code>.</p></article></div>');
const practicals=[
{name:"Comptador amb A i B",sub:"Variable + esdeveniments + pantalla",code:"let comptador = 0\ninput.onButtonPressed(Button.A, function () {\n    comptador += 1\n    basic.showNumber(comptador)\n})\ninput.onButtonPressed(Button.B, function () {\n    comptador += -1\n    basic.showNumber(comptador)\n})",steps:"Assigna comptador = 0 → en prémer A, canvia +1 i mostra → en prémer B, canvia −1 i mostra.",test:"Prem A tres cops: mostra 3. Prem B: mostra 2."},
{name:"Repeteix exactament 4 cops",sub:"Bucle de repeticions fixes",code:"for (let i = 0; i < 4; i++) {\n    basic.showIcon(IconNames.Heart)\n    basic.pause(300)\n    basic.clearScreen()\n    basic.pause(300)\n}",steps:"Bucles → «repeteix 4 vegades»; a dins, mostra un cor → pausa 300 ms → neteja pantalla → pausa 300 ms.",test:"El cor apareix exactament 4 vegades i després s'atura."},
{name:"Variable índex en un bucle",sub:"Per a… de 0 a 4",code:"for (let index = 0; index <= 4; index++) {\n    basic.showNumber(index)\n    basic.pause(500)\n}",steps:"Bucles → «per a índex de 0 a 4»; a dins, «mostra número índex» i pausa.",test:"La pantalla mostra 0, 1, 2, 3 i 4. Són cinc valors."},
{name:"Mentre: comptar fins a 5",sub:"Comparació i variable que canvia",code:"let n = 0\nwhile (n < 5) {\n    basic.showNumber(n)\n    n += 1\n    basic.pause(350)\n}",steps:"Assigna n = 0; «mentre n < 5»: mostra n → canvia n en 1 → pausa.",test:"Mostra 0, 1, 2, 3 i 4; s'atura quan n val 5."},
{name:"Alerta per temperatura",sub:"Entrada de sensor + condició",code:"basic.forever(function () {\n    let temperatura = input.temperature()\n    if (temperatura > 28) {\n        basic.showIcon(IconNames.Sad)\n    } else {\n        basic.showIcon(IconNames.Happy)\n    }\n    basic.pause(1000)\n})",steps:"Dins «per sempre», assigna la lectura de temperatura a una variable. Si temperatura > 28 mostra cara trista; si no, cara contenta.",test:"Prova les temperatures en el simulador. La lectura interna és aproximada, no una sonda externa."},
{name:"Comunicar 2 micro:bit",sub:"Ràdio + esdeveniment + receptor",code:"radio.setGroup(7)\ninput.onButtonPressed(Button.A, function () {\n    radio.sendNumber(1)\n})\nradio.onReceivedNumber(function (receivedNumber) {\n    basic.showNumber(receivedNumber)\n})",steps:"Emissor i receptor utilitzen grup 7. L'emissor envia 1 en prémer A; al receptor, quan es rep el nombre, el mostra.",test:"Amb dues micro:bit, separa en dos programes: emissor i receptor. Aquest codi combinat és un exemple didàctic dels dos esdeveniments."}
];
const samples=markup(mic,'<h3>Exemples complets per copiar a MakeCode</h3><p>Prem «Copiar codi», obre MakeCode, canvia a «JavaScript» i enganxa’l. Pots tornar a «Blocs» quan el programa és compatible.</p><div id="edu-makecode-practicals"></div>').querySelector("#edu-makecode-practicals");
practicals.forEach((x,i)=>{
 const d=document.createElement("article");d.className="edu-example";
 const h=document.createElement("h3");h.textContent=(i+1)+". "+x.name;d.append(h);
 const small=document.createElement("p");small.className="edu-tag";small.textContent=x.sub;d.append(small);
 const p=document.createElement("p");p.innerHTML="<b>Blocs en ordre: </b>"+x.steps;d.append(p);
 const pre=document.createElement("pre");pre.className="edu-code";pre.textContent=x.code;d.append(pre);
 const bar=document.createElement("div");bar.className="edu-examples-toolbar";
 const button=document.createElement("button");button.type="button";button.className="edu-copy";button.dataset.example=i;button.textContent="Copiar codi";
 const status=document.createElement("span");status.className="edu-copy-status";status.setAttribute("role","status");
 bar.append(button,status);const a=document.createElement("a");a.href=doc;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Obrir MakeCode ↗";bar.append(a);
 d.append(bar);
 const info=document.createElement("p");info.className="edu-help";info.textContent="Comprova-ho: "+x.test;d.append(info);samples.append(d);
});
samples.addEventListener("click",async e=>{
 const button=e.target.closest("[data-example]");if(!button)return;
 const index=Number(button.dataset.example);if(!Number.isInteger(index)||!practicals[index])return;
 const status=button.parentElement.querySelector(".edu-copy-status");
 try{await navigator.clipboard.writeText(practicals[index].code);status.textContent="✓ Copiat";}catch{status.textContent="Selecciona i copia el codi manualment si el navegador ho bloqueja."}
});
markup(mic,'<p class="edu-help warning"><b>Per entregar:</b> a MakeCode prem «Compartir» i copia l’enllaç del projecte, no l’adreça genèrica <code>#editor</code>. Desa’l al repte de ROBOTIA i comprova que es sincronitza.</p>');
// MICRO:SHIELD - three real basic challenges from the centre PDF.
const sen=section(sensors,"Microshield i sensors · Material real del centre","Guia actualitzada segons la fitxa visual del kit de Secundària (04/11/2026). Els reptes es troben a «Reptes → Sensors i actuadors», amb els mateixos punts i cotes que la resta de ROBOTIA.","edu-microshield");
markup(sen,'<div class="edu-help warning"><b>Connexions:</b> comprova G/V/S amb el circuit apagat. P1 i S1 comparteixen pin, igual que P8 i S8. Els connectors blaus P12–P15/P19/P20 comparteixen el selector 3V3/5V, però seleccionar 5V NO adapta cap senyal de 5V a 3,3V. El sensor HC-SR04 requereix reductor de tensió a ECHO.</div>');
markup(sen,'<div class="edu-checks">'+
'<div><b>Col·lisió KS0021</b><p>Digital P1, 3,3 V. Llegeix <b>0 quan es prem</b> i 1 quan està lliure.</p></div>'+
'<div><b>PIR KS0052</b><p>Digital P2, 3,3 V. Retorna 1 amb moviment. Espera l’estabilització.</p></div>'+
'<div><b>Llum TEMT6000</b><p>Analògic P0, 3,3 V. Posa el selector P0/BUZZER a P0.</p></div>'+
'<div><b>Humitat de terra</b><p>Analògic P0, només si el mòdul admet 3,3 V. Cal calibrar.</p></div>'+
'<div><b>Pantalla OLED KS0271</b><p>I²C: SCL=P19, SDA=P20, VCC 3,3 V. Selector blau a 3V3.</p></div>'+
'<div><b>4 LED RGB integrats</b><p>NeoPixel al P16 intern, sense cables ni tira externa.</p></div></div>');
markup(sen,'<h3>Abans de fer els reptes avançats</h3><div class="edu-checks">'+
'<div><b>Servo</b><p>S8 (= P8) amb alimentació nominal 4,8–6 V adequada, comprova-la.</p></div>'+
'<div><b>Motors DC</b><p>M3/M4, necessiten adaptador JST i tornavís. Reserven P4–P7.</p></div>'+
'<div><b>Ultrasons HC-SR04</b><p>5 V; TRIG P14, ECHO P15 amb adaptació 5→3,3 V.</p></div>'+
'<div><b>Seguidors de línia</b><p>5 V TTL; un adaptador de nivell per cadascun dels tres sensors.</p></div>'+
'<div><b>Tira de 30 LED</b><p>Cable corrector del kit i font de 5 V amb potència adequada.</p></div>'+
'<div><b>LM35</b><p>Verifica alimentació i nivell del senyal abans de connectar-lo a P0.</p></div></div>');
const sensorQuickIds=["s20","s25","s29","s1","s3","s35","s53","s54","s55"];
const sensorsModule=window.ROBOTIA_SENSORS_V4||{};
const sensorRecipes=markup(sen,'<h3>Començar per reptes senzills i avançar</h3><p>Aquesta selecció t’indica com connectar els components, programar els blocs i comprovar-los. A la secció «Reptes» hi trobaràs tota la bateria d’exercicis i el formulari d’entrega.</p><div id="edu-sensor-recipes"></div>').querySelector("#edu-sensor-recipes");
for(const id of sensorQuickIds){
 const item=sensorsModule.revisions?.[id]||sensorsModule.additions?.find(x=>x.id===id);
 const guide=window.ROBOTIA_REPTE_GUIDES?.[id];if(!item||!guide)continue;
 const details=document.createElement("details");details.className="edu-kit-card";details.open=id==="s20";
 const title=document.createElement("summary");title.textContent=item.title;
 const sub=document.createElement("small");sub.textContent="+"+item.points+" punts · cota "+item.maxNote+" · "+(guide.materialStatus||"");title.append(sub);details.append(title);
 const body=document.createElement("div");body.className="body";
 const m=document.createElement("p");m.textContent="Materials: "+guide.materials;body.append(m);
 const ol=document.createElement("ol");guide.steps.forEach(s=>{const li=document.createElement("li");li.textContent=s;ol.append(li)});body.append(ol);
 const safety=document.createElement("p");safety.className="edu-help warning";safety.textContent="Atenció: "+guide.safety;body.append(safety);
 const footer=document.createElement("p");footer.textContent="Per fer i entregar aquest repte, obre «Reptes → Sensors i actuadors» i selecciona "+id+".";body.append(footer);
 details.append(body);sensorRecipes.append(details);
}
markup(sen,'<div class="edu-help"><b>Nota de Sensors i actuadors:</b> la nota potencial és el mínim entre els punts sumats i la cota màxima del repte més alt entregat. El docent pot concedir punts parcials en funció del funcionament. També tens tres opcions lliures: sensor propi (+2), actuador propi (+2) i projecte integrat de domini (+8, cota 10).</div>');
markup(sen,'<p>'+link("https://makecode.microbit.org/","MakeCode")+' · '+link("https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf","Manual de Microshield")+' · '+link("https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield","Extensió micro:shield")+'</p>');
})();