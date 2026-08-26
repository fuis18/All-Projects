'use strict';
const readFile = file => {
   for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.addEventListener("load",(e)=>{
         let newImg = document.createElement("img");
         newImg.src = e.currentTarget.result;
         document.querySelector(".f14__result").appendChild(newImg);
      });
   }
}
document.querySelector(".f14__file").addEventListener("change",() => {
   readFile(document.querySelector(".f14__file").files);
});