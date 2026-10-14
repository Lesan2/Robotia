(function initLessonsV3(){
"use strict";
const $=s=>document.querySelector(s);
const learn=$("#viewLearn");
if(!learn)return;
const head=learn.querySelector(".section-head"),grid=learn.querySelector(".learn-grid"),rules=learn.querySelector(".rules-card");
const initial=document.createElement("section");initial.id="learn-flux";initial.className="learn-pane";
initial.append(grid,rules);
const nav=document.createElement("nav");nav.className="learn-v3-tabs";
const cats=[["flux","◇ Diagrames de flux"],["microbit","▦ Programació micro:bit"],["sensors","⚙ Sensors i actuadors"],["robot","🤖 Projecte final"]];
nav.innerHTML=cats.map(([id,name],i)=>`<button type="button" data-learning="${id}" class="${i?"":"active"}">${name}</button>`).join("");
head.querySelector("h1").textContent="Aprèn programació i robòtica";
head.after(nav);nav.after(initial);
const art=document.createElement("article");art.className="card diagram-example";
art.innerHTML=`<h2>Exemple complet i correcte: «Plou o no plou?»</h2><p>Un algoritme amb dues alternatives. Les fletxes SÍ i NO surten de la decisió i acaben connectant amb el FI.</p>
<svg viewBox="0 0 700 475" role="img" aria-label="INICI, decisió Plou?, si plou agafa paraigua, si no surt sense paraigua, ambdós camins condueixen al FI" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrR" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#37637e"/></marker></defs>
<rect x="295" y="14" width="110" height="44" rx="22" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="350" y="41" text-anchor="middle" font-size="18">INICI</text>
<path d="M350 58V100" fill="none" stroke="#37637e" stroke-width="3" marker-end="url(#arrR)"/>
<path d="M350 102L446 170L350 238L254 170Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="350" y="178" text-anchor="middle" font-size="20">Plou?</text>
<path d="M254 170H136V266" fill="none" stroke="#37637e" stroke-width="3" marker-end="url(#arrR)"/><text x="204" y="157" font-weight="700" fill="#166534">SÍ</text>
<path d="M446 170H567V266" fill="none" stroke="#37637e" stroke-width="3" marker-end="url(#arrR)"/><text x="493" y="157" font-weight="700" fill="#991b1b">NO</text>
<rect x="22" y="274" width="228" height="58" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="136" y="309" text-anchor="middle" font-size="17">Agafar paraigua</text>
<rect x="453" y="274" width="228" height="58" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="567" y="309" text-anchor="middle" font-size="16">Sortir sense paraigua</text>
<path d="M136 332V380H350" stroke="#37637e" stroke-width="3" fill="none"/><path d="M567 332V380H350" stroke="#37637e" stroke-width="3" fill="none"/>
<path d="M350 380V409" stroke="#37637e" stroke-width="3" fill="none" marker-end="url(#arrR)"/>
<rect x="295" y="417" width="110" height="44" rx="22" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="350" y="444" text-anchor="middle" font-size="18">FI</text>
</svg>
<p><b>Com llegir-lo:</b> Oval verd = inici/final; rombe groc = condició; rectangles blaus = accions. Cada branca executa només una acció i totes dues acaben correctament.</p><p><b>Prova'l tu:</b> Reptes → Diagrames de flux → «Plou o no plou?».</p>`;
initial.prepend(art);
const lessons={
microbit:`<h2>Programació amb micro:bit i MakeCode</h2><p>La micro:bit és una placa programable amb matriu de 25 LEDs, botons A/B i sensors integrats. Amb MakeCode programes arrossegant blocs.</p>
<div class="learn-topic-grid">
<article><h3>1. Primer programa</h3><p>Obre «Nou projecte» a MakeCode. Al bloc «en iniciar» posa una imatge o el teu nom. Amb «per sempre» pots repetir accions.</p><a href="https://makecode.microbit.org/" target="_blank" rel="noopener noreferrer">Obrir MakeCode ↗</a></article>
<article><h3>2. Botons A i B</h3><p>Fes que A mostri una cara contenta i B una de trista. Després afegeix melodies i canvia'n el ritme (BPM).</p><a href="https://makecode.microbit.org/reference/input" target="_blank" rel="noopener noreferrer">Entrades ↗</a></article>
<article><h3>3. Variables i repeticions</h3><p>Crea la variable «comptador». Amb A suma 1, amb B resta 1. Utilitza «per sempre» si cal comprovar condicions contínuament.</p><a href="https://makecode.microbit.org/reference/variables" target="_blank" rel="noopener noreferrer">Variables ↗</a></article>
<article><h3>4. Sensor de llum i moviment</h3><p>Prova els valors del sensor de llum, la sacsejada i la inclinació amb el simulador o amb la placa.</p><a href="https://makecode.microbit.org/reference/input" target="_blank" rel="noopener noreferrer">Sensors integrats ↗</a></article>
<article><h3>5. Dues micro:bit per ràdio</h3><p>Posa el mateix grup de ràdio als dos programes. L'emissor envia un nombre i el receptor el mostra. Desa tots dos programes.</p><a href="https://makecode.microbit.org/reference/radio" target="_blank" rel="noopener noreferrer">Ràdio ↗</a></article>
<article><h3>6. Com entregar</h3><p>Prem «Compartir» al teu projecte MakeCode. Enganxa l'enllaç propi a ROBOTIA o adjunta el <code>.hex</code>, una captura dels blocs o el codi.</p><p>L'adreça genèrica de l'editor no compta com a programa.</p></article></div>`,
sensors:`<h2>Sensors, actuadors i Micro:Shield</h2><p>El sensor <b>llegeix</b> informació. L'actuador <b>fa</b> alguna cosa: encén llums, produeix so o mou un motor.</p>
<div class="learn-topic-grid">
<article><h3>🔌 Pins i alimentació</h3><p>A les connexions GVS: G = GND (terra), V = alimentació, S = senyal. Comprova sempre si el component necessita 3,3 V o 5 V i els interruptors de la Micro:Shield.</p><a href="https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/10/Micro_shield.pdf" target="_blank" rel="noopener noreferrer">Fitxa Micro:Shield ↗</a></article>
<article><h3>👁 PIR i NeoPixel</h3><p>Exemple de la guia bàsica: connecta el PIR al P1 i 10 LED NeoPixel al P8. Extensions: tinker-kit i NeoPixel. Vermell si detecta moviment; verd si no.</p></article>
<article><h3>💧 Humitat</h3><p>Crea una variable «Humitat», llegeix el sensor i modifica el color NeoPixel segons un llindar.</p></article>
<article><h3>🚧 Barrera automàtica</h3><p>Mesura la distància amb ultrasons i obre el servo quan detecta un objecte a prop. La guia proposa 10 cm i servo al connector S2.</p></article>
<article><h3>🔊 Nivell de soroll</h3><p>Amb el micròfon, compara el nivell (0–255) amb un llindar de prova de 80: P0 LED vermell, P1 LED verd.</p></article>
<article><h3>⚙ Motors i servos</h3><p>El servo gira a un angle programat i el motor DC gira contínuament. <b>Els motors DC necessiten controlador i alimentació adequats</b>: no els connectis directament als pins de la micro:bit.</p></article></div>
<p class="lesson-references">Consulta les guies de reptes Micro:Shield de secundària i comprova les connexions amb el professor abans d'activar el muntatge.</p>`,
robot:`<h2>Construeix el robot final</h2><p>Pots triar un <b>cotxe teledirigit</b>, un <b>truc de màgia</b> o un projecte propi acordat. Els reptes previs són lliures. El projecte final és un apartat independent de l'avaluació (30%).</p>
<div class="learn-topic-grid">
<article><h3>🚗 Cotxe teledirigit</h3><p>Dues micro:bit per ràdio: una controla i l'altra rep. B = avançar; A = parar; A+B = enrere; inclinació dreta/esquerra = girar.</p></article>
<article><h3>🪄 Truc de màgia</h3><p>Una estructura creativa amaga o integra el circuit. Dues micro:bit es comuniquen per ràdio i activen almenys un actuador. Presentació grupal d'uns 5 minuts.</p></article>
<article><h3>1. Planifica</h3><p>Fes el croquis, pensa els materials, distribueix tasques i decideix què farà el robot.</p></article>
<article><h3>2. Prova per parts</h3><p>Primer prova la ràdio. Després verifica cada servo, motor i sensor abans de muntar el sistema complet.</p></article>
<article><h3>3. Construeix i millora</h3><p>Munta el xassís i el circuit. Fes proves i reserva temps per corregir errors.</p></article>
<article><h3>4. Presenta i documenta</h3><p>Entrega els programes d'emissor i receptor, fotografies o vídeo i una explicació breu del treball realitzat per cadascú.</p></article></div>`
};
for(const [name,markup] of Object.entries(lessons)){
const el=document.createElement("section");el.id="learn-"+name;el.className="learn-pane";el.hidden=true;el.innerHTML=markup;learn.append(el);
}
nav.addEventListener("click",e=>{
const button=e.target.closest("[data-learning]");if(!button)return;
const selected=button.dataset.learning;
learn.querySelectorAll(".learn-pane").forEach(p=>{p.hidden=p.id!=="learn-"+selected});
nav.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));
head.querySelector("#btnTutorialStart")?.classList.toggle("hidden",selected!=="flux");
});
const style=document.createElement("style");style.textContent=`
.learn-v3-tabs{display:flex;flex-wrap:wrap;gap:9px;margin:18px 0 22px}
.learn-v3-tabs button{border:1px solid #d2deea;background:#fff;color:#294562;border-radius:11px;padding:12px;font-size:14px;font-weight:750;cursor:pointer}
.learn-v3-tabs button.active{color:#fff;background:#16466c}
.learn-pane[hidden]{display:none!important}
.diagram-example{padding:22px;margin-bottom:24px}.diagram-example p{font-size:14px;line-height:1.65;color:#4b5871}
.diagram-example svg{max-width:760px;width:100%;height:auto;background:#f8fbff;border-radius:12px}
.learn-topic-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:18px 0}
.learn-topic-grid article{background:#fff;border:1px solid #dce5ef;padding:18px;border-radius:13px}
.learn-topic-grid h3{margin:0 0 9px;font-size:17px}.learn-topic-grid p{font-size:14px;line-height:1.6;color:#506176}.learn-topic-grid a{font-size:13px;color:#2157ae}
.lesson-references{color:#526175;font-size:13px}
@media(max-width:850px){.learn-topic-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.learn-topic-grid{grid-template-columns:1fr}}
`;document.head.append(style);
})();