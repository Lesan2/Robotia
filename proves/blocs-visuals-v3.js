/* ROBOTIA · Mostres visuals de blocs MakeCode generades amb l'API oficial de renderització.
   És opcional: el codi i la resta de tutorials continuen funcionant sense connexió externa. */
(function(){
"use strict";
const examples=document.querySelector("#edu-makecode-practicals");
if(!examples)return;
const ORIGIN="https://makecode.microbit.org";
let renderer=null,ready=false,seq=0;
const requests=new Map();
function createRenderer(){
 if(renderer)return;
 renderer=document.createElement("iframe");
 renderer.src=ORIGIN+"/--docs?render=1&lang=ca";
 renderer.title="Motor oficial MakeCode per visualitzar blocs";
 renderer.setAttribute("aria-hidden","true");
 renderer.style.cssText="position:absolute;width:1px;height:1px;opacity:0;border:0;pointer-events:none";
 document.body.append(renderer);
}
function send(request){
 if(!ready||!renderer?.contentWindow||request.sent)return;
 request.sent=true;
 renderer.contentWindow.postMessage({type:"renderblocks",id:request.id,code:request.code,options:{snippetMode:true}},ORIGIN);
 request.status.textContent="Generant la representació visual dels blocs…";
}
window.addEventListener("message",event=>{
 if(!renderer||event.source!==renderer.contentWindow||event.origin!==ORIGIN)return;
 const data=event.data||{};
 if(data.source!=="makecode")return;
 if(data.type==="renderready"){
  ready=true;requests.forEach(send);return;
 }
 if(data.type!=="renderblocks")return;
 const request=requests.get(data.id);if(!request)return;
 clearTimeout(request.timer);requests.delete(data.id);request.button.disabled=false;
 const uri=String(data.uri||"");
 if(!/^data:image\/(?:svg\+xml|png|jpeg|webp)(?:;[^,]*)?,/i.test(uri)){
  request.status.textContent="No s'han pogut generar els blocs automàticament. Fes servir «Copiar codi» i obre MakeCode.";
  return;
 }
 request.preview.replaceChildren();
 const image=document.createElement("img");
 image.src=uri;image.alt="Blocs de MakeCode corresponents a l'exemple de codi";
 image.style.cssText="display:block;height:auto;max-width:none;width:auto;min-width:0";
 image.addEventListener("error",()=>{request.status.textContent="No es pot mostrar la imatge; prova l'editor MakeCode."});
 request.preview.append(image);
 request.status.textContent="✓ Vista dels blocs generada per MakeCode.";
});
examples.querySelectorAll(".edu-example").forEach((card,i)=>{
 const pre=card.querySelector("pre.edu-code"),bar=card.querySelector(".edu-examples-toolbar");
 if(!pre||!bar)return;
 const button=document.createElement("button");button.type="button";button.className="edu-copy";
 button.textContent="▦ Veure blocs";
 const status=document.createElement("span");status.className="edu-copy-status";status.setAttribute("role","status");
 const preview=document.createElement("div");
 preview.style.cssText="display:none;margin:12px 0 8px;border:1px solid #dbe7f2;background:#fff;border-radius:10px;padding:12px;max-height:540px;overflow:auto";
 bar.insertBefore(button,bar.firstChild);bar.append(status);
 pre.after(preview);
 button.addEventListener("click",()=>{
  preview.style.display="block";
  preview.textContent="";
  button.disabled=true;
  const id="robotia-edu-"+(++seq);
  const req={id,code:pre.textContent,status,preview,button,sent:false,timer:null};
  requests.set(id,req);
  req.timer=setTimeout(()=>{
   if(!requests.has(id))return;requests.delete(id);button.disabled=false;
   status.textContent="MakeCode no ha respost. El codi continua disponible per copiar i provar.";
  },18000);
  createRenderer();
  if(ready)send(req);
  else status.textContent="Connectant amb el motor oficial de MakeCode…";
 });
});
})();