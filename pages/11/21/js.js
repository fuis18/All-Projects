'use strict';
// Funciones de creación
const createHome = () => {'use strict';
   validty_child(document.querySelector(".container"));
   document.querySelector(".container").style.display = "block";
   document.querySelector(".container").innerHTML = `
   <div class="longitud content">
      <h3>Longitudes</h3>
      <div class="longitud buttons">
         <input type="button" value="Rectas">
         <input type="button" value="Angulos">
         <input type="button" value="Lineas Paralelas">
         <input type="button" value="Cuadriculas">
      </div>
   </div>
   <div class="area content">
      <h3>Áreas</h3>
      <div class="area buttons">
         <input type="button" value="Circulo">
         <input type="button" value="Eclipse">
         <input type="button" value="Sector Circular">
         <input type="button" value="Segmento Circular">
         <input type="button" value="Trapecio Circular">
         <input type="button" value="Triangulo">
         <input type="button" value="Cuadrilatero">
         <input type="button" value="Poligono Regular">
         <input type="button" value="Integral">
      </div>
   </div>
   <div class="volumen content">
      <h3>Volúmenes</h3>
      <div class="volumen buttons">
         <input type="button" value="Esfera">
         <input type="button" value="Cilindro">
         <input type="button" value="Cono">
         <input type="button" value="Cubo">
         <input type="button" value="Tubo">
         <input type="button" value="Piramide">
         <input type="button" value="Tronco de piramide">
         <input type="button" value="Dona">
         <input type="button" value="Prisma regular">
         <input type="button" value="Integral Triple">
      </div>
   </div>
   <div class="frecuencia content">
      <h3>Frecuencias</h3>
      <div class="freecuencia buttons">
         <input type="button" value="Onda">
         <input type="button" value="Plano">
      </div>
   </div>`;
   activeHome();
}
const activeHome = () => {'use strict';
   let inputs = document.querySelectorAll(".container input");
   inputs.forEach(input=>{
      input.addEventListener("click",(e)=>{
         document.querySelectorAll(".container .content")[3].remove();
         document.querySelectorAll(".container .content")[2].remove();
         document.querySelectorAll(".container .content")[1].remove();
         document.querySelectorAll(".container .content")[0].remove();
         createPreDiv();
         switch (e.target.value) {
            case "Rectas":
               rectas();   			break;
            case "Cuadriculas":
               cuadriculas();   		break;
            case "Circulo":
               document.querySelector(".title").textContent = "Circulo";
               circulo();	   		break;
            case "Eclipse":
               document.querySelector(".title").textContent = "Eclipse";
               eclipse();			  	break;
            case "Sector Circular":
               document.querySelector(".title").textContent = "Sector Circular";
               sectorCircular();	   break;
            case "Segmento Circular":
               document.querySelector(".title").textContent = "Segmento Circular";
               segmentoCircular();	break;
            case "Trapecio Circular":
               document.querySelector(".title").textContent = "Trapecio Circular";
               trapecioCircular();	break;
            case "Triangulo":
               document.querySelector(".title").textContent = "Triangulo";
               triangulo();	   	break;
            case "Cuadrilatero":
               document.querySelector(".title").textContent = "Cuadrilatero";
               cuadrilatero();		break;
            case "Poligono Regular":
               document.querySelector(".title").textContent = "Poligono Regular";
               poligonoRegular();	break;
            case "Integral":
               document.querySelector(".title").textContent = "Integral";
               integral();			   break;
            case "Esfera":
               document.querySelector(".title").textContent = "Esfera";
               esfera();				break;
            case "Cilindro":
               document.querySelector(".title").textContent = "Cilindro";
               cilindro(); 			break;
            case "Cono":
               document.querySelector(".title").textContent = "Cono";
               cono();		   		break;
            case "Cubo":
               document.querySelector(".title").textContent = "Cubo";
               cubo();		   		break;
            case "Tubo":
               document.querySelector(".title").textContent = "Tubo";
               Tubo();		   		break;
            case "Integral Triple":
               document.querySelector(".title").textContent = "Integral Triple";
               integralTriple();		break;
            default:
               alert("No es ninguna de las anteriores");
               console.log(e.target.value);
         }
      });
   });
}
const createPreDiv = () => {'use strict';
   let button_back = document.createElement('input');
   button_back.setAttribute('type', 'button');
   button_back.classList.add("input-back");
   button_back.value = "Back";
   button_back.addEventListener("click", () => {
      // Regresar
      createHome();
   })
   let develop = document.createElement('div');
   develop.classList.add("develop");
   let title = document.createElement("h3");
   title.classList.add("title");
   let canvas = document.createElement('canvas');
   canvas.id = 'canvas';
   canvas.width ="750";
   canvas.height ="450";
   develop.appendChild(canvas);
   let history = document.createElement("div");
   history.classList.add("history");
   let answer = document.createElement("h4");
   answer.classList.add("answer");
   document.querySelector(".container").appendChild(button_back);
   document.querySelector(".container").appendChild(title);
   document.querySelector(".container").appendChild(develop);
   document.querySelector(".container").appendChild(answer);
   document.querySelector(".container").appendChild(history);
   document.querySelector(".container").style.display = "grid";
   document.querySelector(".container").style.gridTemplateColumns = "min-content 1fr 1fr";
   document.querySelector(".container").style.gridTemplateRows = "min-content 1fr";
}
const validty_child = parent => {'use strict';
   let child = parent.children;
   if (child.length > 0) {
      for (let i = child.length - 1; i >= 0; i--) {
         child[i].remove();
      }
   }
}
// Función para actualizar la posición del input
function updatePosition(element,inputX,inputY,offsetX,offsetY,isDragging) {'use strict';
   let canvas = document.getElementById('canvas');
   // Iniciar la posición del input
   element.style.left = inputX + 'px';
   element.style.top = inputY + 'px';
   // Evento de clic del mouse en el input
   element.addEventListener("mousedown",(event) => {
      isDragging = true;
      offsetX = event.clientX - inputX;
      offsetY = event.clientY - inputY;
   });
   // Evento de movimiento del mouse dentro del canvas
   element.addEventListener('mousemove', function (event) {'use strict';
      if (isDragging) {
         inputX = event.clientX - offsetX;
         inputY = event.clientY - offsetY;
         // Asegurarse de que el input no se salga del canvas
         if (inputX < 75 + 2) {
            inputX = 75 + 2;
         } else if (inputX > canvas.width - element.offsetWidth + 75) {
            inputX = canvas.width - element.offsetWidth + 75;
         }
         if (inputY < 150) {
            inputY = 150;
         } else if (inputY > canvas.height - element.offsetHeight + 150) {
            inputY = canvas.height - element.offsetHeight + 150;
         }
         // Actualizar la posición del input
         element.style.left = inputX + 'px';
         element.style.top = inputY + 'px';
      }
   });
   // Evento de liberación del botón del mouse
   element.addEventListener('mouseup', function () {
      isDragging = false;
   });
}
// Funciones de Desarrollo
const log = num => Math.log(num) * 40 + 40;
const seno = num => {'use strict';
   if (num % 180 == 0) {
      return 0;
   } else {
      num *= Math.PI/180;
      let y = Math.sin(num);
      return y;
   }
}
const tang = num => {'use strict';
   if (num % 180 == 0) {
      return 0;
   } else {
      num *= Math.PI/180;
      let y = Math.tan(num);
      return y;
   }
}
// Funciones de Producto
const rectas = () => {'use strict';
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
      });
   });
}
const cuadriculas = () => {'use strict';
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
      });
   });
}
const circulo = () => {'use strict';
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputX = 380;
   let inputY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetX = 0;
   let offsetY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radio = document.createElement("label");
   title_radio.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 3;
   radiusContainer.appendChild(title_radio);
   radiusContainer.appendChild(radiusInput);
   document.querySelector(".container").appendChild(radiusContainer);
   const drawCircle = () => {
      // Variables
      let radius = log(radiusInput.value)
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el círculo
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineTo(centerX,centerY);
      ctx.lineTo(centerX + radius,centerY);
      ctx.stroke();
      ctx.closePath();
      let area = radiusInput.value * radiusInput.value;
      document.querySelector(".answer").textContent = "Área = " + area + "π";
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircle();
      });
   });
   updatePosition(radiusContainer,inputX,inputY,offsetX,offsetY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircle();
}
const eclipse = () => {'use strict';
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 400;
   let inputTwoX = 450;
   let inputTwoY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusXContainer = document.createElement("div");
   radiusXContainer.classList.add("canvas__input");
   let title_radiusX = document.createElement("label");
   title_radiusX.textContent = "Radio X = ";
   let radiusXInput = document.createElement('input');
   radiusXInput.type = 'number';
   radiusXInput.min = 0;
   radiusXInput.value = 7;
   radiusXContainer.appendChild(title_radiusX);
   radiusXContainer.appendChild(radiusXInput);
   let radiusYContainer = document.createElement("div");
   radiusYContainer.classList.add("canvas__input");
   let title_radiusY = document.createElement("label");
   title_radiusY.textContent = "Radio Y = ";
   let radiusYInput = document.createElement('input');
   radiusYInput.type = 'number';
   radiusYInput.min = 0;
   radiusYInput.value = 5;
   radiusYContainer.appendChild(title_radiusY);
   radiusYContainer.appendChild(radiusYInput);
   document.querySelector(".container").appendChild(radiusXContainer);
   document.querySelector(".container").appendChild(radiusYContainer);
   const drawEclipse = () => {
      // Variables
      let radiusX = log(radiusXInput.value)
      let radiusY = log(radiusYInput.value)
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el eclipse
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineTo(centerX,centerY);
      ctx.lineTo(centerX + radiusX,centerY);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineTo(centerX,centerY);
      ctx.lineTo(centerX,centerY - radiusY);
      ctx.stroke();
      ctx.closePath();
      let area = radiusXInput.value * radiusYInput.value;
      document.querySelector(".answer").textContent = "Área = " + area + "π";
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawEclipse();
      });
   });
   updatePosition(radiusXContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(radiusYContainer,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   drawEclipse();
}
const sectorCircular = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 400;
   let inputTwoX = 450;
   let inputTwoY = 400;
   let inputThreeX = 500;
   let inputThreeY = 300;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   let offsetThreeX = 0;
   let offsetThreeY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radius = document.createElement("label");
   title_radius.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 7;
   radiusInput.id = "r"
   radiusContainer.appendChild(title_radius);
   radiusContainer.appendChild(radiusInput);
   let angleC_ontainer = document.createElement("div");
   angleC_ontainer.classList.add("canvas__input");
   let title_angle = document.createElement("label");
   title_angle.textContent = "Ángulo = ";
   let angleInput = document.createElement('input');
   angleInput.type = 'number';
   angleInput.min = 0;
   angleInput.max = 360;
   angleInput.value = 45;
   angleInput.id = "a"
   angleC_ontainer.appendChild(title_angle);
   angleC_ontainer.appendChild(angleInput);
   let lengthContainer = document.createElement("div");
   lengthContainer.classList.add("canvas__input");
   let title_length = document.createElement("label");
   title_length.textContent = "Longitud de Arco = ";
   let lengthInput = document.createElement('input');
   lengthInput.type = 'number';
   lengthInput.min = 0;
   lengthInput.id = "l"
   lengthContainer.appendChild(title_length);
   lengthContainer.appendChild(lengthInput);
   lengthContainer.appendChild(document.createTextNode("π"));
   document.querySelector(".container").appendChild(radiusContainer);
   document.querySelector(".container").appendChild(angleC_ontainer);
   document.querySelector(".container").appendChild(lengthContainer);
   const drawCircularSector = (e) => {
      // Variables
      let radius = log(radiusInput.value)
      if (e == "r" || e == "a" || e == undefined) {
         lengthInput.value = angleInput.value / 180 * radiusInput.value;
      } else {
         if (360 < (lengthInput.value * Math.PI / radiusInput.value) * 180 / Math.PI) {
            lengthInput.value = 360 / 180 * radiusInput.value;
         }
         angleInput.value = (lengthInput.value * Math.PI / radiusInput.value) * 180 / Math.PI;
         // angleRad = lengthInput.value / radiusInput.value;
      }
      let angleRad = angleInput.value * Math.PI / 180;
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el Sector Circular
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, angleRad, false);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineTo(centerX,centerY);
      ctx.lineTo(centerX + radius,centerY);
      ctx.stroke();
      ctx.closePath();
      let area = radiusInput.value * radiusInput.value * angleInput.value / 360;
      document.querySelector(".answer").textContent = "Área = " + area + "π";
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularSector(element.id);
      });
   });
   updatePosition(radiusContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(angleC_ontainer,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   updatePosition(lengthContainer,inputThreeX,inputThreeY,offsetThreeX,offsetThreeY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularSector();
}
const segmentoCircular = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 400;
   let inputTwoX = 450;
   let inputTwoY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radius = document.createElement("label");
   title_radius.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 7;
   radiusInput.id = "r"
   radiusContainer.appendChild(title_radius);
   radiusContainer.appendChild(radiusInput);
   let angleC_ontainer = document.createElement("div");
   angleC_ontainer.classList.add("canvas__input");
   let title_angle = document.createElement("label");
   title_angle.textContent = "Ángulo = ";
   let angleInput = document.createElement('input');
   angleInput.type = 'number';
   angleInput.min = 0;
   angleInput.max = 360;
   angleInput.value = 90;
   angleInput.id = "a"
   angleC_ontainer.appendChild(title_angle);
   angleC_ontainer.appendChild(angleInput);
   document.querySelector(".container").appendChild(radiusContainer);
   document.querySelector(".container").appendChild(angleC_ontainer);
   const drawCircularSegment = () => {
      // Variables
      let angleRad = angleInput.value * Math.PI / 180;
      let radius = log(radiusInput.value)
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Calcula las coordenadas cartesianas del punto final
      let x = centerX + radius * Math.cos(angleRad);
      let y = centerY + radius * Math.sin(angleRad);
      // Dibuja el Segmento Circular
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, angleRad, false);
      ctx.stroke();
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      ctx.lineTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "black";
      ctx.stroke();
      let area = 0.5 * radiusInput.value * radiusInput.value * (angleRad - Math.sin(angleRad))
      document.querySelector(".answer").textContent = "Área = " + area;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularSegment();
      });
   });
   updatePosition(radiusContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(angleC_ontainer,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularSegment();
}
const trapecioCircular = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 400;
   let inputTwoX = 450;
   let inputTwoY = 400;
   let inputThreeX = 500;
   let inputThreeY = 300;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   let offsetThreeX = 0;
   let offsetThreeY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusMenorContainer = document.createElement("div");
   radiusMenorContainer.classList.add("canvas__input");
   let title_radiusMenor = document.createElement("label");
   title_radiusMenor.textContent = "Radio Menor = ";
   let radiusMenorInput = document.createElement('input');
   radiusMenorInput.type = 'number';
   radiusMenorInput.min = 0;
   radiusMenorInput.value = 5;
   radiusMenorInput.id = "r"
   radiusMenorContainer.appendChild(title_radiusMenor);
   radiusMenorContainer.appendChild(radiusMenorInput);
   let radiusMajorContainer = document.createElement("div");
   radiusMajorContainer.classList.add("canvas__input");
   let title_radiusMajor = document.createElement("label");
   title_radiusMajor.textContent = "Radio Mayor = ";
   let radiusMajorInput = document.createElement('input');
   radiusMajorInput.type = 'number';
   radiusMajorInput.min = 0;
   radiusMajorInput.value = 7;
   radiusMajorInput.id = "R"
   radiusMajorContainer.appendChild(title_radiusMajor);
   radiusMajorContainer.appendChild(radiusMajorInput);
   let angleC_ontainer = document.createElement("div");
   angleC_ontainer.classList.add("canvas__input");
   let title_angle = document.createElement("label");
   title_angle.textContent = "Ángulo = ";
   let angleInput = document.createElement('input');
   angleInput.type = 'number';
   angleInput.min = 0;
   angleInput.max = 360;
   angleInput.value = 45;
   angleInput.id = "a"
   angleC_ontainer.appendChild(title_angle);
   angleC_ontainer.appendChild(angleInput);
   document.querySelector(".container").appendChild(radiusMenorContainer);
   document.querySelector(".container").appendChild(radiusMajorContainer);
   document.querySelector(".container").appendChild(angleC_ontainer);
   const drawCircularTrapezoid = () => {
      // Variables
      let radioMenor = (radiusMenorInput.value == 0) ? 0 : log(radiusMenorInput.value);
      if (parseInt(radiusMajorInput.value) < parseInt(radiusMenorInput.value)) {
         radiusMajorInput.value++;
      }
      let radioMayor = log(radiusMajorInput.value);
      let angleRad = angleInput.value * Math.PI / 180;
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Calcula las coordenadas cartesianas del punto final
      let x = centerX + radioMayor * Math.cos(angleRad);
      let y = centerY + radioMayor * Math.sin(angleRad);
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dibuja el Trapecio Circular
      ctx.beginPath();
      ctx.arc(centerX, centerY, radioMenor, 0, angleRad, false);
      ctx.arc(centerX, centerY, radioMayor, angleRad, 0, true);
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Color y transparencia del relleno
      ctx.fill();
      ctx.closePath();
      ctx.lineTo(centerX,centerY)
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black"; // Color del borde
      ctx.stroke();
      ctx.closePath();
      let area = Math.pow(radiusMajorInput.value,2) - Math.pow(radiusMenorInput.value,2);
      area = area * angleInput.value / 360;
      document.querySelector(".answer").textContent = "Área = " + area + "π";
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularTrapezoid();
      });
   });
   updatePosition(radiusMenorContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(radiusMajorContainer,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   updatePosition(angleC_ontainer,inputThreeX,inputThreeY,offsetThreeX,offsetThreeY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularTrapezoid();
}
const triangulo = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 450;
   let inputTwoX = 500;
   let inputTwoY = 450;
   let inputThreeX = 380;
   let inputThreeY = 250;
   let inputFourX = 250;
   let inputFourY = 320;
   let inputFiveX = 500;
   let inputFiveY = 320;
   let inputSixX = 380;
   let inputSixY = 420;
   let inputSevenX = 380;
   let inputSevenY = 360;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   let offsetThreeX = 0;
   let offsetThreeY = 0;
   let offsetFourX = 0;
   let offsetFourY = 0;
   let offsetFiveX = 0;
   let offsetFiveY = 0;
   let offsetSixX = 0;
   let offsetSixY = 0;
   let offsetSevenX = 0;
   let offsetSevenY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let angleA_Container = document.createElement("div");
   angleA_Container.classList.add("canvas__input");
   let title_angleA_ = document.createElement("label");
   title_angleA_.textContent = "Ángulo A = ";
   let angleA_Input = document.createElement('input');
   angleA_Input.type = 'number';
   angleA_Input.min = 0;
   angleA_Input.max = 180;
   angleA_Input.value = 60;
   angleA_Input.id = "A"
   angleA_Container.appendChild(title_angleA_);
   angleA_Container.appendChild(angleA_Input);
   let angleB_Container = document.createElement("div");
   angleB_Container.classList.add("canvas__input");
   let title_angleB_ = document.createElement("label");
   title_angleB_.textContent = "Ángulo B = ";
   let angleB_Input = document.createElement('input');
   angleB_Input.type = 'number';
   angleB_Input.min = 0;
   angleB_Input.max = 180;
   angleB_Input.value = 60;
   angleB_Input.id = "B"
   angleB_Container.appendChild(title_angleB_);
   angleB_Container.appendChild(angleB_Input);
   let angleC_Container = document.createElement("div");
   angleC_Container.classList.add("canvas__input");
   let title_angleC_ = document.createElement("label");
   title_angleC_.textContent = "Ángulo C = ";
   let angleC_Input = document.createElement('input');
   angleC_Input.type = 'number';
   angleC_Input.min = 0;
   angleC_Input.max = 180;
   angleC_Input.value = 60;
   angleC_Input.id = "C"
   angleC_Container.appendChild(title_angleC_);
   angleC_Container.appendChild(angleC_Input);
   let sideA_Container = document.createElement("div");
   sideA_Container.classList.add("canvas__input");
   let title_sideA_ = document.createElement("label");
   title_sideA_.textContent = "Lado a = ";
   let sideA_Input = document.createElement('input');
   sideA_Input.type = 'number';
   sideA_Input.min = 0;
   sideA_Input.value = 10;
   sideA_Input.id = "a"
   sideA_Container.appendChild(title_sideA_);
   sideA_Container.appendChild(sideA_Input);
   let sideB_Container = document.createElement("div");
   sideB_Container.classList.add("canvas__input");
   let title_sideB_ = document.createElement("label");
   title_sideB_.textContent = "Lado b = ";
   let sideB_Input = document.createElement('input');
   sideB_Input.type = 'number';
   sideB_Input.min = 0;
   sideB_Input.value = 10;
   sideB_Input.id = "b"
   sideB_Container.appendChild(title_sideB_);
   sideB_Container.appendChild(sideB_Input);
   let sideC_Container = document.createElement("div");
   sideC_Container.classList.add("canvas__input");
   let title_sideC_ = document.createElement("label");
   title_sideC_.textContent = "Lado c = ";
   let sideC_Input = document.createElement('input');
   sideC_Input.type = 'number';
   sideC_Input.min = 0;
   sideC_Input.value = 10;
   sideC_Input.id = "c"
   sideC_Container.appendChild(title_sideC_);
   sideC_Container.appendChild(sideC_Input);
   let height_Container = document.createElement("div");
   height_Container.classList.add("canvas__input");
   let title_height_ = document.createElement("label");
   title_height_.textContent = "Altura = ";
   let height_Input = document.createElement('input');
   height_Input.type = 'number';
   height_Input.min = 0;
   height_Input.value = 8.66025;
   height_Input.id = "h"
   height_Container.appendChild(title_height_);
   height_Container.appendChild(height_Input);
   document.querySelector(".container").appendChild(angleA_Container);
   document.querySelector(".container").appendChild(angleB_Container);
   document.querySelector(".container").appendChild(angleC_Container);
   document.querySelector(".container").appendChild(sideA_Container);
   document.querySelector(".container").appendChild(sideB_Container);
   document.querySelector(".container").appendChild(sideC_Container);
   document.querySelector(".container").appendChild(height_Container);
   const drawTriangle = (id) => {
      // validación de las longitudes
      if (!(parseFloat(sideA_Input.value) + parseFloat(sideB_Input.value) >= sideC_Input.value) || !(parseFloat(sideC_Input.value) + parseFloat(sideB_Input.value) >= sideA_Input.value) || !(parseFloat(sideC_Input.value) + parseFloat(sideB_Input.value) >= sideA_Input.value) || (parseFloat(angleA_Input.value) + parseFloat(angleB_Input.value) + parseFloat(angleC_Input.value) > 180)) {
         if (id === "c") {
            if (!(parseFloat(sideA_Input.value) + parseFloat(sideB_Input.value) >= sideC_Input.value) || !(parseFloat(sideC_Input.value) + parseFloat(sideB_Input.value) >= sideA_Input.value) || !(parseFloat(sideC_Input.value) + parseFloat(sideB_Input.value) >= sideA_Input.value)) {
               sideA_Input.value = sideC_Input.value / 2;
               sideB_Input.value = sideC_Input.value / 2;
               console.log("c");
            }
         } else if (id === "A") {
            console.log("A");
            angleC_Input.value = 180 - (parseFloat(angleB_Input.value) + parseFloat(angleA_Input.value));
            // angleC_Input.value--;
         } else if (id === "B") {
            console.log("B");
            angleC_Input.value = 180 - (parseFloat(angleA_Input.value) + parseFloat(angleB_Input.value));
            // angleC_Input.value--;
         } else if (id === "C") {
            angleA_Input.value--;
            angleB_Input.value--;
         }
      }
      // Variables del triángulo
      let angleRadA = angleA_Input.value * Math.PI / 180;
      let angleRadB = angleB_Input.value * Math.PI / 180;
      let angleRadC = angleC_Input.value * Math.PI / 180; //Adorno
      let height = height_Input.value;
      if (id === "a") {
         sideB_Input.value = Math.sqrt(Math.pow(sideA_Input.value,2) + Math.pow(sideC_Input.value,2) - 2 * sideA_Input.value * sideC_Input.value * Math.cos(angleRadA));
         angleB_Input.value = Math.acos((Math.pow(sideB_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideA_Input.value,2)) / (2 * sideB_Input.value * sideC_Input.value)) * 180 / Math.PI;
         height_Input.value = sideA_Input.value * Math.sin(angleRadA);
         angleC_Input.value = Math.asin(sideC_Input.value * Math.sin(angleRadA) / sideB_Input.value) * 180 / Math.PI;
      } else if (id === "b") {
         sideA_Input.value = Math.sqrt(Math.pow(sideB_Input.value,2) + Math.pow(sideC_Input.value,2) - 2 * sideB_Input.value * sideC_Input.value * Math.cos(angleRadB));
         angleA_Input.value = Math.acos((Math.pow(sideA_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideB_Input.value,2)) / (2 * sideA_Input.value * sideC_Input.value)) * 180 / Math.PI;
         height_Input.value = sideB_Input.value * Math.sin(angleRadB);
         angleC_Input.value = Math.asin(sideC_Input.value * Math.sin(angleRadB) / sideA_Input.value) * 180 / Math.PI;
      } else if (id === "c") {
         angleA_Input.value = Math.acos((Math.pow(sideA_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideB_Input.value,2)) / (2 * sideA_Input.value * sideC_Input.value)) * 180 / Math.PI;
         angleB_Input.value = Math.acos((Math.pow(sideB_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideA_Input.value,2)) / (2 * sideB_Input.value * sideC_Input.value)) * 180 / Math.PI;
         angleC_Input.value = Math.acos((Math.pow(sideA_Input.value,2) + Math.pow(sideB_Input.value,2) - Math.pow(sideC_Input.value,2)) / (2 * sideA_Input.value * sideB_Input.value)) * 180 / Math.PI;
         height_Input.value = sideA_Input.value * Math.sin(angleRadA);
      } else if (id === "h") {
         let baseA = sideA_Input.value * Math.cos(angleRadA) / Math.sin(Math.PI / 2);
         sideA_Input.value = Math.sqrt(Math.pow(height,2) + Math.pow(baseA,2) - 2 * height * baseA * Math.cos(Math.PI / 2));
         angleA_Input.value = Math.acos((Math.pow(sideA_Input.value,2) + Math.pow(baseA,2) - Math.pow(height,2)) / (2 * sideA_Input.value * baseA)) * 180 / Math.PI;
         let baseB = sideB_Input.value * Math.cos(angleRadB) / Math.sin(Math.PI / 2);
         sideB_Input.value = Math.sqrt(Math.pow(height,2) + Math.pow(baseB,2) - 2 * height * baseB * Math.cos(Math.PI / 2));
         angleB_Input.value = Math.acos((Math.pow(sideB_Input.value,2) + Math.pow(baseB,2) - Math.pow(height,2)) / (2 * sideB_Input.value * baseB)) * 180 / Math.PI;
         angleC_Input.value = 180 - (parseFloat(angleA_Input.value) + parseFloat(angleB_Input.value));
      } else if (id === "A") {
         sideB_Input.value = Math.sqrt(Math.pow(sideA_Input.value,2) + Math.pow(sideC_Input.value,2) - 2 * sideA_Input.value * sideC_Input.value * Math.cos(angleRadA));
         angleB_Input.value = Math.acos((Math.pow(sideB_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideA_Input.value,2)) / (2 * sideB_Input.value * sideC_Input.value)) * 180 / Math.PI;
         height_Input.value = sideB_Input.value * Math.sin(angleRadB);
         angleC_Input.value = 180 - (parseFloat(angleA_Input.value) + parseFloat(angleB_Input.value));
      } else if (id === "B") {
         sideA_Input.value = Math.sqrt(Math.pow(sideB_Input.value,2) + Math.pow(sideC_Input.value,2) - 2 * sideB_Input.value * sideC_Input.value * Math.cos(angleRadB));
         angleA_Input.value = Math.acos((Math.pow(sideA_Input.value,2) + Math.pow(sideC_Input.value,2) - Math.pow(sideB_Input.value,2)) / (2 * sideA_Input.value * sideC_Input.value)) * 180 / Math.PI;
         height_Input.value = sideA_Input.value * Math.sin(angleRadA);
         angleC_Input.value = 180 - (parseFloat(angleA_Input.value) + parseFloat(angleB_Input.value));
      } else if (id === "C") {
         sideC_Input.value = Math.sqrt(Math.pow(sideA_Input.value,2) + Math.pow(sideB_Input.value,2) - 2 * sideA_Input.value * sideB_Input.value * Math.cos(angleRadC));
         angleA_Input.value = Math.asin(sideB_Input.value * Math.sin(angleRadC) / sideC_Input.value) * 180 / Math.PI;
         angleB_Input.value = Math.asin(sideA_Input.value * Math.sin(angleRadC) / sideC_Input.value) * 180 / Math.PI;
         height_Input.value = sideA_Input.value * Math.sin(angleRadA);
      }
      // Variables del triángulo
      let sideA = log(sideA_Input.value) * 1.24;
      let sideB = log(sideB_Input.value) * 1.24; //Adorno
      let sideC = log(sideC_Input.value) * 1.24; //Adorno
      angleRadA = angleA_Input.value * Math.PI / 180;
      angleRadB = angleB_Input.value * Math.PI / 180;
      angleRadC = angleC_Input.value * Math.PI / 180; //Adorno
      height = height_Input.value * 15
      // Varibales complementarias
      let halfHeight = sideA * Math.sin(angleRadA) / 2;
      let baseA = halfHeight * Math.cos(angleRadA) / Math.sin(angleRadA);
      let baseB = halfHeight * Math.cos(angleRadB) / Math.sin(angleRadB);
      let radiusA = Math.sqrt(Math.pow(halfHeight,2) + Math.pow(baseA,2) - 2 * halfHeight * baseA * Math.cos(Math.PI / 2));
      let radiusB = Math.sqrt(Math.pow(halfHeight,2) + Math.pow(baseB,2) - 2 * halfHeight * baseB * Math.cos(Math.PI / 2));
      // Centro
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      // Calcular los puntos del triángulo
      let pointA = {x: center.x - Math.cos(angleRadA) * radiusA, y: center.y + halfHeight};
      let pointB = {x: center.x + Math.cos(angleRadB) * radiusB, y: center.y + halfHeight};
      let pointC = {x: center.x, y: center.y - halfHeight};
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the triangle
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.lineTo(pointC.x, pointC.y);
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Color y transparencia del relleno
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
      ctx.font = "14px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.beginPath();
      // Poner los angulos al triángulo
      ctx.fillText("A", pointA.x + 20, pointA.y - 5);
      ctx.fillText("B", pointB.x - 20, pointB.y - 5);
      ctx.fillText("C", pointC.x, pointC.y + 20);
      ctx.closePath();
      let area = sideC_Input.value * sideA_Input.value * Math.sin(angleRadA) / 2;
      document.querySelector(".answer").textContent = "Área = " + area;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawTriangle(element.id);
      });
   });
   updatePosition(angleA_Container,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(angleB_Container,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   updatePosition(angleC_Container,inputThreeX,inputThreeY,offsetThreeX,offsetThreeY,isDragging);
   updatePosition(sideA_Container,inputFourX,inputFourY,offsetFourX,offsetFourY,isDragging);
   updatePosition(sideB_Container,inputFiveX,inputFiveY,offsetFiveX,offsetFiveY,isDragging);
   updatePosition(sideC_Container,inputSixX,inputSixY,offsetSixX,offsetSixY,isDragging);
   updatePosition(height_Container,inputSevenX,inputSevenY,offsetSevenX,offsetSevenY,isDragging);
   // Dibuja el círculo inicialmente
   drawTriangle("c");
}
const cuadrilatero = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 250;
   let inputOneY = 450;
   let inputTwoX = 500;
   let inputTwoY = 450;
   let inputThreeX = 380;
   let inputThreeY = 250;
   let inputFourX = 250;
   let inputFourY = 320;
   let inputFiveX = 500;
   let inputFiveY = 320;
   let inputSixX = 380;
   let inputSixY = 420;
   let inputSevenX = 380;
   let inputSevenY = 360;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   let offsetTwoX = 0;
   let offsetTwoY = 0;
   let offsetThreeX = 0;
   let offsetThreeY = 0;
   let offsetFourX = 0;
   let offsetFourY = 0;
   let offsetFiveX = 0;
   let offsetFiveY = 0;
   let offsetSixX = 0;
   let offsetSixY = 0;
   let offsetSevenX = 0;
   let offsetSevenY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let angleA_Container = document.createElement("div");
   angleA_Container.classList.add("canvas__input");
   let title_angleA_ = document.createElement("label");
   title_angleA_.textContent = "Ángulo A = ";
   let angleA_Input = document.createElement('input');
   angleA_Input.type = 'number';
   angleA_Input.min = 0;
   angleA_Input.max = 180;
   angleA_Input.value = 60;
   angleA_Input.id = "A"
   angleA_Container.appendChild(title_angleA_);
   angleA_Container.appendChild(angleA_Input);
   let angleB_Container = document.createElement("div");
   angleB_Container.classList.add("canvas__input");
   let title_angleB_ = document.createElement("label");
   title_angleB_.textContent = "Ángulo B = ";
   let angleB_Input = document.createElement('input');
   angleB_Input.type = 'number';
   angleB_Input.min = 0;
   angleB_Input.max = 180;
   angleB_Input.value = 60;
   angleB_Input.id = "B"
   angleB_Container.appendChild(title_angleB_);
   angleB_Container.appendChild(angleB_Input);
   let angleC_Container = document.createElement("div");
   angleC_Container.classList.add("canvas__input");
   let title_angleC_ = document.createElement("label");
   title_angleC_.textContent = "Ángulo C = ";
   let angleC_Input = document.createElement('input');
   angleC_Input.type = 'number';
   angleC_Input.min = 0;
   angleC_Input.max = 180;
   angleC_Input.value = 60;
   angleC_Input.id = "C"
   angleC_Container.appendChild(title_angleC_);
   angleC_Container.appendChild(angleC_Input);
   let sideA_Container = document.createElement("div");
   sideA_Container.classList.add("canvas__input");
   let title_sideA_ = document.createElement("label");
   title_sideA_.textContent = "Lado a = ";
   let sideA_Input = document.createElement('input');
   sideA_Input.type = 'number';
   sideA_Input.min = 0;
   sideA_Input.value = 10;
   sideA_Input.id = "a"
   sideA_Container.appendChild(title_sideA_);
   sideA_Container.appendChild(sideA_Input);
   let sideB_Container = document.createElement("div");
   sideB_Container.classList.add("canvas__input");
   let title_sideB_ = document.createElement("label");
   title_sideB_.textContent = "Lado b = ";
   let sideB_Input = document.createElement('input');
   sideB_Input.type = 'number';
   sideB_Input.min = 0;
   sideB_Input.value = 10;
   sideB_Input.id = "b"
   sideB_Container.appendChild(title_sideB_);
   sideB_Container.appendChild(sideB_Input);
   let sideC_Container = document.createElement("div");
   sideC_Container.classList.add("canvas__input");
   let title_sideC_ = document.createElement("label");
   title_sideC_.textContent = "Lado c = ";
   let sideC_Input = document.createElement('input');
   sideC_Input.type = 'number';
   sideC_Input.min = 0;
   sideC_Input.value = 10;
   sideC_Input.id = "c"
   sideC_Container.appendChild(title_sideC_);
   sideC_Container.appendChild(sideC_Input);
   let height_Container = document.createElement("div");
   height_Container.classList.add("canvas__input");
   let title_height_ = document.createElement("label");
   title_height_.textContent = "Altura = ";
   let height_Input = document.createElement('input');
   height_Input.type = 'number';
   height_Input.min = 0;
   height_Input.value = 8.66025;
   height_Input.id = "h"
   height_Container.appendChild(title_height_);
   height_Container.appendChild(height_Input);
   document.querySelector(".container").appendChild(angleA_Container);
   document.querySelector(".container").appendChild(angleB_Container);
   document.querySelector(".container").appendChild(angleC_Container);
   document.querySelector(".container").appendChild(sideA_Container);
   document.querySelector(".container").appendChild(sideB_Container);
   document.querySelector(".container").appendChild(sideC_Container);
   document.querySelector(".container").appendChild(height_Container);
   const drawSquare = () => {
      // Variables
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dibuja el Sector Circular
      ctx.beginPath();
      ctx.closePath();
      let area;
      document.querySelector(".answer").textContent = "Área = " + area;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawSquare();
      });
   });
   updatePosition(angleA_Container,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   updatePosition(angleB_Container,inputTwoX,inputTwoY,offsetTwoX,offsetTwoY,isDragging);
   updatePosition(angleC_Container,inputThreeX,inputThreeY,offsetThreeX,offsetThreeY,isDragging);
   updatePosition(sideA_Container,inputFourX,inputFourY,offsetFourX,offsetFourY,isDragging);
   updatePosition(sideB_Container,inputFiveX,inputFiveY,offsetFiveX,offsetFiveY,isDragging);
   updatePosition(sideC_Container,inputSixX,inputSixY,offsetSixX,offsetSixY,isDragging);
   updatePosition(height_Container,inputSevenX,inputSevenY,offsetSevenX,offsetSevenY,isDragging);
   // Dibuja el círculo inicialmente
   drawSquare();
}
const poligonoRegular = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 380;
   let inputOneY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radius = document.createElement("label");
   title_radius.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 7;
   radiusInput.id = "r"
   radiusContainer.appendChild(title_radius);
   radiusContainer.appendChild(radiusInput);
   document.querySelector(".container").appendChild(radiusContainer);
   const drawCircularSector = () => {
      // Variables
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el Sector Circular
      ctx.beginPath();
      ctx.closePath();
      let area;
      document.querySelector(".answer").textContent = "Área = " + area;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularSector();
      });
   });
   updatePosition(radiusContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularSector();
}
const integral = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 380;
   let inputOneY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radius = document.createElement("label");
   title_radius.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 7;
   radiusInput.id = "r"
   radiusContainer.appendChild(title_radius);
   radiusContainer.appendChild(radiusInput);
   document.querySelector(".container").appendChild(radiusContainer);
   const drawCircularSector = () => {
      // Variables
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el Sector Circular
      ctx.beginPath();
      ctx.closePath();
      let area;
      document.querySelector(".answer").textContent = "Área = " + area;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularSector();
      });
   });
   updatePosition(radiusContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularSector();
}
const esfera = () => {
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   // Variables para almacenar la posición del input relativa al canvas
   let inputOneX = 380;
   let inputOneY = 400;
   // Variable para almacenar la diferencia entre la posición del mouse y la posición del input
   let offsetOneX = 0;
   let offsetOneY = 0;
   // Variable para indicar si se está arrastrando el input
   let isDragging = false;
   // Elementos para las variables
   let radiusContainer = document.createElement("div");
   radiusContainer.classList.add("canvas__input");
   let title_radius = document.createElement("label");
   title_radius.textContent = "Radio = ";
   let radiusInput = document.createElement('input');
   radiusInput.type = 'number';
   radiusInput.min = 0;
   radiusInput.value = 7;
   radiusInput.id = "r"
   radiusContainer.appendChild(title_radius);
   radiusContainer.appendChild(radiusInput);
   document.querySelector(".container").appendChild(radiusContainer);
   const drawCircularSector = () => {
      // Variables
      // Borra el contenido previo del canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Centro
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      // Dibuja el Sector Circular
      ctx.beginPath();
      ctx.closePath();
      let volumen;
      document.querySelector(".answer").textContent = "Volumen = " + volumen;
   }
   document.querySelectorAll(".canvas__input input").forEach(element => {
      element.addEventListener("input",() => {
         drawCircularSector();
      });
   });
   updatePosition(radiusContainer,inputOneX,inputOneY,offsetOneX,offsetOneY,isDragging);
   // Dibuja el círculo inicialmente
   drawCircularSector();
}
const cilindro = () => {
   let div = document.createElement('div');
   let submit = document.createElement("INPUT");
   submit.setAttribute("type","submit");
   submit.addEventListener("click",()=>{});
   div.appendChild(submit);
   return div;
}
const cono = () => {
   let div = document.createElement('div');
   let submit = document.createElement("INPUT");
   submit.setAttribute("type","submit");
   submit.addEventListener("click",()=>{});
   div.appendChild(submit);
   return div;
}
const integralTriple = () => {
   let div = document.createElement('div');
   let submit = document.createElement("INPUT");
   submit.setAttribute("type","submit");
   submit.addEventListener("click",()=>{});
   div.appendChild(submit);
   return div;
}
createHome();