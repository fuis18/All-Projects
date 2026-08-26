'use strict';
let container = document.querySelector(".container");
document.querySelector(".button18").addEventListener("click",()=>{
   let amount = document.querySelector(".amount18").value;
   const node = document.createElement("div");
   for (let i = 0; i < amount; i++) {
      let number = document.querySelector(".number18").value;
      if (number == "") number = "127.0.0.1";
      let result = prompt("Dime tu URL:");
      let space = String.fromCharCode(160) + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0';
      let p0 = document.createElement("div");
      let p1 = document.createElement("div");
      if (document.querySelector(".boolean18").checked) {
         p0.textContent = number + space + "https://www." + result;
         p1.textContent = number + space + "https://" + result;
      } else {
         p0.textContent = number + space + "http://www." + result;
         p1.textContent = number + space + "http://" + result;
      }
      let p2 = document.createElement("div");
      p2.textContent = number + space + "www." + result;
      let p3 = document.createElement("div");
      p3.textContent = number + space + result;
      node.classList.add("div3");
      node.appendChild(p0);
      node.appendChild(p1);
      node.appendChild(p2);
      node.appendChild(p3);
      container.appendChild(node);
   }
   document.querySelector(".div18").remove();
});