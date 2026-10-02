// GANTI: nomor WhatsApp format internasional tanpa "+". Data menu juga diatur di sini.
const WA = "6285833856599";
const MENU = [
  {c:"kopi",n:"Espresso",p:12000,d:"Espresso aroma yang nikmat",img:"assets/espresso.jpg"},
  {c:"nonkopi",n:"Matcha X Coklat",p:13000,d:"Matcha dengan pilihan coklat",img:"assets/matcha-coklat.jpg"}
];
const $=(s,r=document)=>r.querySelector(s), rp=n=>"Rp "+n.toLocaleString("id-ID");
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

let cat="kopi";
function render(){
  $("#menuGrid").innerHTML=MENU.map((m,i)=>({m,i})).filter(o=>o.m.c===cat).map((o,k)=>`
    <button class="item glass tilt hero-in flex flex-col sm:flex-row w-full" style="--d:${k*.06}s" data-i="${o.i}">
      <div class="sm:w-2/5 aspect-[4/5] sm:aspect-auto sm:min-h-[17rem] overflow-hidden"><img src="${o.m.img}" alt="${o.m.n}" width="600" height="750" loading="lazy" class="w-full h-full object-cover"></div>
      <div class="p-6 flex-1 flex flex-col justify-center">
        <p class="text-sage text-sm">${o.m.c==="kopi"?"Kopi":"Non kopi"}</p>
        <h3 class="font-display text-2xl mt-1">${o.m.n}</h3>
        <p class="text-ivory/70 mt-2">${o.m.d}</p>
        <p class="mt-5 text-brass font-display text-xl">${rp(o.m.p)}</p>
      </div>
    </button>`).join("");
  bindGlow();
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
  cat=b.dataset.cat;
  document.querySelectorAll(".tab").forEach(t=>{const on=t===b;t.classList.toggle("active",on);t.setAttribute("aria-selected",on)});
  render();
}));

const modal=$("#modal");let lastFocus;
function openM(i){
  const m=MENU[i];lastFocus=document.activeElement;
  $("#mCat").textContent=m.c==="kopi"?"Kopi":"Non kopi";
  $("#mImg").src=m.img;$("#mImg").alt=m.n;$("#mTitle").textContent=m.n;$("#mDesc").textContent=m.d;$("#mPrice").textContent=rp(m.p);
  $("#mWa").href=wa(`Halo ARTOMORO, saya mau pesan ${m.n}.`);
  modal.classList.remove("hidden");modal.classList.add("flex");$("#mClose").focus();
}
function closeM(){modal.classList.add("hidden");modal.classList.remove("flex");lastFocus&&lastFocus.focus()}
$("#menuGrid").addEventListener("click",e=>{const b=e.target.closest(".item");if(b)openM(b.dataset.i)});
$("#mClose").onclick=closeM;$("#mBackdrop").onclick=closeM;
addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.classList.contains("hidden"))closeM()});

// Glow mengikuti pointer; tilt 3D hanya di perangkat dengan hover
function bindGlow(){
  document.querySelectorAll(".glass").forEach(el=>{
    if(el._b)return;el._b=1;
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      el.style.setProperty("--mx",x+"px");el.style.setProperty("--my",y+"px");el.style.setProperty("--o",1);
      if(el.classList.contains("tilt")&&matchMedia("(hover:hover)").matches)
        el.style.transform=`perspective(900px) rotateX(${(.5-y/r.height)*5}deg) rotateY(${(x/r.width-.5)*6}deg)`;
    });
    el.addEventListener("pointerleave",()=>{el.style.setProperty("--o",0);el.style.transform=""});
  });
}

const nb=$("#navBtn"),dr=$("#drawer");
const setNav=o=>{dr.classList.toggle("open",o);nb.setAttribute("aria-expanded",o);nb.setAttribute("aria-label",o?"Tutup menu":"Buka menu")};
nb.onclick=()=>setNav(!dr.classList.contains("open"));
dr.addEventListener("click",e=>{if(e.target.tagName==="A")setNav(false)});
addEventListener("keydown",e=>{if(e.key==="Escape")setNav(false)});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

$("#waMain").href=wa("Halo ARTOMORO, saya ingin bertanya.");
$("#yr").textContent=new Date().getFullYear();
render();bindGlow();
