'use strict';
const canvas = document.querySelector('.f20__canvas');
const dif = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
let painting,color,linewidth,difX,difY;

const dibujar = (x1,y1,x2,y2) => {
   ctx.strokeStyle = color;
   ctx.lineWidth = linewidth;
   ctx.moveTo(x1,y1);
   ctx.lineTo(x2,y2);
   ctx.stroke();
}
canvas.addEventListener('mousedown',(e)=>{
   difX = e.clientX - dif.left;
   difY = e.clientY - dif.top;
   painting = true;
   color = document.getElementById('f20__color').value;
   linewidth = document.getElementById('f20__lw').value;
   ctx.beginPath();
});
canvas.addEventListener('mousemove',(e)=>{
   if (painting) {
      dibujar(difX,difY,e.clientX - dif.left,e.clientY - dif.top);
      difX = e.clientX - difX.left;
      difY = e.clientY - difY.top;
   }
});
canvas.addEventListener('mouseup',(e)=>{
   ctx.closePath();
   painting = false;
});
document.querySelector(".container").addEventListener("mouseup",(e)=>{if (painting) painting = false});