'use strict';
const zone = document.querySelector(".zone");
zone.addEventListener("dragover", (e)=>{
   e.preventDefault();
});
zone.addEventListener("drop", (e)=>{
   let n = e.dataTransfer.getData("texture");
   zone.style.background = `url("img/textura${n}.png")`;
});
const textures = document.querySelector(".textures");
for (let i = 0; i < textures.children.length; i++) {
   document.querySelector(`.texture${i}`).addEventListener("dragstart",(e)=>transferirTextura(i,e));
}
const transferirTextura = (n,e) => {'use strict';
   e.dataTransfer.setData("texture", n);
}