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
 parent.append(root);return root;
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
'<article class="edu-lesson-card"><h3>Esdeveniment o lectura contínua?</h3><p>«En prémer A» és un <b>esdeveniment</b>: el codi s'executa quan passa. «Botó A està premut?» és una <b>condició</b> que pots consultar dins «si» o «mentre».</p><p>«Nivell de llum» retorna un <b>valor</b> que pots guardar en una variable, comparar o mostrar.</p></article>'+
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
const sen=section(sensors,"Conjunt de sensors i actuadors 1 · Secundària bàsic (Micro:Shield)","Tutorials del material del centre basats en els reptes originals: detector PIR, control d'humitat i barrera automàtica. Comença pel primer nivell i avança quan domini les connexions.","edu-microshield");
markup(sen,'<div class="edu-kit-chip"><span>🧩 micro:bit + Micro:Shield</span><span>🔌 G = GND · V = alimentació · S = senyal</span><span>🧑‍🏫 Comprova el connector abans d’endollar</span></div>'+
'<div class="edu-help warning"><b>Abans de connectar:</b> apaga l’alimentació, identifica la filera GVS adequada, comprova el GND i la tensió admissible de cada mòdul. Els ports de servo i motor no són intercanviables amb els de sensors. Si un sensor d’ultrasons necessita 5 V, verifica la compatibilitat del senyal ECHO amb la micro:bit; no connectis directament una sortida de 5 V a un pin de 3,3 V sense adaptació.</div>');
const kit=[
{level:"Nivell I",name:"Detector de moviment (PIR + NeoPixel)",sub:"Guia bàsica · pàgines 1–4",parts:"Micro:Shield, micro:bit, sensor PIR, tira de 10 LED NeoPixel, cables.",pins:"Sensor PIR al pin P1; tira NeoPixel de 10 LED al pin P8 (connectors GVS compatibles).",ext:"tinker-kit i NeoPixel",steps:[
"Connecta la micro:bit a la Micro:Shield apagada i identifica G, V i S.",
"Connecta la tira NeoPixel de 10 LED al GVS P8 i el PIR al GVS P1, amb GND correcte.",
"A MakeCode, «Extensions» → afegeix «tinker-kit» i «NeoPixel».",
"En «en iniciar» configura la tira de 10 NeoPixel al pin P8.",
"Dins «per sempre», afegeix «si / si no» de Lògica.",
"A «si», col·loca «motion detector» del PIR configurat al pin P1.",
"Si detecta moviment → NeoPixel «show color» vermell; si no → verd.",
"Descarrega el programa, prova un moviment i després queda't quiet per comprovar el canvi."],
algo:"EN INICIAR → NeoPixel: tira de 10 LED al P8\nPER SEMPRE → SI motion detector(P1)\n  SÍ: NeoPixel vermell\n  NO: NeoPixel verd",
check:"Ha d'alternar entre vermell i verd quan el PIR detecta moviment o deixa de detectar-lo.",extra:"Repte extra: posa una pausa, afegeix una alerta sonora o compta moviments amb una variable."},
{level:"Nivell II",name:"Control d'humitat (variable i llindars)",sub:"Guia bàsica · pàgines 5–10",parts:"Micro:Shield, micro:bit, sensor d'humitat, tira de 10 LED NeoPixel.",pins:"Sensor d'humitat al pin P2; tira NeoPixel al P8 (exemples del dossier).",ext:"tinker-kit i NeoPixel",steps:[
"Connecta el sensor al pin P2 i NeoPixel (10 LED) al P8, amb GND i alimentació correctes.",
"Afegeix les extensions «tinker-kit» i «NeoPixel».",
"Crea la variable «Humitat» a Variables → Crear una variable.",
"En «en iniciar»: «assigna Humitat a 0» i configura els NeoPixel del P8.",
"En «per sempre»: «assigna Humitat a arrodoneix(value of moisture sensor P2)».",
"Mostra el valor de la variable per saber què retorna el sensor; prova en sec i en humit.",
"Afegeix «si / si no, si / si no» i compara Humitat amb els llindars 30 i 60.",
"Tria tres colors NeoPixel (per exemple vermell baix, groc intermedi i verd alt).",
"Afegeix «pausa 1000 ms» (1 segon) perquè les lectures no es repeteixin massa ràpid."],
algo:"EN INICIAR → Humitat = 0; NeoPixel = 10 LED al P8\nPER SEMPRE → Humitat = arrodoneix(sensor P2)\nSI Humitat < 30 → vermell\nSI NO, SI Humitat <= 60 → groc\nSI NO → verd\nPAUSA 1000 ms",
check:"En variar la lectura, els colors canvien segons els tres intervals. Els valors 30 i 60 són exemples del dossier: cal calibrar el sensor.",extra:"Repte extra: calcula i mostra el màxim de les lectures amb una segona variable."},
{level:"Nivell III",name:"Barrera automàtica (ultrasons + servo)",sub:"Guia bàsica · pàgines 11–19",parts:"Micro:Shield, micro:bit, sensor d'ultrasons de 4 fils, servomotor i barrera lleugera.",pins:"Exemple de la guia: senyals TRIG i ECHO al P7 i P8, correctament assignats al bloc de lectura; servo al connector S2.",ext:"microshield (inclou els blocs Sonar segons el dossier)",steps:[
"Apaga la Micro:Shield i localitza GND, VCC, TRIG, ECHO del sensor d'ultrasons.",
"Connecta GND i l'alimentació segons el mòdul; TRIG i ECHO als pins de senyal triats, per exemple P7 i P8 com indica el dossier.",
"Connecta el servomotor al connector S2, respectant GND, alimentació i senyal.",
"Afegeix l'extensió «microshield» a MakeCode, que en el dossier incorpora «Sonar».",
"En «en iniciar», posa el servo a la posició inicial de 0°.",
"En «per sempre», mesura la distància amb Sonar (centímetres) i «mostra número».",
"Afegeix «si distància < 10», amb el servo al pin S2 que es mou fins a 90°.",
"Fes una pausa d'uns 1000 ms (1 segon) i retorna el servo a 0°.",
"Comprova primer el moviment sense la barrera; ajusta els angles i després munta-la."],
algo:"EN INICIAR → servo S2 = 0°\nPER SEMPRE → distància = Sonar(TRIG, ECHO, cm)\nMOSTRA distància\nSI distància < 10 → servo S2 = 90°\nPAUSA 1000 ms; servo S2 = 0°",
check:"El servo obre la barrera quan detecta un obstacle a menys de 10 cm i torna a la posició inicial. Revisa si la repetició provoca moviment continu.",extra:"Repte extra: guarda Distància en una variable per no mesurar dues vegades cada volta, o limita la reactivació fins que l'objecte s'allunyi."}
];
kit.forEach((x,i)=>{
 const card=document.createElement("details");card.className="edu-kit-card";
 card.open=i===0;
 const title=document.createElement("summary");title.textContent=x.level+" · "+x.name;
 const subt=document.createElement("small");subt.textContent=x.sub;title.append(subt);card.append(title);
 const body=document.createElement("div");body.className="body";
 const p1=document.createElement("p");p1.innerHTML="<strong>Material:</strong> "+x.parts+"<br><strong>Connexions:</strong> "+x.pins+"<br><strong>Extensions MakeCode:</strong> "+x.ext;body.append(p1);
 const h=document.createElement("h3");h.textContent="Passos pas a pas";body.append(h);
 const ol=document.createElement("ol");x.steps.forEach(s=>{const li=document.createElement("li");li.textContent=s;ol.append(li)});body.append(ol);
 const h2=document.createElement("h3");h2.textContent="Algoritme per construir amb blocs";body.append(h2);
 const pre=document.createElement("pre");pre.className="edu-pseudocode";pre.textContent=x.algo;body.append(pre);
 const ver=document.createElement("p");ver.className="edu-help";ver.textContent="Comprova-ho: "+x.check;body.append(ver);
 const bonus=document.createElement("p");bonus.textContent=x.extra;body.append(bonus);
 const links=document.createElement("p");links.innerHTML=link(doc,"Programar a MakeCode")+" · "+link("https://projectes.xtec.cat/digital/equipaments-i-infraestructures/robotica/formacio-tecnica-robotica/components-i-accessoris/microshield/","Micro:Shield · documentació XTEC");body.append(links);
 card.append(body);sen.append(card);
});
markup(sen,'<article class="edu-example"><h3>Com reconèixer els blocs que necessites</h3><div class="edu-checks"><div><b>Entrada</b><p>«motion detector», «moisture sensor» i «Sonar» llegeixen informació externa.</p></div><div><b>Variables i lògica</b><p>Guarda Humitat i Distància; compara el valor amb 30, 60 o 10.</p></div><div><b>Sortides i actuadors</b><p>«show color» posa colors als NeoPixel i «Servo» mou la barrera.</p></div></div><p class="edu-help"><b>Què entregar a ROBOTIA:</b> enllaç del projecte MakeCode compartit, fotografia del muntatge i una frase explicant quan s'activa cada sortida. Si es treballa en parella, identifica els participants i segueix el sistema d'invitacions.</p></article>');
})();