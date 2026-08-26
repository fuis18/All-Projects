'use strict';
const container = document.querySelector(".desarrollo__div");
const changeStyle = (obj, color) => {'use strict';
obj.style.color = color;
obj.style.border = `4px dashed ${color}`
}
const desarrollo = type => {'use strict';
document.querySelector(".select15").remove();
document.querySelector(".button15").remove();
document.querySelector(".desarrollo15").innerHTML = `
   <div class="content">
   <div class="loading-bar"></div>
   <div class="load">Suelte o <span>suba un archivo</span></div>
   </div>
   <div class="result15"></div>`;
   let resultado = document.querySelector(".result15");
   const zona = document.querySelector(".content");
   const upload = document.querySelector("span");
   const loadingBar = document.querySelector(".loading-bar");
   const load = document.querySelector(".load");
   zona.addEventListener("dragover", e => {'use strict';
      e.preventDefault();
      changeStyle(e.target, "#444");
   });
   zona.addEventListener("dragleave", e => {'use strict';
      e.preventDefault();
      changeStyle(e.target, "#888");
   });
   if (type == "text") {
      upload.addEventListener("click", e => {'use strict';
         let entrada = document.querySelector("span");
         let input = document.createElement("input");
         input.type = "file";
         input.accept = ".txt";
         input.addEventListener("change", (e) => {'use strict';
            const reader = new FileReader();
            reader.readAsText(e.currentTarget.files[0]);
            reader.addEventListener("load", e => {'use strict';
               resultado.textContent = e.currentTarget.result;
            });
         });
         entrada.addEventListener("click", () => {input.click()});
      })
      zona.addEventListener("drop", e => {'use strict';
         let file = e.dataTransfer.files[0];
         e.preventDefault();
         changeStyle(e.target, "#888");
         zona.style.border = "4px solid #888";
         const reader = new FileReader();
         reader.readAsText(file);
         reader.addEventListener("load", e => {'use strict';
            resultado.textContent = e.currentTarget.result;
         });
      });
   } else if (type == "img") {
      upload.addEventListener("click", e => {'use strict';
         let entrada = document.querySelector("span");
         let input = document.createElement("input");
         input.type = "file";
         input.accept = "image/*";
         input.addEventListener("change", (e) => {'use strict';
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("progress", e => {'use strict';
               let max_width = document.querySelector(".content").clientWidth;
               let carga = Math.round(e.loaded / file.size * 100);
               loadingBar.style.width = `${max_width * carga/100 - 8}px`;
               if (50 < carga) {
                  load.style.color = getComputedStyle(document.querySelector("html")).getPropertyValue("--invert");
               }
               load.textContent = `${carga}%`;
            });
            reader.addEventListener("loadend", e => {'use strict';
               changeStyle(zona, "#1a2");
               zona.style.borderStyle = "solid";
               loadingBar.style.background = "#2c2";
               load.textContent = "!Carga Completa!";
               load.style.color = "#161";
               zona.style.animation = "aparecer 1s forwards";
            });
            reader.addEventListener("load", e => {'use strict';
               let url = URL.createObjectURL(file);
               let img = document.createElement("IMG");
               img.setAttribute("src", url);
               img.classList.add("img15");
               resultado.appendChild(img);
            });
            zona.style.border = "4px solid #888";
         });
         entrada.addEventListener("click", () => {input.click()});
      })
      zona.addEventListener("drop", e => {'use strict';
         let file = e.dataTransfer.files[0];
         e.preventDefault();
         changeStyle(e.target, "#888");
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("progress", e => {'use strict';
            let max_width = document.querySelector(".content").clientWidth;
            let carga = Math.round(e.loaded / file.size * 100);
            loadingBar.style.width = `${max_width * carga/100 - 8}px`;
            if (50 < carga) {
               load.style.color = getComputedStyle(document.querySelector("html")).getPropertyValue("--invert");
            }
            load.textContent = `${carga}%`;
         });
         reader.addEventListener("loadend", e => {'use strict';
            changeStyle(zona, "#1a2");
            zona.style.borderStyle = "solid";
            loadingBar.style.background = "#2c2";
            load.textContent = "!Carga Completa!";
            load.style.color = "#161";
            zona.style.animation = "aparecer 1s forwards";
         });
         reader.addEventListener("load", () => {'use strict';
            let url = URL.createObjectURL(file);
            let img = document.createElement("IMG");
            img.setAttribute("src", url);
            img.classList.add("img15");
            resultado.appendChild(img);
         });
         zona.style.border = "4px solid #888";
      });
   } else if (type == "video") {
      upload.addEventListener("click", e => {'use strict';
         let entrada = document.querySelector("span");
         let input = document.createElement("input");
         input.type = "file";
         input.accept = "video/*";
         input.addEventListener("change", (e) => {'use strict';
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.addEventListener("progress", e => {'use strict';
               let max_width = document.querySelector(".content").clientWidth;
               let carga = Math.round(e.loaded / file.size * 100);
               loadingBar.style.width = `${max_width * carga/100 - 8}px`;
               if (50 < carga) {
                  load.style.color = getComputedStyle(document.querySelector("html")).getPropertyValue("--invert");
               }
               load.textContent = `${carga}%`;
            });
            reader.addEventListener("loadend", e => {'use strict';
               changeStyle(zona, "#1a2");
               zona.style.borderStyle = "solid";
               loadingBar.style.background = "#2c2";
               load.textContent = "!Carga Completa!";
               load.style.color = "#161";
               zona.style.animation = "aparecer 1s forwards";
            });
            reader.addEventListener("load", e => {'use strict';
               let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'});
               let url = URL.createObjectURL(video);
               let img = document.createElement("VIDEO");
               img.setAttribute("src", url);
               img.setAttribute("controls", true);
               img.classList.add("img15");
               resultado.appendChild(img);
               img.style.width = "calc(100vw - 145px)";
            });
            zona.style.border = "4px solid #888";
         });
         entrada.addEventListener("click", () => {input.click()});
      })
      zona.addEventListener("drop", e => {'use strict';
         let file = e.dataTransfer.files[0];
         e.preventDefault();
         changeStyle(e.target, "#888");
         const reader = new FileReader();
         reader.readAsArrayBuffer(file);
         reader.addEventListener("progress", e => {'use strict';
            let max_width = document.querySelector(".content").clientWidth;
            let carga = Math.round(e.loaded / file.size * 100);
            loadingBar.style.width = `${max_width * carga/100 - 8}px`;
            if (50 < carga) {
               load.style.color = getComputedStyle(document.querySelector("html")).getPropertyValue("--invert");
            }
            load.textContent = `${carga}%`;
         });
         reader.addEventListener("loadend", e => {'use strict';
            changeStyle(zona, "#1a2");
            zona.style.borderStyle = "solid";
            loadingBar.style.background = "#2c2";
            load.textContent = "!Carga Completa!";
            load.style.color = "#161";
            zona.style.animation = "aparecer 1s forwards";
         });
         reader.addEventListener("load", e => {'use strict';
            let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'});
            let url = URL.createObjectURL(video);
            let img = document.createElement("VIDEO");
            img.setAttribute("src", url);
            img.setAttribute("controls", true);
            img.classList.add("img15");
            resultado.appendChild(img);
            img.style.width = "calc(100vw - 145px)";
         });
         zona.style.border = "4px solid #888";
      });
   }
}
let confirmar = document.querySelector(".button15");
confirmar.addEventListener("click", e => {'use strict';
   let type = document.querySelector(".select15").value;
   desarrollo(type);
});