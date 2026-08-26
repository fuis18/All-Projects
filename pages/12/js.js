'use strict';
const publicaciones = document.querySelector(".publicaciones");
let contador = 0;
const filetxt = {
   "content": [
      {"nombre": "Lorem ipsum",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
      {"nombre": "Lorem ipsium",
      "contenido": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
   ]
}
const createPublicationCode = (name,content) => {'use strict';
   const container = document.createElement("DIV");
   const comentarios = document.createElement("DIV");
   const nombre = document.createElement("H3");
   const contenido = document.createElement("P");
   const btnComentario = document.createElement("INPUT");
   const btnEnviar = document.createElement("INPUT");

   container.classList.add("publicacion");
   comentarios.classList.add("comentarios");
   btnComentario.setAttribute("placeholder","Introduce tu comentario");
   nombre.textContent = name;
   contenido.textContent = content;
   btnComentario.setAttribute("type","text");
   btnEnviar.setAttribute("type","submit");

   comentarios.appendChild(btnComentario);
   comentarios.appendChild(btnEnviar);
   container.appendChild(nombre);
   container.appendChild(contenido);
   container.appendChild(comentarios);

   return container;
}
const cargarMasPublicaciones = entry => {'use strict';
   if (entry[0].isIntersecting) cargarPublicaciones(5);
}
const crearPublicacion = (arr,num) => {
   const documentFragment = document.createDocumentFragment();
   for (let i = 0; i < num; i++) {
      if (arr[contador] != undefined) {
         const newPublicacion = createPublicationCode(arr[contador].nombre,arr[contador].contenido);
         documentFragment.appendChild(newPublicacion);
         contador++;
         if (i == num-1) observer.observe(newPublicacion);
      } else if (document.getElementById("noMore") == undefined) {
         let noMore = document.createElement("H3");
         noMore.id = "noMore";
         noMore.textContent = "No hay más publicaciones";
         documentFragment.appendChild(noMore);
         publicaciones.appendChild(documentFragment);
      }
      else break;
   }
   publicaciones.appendChild(documentFragment);
}
const observer = new IntersectionObserver(cargarMasPublicaciones);
const cargarPublicaciones = async num => {'use strict';
   try {
      const request = await fetch("f17.txt");
      const contain = await request.json();
      const arr = contain.content;
      crearPublicacion(arr,num);
   }
   catch(e) {
      console.log(e);
      const contain = filetxt; // Archivo aparte de texto
      const arr = contain.content;
      crearPublicacion(arr,num);
   }
}
cargarPublicaciones(10);