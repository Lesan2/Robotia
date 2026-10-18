/* ROBOTIA · Visualitzador docent de diagrames i blocs MakeCode (només lectura).
   Les dades de cada projecte es representen sense modificar el portafoli original. */
(function(){
"use strict";
const SVG="http://www.w3.org/2000/svg",MC="https://makecode.microbit.org";
let controller=null;
function elem(name,text,cls){
 const node=document.createElement(name);
 if(text!==undefined&&text!==null)node.textContent=String(text);
 if(cls)node.className=cls;
 return node;
}
function nodeSize(n){
 if(n.type==="decision")return {w:190,h:118};
 if(n.type==="start")return {w:178,h:72};
 if(n.type==="connector")return {w:64,h:64};
 if(n.type==="subprocess")return {w:220,h:90};
 return {w:200,h:86};
}
const PALETTE={
 start:["#d1fae5","#047857"],process:["#e0f2fe","#0369a1"],io:["#fef3c7","#b45309"],
 decision:["#ede9fe","#7c3aed"],variable:["#f1f5f9","#475569"],
 subprocess:["#fce7f3","#be185d"],connector:["#f3e8ff","#7e22ce"]
};
function svgEl(name,attrs={},text){
 const node=document.createElementNS(SVG,name);
 for(const [k,v] of Object.entries(attrs))node.setAttribute(k,String(v));
 if(text!==undefined)node.textContent=String(text);
 return node;
}
function finite(value,fallback=0){const n=Number(value);return Number.isFinite(n)&&Math.abs(n)<1e6?n:fallback}
function wrap(text,max){
 const tokens=String(text||"").split(/\s+/).filter(Boolean),lines=[];let line="";
 for(const word of tokens){
  const test=line?line+" "+word:word;
  if(test.length>max&&line){lines.push(line);line=word;}else line=test;
 }
 if(line)lines.push(line);
 return lines.slice(0,4).map(x=>x.length>max+10?x.slice(0,max+7)+"…":x);
}
function renderDiagram(parent,project){
 const card=elem("section",null,"review-visual-block");
 const header=elem("div",null,"review-visual-top");
 header.append(elem("strong","◇ Diagrama de flux · vista de correcció"));
 const controls=elem("div",null,"review-visual-controls");
 const smaller=elem("button","−"),fit=elem("button","Ajustar"),larger=elem("button","+");
 for(const b of [smaller,fit,larger]){b.type="button";b.className="btn ghost"}
 controls.append(smaller,fit,larger);
 header.append(controls);card.append(header);
 const nodes=Array.isArray(project.nodes)?project.nodes.slice(0,400):[];
 const edges=Array.isArray(project.edges)?project.edges.slice(0,800):[];
 if(!nodes.length){card.append(elem("p","Aquest projecte no conté blocs de diagrama."));parent.append(card);return}
 const lookup=new Map(nodes.map(n=>[String(n.id),n]));
 let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 nodes.forEach(n=>{
  const w=nodeSize(n).w,h=nodeSize(n).h,x=finite(n.x),y=finite(n.y);
  minX=Math.min(minX,x-w/2);maxX=Math.max(maxX,x+w/2);
  minY=Math.min(minY,y-h/2);maxY=Math.max(maxY,y+h/2);
 });
 const full={x:minX-110,y:minY-105,w:Math.max(300,maxX-minX+220),h:Math.max(210,maxY-minY+210)};
 const svg=svgEl("svg",{role:"img","aria-label":"Diagrama de flux de l'alumne. Visualització sense edició",preserveAspectRatio:"xMidYMid meet",viewBox:[full.x,full.y,full.w,full.h].join(" ")});
 svg.classList.add("review-diagram-svg");
 const defs=svgEl("defs"),marker=svgEl("marker",{id:"rv-arrow-"+Math.random().toString(36).slice(2,10),markerWidth:9,markerHeight:9,refX:8,refY:4,orient:"auto",markerUnits:"strokeWidth"});
 marker.append(svgEl("path",{d:"M0 0 L8 4 L0 8 Z",fill:"#52647c"}));defs.append(marker);svg.append(defs);
 const frame=elem("div",null,"review-diagram-frame");frame.append(svg);card.append(frame);
 const info=elem("p","Prem sobre un bloc per llegir-ne el contingut complet.","review-visual-info");card.append(info);
 function borderPoint(n,side){
  const w=nodeSize(n).w,h=nodeSize(n).h,x=finite(n.x),y=finite(n.y);
  const s=String(side||"");
  if(s.startsWith("left"))return {x:x-w/2,y:y+(s.endsWith("in")?-17:s.endsWith("out")?17:0)};
  if(s.startsWith("right"))return {x:x+w/2,y:y+(s.endsWith("in")?-17:s.endsWith("out")?17:0)};
  return s.startsWith("top")?{x,y:y-h/2}:{x,y:y+h/2};
 }
 function vec(s){s=String(s||"");return s.startsWith("left")?[-1,0]:s.startsWith("right")?[1,0]:s.startsWith("top")?[0,-1]:[0,1]}
 edges.forEach(e=>{
  const a=lookup.get(String(e.from)),b=lookup.get(String(e.to));if(!a||!b)return;
  const dx=finite(b.x)-finite(a.x),dy=finite(b.y)-finite(a.y);
  const inferred=Math.abs(dx)>Math.abs(dy)
    ?(dx>=0?["right","left"]:["left","right"])
    :(dy>=0?["bottom","top"]:["top","bottom"]);
  const from=e.fromSide||inferred[0],to=e.toSide||inferred[1];
  const p1=borderPoint(a,from),p2=borderPoint(b,to),v1=vec(from),v2=vec(to);
  const k=Math.max(48,Math.min(150,Math.hypot(p2.x-p1.x,p2.y-p1.y)*.32));
  const c1={x:p1.x+v1[0]*k,y:p1.y+v1[1]*k},c2={x:p2.x+v2[0]*k,y:p2.y+v2[1]*k};
  svg.append(svgEl("path",{d:"M "+p1.x+" "+p1.y+" C "+c1.x+" "+c1.y+" "+c2.x+" "+c2.y+" "+p2.x+" "+p2.y,
   fill:"none",stroke:"#52647c","stroke-width":3,"marker-end":"url(#"+marker.id+")"}));
  if(e.label){
   const mx=(p1.x+3*c1.x+3*c2.x+p2.x)/8,my=(p1.y+3*c1.y+3*c2.y+p2.y)/8;
   const lbl=svgEl("text",{x:mx,y:my-10,"text-anchor":"middle","font-size":17,"font-weight":"700",stroke:"#fff","stroke-width":5,"paint-order":"stroke",fill:"#334155"},String(e.label).slice(0,35));
   svg.append(lbl);
  }
 });
 nodes.forEach(n=>{
  const {w,h}=nodeSize(n),colors=PALETTE[n.type]||PALETTE.process;
  const g=svgEl("g",{transform:"translate("+finite(n.x)+" "+finite(n.y)+")",tabindex:"0",role:"button","aria-label":"Llegir bloc: "+String(n.label||n.type).slice(0,160)});
  let shape;
  if(n.type==="decision")shape=svgEl("polygon",{points:"0,"+(-h/2)+" "+w/2+",0 0,"+h/2+" "+(-w/2)+",0"});
  else if(n.type==="io")shape=svgEl("polygon",{points:(-w/2+20)+","+(-h/2)+" "+(w/2)+","+(-h/2)+" "+(w/2-20)+","+(h/2)+" "+(-w/2)+","+(h/2)});
  else if(n.type==="connector")shape=svgEl("circle",{r:30});
  else shape=svgEl("rect",{x:-w/2,y:-h/2,width:w,height:h,rx:n.type==="start"?36:12});
  shape.setAttribute("fill",colors[0]);shape.setAttribute("stroke",colors[1]);shape.setAttribute("stroke-width","3");g.append(shape);
  if(n.type==="subprocess"){
   g.append(svgEl("path",{d:"M "+(-w/2+18)+" "+(-h/2)+" v "+h+" M "+(w/2-18)+" "+(-h/2)+" v "+h,stroke:colors[1],fill:"none","stroke-width":2}));
  }
  const lines=wrap(n.label,n.type==="decision"?18:n.type==="connector"?5:24);
  const hLine=18,offset=-(Math.max(1,lines.length)-1)*hLine/2;
  lines.forEach((t,i)=>g.append(svgEl("text",{x:0,y:offset+i*hLine+5,"font-size":n.type==="connector"?12:16,
   "font-weight":"700","text-anchor":"middle",fill:"#142438","pointer-events":"none"},t)));
  const show=()=>{info.textContent="Bloc "+String(n.type||"procés")+" · "+String(n.label||"sense text")+(n.semantic?" · micro:bit: "+n.semantic:"")};
  g.addEventListener("click",show);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();show()}});
  g.style.cursor="pointer";svg.append(g);
 });
 let view={...full};
 const setView=()=>svg.setAttribute("viewBox",[view.x,view.y,view.w,view.h].join(" "));
 function zoom(factor){const mx=view.x+view.w/2,my=view.y+view.h/2;view.w=Math.max(130,Math.min(full.w*2.5,view.w*factor));view.h=Math.max(100,Math.min(full.h*2.5,view.h*factor));view.x=mx-view.w/2;view.y=my-view.h/2;setView()}
 smaller.addEventListener("click",()=>zoom(1.33));larger.addEventListener("click",()=>zoom(.75));
 fit.addEventListener("click",()=>{view={...full};setView()});
 let dragging=null;
 svg.addEventListener("pointerdown",e=>{if(e.target.closest("g[role=button]"))return;dragging={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};svg.setPointerCapture(e.pointerId)});
 svg.addEventListener("pointermove",e=>{if(!dragging)return;const r=svg.getBoundingClientRect();view.x=dragging.vx-(e.clientX-dragging.x)*view.w/Math.max(r.width,1);view.y=dragging.vy-(e.clientY-dragging.y)*view.h/Math.max(r.height,1);setView()});
 svg.addEventListener("pointerup",()=>dragging=null);svg.addEventListener("pointercancel",()=>dragging=null);
 parent.append(card);
}
function projectId(urlText){
 try{
  const u=new URL(String(urlText||"").trim());
  if(u.protocol!=="https:"||u.hostname!=="makecode.microbit.org")return "";
  const hash=u.hash.match(/^#pub:([A-Za-z0-9_-]{6,90})$/);
  if(hash)return hash[1];
  const path=u.pathname.match(/^\/((?:_[A-Za-z0-9-]{4,})|(?:S[A-Za-z0-9-]{8,})|(?:\d{4,6}(?:-\d{4,6}){3}))$/i);
  return path?path[1]:"";
 }catch{return ""}
}
function close(){if(controller){controller.abort();controller=null}}
function renderMakeCode(parent,makeCodeUrl){
 const id=projectId(makeCodeUrl);if(!id)return;
 const block=elem("section",null,"review-visual-block");
 const top=elem("div",null,"review-visual-top");
 top.append(elem("strong","< > Blocs de MakeCode · vista del projecte"));
 const buttons=elem("div",null,"review-visual-controls");
 const original=elem("a","Obrir MakeCode ↗");
 original.href=makeCodeUrl;original.target="_blank";original.rel="noopener noreferrer";original.className="btn secondary";
 const embedded=elem("button","Editor aquí");
 embedded.type="button";embedded.className="btn ghost";
 buttons.append(original,embedded);top.append(buttons);block.append(top);
 const status=elem("p","Preparant la vista dels blocs compartits…","review-visual-info");
 const workspace=elem("div",null,"review-makecode-workspace");workspace.append(status);
 block.append(workspace);parent.append(block);
 const own=new AbortController();controller=own;
 const signal=own.signal;let settled=false;
 const renderer=document.createElement("iframe");renderer.title="Motor de visualització de blocs MakeCode";
 renderer.src=MC+"/--docs?render=1&lang=ca";renderer.className="review-makecode-renderer";
 renderer.referrerPolicy="no-referrer";
 renderer.setAttribute("aria-hidden","true");block.append(renderer);
 const requestId="robotia-review-"+Date.now()+"-"+Math.floor(Math.random()*100000);
 function send(){
  if(signal.aborted||settled||!renderer.contentWindow)return;
  renderer.contentWindow.postMessage({type:"renderblocks",id:requestId,code:"",options:{packageId:id}},MC);
  status.textContent="Llegint els blocs del projecte compartit…";
 }
 function onMessage(event){
  if(signal.aborted||event.origin!==MC||event.source!==renderer.contentWindow)return;
  const data=event.data||{};
  if(data.source!=="makecode")return;
  if(data.type==="renderready"){send();return}
  if(data.type!=="renderblocks"||data.id!==requestId)return;
  settled=true;
  const imageUrl=String(data.uri||"");
  if(!/^data:image\/(?:svg\+xml|png|webp|jpeg)(?:;[^,]*)?,/i.test(imageUrl)){
   status.textContent="MakeCode no ha retornat una imatge de blocs. Prova «Editor aquí» o «Obrir MakeCode».";
   return;
  }
  const image=elem("img");image.src=imageUrl;
  image.alt="Blocs del projecte MakeCode compartit, generats amb el visor oficial";
  image.className="review-makecode-image";
  image.addEventListener("error",()=>{status.textContent="No s'ha pogut mostrar la imatge. Pots obrir MakeCode."});
  status.textContent="Blocs del projecte compartit (només lectura).";
  workspace.append(image);
 }
 window.addEventListener("message",onMessage,{signal});
 renderer.addEventListener("load",()=>setTimeout(send,500),{signal});
 const timeout=setTimeout(()=>{if(!signal.aborted&&!settled){
  status.textContent="MakeCode tarda a respondre. Pots prémer «Editor aquí» per veure els blocs i provar el simulador.";
 }},17000);
 signal.addEventListener("abort",()=>clearTimeout(timeout),{once:true});
 embedded.addEventListener("click",()=>{
  close(); // detach background renderer and its listeners before creating interactive editor
  renderer.remove();
  workspace.replaceChildren();
  const notice=elem("p","Editor incrustat de MakeCode. Si no carrega, utilitza «Obrir MakeCode».","review-visual-info");
  const frame=elem("iframe");frame.src=MC+"/#pub:"+encodeURIComponent(id);
  frame.className="review-makecode-editor";frame.title="Editor MakeCode del projecte compartit";
  frame.referrerPolicy="no-referrer";frame.loading="eager";
  workspace.append(notice,frame);
  embedded.disabled=true;
 },{signal});
}
const css=elem("style");
css.textContent=[
 ".review-visual-block{border:1px solid #d4e4f3;background:#fff;border-radius:12px;margin:12px 0;padding:12px;min-width:0}",
 ".review-visual-top{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:9px}",
 ".review-visual-controls{display:flex;align-items:center;flex-wrap:wrap;gap:6px}",
 ".review-visual-controls .btn{padding:7px 11px;font-size:12px;text-decoration:none}",
 ".review-visual-info{font-size:12px!important;color:#405675;margin:9px 0!important}",
 ".review-diagram-frame{width:100%;height:395px;overflow:hidden;border-radius:8px;border:1px solid #d8e1ec;background:linear-gradient(0deg,transparent 95%,#edf4ff 95%),linear-gradient(90deg,transparent 95%,#edf4ff 95%);background-size:25px 25px;touch-action:none}",
 ".review-diagram-svg{display:block;width:100%;height:100%;user-select:none;touch-action:none}",
 ".review-makecode-workspace{max-height:580px;overflow:auto;border:1px solid #dde6f0;border-radius:8px;background:#f9fbff;padding:8px}",
 ".review-makecode-image{display:block;max-width:none;width:auto;height:auto;min-width:0}",
 ".review-makecode-renderer{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0}",
 ".review-makecode-editor{display:block;border:0;width:100%;min-height:520px}",
 "@media(max-width:640px){.review-diagram-frame{height:290px}.review-makecode-editor{min-height:420px}}"
].join("\n");
document.head.append(css);
window.ROBOTIA_REVIEW_VISUALS=Object.freeze({close,renderDiagram,renderMakeCode,projectId});
})();