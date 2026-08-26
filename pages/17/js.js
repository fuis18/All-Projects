'use strict';
// Variables
let container = document.querySelector(".container");
let data = [];
// Funciones
const IDBRequest = indexedDB.open("horario",1);
IDBRequest.addEventListener("upgradeneeded",()=> IDBRequest.result.createObjectStore("week",{autoIncrement: true}));
IDBRequest.addEventListener("success",() => readObject());
IDBRequest.addEventListener("error",() => alert("ocurrio un error al abrir la base de datos"));
const addObject = object => {'use strict';
   const IDBData = transactionOperation("readwrite");
   IDBData.add(object);
   const key = IDBData.getAllKeys();
   key.addEventListener("success",()=>{
      if (key.result) crearSchedule(key.result[0],object);
   });
}
const eliminarObject = key => {'use strict';
   const IDBData = transactionOperation("readwrite");
   IDBData.delete(key);
}
const readObject = () => {'use strict';
   createQuest();
   const IDBData = transactionOperation("readonly");
   const cursor = IDBData.openCursor();
   cursor.addEventListener("success",()=>{
      if (cursor.result) crearSchedule(cursor.result.key,cursor.result.value);
   });
}
const transactionOperation = (mode) => {'use strict';
   const IDBTransaction = IDBRequest.result.transaction("week",mode);
   const objectStore = IDBTransaction.objectStore("week");
   return objectStore;
}
const renameObject = (info,modo,key,space,id,rename) => {'use strict';
   const IDBData = transactionOperation("readwrite");
   let object = info;
   object[modo][key][space] = rename;
   IDBData.put(object, id);
}
// Workers for NOtifications
// const worker = new Worker("sw22.js");
const rangeTime = (input,modo) => {
   if (input == 25) input = 1;
   else if (input == -1) input = 23;
   else if (input > 25 || input.length > 2) input = "";
   else if (modo == 1) {
      // Si se sale del limite máximo, vuelve al inicio
      if (input > data[0][1] + 1) input = data[0][0];
      // Si se sale del limite minimo, vuelve al maximo
      else if (input == data[0][0] - 1) input = data[0][1];
      // Si sale del rango abrutamente
      else if (data[0][0] < data[0][1] && input > data[0][1] + 1) input = "";
   } else if (modo == 2) {
      if (input == data[0][2] + 2) input = 0;
      else if (input == -1) input = data[0][2];
      else if (input > data[0][2] + 1 || input.length > 2) input = "";
   }
   return input;
}
const countTime = (start,end) => {
   let count = 0;
   if (parseInt(start.value) > parseInt(end.value)) {
      count = parseInt(end.value) + 24 - parseInt(start.value);
   } else if (parseInt(start.value) <= parseInt(end.value)) {
      count = parseInt(end.value) - parseInt(start.value);
   }
   if (count == 0) return [count,"block","err","Error"]; // Configuración de Error
   if (count < 10) return [count,"block","err","Exceso de tiempo durmiendo"]; // Configuración de Exceso
   if (count > 18) return [count,"block","err","Carencia de tiempo durmiendo"]; // Configuración de Carencia
   return [count,"none","",""]; // Configuración de Desactivación
}
const countCommit = (start,end) => {
   let count = 0;
   if (parseInt(start.value) > parseInt(end.value)) {
      count = parseInt(end.value) + 24 - parseInt(start.value);
   } else if (parseInt(start.value) < parseInt(end.value)) {
      count = parseInt(end.value) - parseInt(start.value);
   } else if (parseInt(start.value) == parseInt(end.value)) {
      count = 23;
   }
   if (count > 12) return [count,"block","err","Tiempo Excesivo"]; // Configuración de Error
   return [count,"none","",""]; // Configuración de Desactivación
}
const createQuestTime = () => {'use strict';
   let time = document.createElement("div");
   time.classList.add("f22__time");
   let startHour = document.createElement("input");
   startHour.type = "number";
   startHour.setAttribute("min","-1");
   startHour.setAttribute("max","25");
   let endHour = document.createElement("input");
   endHour.type = "number";
   endHour.setAttribute("min","-1");
   endHour.setAttribute("max","25");
   let getTime = document.createElement("p");
   getTime.classList.add("f22__time-get");
   let errTime = document.createElement("p");
   errTime.classList.add("f22__ERR");
   errTime.style.display = "none";
   if (data[0]) {
      startHour.value = data[0][0];
      endHour.value = data[0][1] + 1;
      let count = countTime(startHour,endHour);
      getTime.textContent = `Tiempo despierto: ${count[0]}`;
   }
   startHour.addEventListener("keyup", () => {
      startHour.value = rangeTime(startHour.value,0);
      let count = countTime(startHour,endHour);
      getTime.textContent = `Tiempo despierto: ${count[0]}`;
      errTime.style.display = count[1];
      errTime.id = count[2];
      errTime.textContent = count[3];
   });
   endHour.addEventListener("keyup", () => {
      endHour.value = rangeTime(endHour.value,0);
      let count = countTime(startHour,endHour);
      getTime.textContent = `Tiempo despierto: ${count[0]}`;
      errTime.style.display = count[1];
      errTime.id = count[2];
      errTime.textContent = count[3];
   });
   time.appendChild(document.createTextNode("Desde: "));
   time.appendChild(startHour);
   time.appendChild(document.createTextNode(" h Hasta: "));
   time.appendChild(endHour);
   time.appendChild(document.createTextNode(" h"));
   time.appendChild(getTime);
   time.appendChild(errTime);
   return time;
}
const createAdds = (modo,n) => {'use strict';
   let container_right = document.createElement("div");
   container_right.classList.add("f22__right-content");
   let div = document.createElement("div");
   div.classList.add("f22__right-div");
   let name = document.createElement("div");
   name.textContent = "Nombre:";
   let nameInput = document.createElement("div");
   nameInput.classList.add("f22__right-input");
   nameInput.setAttribute("contenteditable","true");
   let when = document.createElement("div");
   let whenInput = document.createElement("div");
   whenInput.classList.add("f22__right-input");
   if (modo == 1) {
      when.textContent = "Hora:";
      let startHour = document.createElement("input");
      startHour.classList.add("f22__right-input-number");
      startHour.type = "number";
      startHour.setAttribute("min","-1");
      startHour.setAttribute("max","25");
      let endHour = document.createElement("input");
      endHour.classList.add("f22__right-input-number");
      endHour.type = "number";
      endHour.setAttribute("min","-1");
      endHour.setAttribute("max","25");
      let getTime = document.createElement("p");
      getTime.classList.add("f22__commit-get");
      let errTime = document.createElement("p");
      errTime.classList.add("f22__ERR");
      errTime.style.display = "none";
      startHour.addEventListener("keyup", () => {
         startHour.value = rangeTime(startHour.value,1);
         let count = countCommit(startHour,endHour);
         if (count[0] == 1) getTime.textContent = `Tiempo Invertido: ${count[0]} hora`;
         else getTime.textContent = `Tiempo Invertido: ${count[0]} horas`;
         errTime.style.display = count[1];
         errTime.id = count[2];
         errTime.textContent = count[3];
      });
      endHour.addEventListener("keyup", () => {
         endHour.value = rangeTime(endHour.value,1);
         let count = countCommit(startHour,endHour);
         if (count[0] == 1) getTime.textContent = `Tiempo Invertido: ${count[0]} hora`;
         else getTime.textContent = `Tiempo Invertido: ${count[0]} horas`;
         errTime.style.display = count[1];
         errTime.id = count[2];
         errTime.textContent = count[3];
      });
      if (data[modo] && n != -1) {
         startHour.value = data[modo][n][1][0];
         endHour.value = data[modo][n][1][1] + 1;
         if (data[modo][n][1][2] == 1) getTime.textContent = `Tiempo Invertido: ${data[modo][n][1][2]} hora`;
         else getTime.textContent = `Tiempo Invertido: ${data[modo][n][1][2]} horas`;
      }
      whenInput.appendChild(document.createTextNode("Desde: "));
      whenInput.appendChild(startHour);
      whenInput.appendChild(document.createTextNode(" h "));
      whenInput.appendChild(document.createTextNode(" Hasta:"));
      whenInput.appendChild(endHour);
      whenInput.appendChild(document.createTextNode(" h"));
      whenInput.appendChild(getTime);
      whenInput.appendChild(errTime);
   } else {
      when.textContent = "Duración:";
      let hour = document.createElement("input");
      hour.classList.add("f22__right-input-number");
      hour.type = "number";
      hour.setAttribute("min","-1");
      hour.setAttribute("max","24");
      let getTime = document.createElement("p");
      getTime.classList.add("f22__commit-get");
      let errTime = document.createElement("p");
      errTime.classList.add("f22__ERR");
      errTime.style.display = "none";
      if (data[2]) {
         hour.value = data[2][0];
      }
      hour.addEventListener("keyup", () => {
         hour.value = rangeTime(hour.value,2);
         if (hour.value == 0) {
            errTime.style.display = "block";
            errTime.id = "err";
            errTime.textContent = "Error";
         } else if (hour.value > 4) {
            errTime.style.display = "block";
            errTime.id = "err";
            errTime.textContent = "Exceso de Tiempo invertido";
         } else {
            errTime.style.display = "none";
            errTime.id = "";
            errTime.textContent = "";
         }
      });
      if (data[modo] && n != -1) {
         hour.value = data[modo][n][1][0];
      }
      whenInput.appendChild(hour);
      whenInput.appendChild(document.createTextNode(" horas"));
      whenInput.appendChild(getTime);
      whenInput.appendChild(errTime);
   }
   let description = document.createElement("div");
   description.textContent = "Propósito:";
   let descriptionInput = document.createElement("textarea");
   descriptionInput.classList.add("f22__right-input");
   descriptionInput.setAttribute("contenteditable","true");
   let type = document.createElement("div");
   type.textContent = "Tipo:";
   let typeInput = document.createElement("select");
   typeInput.classList.add("f22__right-input");
   let zeroOption = document.createElement("option");
   zeroOption.value = 0;
   zeroOption.textContent = "Meditar";
   let oneOption = document.createElement("option");
   oneOption.value = 1;
   oneOption.textContent = "Ejercicitar";
   let twoOption = document.createElement("option");
   twoOption.value = 2;
   twoOption.textContent = "Limpiar";
   let threeOption = document.createElement("option");
   threeOption.value = 3;
   threeOption.textContent = "Estudiar";
   let fourOption = document.createElement("option");
   fourOption.value = 4;
   fourOption.textContent = "Trabajar";
   let fiveOption = document.createElement("option");
   fiveOption.value = 5;
   fiveOption.textContent = "Aprender algo";
   let sixOption = document.createElement("option");
   sixOption.value = 6;
   sixOption.textContent = "Descansar";
   let sevenOption = document.createElement("option");
   sevenOption.value = 7;
   sevenOption.textContent = "Administrar";
   let eightOption = document.createElement("option");
   eightOption.value = 8;
   eightOption.textContent = "Social";
   let nineOption = document.createElement("option");
   nineOption.value = 9;
   nineOption.textContent = "Ocio";
   typeInput.appendChild(zeroOption);
   typeInput.appendChild(oneOption);
   typeInput.appendChild(twoOption);
   typeInput.appendChild(threeOption);
   typeInput.appendChild(fourOption);
   typeInput.appendChild(fiveOption);
   typeInput.appendChild(sixOption);
   typeInput.appendChild(sevenOption);
   typeInput.appendChild(eightOption);
   typeInput.appendChild(nineOption);
   if (data[modo] && n != -1) setTimeout(() => typeInput.selectedIndex = parseInt(data[modo][n][3][0]),200);
   let weekName = document.createElement("div");
   weekName.textContent = "Días:";
   let weekInputs = document.createElement("div");
   weekInputs.classList.add("f22__right-input");
   for (let i = 0; i < 7; i++) {
      let week = document.createElement("input");
      week.classList.add("f22__right-inactive");
      week.setAttribute("id",i);
      week.type = "button";
      switch (i) {
         case 0: week.value = "Domingo";		break;
         case 1: week.value = "Lunes";		break;
         case 2: week.value = "Martes";		break;
         case 3: week.value = "Miércoles";	break;
         case 4: week.value = "Jueves";		break;
         case 5: week.value = "Viernes";		break;
         case 6: week.value = "Sábado";		break;
      }
      if (data[modo] && n != -1) {
         if (data[modo][n][4].includes(`${i}`)) week.classList.replace("f22__right-inactive","f22__right-active");
      }
      week.addEventListener("click",() => {
         if (week.className == "f22__right-inactive") {
            week.classList.replace("f22__right-inactive","f22__right-active");
         } else if (week.className == "f22__right-active") {
            week.classList.replace("f22__right-active","f22__right-inactive");
         } else {
            week.classList.replace("f22__ERR","f22__right-active");
            document.querySelectorAll(".f22__right-div .f22__right-input:nth-child(10) .f22__ERR").forEach(e => {
               e.classList.replace("f22__ERR","f22__right-inactive");
            })
         }
      });
      weekInputs.appendChild(week);
   }
   if (data[modo] && n != -1) {
      let info = data[modo][n];
      nameInput.textContent = info[0];
      descriptionInput.textContent = info[2];
      typeInput.value = info[3];
   }
   div.appendChild(name);
   div.appendChild(nameInput);
   div.appendChild(when);
   div.appendChild(whenInput);
   div.appendChild(description);
   div.appendChild(descriptionInput);
   div.appendChild(type);
   div.appendChild(typeInput);
   div.appendChild(weekName);
   div.appendChild(weekInputs);
   container_right.appendChild(div);
   let delete_div = document.createElement('div');
   let delete_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   delete_svg.classList.add("f22__right__delete");
   delete_svg.setAttribute("viewbox","0 0 15 15");
   let delete_head = document.createElementNS("http://www.w3.org/2000/svg", "path");
   delete_head.setAttribute("d",`M2 3 H8 Q9 3 9 2 T8 1 L7 1 Q6.7 .15 6 .15 L4 .15 Q3.3 .15 3 1 L2 1 Q1 1 1 2 T2 3z
   M2 2.5 H8 Q8.5 2.5 8.5 2 T8 1.5 L2 1.5 Q1.5 1.5 1.5 2 T2 2.5z
   M3.75 1  H6.25 Q6.5 1 6.5 .75 T6.25 .5 L3.75 .5 Q3.5 .5 3.5 .75 T3.75 1z`);
   let delete_body = document.createElementNS("http://www.w3.org/2000/svg", "path");
   delete_body.setAttribute("d",`M2 2.5 V9 Q2 10 3 10 L7 10 Q8 10 8 9 L8 2.5z
   M2.5 3 V9 Q2.5 9.5 3 9.5 L7 9.5 Q7.5 9.5 7.5 9 L7.5 3z
   M3 4.5 V8 Q3 8.5 3.3 8.5 T3.6 8 L3.6 4.5 Q3.6 4 3.3 4 T3 4.5z
   M4.7 4.5 V8 Q4.7 8.5 5 8.5 T5.3 8 L5.3 4.5 Q5.3 4 5 4 T4.7 4.5z
   M6.4 4.5 V8 Q6.4 8.5 6.7 8.5 T7 8 L7 4.5 Q7 4 6.7 4 T6.4 4.5z`);
   delete_svg.appendChild(delete_head);
   delete_svg.appendChild(delete_body);
   container_right.appendChild(delete_svg);
   return container_right;
}
const createQuestCommitments = () => {'use strict';
   let commitments = document.createElement("div");
   commitments.classList.add("f22__commit");
   let commitleft = document.createElement("div");
   commitleft.classList.add("f22__commit__left");
   let addCommitments = document.createElement("input");
   addCommitments.classList.add(`f22__commit__left-button`);
   addCommitments.type = "button";
   addCommitments.value = "+";
   let right = document.createElement("div");
   right.classList.add("f22__right");
   commitleft.appendChild(addCommitments);
   if (data[1]) {
      for (let i = 0; i < data[1].length; i++) {
         let div = createAdds(1,i);
         right.appendChild(div);
         validarTiempos(1);
         div.querySelector(".f22__right__delete").addEventListener("click", () => div.remove());
      }
   }
   addCommitments.addEventListener("click", () => {
      let div = createAdds(1,-1);
      right.appendChild(div);
      div.querySelector(".f22__right__delete").addEventListener("click", () => div.remove());
   });
   commitments.appendChild(commitleft);
   commitments.appendChild(right);
   return commitments;
}
const createQuestObjectives = () => {'use strict';
   let objectives = document.createElement("div");
   objectives.classList.add("f22__object");
   let objectleft = document.createElement("div");
   objectleft.classList.add("f22__object__left");
   let addObjectives = document.createElement("input");
   addObjectives.classList.add(`f22__object__left-button`);
   addObjectives.type = "button";
   addObjectives.value = "+";
   let right = document.createElement("div");
   right.classList.add("f22__right");
   objectleft.appendChild(addObjectives);
   if (data[2]) {
      for (let i = 0; i < data[2].length; i++) {
         let div = createAdds(2,i);
         right.appendChild(div);
         validarTiempos(1);
         div.querySelector(".f22__right__delete").addEventListener("click", () => div.remove());
      }
   }
   addObjectives.addEventListener("click", () => {
      let div = createAdds(2,-1);
      right.appendChild(div);
      div.querySelector(".f22__right__delete").addEventListener("click", () => div.remove());
   });
   objectives.appendChild(objectleft);
   objectives.appendChild(right);
   return objectives;
}
const activeERR = () => {
   let content = document.querySelector(".f22__quest");
   if (!content.querySelector(".f22__ERR")) {
      let err = document.createElement("div");
      err.classList.add("f22__ERR");
      err.textContent = "Completa el campo";
      content.appendChild(err);
      setTimeout(() => err.remove(),1000);
   }
}
const validarTiempos = mode => {
   let date = document.querySelector(".f22__admin__date");
   let max = data[0][2] + 2;
   if (mode == 0) {
      if (date.children.length != 0) date.querySelectorAll("div").forEach(event => event.remove())
      let row = [1,2];
      for (let i = 0; i < 7; i++) {
         let div = document.createElement("div");
         div.style.gridRow = `${row[0]} / ${row[1]}`;
         switch (row[0]) {
            case 1:	div.textContent = "D";	break;
            case 2:	div.textContent = "L";	break;
            case 3:	div.textContent = "M";	break;
            case 4:	div.textContent = "X";	break;
            case 5:	div.textContent = "J";	break;
            case 6:	div.textContent = "V";	break;
            default:div.textContent = "S";	break;
         }
         date.appendChild(div);
         let day = createElementDiv("","f22__admin__date-t",`${row[0]} / 2 / ${row[1]} / ${max}`);
         date.appendChild(day);
         row[0]++;
         row[1]++;
      }
   } else if (mode == 1) {
      if (date.children.length != 0) date.querySelectorAll("div").forEach(event => event.remove())
      let row = [1,2];
      for (let i = 0; i < 7; i++) {
         let active = true;
         let min = 2;
         let div = document.createElement("div");
         div.style.gridRow = `${row[0]} / ${row[1]}`;
         switch (row[0]) {
            case 1:	div.textContent = "D";	break;
            case 2:	div.textContent = "L";	break;
            case 3:	div.textContent = "M";	break;
            case 4:	div.textContent = "X";	break;
            case 5:	div.textContent = "J";	break;
            case 6:	div.textContent = "V";	break;
            default:div.textContent = "S";	break;
         }
         date.appendChild(div);
         if (data[1] && data[1] != "") {
            let arr = data[1];
            let days = [0,0,0,0,0,0,0];
            let memory = [0,0,0,0,0,0,0];
            for (let i = 0; i < arr.length; i++) {
               for (let j = 0; j < 7; j++) {
                  if (arr[i][4].includes(`${j}`)) days[j]++;
               }
            }
            let duration = 0;
            for (let j = 0; j < arr.length; j++) {
               if (arr[j][4].includes(`${i}`)) {
                  let day;
                  if (arr[j][1][2] + min + duration > max) {
                     day = createElementDiv("","f22__admin__date-r",`${row[0]} / ${duration + min} / ${row[1]} / ${arr[j][1][2] + min + duration}`);
                  }
                  else day = createElementDiv("","f22__admin__date-g",`${row[0]} / ${duration + min} / ${row[1]} / ${arr[j][1][2] + min + duration}`);
                  date.appendChild(day);
                  memory[i]++;
                  if (memory[i] == days[i]) {
                     min += arr[j][1][2] + duration;
                  }
                  duration += arr[j][1][2];
                  active = false;
               }
            }
         }
         if (data[2] && data[2] != "") {
            let arr = data[2];
            let days = [0,0,0,0,0,0,0];
            let memory = [0,0,0,0,0,0,0];
            for (let i = 0; i < arr.length; i++) {
               for (let j = 0; j < 7; j++) {
                  if (arr[i][4].includes(`${j}`)) days[j]++;
               }
            }
            let duration = 0;
            for (let j = 0; j < arr.length; j++) {
               if (arr[j][4].includes(`${i}`)) {
                  let day;
                  if (arr[j][1][0] + min + duration > max) {
                     day = createElementDiv("","f22__admin__date-r",`${row[0]} / ${duration + min} / ${row[1]} / ${arr[j][1][0] + min + duration}`);
                  }
                  else day = createElementDiv("","f22__admin__date-b",`${row[0]} / ${duration + min} / ${row[1]} / ${arr[j][1][0] + min + duration}`);
                  date.appendChild(day);
                  memory[i]++;
                  if (memory[i] == days[i]) {
                     min += arr[j][1][0] + duration;
                  }
                  duration += arr[j][1][0];
                  active = false;
               }
            }
         }
         if (active || (min != 2 && min < max)) {
            let free = createElementDiv("","f22__admin__date-t",`${row[0]} / ${min} / ${row[1]} / ${max}`);
            date.appendChild(free);
         }
         row[0]++;
         row[1]++;
      }
   }
}
const obeserver = (name) => {
}
const changeStyle = (obj, color) => {'use strict';
   obj.style.color = color;
   obj.style.border = `4px dashed ${color}`
}
const importarSchedule = () => {'use strict';
   let develop = document.querySelector(".f22__develop");
   if (develop.hasChildNodes() == true) {
      develop.children[1].remove();
      develop.children[0].remove();
   } else {
      let title = document.createElement("h3");
      title.classList.add("f22__import-title");
      title.textContent = "Suba su horario";
      let box = document.createElement("div");
      box.classList.add("f22__import-box");
      box.textContent = "Arrastre o";
      let entrada = document.createElement("span");
      entrada.textContent = "suba un archivo";
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      box.appendChild(entrada);
      develop.appendChild(title);
      develop.appendChild(box);
      input.addEventListener("change", (e) => {'use strict';
         const reader = new FileReader();
         reader.readAsText(e.target.files[0]);
         reader.addEventListener("load", e => {'use strict';
            addObject(JSON.parse(e.currentTarget.result));
         });
      });
      entrada.addEventListener("click", () => {input.click()});
      box.addEventListener("dragover", e => {'use strict';
         e.preventDefault();
         changeStyle(e.target, "#444");
      });
      box.addEventListener("dragleave", e => {'use strict';
         e.preventDefault();
         changeStyle(e.target, "#888");
      });
      box.addEventListener("drop", e => {'use strict';
         e.preventDefault();
         changeStyle(e.target, "#888");
         box.style.border = "4px solid #888";
         const reader = new FileReader();
         reader.readAsText(e.dataTransfer.files[0]);
         reader.addEventListener("load", e => {'use strict';
            addObject(JSON.parse(e.currentTarget.result));
         });
      });
   }
}
const validarExistencia = e => {
   let develop = document.querySelector(".f22__develop");
   if (develop.hasChildNodes() == false) {
      if (document.querySelector(".f22__time-content").children.length == 1 && e.className != "f22__time") {
         activeERR();
         document.querySelector(".f22__time-content input").classList.remove("f22__time-Button");
         document.querySelector(".f22__time-content input").classList.add("f22__ERR");
         setTimeout(() => {
            document.querySelector(".f22__time-content input").classList.remove("f22__ERR");
            document.querySelector(".f22__time-content input").classList.add("f22__time-Button");
         },1000);
      } else {
         let options = document.createElement("div");
         options.classList.add("f22__options");
         let saveButton = document.createElement("input");
         saveButton.classList.add("f22__options-button");
         saveButton.type = "submit";
         saveButton.value = "Guardar";
         let deleteButton = document.createElement("input");
         deleteButton.classList.add("f22__options-button");
         deleteButton.type = "submit";
         deleteButton.value = "Eliminar";
         saveButton.addEventListener("click", () => {
            let divContent = document.querySelector(`.${e.className}`);
            if (e.className == "f22__time" && !document.getElementById("err")) {
               let info = [];
               divContent.querySelectorAll("input").forEach(input => info.push(input.value));
               if (!info.includes("")) {
                  info.push(divContent.querySelector(".f22__time-get").textContent.split(" ")[2]);
                  let divInfo = document.createElement("div");
                  divInfo.classList.add("f22__time-data");
                  divInfo.textContent = `${info[0]} h - ${info[1]} h`;
                  document.querySelector(".f22__admin__time").textContent = info[2] + " :00 horas";
                  document.querySelector(".f22__admin__time").style.minWidth = "160px";
                  document.querySelector(".f22__admin__time").style.borderBottomWidth = "1px";
                  document.querySelector(".f22__admin__date").style.gridTemplateColumns = `repeat(${info[2]},1fr)`;
                  if (document.querySelector(".f22__time-content").children.length == 1) {
                     document.querySelector(".f22__time-content").appendChild(divInfo);
                  } else {
                     document.querySelector(".f22__time-data").remove();
                     document.querySelector(".f22__time-content").appendChild(divInfo);
                  }
                  data[0] = [parseInt(info[0]),parseInt(info[1]) - 1,parseInt(info[2])];
                  validarTiempos(0);
               } else {
                  document.querySelector(".f22__time .f22__ERR").style.display = "block";
                  document.querySelector(".f22__time .f22__ERR").textContent = "Completa los campos";
                  setTimeout(() => {
                     document.querySelector(".f22__time .f22__ERR").style.display = "none";
                  },1000);
               }
            } else if (e.className == "f22__commit" || e.className == "f22__object") {
               let info = [];
               let err = false;
               divContent.querySelectorAll(".f22__right .f22__right-div").forEach(content => {
                  let subinfo = [];
                  for (let i = 1; i < 10; i+=2) {
                     if (i == 1) {
                        if (content.children[i].textContent == "") {
                           content.children[i].classList.remove("f22__right-input");
                           content.children[i].classList.add("f22__ERR");
                           content.children[i].addEventListener("keyup",() => {
                              content.children[i].classList.remove("f22__ERR");
                              content.children[i].classList.add("f22__right-input");
                           })
                           err = true;
                        }
                        subinfo.push(content.children[i].textContent);
                     } else if (i == 3) {
                        let temporal = [];
                        content.children[i].querySelectorAll("input").forEach(input => {
                           if (input.value == "") {
                              input.classList.add("f22__ERR");
                              input.addEventListener("keyup",() => input.classList.remove("f22__ERR"))
                              err = true;
                           }
                           temporal.push(input.value);
                        });
                        temporal[0] = parseInt(temporal[0]);
                        temporal[1] = parseInt(temporal[1]) - 1;
                        if (e.className == "f22__commit") temporal[2] = parseInt(content.children[i].querySelector(`.${e.className}-get`).textContent.split(" ")[2]);
                        subinfo.push(temporal);
                     } else if (i == 5) {
                        subinfo.push(content.children[i].value);
                     } else if (i == 7) {
                        subinfo.push([content.children[i].value,content.children[i].value]);
                     } else if (i == 9) {
                        let temporal = [];
                        content.children[i].querySelectorAll(".f22__right-active").forEach(input => {
                           temporal.push(input.id);
                        });
                        if (temporal.length == 0) {
                           content.children[i].querySelectorAll(".f22__right-input input[type='button']").forEach(input => {
                              input.classList.replace("f22__right-inactive","f22__ERR");
                              err = true;
                           })
                        }
                        subinfo.push(temporal);
                     }
                  }
                  if (!err) {
                     info.push(subinfo);
                     let divInfo = document.createElement("div");
                     if (e.className == "f22__commit") {
                        data[1] = info;
                        divInfo.textContent = `Compromisos: ${info.length}`;
                     } else {
                        data[2] = info;
                        divInfo.textContent = `Objetivos: ${info.length}`;
                     }
                     divInfo.classList.add(`${e.className}-data`);
                     if (document.querySelector(`.${e.className}-content`).children.length == 1) {
                        document.querySelector(`.${e.className}-content`).appendChild(divInfo);
                     } else {
                        document.querySelector(`.${e.className}-data`).remove();
                        document.querySelector(`.${e.className}-content`).appendChild(divInfo);
                     }
                  }
               });
               if (info == "" && !err) {
                  let divInfo = document.createElement("div");
                  if (e.className == "f22__commit") {
                     data[1] = info;
                     divInfo.textContent = `Compromisos: ${info.length}`;
                  } else {
                     data[2] = info;
                     divInfo.textContent = `Objetivos: ${info.length}`;
                  }
                  divInfo.classList.add(`${e.className}-data`);
                  if (document.querySelector(`.${e.className}-content`).children.length == 1) {
                     document.querySelector(`.${e.className}-content`).appendChild(divInfo);
                  } else {
                     document.querySelector(`.${e.className}-data`).remove();
                     document.querySelector(`.${e.className}-content`).appendChild(divInfo);
                  }
                  validarTiempos(1);
               } else if (err) {
                  if (document.querySelector(`.${e.className}-data`)) {
                     document.querySelector(`.${e.className}-data`).remove();
                  }
                  obeserver(e.className);
               } else if (info != "") {
                  validarTiempos(1);
               }
            }
         });
         deleteButton.addEventListener("click", () => {
            let divContent = document.querySelector(`.${e.className}`);
            if (e.className == "f22__time") {
               data[0] = undefined;
               divContent.querySelectorAll("input").forEach(input => input.value = "");
               if (document.querySelector(".f22__time-data")) document.querySelector(".f22__time-data").remove();
            } else if (e.className == "f22__commit" || e.className == "f22__object") {
               let index = divContent.querySelectorAll(".f22__right-content").length;
               let name = e.className;
               for (let i = 0; i < index; i++) document.querySelector(".f22__right").removeChild(document.querySelector(".f22__right-content"));
               if (document.querySelector(`.${name}-data`)) document.querySelector(`.${name}-data`).remove();
               if (e.className == "f22__commit") data[1] = undefined;
               else data[2] = undefined;
            }
         });
         options.appendChild(saveButton);
         options.appendChild(deleteButton);
         develop.appendChild(e);
         develop.appendChild(options);
      }
   } else {
      develop.children[1].remove();
      develop.children[0].remove();
   }
}
const createElementDiv = (content,clase,grid_area) => {'use strict';
   let day = document.createElement("div");
   day.classList.add(clase);
   day.textContent = content;
   day.style.gridArea = `${grid_area}`;
   return day;
}
const create__modal = (info,modo,key,day,id,start,end) => {'use strict';
   let element = info[modo][key];
   let background = document.createElement("div");
   background.classList.add("f22__modal-background");
   let content = document.createElement("div");
   content.classList.add("f22__modal");
   let button_delete = document.createElement("input");
   button_delete.type = "button";
   button_delete.value = "X";
   button_delete.addEventListener("click", () => background.remove());
   let title = document.createElement("h2");
   switch (day) {
      case 0: title.textContent = "Domingo";		break;
      case 1: title.textContent = "Lunes";		break;
      case 2: title.textContent = "Martes";		break;
      case 3: title.textContent = "Miércoles";	break;
      case 4: title.textContent = "Jueves";		break;
      case 5: title.textContent = "Viernes";		break;
      case 6: title.textContent = "Sábado";		break;
   }
   let div_content = document.createElement("div");
   div_content.classList.add("f22__modal-content");
   // Nombre
   let div_name = document.createElement("div");
   div_name.classList.add("f22__modal__name");
   let div_name_container = document.createElement("div");
   div_name_container.classList.add("f22__modal__name-container");
   let div_name_content = document.createElement("div");
   div_name_content.classList.add("f22__modal__name-content");
   div_name_content.textContent = element[0];
   div_name_content.setAttribute("contenteditable","true");
   let div_name_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   div_name_icon.setAttribute("viewbox","0 0 25 25");
   div_name_icon.style.fill = "#222";
   let div_name_icon_body = document.createElementNS("http://www.w3.org/2000/svg", "path");
   div_name_icon_body.setAttribute("d",`M0 25 H3.5 L18.75 10 L15 6.25 L0 21.25z M20 8.75 L22.5 6.25 Q23 5.625 22.5 5 L20 2.5 Q19.375 1.875 18.75 2.5 L16.25 5z`);
   let div_name_icon_footer = document.createElementNS("http://www.w3.org/2000/svg", "path");
   let available = false;
   div_name_icon_footer.setAttribute("d",`M7.5 25 H25 L25 20 L12.5 20z`);
   div_name_content.addEventListener("keyup", () => {
      if (div_name_icon.style.fill == "rgb(34, 34, 34)") div_name_icon.style.fill = "#000";
   })
   div_name_icon.addEventListener("click", () => {
      if (available) {
         if (window.confirm("Estás seguro de cambiarle el nombre a " + element[0])) {
            renameObject(info,modo,key,0,id,div_name_content.textContent);
            location.reload(true);
         }
      }
   })
   div_name_container.appendChild(div_name_content);
   div_name.appendChild(div_name_container);
   div_name_icon.appendChild(div_name_icon_body);
   div_name_icon.appendChild(div_name_icon_footer);
   div_name.appendChild(div_name_icon);
   // Duración y Tipo
   let div_technical = document.createElement("div");
   div_technical.classList.add("f22__modal-technical");
   let div_technical_hour = document.createElement("div");
   div_technical_hour.textContent = `Hora: ${start}h - ${end}h`;
   let div_technical_description = document.createElement("div");
   if (modo == 1 && element[1][2] > 1) div_technical_description.textContent = `Duración: ${element[1][2]} horas`;
   else if (modo == 1 && element[1][2] == 1) div_technical_description.textContent = `Duración: ${element[1][2]} hora`;
   else if (modo == 2 && element[1][0] > 1) div_technical_description.textContent = `Duración: ${element[1][0]} horas`;
   else div_technical_description.textContent = `Duración: ${element[1][0]} hora`;
   let div_technical_type = document.createElement("div");
   switch (parseInt(element[3][0])) {
      case 0:	div_technical_type.textContent = "Tipo: Meditar";			break;
      case 1:	div_technical_type.textContent = "Tipo: Ejercitar";		break;
      case 2:	div_technical_type.textContent = "Tipo: Limpieza";			break;
      case 3:	div_technical_type.textContent = "Tipo: Estudiar";			break;
      case 4:	div_technical_type.textContent = "Tipo: Trabajar";			break;
      case 5:	div_technical_type.textContent = "Tipo: Aprender algo";	break;
      case 6:	div_technical_type.textContent = "Tipo: Descansar";		break;
      case 7:	div_technical_type.textContent = "Tipo: Administrar";		break;
      case 8:	div_technical_type.textContent = "Tipo: Social";			break;
      case 9:	div_technical_type.textContent = "Tipo: Ocio";				break;
      default:div_technical_type.textContent = "Tipo: None";				break;
   }
   div_technical.appendChild(div_technical_hour);
   div_technical.appendChild(div_technical_description);
   div_technical.appendChild(div_technical_type);
   // Descripciones
   let div_description = document.createElement("div");
   div_description.classList.add("f22__modal-description");
   let div_description_text = document.createElement("div");
   div_description.textContent = "Descripción:";
   div_description_text.style.whiteSpace = "pre-wrap";
   div_description_text.innerHTML = element[2];
   div_description.appendChild(div_description_text);
   // Recomendación
   let div_recomendation = document.createElement("div");
   div_recomendation.classList.add("f22__modal-recomendation");
   let div_recomendation_content = document.createElement("div");
   div_recomendation_content.classList.add("f22__modal-recomendation-content");
   div_recomendation_content.textContent = "NULL";
   div_recomendation.appendChild(div_recomendation_content);
   // Botton de completo
   let div_complete = document.createElement("div");
   div_complete.classList.add("f22__modal-complete");
   let div_complete_input = document.createElement("input");
   div_complete_input.type = "button";
   div_complete_input.value = "OK";
   div_complete_input.addEventListener("click",() => background.remove())
   div_complete.appendChild(div_complete_input);
   content.appendChild(button_delete);
   content.appendChild(title);
   div_content.appendChild(div_name);
   div_content.appendChild(div_technical);
   div_content.appendChild(div_description);
   div_content.appendChild(div_recomendation);
   div_content.appendChild(div_complete);
   content.appendChild(div_content);
   background.appendChild(content);
   container.appendChild(background);
}
const crearSchedule = (key,information) => {'use strict';
   let inf = information;
   document.querySelector(`.f22__develop`).remove();
   document.querySelector(`.f22__quest`).remove();
   document.querySelector(`.f22__admin`).remove();
   let dayContent = document.createElement("div");
   dayContent.classList.add("f22__days-content");
   let options = document.createElement("div");
   options.textContent = "Horas";
   options.classList.add("f22__days-day");
   let sunday = document.createElement("div");
   sunday.classList.add("f22__days-day");
   sunday.textContent = "Domingo";
   let monday = document.createElement("div");
   monday.classList.add("f22__days-day");
   monday.textContent = "Lunes";
   let tuesday = document.createElement("div");
   tuesday.classList.add("f22__days-day");
   tuesday.textContent = "Martes";
   let wednesday = document.createElement("div");
   wednesday.classList.add("f22__days-day");
   wednesday.textContent = "Miércoles";
   let thursday = document.createElement("div");
   thursday.classList.add("f22__days-day");
   thursday.textContent = "Jueves";
   let friday = document.createElement("div");
   friday.classList.add("f22__days-day");
   friday.textContent = "Viernes";
   let saturday = document.createElement("div");
   saturday.classList.add("f22__days-day");
   saturday.textContent = "Sábado";
   dayContent.appendChild(options);
   dayContent.appendChild(sunday);
   dayContent.appendChild(monday);
   dayContent.appendChild(tuesday);
   dayContent.appendChild(wednesday);
   dayContent.appendChild(thursday);
   dayContent.appendChild(friday);
   dayContent.appendChild(saturday);
   let divDay = document.createElement("div");
   // console.log(inf[0]); // Complete
   // console.log(inf[1]); // Complete
   // console.log(inf[2]); // Complete
   let hour = inf[0][0];
   // Crear Filas configuradas
   for (let k = 0; k < inf[0][2]; k++) {
      for (let j = 0; j <= 7; j++) {
         // Crear Columnas configuradas
         if (hour == 24) {
            hour = 0;
         }
         if (j == 0) {
            let day = createElementDiv(`${hour++}:00 h`,`f22__days-day-${j}`,`${k + 2} / 1 / ${k + 3} / 2`);
            divDay.appendChild(day);
         } else {
            // Configurando Compromisos
            if (inf[1].length != 0) {
               all:for (let l = 0; l < inf[1].length; l++) {
                  let comit = inf[1][l];
                  if (comit[4].includes(`${j - 1}`) && comit[1][0] <= comit[1][1] && (comit[1][0] <= hour - 1 && hour - 1 <= comit[1][1])) {
                     if (comit[1][0] == hour - 1) {
                        let day = createElementDiv(comit[0],`f22__days-day-${j}`,`${k + 2} / ${j + 1} / ${comit[1][2] - 1 + k + 3} / ${j + 2}`);
                        day.id = `${comit[1][0]}/${comit[1][1] + 1}/${l}`;
                        divDay.appendChild(day);
                     }
                     break all;
                  } else if (comit[4].includes(`${j - 1}`) && comit[1][0] > comit[1][1] && (comit[1][0] <= hour - 1 || hour - 1 <= comit[1][1])) {
                     if (comit[1][0] == hour - 1) {
                        let day = createElementDiv(comit[0],`f22__days-day-${j}`,`${k + 2} / ${j + 1} / ${comit[1][2] - 1 + k + 3} / ${j + 2}`);
                        day.id = `${comit[1][0]}/${comit[1][1] + 1}/${l}`;
                        divDay.appendChild(day);
                     }
                     break all;
                  } else if (l == inf[1].length - 1) {
                     let day = createElementDiv("Libre",`f22__days-day-${j}`,`${k + 2} / ${j + 1} / ${k + 3} / ${j + 2}`);
                     day.id = `${k + 2}/${k + 3}`;
                     divDay.appendChild(day);
                  }
               }
            } else {
               let day = createElementDiv("Libre",`f22__days-day-${j}`,`${k + 2} / ${j + 1} / ${k + 3} / ${j + 2}`);
               day.id = `${k + 2}/${k + 3}`;
               divDay.appendChild(day);
            }
         }
      }
   }
   // Ordenar la información
   let info = [];
   let temporalUno = 0;
   let temporalDos = 0;
   for (let j = 0; j <= 7; j++) {
      let subinfo = [];
      let first = false;
      let divDays = divDay.querySelectorAll(`.f22__days-day-${j}`);
      // Reduciendo información (Libres);
      for (let k = 0; k < divDays.length; k++) {
         if (divDays[k].textContent == "Libre" && first == false && k + 1 != divDays.length) {
            temporalUno = divDays[k].style.gridArea.split(" / ")[0];
            temporalDos = divDays[k].style.gridArea.split(" / ")[2];
            first = true;
         } else if (divDays[k].textContent == "Libre" && first == true && k + 1 != divDays.length) {
            temporalDos = divDays[k].style.gridArea.split(" / ")[2];
         } else if (divDays[k].textContent != "Libre" && first == true) {
            // Envía los libres entre medio de compromisos
            let startHour = inf[0][0] + parseInt(temporalUno) - 2;
            let endHour = inf[0][0] + parseInt(temporalDos) - 3;
            subinfo.push(["Libre",`${temporalUno} / ${j + 1} / ${temporalDos} / ${j + 2}`,`${startHour}/${endHour}`]);
            subinfo.push([divDays[k].textContent,divDays[k].style.gridArea,divDays[k].id]);
            first = false;
         } else if (divDays[k].textContent == "Libre" && first == true) {
            // Enía los libres sobrantes o completos
            let startHour = inf[0][0] + parseInt(temporalUno) - 2;
            let endHour = inf[0][0] + parseInt(temporalDos) - 3;
            subinfo.push(["Libre",`${temporalUno} / ${j + 1} / ${parseInt(temporalDos) + 1} / ${j + 2}`,`${startHour}/${endHour}`]);
         } else {
            // Envía Horas y los primeros compromisos
            subinfo.push([divDays[k].textContent,divDays[k].style.gridArea,divDays[k].id]);
         }
      }
      info.push(subinfo);
   }
   if (inf[2].length != 0) {
      // Configurando Objetivos
      let max = parseInt(inf[0][2]);
      for (let j = 0; j <= 7; j++) {
         if (info[j].length != 0) {
            let last_priority = [0,0,0,0,0,0,0,0,0];
            let memory = [];
            let lastMemory = 1;
            for (let k = 0; k < info[j].length; k++) {
               let free = info[j][k];
               let allPriritys = [0,0,0,0,0,0,0,0,0];
               // Suma total del maximo de objetivos en un día
               let stop = 0;
               for (let l = 0; l < inf[2].length; l++) {
                  if (inf[2][l][4].includes(`${j - 1}`)) {
                     let num = parseInt(inf[2][l][3][1]);
                     allPriritys[num] += 1;
                     stop++;
                  }
               }
               let objetivos_por_dia = 0;
               allPriritys.forEach((arr) => objetivos_por_dia += arr);
               // Definiendo objetivos
               if (free[0] == "Libre") {
                  let time = free[1].split(" / ");
                  let memoryFree = parseInt(time[0]);
                  let duration = parseInt(time[2]) - parseInt(time[0]);
                  let ajuste_perfecto = true;
                  let objectives = 0;
                  while (memory.length < stop) {
                     for (let l = 0; l < inf[2].length; l++) {
                        let object = inf[2][l];
                        // Si el compromiso se debe agregar
                        if (object[4].includes(`${j - 1}`)) {
                           if (parseInt(object[1]) <= duration && memoryFree + parseInt(object[1]) <= time[2]) {
                              // Ajuste Perfecto
                              if (ajuste_perfecto) {
                                 objectives++;
                                 if (parseInt(object[1]) == duration && !memory.includes(object[0])) {
                                    // Prioridades
                                    let n_priority = 0;
                                    let last = 0;
                                    last_priority.forEach((arr) => last += arr);
                                    n_priority = objetivos_por_dia - last;
                                    if (n_priority != 0) {
                                       let day = createElementDiv(object[0],
                                          "f22__days-day",`${memoryFree} / ${time[1]} / ${memoryFree + parseInt(object[1])} / ${time[3]}`);
                                       day.style.cursor = "pointer";
                                       day.classList.add("f22__days-day-bg")
                                       day.id = l;
                                       let moment = [inf[0][0] + memoryFree - 2,inf[0][0] + memoryFree + parseInt(object[1]) - 2];
                                       day.addEventListener("click", () => create__modal(inf,2,day.id,j-1,key,moment[0],moment[1]));
                                       dayContent.appendChild(day);
                                       memory.push(object[0]);
                                       lastMemory = object[3][1];
                                       memoryFree += parseInt(object[1]);
                                       last_priority[object[3][1]]++;
                                       l = 0;
                                    }
                                 } else if (objectives == objetivos_por_dia) {
                                    ajuste_perfecto = false;
                                 }
                              // Prioridades
                              } else if (!ajuste_perfecto && !memory.includes(object[0])) {
                                 let n_priority = 0;
                                 for (let m = 0; m < object[3][1]; m++) {
                                    n_priority += allPriritys[m] - last_priority[m];
                                 }
                                 if (n_priority == 0) {
                                    let day = createElementDiv(object[0],
                                       "f22__days-day",`${memoryFree} / ${time[1]} / ${memoryFree + parseInt(object[1])} / ${time[3]}`);
                                    day.style.cursor = "pointer";
                                    day.classList.add("f22__days-day-bg")
                                    day.id = l;
                                    let moment = [inf[0][0] + memoryFree - 2,inf[0][0] + memoryFree + parseInt(object[1]) - 2];
                                    day.addEventListener("click", () => create__modal(inf,2,day.id,j-1,key,moment[0],moment[1]));
                                    dayContent.appendChild(day);
                                    memory.push(object[0]);
                                    lastMemory = object[3][1];
                                    memoryFree += parseInt(object[1]);
                                    last_priority[object[3][1]]++;
                                    l = 0;
                                 }
                              }
                           } else if (memoryFree + parseInt(object[1]) >= time[2]) stop--;
                        }
                     }
                  }
                  if (memoryFree < time[2]) {
                     let day = createElementDiv(free[0],"f22__days-day",`${memoryFree} / ${time[1]} / ${time[2]} / ${time[3]}`);
                     dayContent.appendChild(day);
                  }
               } else {
                  let day = createElementDiv(free[0],"f22__days-day",free[1]);
                  if (max < 1) {
                     day.style.cursor = "pointer";
                     day.classList.add("f22__days-day-bg")
                     let hour = free[2].split("/");
                     day.addEventListener("click", () => create__modal(inf,1,hour[2],j-1,key,hour[0],hour[1]));
                  }
                  max--;
                  dayContent.appendChild(day);
               }
            }
         }
      }
   } else {
      // Filtar sin modificar
      for (let j = 0; j <= 7; j++) {
         if (info[j].length != 0) {
            for (let k = 0; k < info[j].length; k++) {
               let obj = info[j][k];
               let day = createElementDiv(obj[0],"f22__days-day",obj[1]);
               day.addEventListener("click", () => create__modal(inf,1,obj[2].split("/")[2],j-1,key,obj[2].split("/")[0],obj[2].split("/")[1]));
               dayContent.appendChild(day);
            }
         }
      }
   }
   let schedule = document.createElement("div");
   schedule.classList.add("f22__schedule");
   schedule.id = key;
   schedule.appendChild(dayContent);
   let div_schedule = document.createElement("div");
   div_schedule.classList.add("f22__schedule-buttons")
   let edit_schedule = document.createElement("input");
   edit_schedule.classList.add("f22__schedule-input");
   edit_schedule.type = "button";
   edit_schedule.value = "Editar";
   edit_schedule.addEventListener("click",() => {
      if (window.confirm("¿Estás seguro de editar tu horario?")) {
         data = inf;
         document.querySelector(".f22__schedule").remove();
         eliminarObject(key);
         createQuest();
      }
   })
   let delete_schedule = document.createElement("input");
   delete_schedule.classList.add("f22__schedule-input");
   delete_schedule.type = "button";
   delete_schedule.value = "Eliminar";
   delete_schedule.addEventListener("click",() => {
      if (window.confirm("¿Estás seguro de elminar tu horario?")) {
         document.querySelector(".f22__schedule").remove();
         eliminarObject(key);
         createQuest();
      }
   })
   let export_schedule = document.createElement("input");
   export_schedule.classList.add("f22__schedule-input");
   export_schedule.type = "button";
   export_schedule.value = "Exportar"
   export_schedule.addEventListener("click",() => {
      if (window.confirm("¿Estás seguro de exportar tu horario?")) {
         let content = JSON.stringify(inf)
         const a = document.createElement("a");
         const file = new Blob([content],{type: "application/json"});
         const url = URL.createObjectURL(file);
         a.href = url;
         a.download = "Horario.json";
         a.click();
         URL.revokeObjectURL(url);
      }
   })
   div_schedule.appendChild(export_schedule);
   div_schedule.appendChild(edit_schedule);
   div_schedule.appendChild(delete_schedule);
   schedule.appendChild(div_schedule)
   document.querySelector(".f22").appendChild(schedule);
}
const validarCampo = () => {'use strict';
if (document.querySelector(".f22__quest").children.length == 4) {
      if (data[0] == undefined) {
         activeERR();
         document.querySelector(".f22__time-content input").classList.remove("f22__time-Button");
         document.querySelector(".f22__time-content input").classList.add("f22__ERR");
         setTimeout(() => {
            document.querySelector(".f22__time-content input").classList.remove("f22__ERR");
            document.querySelector(".f22__time-content input").classList.add("f22__time-Button");
         },1000);
      } else if (data[1] == undefined) {
         activeERR();
         document.querySelector(".f22__commit-content input").classList.remove("f22__commit-Button");
         document.querySelector(".f22__commit-content input").classList.add("f22__ERR");
         setTimeout(() => {
            document.querySelector(".f22__commit-content input").classList.remove("f22__ERR");
            document.querySelector(".f22__commit-content input").classList.add("f22__commit-Button");
         },1000);
      } else if (data[2] == undefined) {
         activeERR();
         document.querySelector(".f22__object-content input").classList.remove("f22__object-Button");
         document.querySelector(".f22__object-content input").classList.add("f22__ERR");
         setTimeout(() => {
            document.querySelector(".f22__object-content input").classList.remove("f22__ERR");
            document.querySelector(".f22__object-content input").classList.add("f22__object-Button");
         },1000);
      } else if (document.querySelectorAll(".f22__admin__date .f22__admin__date-r").length > 0) {
      } else {
         addObject(data);
         data = [];
      }
   }
}
const createQuest = () => {'use strict';
   let quest = document.createElement("div");
   quest.classList.add("f22__quest");
   let divTime = document.createElement("div");
   divTime.classList.add("f22__time-content");
   let time = document.createElement("input");
   time.classList.add("f22__time-Button");
   time.type = "button";
   time.value = "Tiempo de Inicio y Final";
   let divCommitments = document.createElement("div");
   divCommitments.classList.add("f22__commit-content");
   let commitments = document.createElement("input");
   commitments.classList.add("f22__commit-Button");
   commitments.type = "button";
   commitments.value = "Compromisos";
   let divObjectives = document.createElement("div");
   divObjectives.classList.add("f22__object-content");
   let objectives = document.createElement("input");
   objectives.classList.add("f22__object-Button");
   objectives.type = "button";
   objectives.value = "Objetivos";
   let divButtons = document.createElement("div");
   divButtons.classList.add("f22__options-Button")
   let submit = document.createElement("input");
   submit.type = "button";
   submit.value = "Enviar";
   let import_Input = document.createElement("input");
   import_Input.type = "button";
   import_Input.value = "Importar";
   divTime.appendChild(time);
   divCommitments.appendChild(commitments);
   divObjectives.appendChild(objectives);
   divButtons.appendChild(submit);
   divButtons.appendChild(import_Input);
   quest.appendChild(divTime);
   quest.appendChild(divCommitments);
   quest.appendChild(divObjectives);
   quest.appendChild(divButtons);
   time.addEventListener("click", () => validarExistencia(createQuestTime()));
   commitments.addEventListener("click", () => validarExistencia(createQuestCommitments()));
   objectives.addEventListener("click", () => validarExistencia(createQuestObjectives()));
   submit.addEventListener("click",() => validarCampo());
   import_Input.addEventListener("click", () => importarSchedule());
   let develop = document.createElement("div");
   develop.classList.add("f22__develop");
   let admin = document.createElement("div");
   admin.classList.add("f22__admin");
   let admin_time = document.createElement("div");
   admin_time.classList.add("f22__admin__time");
   let admin_date = document.createElement("div");
   admin_date.classList.add("f22__admin__date");
   admin.appendChild(admin_time);
   admin.appendChild(admin_date);
   document.querySelector(".f22").appendChild(quest);
   document.querySelector(".f22").appendChild(develop);
   document.querySelector(".f22").appendChild(admin);
}
// Ejecución
container.innerHTML = `<div class="f22">
</div>`;