/* ROBOTIA · Diccionari de blocs essencials de Microsoft MakeCode,
   per a 3r ESO. No interactua amb els portafolis ni les notes. */
(function(){
"use strict";
const host=document.getElementById("learn-microbit");if(!host)return;
const groups=[
["Bàsic","https://makecode.microbit.org/reference/basic",[
["en iniciar","Fa les accions inicials només una vegada en engegar.","Posar comptador a 0."],
["per sempre","Executa contínuament les accions que conté.","Mesurar llum un cop per segon."],
["mostra número","Mostra un valor numèric a la matriu LED.","Mostra la variable Punts."],
["mostra cadena","Desplaça text per la pantalla.","Mostra «Hola!»."],
["mostra icona","Dibuixa una icona predefinida.","Mostra un cor."],
["mostra LEDs","Dibuixa manualment els 25 punts de la matriu.","Dibuixa una fletxa."],
["neteja la pantalla","Apaga la matriu LED.","Esborra el número anterior."],
["pausa (ms)","Espera el nombre de mil·lisegons indicat.","1000 ms = 1 segon."],
["mostra fletxa","Dibuixa una fletxa de direcció.","Indica el gir del robot."]]],
["Entrada","https://makecode.microbit.org/reference/input",[
["en prémer botó A/B","Executa una acció en produir-se l'esdeveniment.","A suma 1 al comptador."],
["botó A/B està premut?","Retorna cert o fals segons l'estat actual.","Mentre B estigui premut, mostra el número."],
["en sacsejar / en inclinar","Reacciona a moviments detectats.","En sacsejar, envia un missatge per ràdio."],
["l'acceleració","Mesura acceleració als eixos X/Y/Z.","Detecta un canvi de moviment."],
["rotació","Consulta la inclinació de la placa.","Mou un sprite quan inclines la micro:bit."],
["nivell de llum","Retorna la llum detectada per la matriu LED.","Si llum < 50, encén una icona."],
["temperatura","Retorna una estimació de temperatura interna.","Si temperatura > 28, avís."],
["rumb de la brúixola","Retorna un angle de direcció.","Mostra fletxa segons els graus."],
["en prémer pin tàctil","Reacciona al contacte d'un pin tàctil.","P0 toca una nota quan el sensor tàctil s'activa."],
["temps d'execució","Mil·lisegons des de l'inici del programa.","Calcula quant ha tardat una resposta."]]],
["Variables","https://makecode.microbit.org/blocks/variables",[
["crear una variable","Dona nom a una dada que es guardarà.","Crea «Distància»."],
["assigna a variable un valor","Canvia tot el contingut pel valor indicat.","Humitat = 0."],
["canvia variable en N","Suma N al valor actual (N negatiu resta).","Punts += 1."],
["obtenir valor de variable","Utilitza el valor que tens guardat.","Mostra Punts; compara Humitat < 30."]]],
["Bucles","https://makecode.microbit.org/blocks/loops",[
["repeteix N vegades","Repeteix les ordres un nombre fix de cops.","Fes parpellejar el cor 4 cops."],
["per a índex de 0 a N","Recorre una sèrie de nombres fent variar índex.","Mostra els nombres del 0 al 4."],
["mentre condició","Repeteix mentre la condició sigui certa.","Mentre n < 5, suma 1."],
["per a cada element de llista","Processa els elements d'una llista.","Mostra cada nota musical de la llista."],
["cada N mil·lisegons","Executa periòdicament un bloc.","Cada 500 ms, actualitza una lectura."]]],
["Lògica","https://makecode.microbit.org/blocks/logic",[
["si","Executa les accions quan la condició és certa.","Si llum < 30, encén LED."],
["si / si no","Ofereix una acció alternativa.","Si PIR detecta, vermell; si no, verd."],
["si no, si","Permet comparar diferents rangs.","Humitat < 30, <= 60, > 60."],
["=, <, >, <=, >=","Comparen valors i retornen cert o fals.","Distància < 10."],
["i","Exigeix que dues condicions siguin certes.","Humitat >= 30 i <= 60."],
["o","N'hi ha prou amb una de dues condicions.","A està premut o B està premut."],
["no","Inverteix cert/fals.","Mentre no estigui premut A."],
["cert / fals","Valors booleans usats en condicions.","alarmaActivada = cert."]]],
["Matemàtiques","https://makecode.microbit.org/reference/math",[
["número","Valor numèric utilitzable per altres blocs.","30."],
["sumar (+)","Calcula una suma.","punts + 1."],
["restar (−)","Calcula una diferència.","tempsRestant − 1."],
["multiplicar (×)","Calcula un producte.","distància × 2."],
["dividir (÷)","Calcula un quocient.","suma / nombreLectures."],
["resta de divisió (%)","Retorna el residu.","index % 2 és 0 per als parells."],
["arrodoneix","Converteix un decimal al sencer proper.","Humitat = arrodoneix(lectura)."],
["número aleatori","Tria un nombre a l'atzar dins un interval.","Dau entre 1 i 6."],
["mínim / màxim","Troba el menor o el major de dos valors.","Mostra el màxim de temperatura."],
["valor absolut","Ignora el signe d'un nombre.","abs(diferència) > 5."]]],
["Música","https://makecode.microbit.org/reference/music",[
["toca un to","Reprodueix una freqüència musical.","Toca 440 Hz."],
["toca melodia","Reprodueix una seqüència de notes.","Fes sonar una melodia curta."],
["canvia tempo","Augmenta o redueix la velocitat musical.","Canvia BPM en 20."],
["estableix tempo","Fixa la velocitat de la música.","Tempo 120 BPM."],
["pausa musical","Introdueix un silenci dins la melodia.","Descansa mig temps."]]],
["LED","https://makecode.microbit.org/reference/led",[
["encén punt (x,y)","Encén un LED concret de la matriu.","x=2, y=2: LED central."],
["apaga punt (x,y)","Apaga un LED concret.","Apaga l'element que s'acaba de moure."],
["punt (x,y) encès?","Comprova l'estat d'un LED.","Si és encès, apaga'l."],
["canvia brillantor","Ajusta la llum de la pantalla.","Baixa la brillantor per estalviar."],
["gràfic de barres","Representa un valor amb diverses llums.","Mostra la humitat en barres."],
["commuta punt","Canvia l'estat d'un LED.","Parpelleig en una posició."]]],
["Ràdio","https://makecode.microbit.org/reference/radio",[
["estableix grup","Configura el grup de comunicació.","Les dues plaques al grup 7."],
["envia número","Transmet un nombre.","A envia 1."],
["envia cadena","Transmet un text.","A envia «OBRE»."],
["envia valor amb nom","Envia una etiqueta i un número.","Envia Humitat=43."],
["en rebre número","Reacciona a una dada numèrica entrant.","Si reps 1, mostra cor."],
["en rebre cadena","Reacciona a un text entrant.","Si reps «STOP», atura motors."],
["intensitat de senyal rebut","Ajuda a estimar com arriba el senyal.","Distingir proximitat aproximada."],
["potència de transmissió","Configura la potència del senyal.","Ajustar abast de les proves."]]],
["Pins","https://makecode.microbit.org/reference/pins",[
["llegeix pin digital","Llegeix 0 o 1 d'una entrada digital.","Consultar un sensor activat."],
["escriu pin digital","Estableix 0 o 1 en un pin.","Encendre un mòdul LED amb 1."],
["llegeix pin analògic","Llegeix un valor variable del sensor.","Mesurar la sortida analògica d'un sensor compatible."],
["escriu pin analògic","Genera una sortida PWM compatible.","Regular la intensitat d'un LED adequat."],
["servo escriu pin","Controla la posició d'un servo compatible.","Servo a 90°."],
["mapa (map)","Transforma un valor d'un rang a un altre.","0–1023 a 0–180 graus."],
["durada de pols","Mesura la durada d'una pulsació elèctrica.","Temps de resposta d'un sensor."],
["I²C llegeix nombre","Intercanvia dades amb dispositius I²C.","Llegir mòdul digital específic."],
["I²C escriu nombre","Envia dades a un dispositiu I²C.","Configurar un sensor digital."],
["configura resistència pull","Defineix resistències internes en determinats pins.","Estabilitza una entrada compatible."]]],
["Serial","https://makecode.microbit.org/reference/serial",[
["escriu línia","Envia text per port sèrie.","Envia «Inici lectura»."],
["escriu número","Envia una lectura numèrica.","Monitoritza Humitat."],
["escriu valor","Envia nom + valor.","Distància: 14."],
["llegeix línia","Rep dades des de la connexió sèrie.","Llegeix una ordre de l'ordinador."],
["redirecciona USB","Indica que la comunicació es fa per USB.","Mostrar lectures a la consola sèrie."]]],
["Joc","https://makecode.microbit.org/reference/game",[
["crea sprite","Crea un punt/element de joc.","Nau que es mou per pantalla."],
["mou sprite","Desplaça un punt.","Mou 1 casella cap a la dreta."],
["gira sprite","Canvia la direcció.","Gira 90 graus."],
["puntuació","Consulta o canvia punts de la partida.","Suma 1 per cada encert."],
["compte enrere","Inicia un temps limitat.","Tens 20 segons per reaccionar."]]],
["Extensions del centre","https://projectes.xtec.cat/digital/equipaments-i-infraestructures/robotica/formacio-tecnica-robotica/components-i-accessoris/microshield/",[
["tinker-kit · motion detector","Llegeix si el sensor PIR detecta moviment.","PIR P1 → si es mou, llums vermells."],
["tinker-kit · moisture sensor","Retorna la lectura del sensor d'humitat.","Sensor P2 → variable Humitat."],
["NeoPixel · crear tira","Configura el nombre de LEDs i el pin.","10 NeoPixel al P8."],
["NeoPixel · show color","Encén la tira del color indicat.","Humitat baixa → vermell."],
["microshield · Servo","Mou un servo connectat al port correcte.","Servo S2 a 90°."],
["Sonar · llegir distància","Mesura ultrasons en cm segons TRIG i ECHO.","P7/P8 → distància < 10 cm."]]]
];
const root=document.createElement("section");root.className="edu-more";root.id="edu-makecode-dictionary";
const h=document.createElement("h2");h.textContent="Diccionari de blocs MakeCode · cerca i exemples";root.append(h);
const p=document.createElement("p");p.className="intro";p.textContent="Consulta què fa cada bloc dels principals grups de MakeCode, quan usar-lo i un exemple senzill. Per veure les variants i blocs addicionals que es puguin incorporar en noves versions, obre la documentació oficial de cada categoria.";root.append(p);
const input=document.createElement("input");input.type="search";input.placeholder="Cerca: variable, bucle, sensor, ràdio, servo…";input.setAttribute("aria-label","Cercar blocs del diccionari");
input.style.cssText="width:100%;max-width:560px;padding:12px;border:1px solid #bccfe3;border-radius:9px;margin:9px 0 14px;font:inherit";root.append(input);
const status=document.createElement("p");status.style.fontSize="13px";status.setAttribute("role","status");root.append(status);
const box=document.createElement("div");box.className="edu-block-list";root.append(box);
let count=0;const entries=[];
groups.forEach(([group,url,blocks])=>{
 const card=document.createElement("details");card.className="edu-dictionary-category";card.style.background="#fff";
 const summary=document.createElement("summary");summary.textContent=group+" ("+blocks.length+" blocs)";card.append(summary);
 const link=document.createElement("a");link.href=url;link.textContent="Documentació oficial ↗";link.target="_blank";link.rel="noopener noreferrer";link.style.cssText="display:inline-block;margin:8px 0;font-size:13px;color:#1d4ed8";card.append(link);
 const list=document.createElement("div");list.style.cssText="display:grid;gap:7px";
 blocks.forEach(([label,desc,example])=>{
  count++;
  const item=document.createElement("article");item.style.cssText="border:1px solid #dee7f2;border-radius:8px;padding:9px 11px";
  const title=document.createElement("strong");title.textContent=label;title.style.fontSize="14px";item.append(title);
  const what=document.createElement("p");what.textContent=desc;what.style.margin="4px 0";item.append(what);
  const how=document.createElement("p");how.textContent="Exemple: "+example;how.style.margin="4px 0";how.style.fontSize="12px";item.append(how);
  list.append(item);entries.push({item,card,term:[label,desc,example,group].join(" ").toLocaleLowerCase("ca")});
 });
 card.append(list);box.append(card);
});
function filter(){
 const q=input.value.toLocaleLowerCase("ca").trim();
 let visible=0;
 box.querySelectorAll("details").forEach(card=>card.hidden=true);
 for(const row of entries){
  const matched=!q||row.term.includes(q);row.item.hidden=!matched;
  if(matched){row.card.hidden=false;visible++}
 }
 if(q)box.querySelectorAll("details:not([hidden])").forEach(card=>card.open=true);
 status.textContent=visible+" blocs disponibles"+(q?" per a la cerca":" en "+groups.length+" famílies")+".";
}
input.addEventListener("input",filter);
const style=document.createElement("style");style.textContent=".edu-dictionary-category[hidden],.edu-dictionary-category article[hidden]{display:none!important}.edu-dictionary-category summary{font-size:14px;font-weight:800;cursor:pointer;color:#19496c}.edu-dictionary-category article p{line-height:1.5}";document.head.append(style);
filter();host.append(root);
})();