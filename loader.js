(async()=>{
  const cssParts=["css.part1.txt", "css.part2.txt", "css.part3.txt"];
  const bodyParts=["body.part1.txt", "body.part2.txt"];
  const jsParts=["js.part1.txt", "js.part2.txt", "js.part3.txt", "js.part4.txt", "js.part5.txt", "js.part6.txt", "js.part7.txt", "js.part8.txt"];
  const get=async names=>Promise.all(names.map(async p=>{const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error(`${p}: ${r.status}`);return r.text();}));
  try{
    const [css,html,js]=await Promise.all([get(cssParts),get(bodyParts),get(jsParts)]);
    const st=document.createElement('style');st.textContent=css.join('');document.head.appendChild(st);
    document.body.innerHTML=html.join('');
    (0,eval)(js.join(''));
  }catch(err){
    console.error('ROBOTIA load error',err);
    document.body.innerHTML='<main style="font-family:system-ui;padding:40px"><h1>ROBOTIA</h1><p>No s\'ha pogut carregar l\'aplicació.</p><pre>'+String(err)+'</pre></main>';
  }
})();
