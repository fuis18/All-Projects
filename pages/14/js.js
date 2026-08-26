'use strict';
let container = document.querySelector(".container");
const fragment19 = document.createDocumentFragment();
const IDBRequest = indexedDB.open("reader",2);
const addObject = object => {'use strict';
   const IDBData = transactionOperation("readwrite","Objeto agregado correctamente");
   IDBData.add(object);
}
const readObject = () => {'use strict';
   const IDBData = transactionOperation("readonly");
   const cursor = IDBData.openCursor();
   const fragment = document.createDocumentFragment();
   cursor.addEventListener("success",()=>{
      if (cursor.result) {
         let c = cursor.result.value;
         let element = buildDiv(c.nombre, c.calculo, c.total, c.cantidad, c.tiempo, cursor.result.key, c.valor, c.lock);
         if (c.lock[0] == true) {
            document.querySelector(".f19__update__saved-content").appendChild(element);
         } else {
            document.querySelector(".f19__update__head-container").appendChild(element);
         }
         cursor.result.continue();
      }
   });
}
const modificarObject = (key, object) => {'use strict';
   const IDBData = transactionOperation("readwrite","Objeto modificado correctamente");
   IDBData.put(object, key);
}
const eliminarObject = key => {'use strict';
   const IDBData = transactionOperation("readwrite","Objeto eliminado correctamente");
   IDBData.delete(key);
}
const transactionOperation = (mode,msg) => {'use strict';
   const IDBTransaction = IDBRequest.result.transaction("books",mode);
   const objectStore = IDBTransaction.objectStore("books");
   return objectStore;
}
IDBRequest.addEventListener("upgradeneeded",()=> IDBRequest.result.createObjectStore("books",{autoIncrement: true}));
IDBRequest.addEventListener("success",() => readObject());
class Fraccion {
   constructor(numerador, denominador) {
        this.setNumerador(numerador);
        this.setDenominador(denominador);
    }
    setNumerador(numerador) {
        this.numerador = numerador;
    }
    setDenominador(denominador) {
        if (denominador === 0) {
            throw "El denominador debe ser distinto de 0";
        }
        this.denominador = denominador;
    }
   // Ayudantes
    maximoComunDivisor(a, b) {
        let temporal;//Para no perder b
        while (b != 0) {
            temporal = b;
            b = a % b;
            a = temporal;
        }
        return a;
    }
    minimoComunMultiplo(a, b) {
        return (a * b) / this.maximoComunDivisor(a, b);
    }
    simplifica() {
        const mcd = this.maximoComunDivisor(this.numerador, this.denominador);
        return new Fraccion(this.numerador / mcd, this.denominador / mcd);
    }
    toString() {
        return `${this.numerador}/${this.denominador}`;
    }
}
// Porcentaje de avance entre lo leído y lo no leido
const calculatePorcentaje = (amount,value) => {'use strict';
   let progress, result;
   if (value == undefined) {
      progress = document.querySelector(".f19__update-percentageInput").value;
      result = (progress * 100) / amount;
   } else result = (value * 100) / amount;
   return result;
}
const buildDiv = (name, calculate, timed, amount, tiempo, id, value, block) => {'use strict';
   let nameClass = "f19__update";
   let percentageNumber = calculatePorcentaje(amount, value);
   let container = document.createElement('div');
   let divMain = document.createElement('div');
   let check = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   let checkBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
   let checkFront = document.createElementNS("http://www.w3.org/2000/svg", "circle");
   let finish = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   let pathUnlock = document.createElementNS("http://www.w3.org/2000/svg", "path");
   let pathLock = document.createElementNS("http://www.w3.org/2000/svg", "path");
   let h4 = document.createElement('h4');
   let calculateTimeDiv = document.createElement('div');
   let calculateTime = document.createElement('p');
   let recommendation = document.createElement('p');
   let percentage = document.createElement('p');
   let percentageInput = document.createElement('input');
   let percentageEntire = document.createElement('p');
   let time = document.createElement('p');
   let theProgressDiv = document.createElement('div');
   let containerProgress = document.createElement('div');
   let theProgress = document.createElement('div');
   let numberProgress = document.createElement('div');
   let optionsMaths = document.createElement('div');
   let optionsButtons = document.createElement('div');
   let buttonToUpdate = document.createElement('button');
   let buttonToSave = document.createElement('button');
   let buttonDelete = document.createElement('button');
   container.classList.add(nameClass + "-div");
   divMain.classList.add(nameClass + "-main");
   container.setAttribute('id',id);
   checkBack.classList.add(nameClass + "-checkBack");
   checkBack.setAttribute('cx','5');
   checkBack.setAttribute('cy','5');
   checkBack.setAttribute('r','4.8');
   checkFront.classList.add(nameClass + "-checkFront");
   checkFront.setAttribute('cx','5');
   checkFront.setAttribute('cy','5');
   checkFront.setAttribute('r','3.5');
   checkFront.style.fill = "#ccc";
   check.classList.add(nameClass + "-check");
   pathUnlock.classList.add(nameClass + "-unLock");
   pathUnlock.style.display = "block";
   pathUnlock.setAttribute('d',"M0 5 0 3.5 Q0.5 0 3 0 T6 3.5 L6 4 5 4 5 3.5 Q4.8 1 3 1 T1 3.5 L1 5 6 5 6 10 0 10z");
   pathLock.classList.add(nameClass + "-lock");
   pathLock.setAttribute('d',"M0 5 Q0.5 1 3 1 T6 5 M5 5 Q4.5 2 3 2 T1 5 L5 5 M6 5 L6 10 0 10 0 5z");
   pathLock.style.display = "none";
   finish.classList.add(nameClass + "-finish");
   h4.classList.add(nameClass + "-name");
   h4.textContent = name;
   h4.setAttribute("contenteditable","true");
   h4.setAttribute("spellcheck","false");
   calculateTimeDiv.classList.add(nameClass + "-calculateTimeDiv");
   calculateTime.classList.add(nameClass + "-calculateTime");
   calculateTime.textContent = timed;
   recommendation.classList.add(nameClass + "-recommendation");
   recommendation.textContent = calculate;
   percentage.classList.add(nameClass + "-percentage");
   percentageInput.classList.add(nameClass + "-percentageInput");
   percentageInput.setAttribute("type","number");
   percentageInput.setAttribute("value", value);
   percentageEntire.classList.add(nameClass + "-percentageEntire");
   percentageEntire.textContent = `\xa0 / ${amount}`;
   time.classList.add(nameClass + "-time");
   time.textContent = `${tiempo[0]}/${tiempo[1]}/${tiempo[2]}`;
   containerProgress.classList.add(nameClass + "-containerProgress");
   theProgressDiv.classList.add(nameClass + "-theProgressDiv");
   theProgress.classList.add(nameClass + "-theProgress");
   theProgress.style.width = `${percentageNumber}%`;
   numberProgress.classList.add(nameClass + "-numberProgress");
   numberProgress.textContent = `${Math.trunc(percentageNumber)}%`;
   optionsMaths.classList.add(nameClass + "-optionsMaths");
   optionsButtons.classList.add(nameClass + "-optionsButtons");
   buttonToUpdate.classList.add(nameClass + "-toUpdate");
   buttonToUpdate.textContent = "Actualizar";
   buttonToSave.classList.add(nameClass + "-saved");
   buttonToSave.textContent = "Guardar";
   buttonDelete.classList.add(nameClass + "-delete");
   buttonDelete.textContent = "Eliminar";
   check.appendChild(checkBack);
   check.appendChild(checkFront);
   divMain.appendChild(check);
   finish.appendChild(pathUnlock);
   finish.appendChild(pathLock);
   divMain.appendChild(finish);
   divMain.appendChild(h4);
   optionsMaths.appendChild(divMain);
   calculateTimeDiv.appendChild(calculateTime);
   optionsMaths.appendChild(calculateTimeDiv);
   optionsMaths.appendChild(recommendation);
   percentage.appendChild(percentageInput);
   percentage.appendChild(percentageEntire);
   percentage.appendChild(time);
   optionsMaths.appendChild(percentage);
   containerProgress.appendChild(theProgress);
   theProgressDiv.appendChild(containerProgress);
   theProgressDiv.appendChild(numberProgress);
   optionsMaths.appendChild(theProgressDiv);
   optionsButtons.appendChild(buttonToUpdate);
   optionsButtons.appendChild(buttonToSave);
   optionsButtons.appendChild(buttonDelete);
   container.appendChild(optionsMaths);
   container.appendChild(optionsButtons);
   if (percentageNumber >= 100) pathUnlock.style.fill = "#48e";
   else finish.style.cursor = "default";
   if (block[1]) {
      h4.setAttribute("contenteditable","false");
      percentageInput.setAttribute("disabled","");
      pathLock.style.display = "block";
      pathLock.style.fill = "#a11";
      pathUnlock.style.display = "none";
      finish.style.cursor = "default";
      buttonToUpdate.classList.replace("f19__update-toUpdate","f19__update-toUpdated");
   }
   checkFront.addEventListener("click",()=>{
      if (checkFront.style.fill == "rgb(204, 204, 204)") {
         checkFront.style.fill = "#000";
         calculatedCheck(true, checkFront, block[0]);
         if (!block[0]) {
            document.querySelector(".f19__update__header-delete").style.display = "block";
            document.querySelector(".f19__update__header-save").style.display = "block";
         } else {
            document.querySelector(".f19__update__save-delete").style.display = "block";
            document.querySelector(".f19__update__save-save").style.display = "block";
         }
      } else {
         checkFront.style.fill = "#ccc";
         calculatedCheck(false, checkFront, block[0]);
         if (document.querySelector(".f19__update-circleFront").style.fill == "rgb(204, 204, 204)" && !block[0]) {
            document.querySelector(".f19__update__header-delete").style.display = "none";
            document.querySelector(".f19__update__header-save").style.display = "none";
         } else {
            document.querySelector(".f19__update__save-save").style.display = "none";
            document.querySelector(".f19__update__save-delete").style.display = "none";
         }
      }
   });
   h4.addEventListener("keyup",()=>{
      if (!block[1]) {
         buttonToSave.classList.replace("f19__update-saved","f19__update-save");
         buttonToUpdate.classList.replace("f19__update-toUpdate","f19__update-toUpdated");
      }
   });
   percentageInput.addEventListener("keyup",()=>{
      if (!block[1]) {
         buttonToSave.classList.replace("f19__update-saved","f19__update-save");
         buttonToUpdate.classList.replace("f19__update-toUpdate","f19__update-toUpdated");
      }
   });
   buttonToSave.addEventListener("click",()=>{
      if (buttonToSave.className == "f19__update-save") {
         modificarObject(id,{
            nombre: h4.textContent,
            calculo: calculate,
            cantidad: amount,
            total: timed,
            tiempo: tiempo,
            valor: percentageInput.value,
            lock: block
         });
         buttonToUpdate.classList.replace("f19__update-toUpdated","f19__update-toUpdate");
         buttonToSave.classList.replace("f19__update-save","f19__update-saved");
      }
   });
   buttonToUpdate.addEventListener("click",() => {'use strict';
      if (buttonToSave.className == "f19__update-saved") {
         let percentageNumber = calculatePorcentaje(amount, percentageInput.value);
         theProgress.style.width = `${percentageNumber}%`;
         numberProgress.textContent = `${Math.trunc(percentageNumber)}%`;
         calculate = calculateMath(tiempo[2], tiempo[1], tiempo[0], amount, percentageInput.value);
         recommendation.textContent = calculate;
         if (percentageNumber >= 100) {
            finish.style.cursor = "pointer";
            pathUnlock.style.fill = "#48e";
         } else {
            finish.style.cursor = "default";
            pathUnlock.style.fill = "#ccc";
         }

      }
      let date = time.textContent.split("/");
      let a = parseInt(date[2]);
      let b = parseInt(date[1]);
      let c = parseInt(date[0]);
      let timed = calculateDate(a,b,c);
      calculateTime.textContent = timed;
      if (block[0] == undefined) {
         block = [false, block];
         if (block[1]) {
            h4.setAttribute("contenteditable","false");
            percentageInput.setAttribute("disabled","");
            pathLock.style.display = "block";
            pathLock.style.fill = "#a11";
            pathUnlock.style.display = "none";
            finish.style.cursor = "default";
            buttonToUpdate.classList.replace("f19__update-toUpdate","f19__update-toUpdated");
         }
      }
      modificarObject(id,{
            nombre: h4.textContent,
            calculo: calculate,
            cantidad: amount,
            total: timed,
            tiempo: tiempo,
            valor: percentageInput.value,
            lock: block
         });
   });
   buttonDelete.addEventListener("click",()=>{
      if (window.confirm("¿Seguro que quieres Eliminar una lectura?")) {
         eliminarObject(id);
         if (block[0] == false) document.querySelector(".f19__update__head-container").removeChild(container);
         else document.querySelector(".f19__update__saved-content").removeChild(container);
      }
   });
   pathUnlock.addEventListener("click",()=>{
      if (percentageNumber >= 100 && buttonToSave.className == "f19__update-saved") {
         if (window.confirm("¿Quiéres Bloquear está lectura?")) {
            buttonToUpdate.classList.replace("f19__update-toUpdate","f19__update-toUpdated");
            h4.setAttribute("contenteditable","false");
            percentageInput.setAttribute("disabled","");
            pathLock.style.display = "block";
            pathLock.style.fill = "#a11";
            pathUnlock.style.display = "none";
            finish.style.cursor = "default";
            block[1] = true;
            modificarObject(id,{
               nombre: h4.textContent,
               calculo: calculate,
               cantidad: amount,
               total: timed,
               tiempo: tiempo,
               valor: percentageInput.value,
               lock: block
            });
         }
      } else if (buttonToSave.className == "f19__update-save") {
         alert("Hay cambios sin guardar");
      }
   });
   return container;
}
const checkMonth = (month, year) => {'use strict';
   if (month == 1 || month == 3 || month == 5 || month == 7  || month == 8  || month == 10  || month == 12) return 31;
   else if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
   else if (month == 2 && year%4 == 0 && year%400 == 0 && !year%100 == 0) return 29;
   else return 28;
}
const checkYear = year => {'use strict';
   if (year%4 == 0 && year%400 == 0 && !year%100 == 0) return 366;
   else return 365;
}
const calculateDate = (year, month, day) => {'use strict';
   let today = new Date();
   let todayYear = today.getYear() + 1900;
   let todayMonth = today.getMonth() + 1;
   let todayDay = today.getDate();

   let yearToDay = 0, monthToDay = 0, preNewDay, preNewMonth, preNewYear, newDay, newMonth, newYear;
   // Comparar Años
   if (todayYear <= year) newYear = year - todayYear;
   // Comparar Meses
   if (todayMonth <= month) newMonth =  month - todayMonth;
   else {
      newMonth =  month - todayMonth + 12;
      newYear--;
   }
   // Comparar Días
   if (todayDay <= day) newDay = day - todayDay;
   else {
      newDay = day - todayDay + checkMonth(month, year);
      newMonth--;
   }

   for (let i = 0; i < newYear; i++) {
      yearToDay += checkYear(year);
      year++;
   }
   for (let i = 0; i < newMonth; i++) {
      monthToDay += checkMonth(month);
      month++;
   }

   if (newDay == 1) preNewDay = `${newDay} día, `;
   else preNewDay = `${newDay} días, `;
   if (newMonth == 1) preNewMonth = `${newMonth} mes y `;
   else preNewMonth = `${newMonth} meses y `;
   if (newYear == 1) preNewYear = `${newYear} año`;
   else preNewYear = `${newYear} años`;
   let newDate = preNewDay + preNewMonth + preNewYear;
   return newDate;
}
const calculatePerformance = (amount, year, month, day) => {'use strict';
   // Total de días
   let temporalTime = year + month + day;

   let f = new Fraccion(amount,temporalTime);	
   let arrayFraccionPro = f.simplifica();
   let numeratorPro = arrayFraccionPro.numerador;
   let denominatorPro = arrayFraccionPro.denominador;
   let temporalProNominator = arrayFraccionPro.numerador;
   let temporalProDenominator = arrayFraccionPro.denominador;
   // Calcular el rendimiento con iteraciones
   let i = 1;
   while (i < 50) {
      let fPro = new Fraccion(numeratorPro,denominatorPro);
      arrayFraccionPro = fPro.simplifica();
      numeratorPro = parseInt(arrayFraccionPro.numerador);
      denominatorPro = parseInt(arrayFraccionPro.denominador);
      // Conservar el menor nominador
      if (temporalProNominator > numeratorPro) temporalProNominator = numeratorPro;
      // Conservar el menor denominador
      if (temporalProDenominator > denominatorPro) temporalProDenominator = denominatorPro;
      if (denominatorPro == 1) break;
      i++;
      numeratorPro++;
   }
   if (temporalProDenominator == denominatorPro && denominatorPro != 1) {
      temporalProDenominator++;
      let j = 1;
      while (j < 50) {
         let fPro = new Fraccion(numeratorPro,denominatorPro);
         arrayFraccionPro = fPro.simplifica();
         numeratorPro = parseInt(arrayFraccionPro.numerador);
         denominatorPro = parseInt(arrayFraccionPro.denominador);
         // Conservar el menor nominador
         if (temporalProNominator > numeratorPro) temporalProNominator = numeratorPro;
         // Conservar el menor denominador
         if (temporalProDenominator > denominatorPro) temporalProDenominator = denominatorPro;
         if (denominatorPro == 1) break;
         j++;
         numeratorPro++;
      }
   }
   return [temporalProNominator, temporalProDenominator];
}
const calculateMath = (year, month, day, amount, amountProgress) => {'use strict';
   amount = amount - amountProgress;
   let today = new Date();
   let todayYear = today.getYear() + 1900;
   let todayMonth = today.getMonth() + 1;
   let todayDay = today.getDate();
   let yearToDay = 0, monthToDay = 0, newDay, newMonth, newYear;

   // Comparar Años
   if (todayYear <= year) {
      newYear = year - todayYear;
   }
   // Comparar Meses
   if (todayMonth <= month) {
      newMonth =  month - todayMonth;
   } else {
      newMonth =  month - todayMonth + 12;
      newYear--;
   }
   // Comparar Días
   if (todayDay <= day) {
      newDay = day - todayDay;
   } else {
      newDay = day - todayDay + checkMonth(month, year);
      newMonth--;
   }
   // Convertir Años en días
   for (let i = 0; i < newYear; i++) {
      yearToDay += checkYear(year);
      year++;
   }
   // Convertir Meses en días
   for (let i = 0; i < newMonth; i++) {
      monthToDay += checkMonth(month);
      month++;
   }
   // Calcular el rendimiento
   let performance = calculatePerformance(amount, yearToDay, monthToDay, newDay);

   // Complementación
   let arrayFraccionEficiency = new Fraccion(performance[0],performance[1]);
   arrayFraccionEficiency = arrayFraccionEficiency.simplifica();

   // Compilar la estructura
   let numerator, denominator;
   if (arrayFraccionEficiency.numerador == 1) numerator = `${arrayFraccionEficiency.numerador} página, `;
   else numerator = `${arrayFraccionEficiency.numerador} páginas, `;
   if (arrayFraccionEficiency.denominador == 1) denominator = `cada día`;
   else denominator = `cada ${arrayFraccionEficiency.denominador} días`;

   // Retorno
   let forEachPro = numerator + denominator;
   return forEachPro;
}
const calculatedCheck = (bollean, origin, space) => {'use strict';
   let allDivs = document.querySelectorAll('.f19__update__head-container .f19__update-div');
   let nameClass = ".f19__update-optionsMaths .f19__update-main .f19__update-check .f19__update-checkFront";
   if (space) allDivs = document.querySelectorAll('.f19__update__saved-content .f19__update-div');
   if (origin.className.animVal == "f19__update-circleFront" || origin.className.animVal == "f19__update__save-circleFront") {
      for (let i = allDivs.length - 1; i >= 0; i--) {
      let divCheck = allDivs[i].querySelector(nameClass);
         if (bollean) {
            divCheck.style.fill = "#000";
         } else {
            divCheck.style.fill = "#ccc";
         }
      }
   } else {
      for (let i = allDivs.length - 1; i >= 0; i--) {
      let divCheck = allDivs[i].querySelector(nameClass);
         if (divCheck.style.fill == "rgb(204, 204, 204)") {
            bollean = false;
         } else {
            bollean = true;
            break;
         }
      }
      if (bollean) {
         if (!space) document.querySelector(".f19__update-circleFront").style.fill = "#000";
         else document.querySelector(".f19__update__save-circleFront").style.fill = "#000";
      } else {
         if (!space) {
            document.querySelector(".f19__update-circleFront").style.fill = "#ccc";
            document.querySelector(".f19__update__header-delete").style.display = "block";
            document.querySelector(".f19__update__header-save").style.display = "block";
         } else {
            document.querySelector(".f19__update__save-circleFront").style.fill = "#ccc";
            document.querySelector(".f19__update__save-delete").style.display = "block";
            document.querySelector(".f19__update__save-save").style.display = "block";
         }
      }
   }
}
const selectCheck = (space,type) => {'use strict';
   let text, nameClass = ".f19__update-optionsMaths .f19__update-main .f19__update-check .f19__update-checkFront";
   if (type == 0) text = "¿Seguro que quieres proceder a Eliminar?";
   else if (type == 1 && space == 0) text = "¿Seguro que quieres proceder a Archivar?";
   else text = "¿Seguro que quieres proceder a Desarchivar?";
   if (window.confirm(text)) {
      let arr = [], divs = [], allDivs;
      if (space == 0) allDivs = document.querySelectorAll('.f19__update__head-container .f19__update-div');
      else allDivs = document.querySelectorAll('.f19__update__saved-content .f19__update-div');
      // Recoge todos los ids seleccionados
      for (let i = allDivs.length - 1; i >= 0; i--) {
         let divCheck = allDivs[i].querySelector(nameClass);
         if (divCheck.style.fill == "rgb(0, 0, 0)") {
            let key = allDivs[i].getAttribute("id");
            arr.push(key);
         }
      }
      // Recoge los los divs seleccionados
      for (let i = allDivs.length - 1; i >= 0; i--) {
         for (let j = arr.length - 1; j >= 0; j--) if (allDivs[i].getAttribute("id") == arr[j]) divs.push(allDivs[i]);
      }
      // MOdifica cada uno
      for (let i = arr.length - 1; i >= 0; i--) {
         // Elimina
         if (type == 0) {
            eliminarObject(arr[i]);
            if (space == 0) {
               document.querySelector(".f19__update__head-container").removeChild(divs[i]);
               document.querySelector(".f19__update-circleFront").style.fill = "#ccc";
            }
            else {
               document.querySelector(".f19__update__saved-content").removeChild(divs[i]);
               document.querySelector(".f19__update__save-circleFront").style.fill = "#ccc";
            }
         }
         // Archiva
         else if (type == 1) {
            let obj = [];					
            obj.push(divs[i].querySelector(".f19__update-name").textContent);
            obj.push(divs[i].querySelector(".f19__update-recommendation").textContent);
            let temporal = divs[i].querySelector(".f19__update-percentageEntire").textContent.split("/");
            obj.push(parseInt(temporal[1]));
            obj.push(divs[i].querySelector(".f19__update-calculateTime").textContent);
            temporal = divs[i].querySelector(".f19__update-time").textContent.split("/");
            temporal = [parseInt(temporal[0]),parseInt(temporal[1]),parseInt(temporal[2])];
            obj.push(temporal);
            obj.push(divs[i].querySelector(".f19__update-percentageInput").value);
            if (space == 0) temporal = true;
            else temporal = false;
            obj.push(temporal);
            if (divs[i].querySelector(".f19__update-lock").style.display == "block") temporal = true;
            else temporal = false;
            obj.push(temporal);
            modificarObject(parseInt(arr[i]),{
               nombre: obj[0],
               calculo: obj[1],
               cantidad: obj[2],
               total: obj[3],
               tiempo: obj[4],
               valor: obj[5],
               lock: [obj[6], obj[7]]
            });
            divs[i].querySelector(".f19__update-checkFront").style.fill = "#ccc";
         }
         if (space == 0 && type == 1) {
            document.querySelector(".f19__update-circleFront").style.fill = "#ccc";
            document.querySelector(".f19__update__head-container").removeChild(divs[i]);
            document.querySelector(".f19__update__saved-content").appendChild(divs[i]);
            document.querySelector(".f19__update__header-save").style.display = "none";
            document.querySelector(".f19__update__header-delete").style.display = "none";
         }
         else if (space == 1 && type == 1) {
            document.querySelector(".f19__update__save-circleFront").style.fill = "#ccc";
            document.querySelector(".f19__update__saved-content").removeChild(divs[i]);
            document.querySelector(".f19__update__head-container").appendChild(divs[i]);
            document.querySelector(".f19__update__save-save").style.display = "none";
            document.querySelector(".f19__update__save-delete").style.display = "none";
         }
      }
   }
}
const contractDiv = svg => {'use strict';
   let css = svg.style;
   if (css.transform == "rotateZ(0deg)") {
      css.transform = "rotateZ(-90deg)";
      if (svg.className.animVal == "f19__update__header-svg") {
         document.querySelector(".f19__update__title").style.display = "none";
         document.querySelector(".f19__update__head-container").style.display = "none";
      } else {
         document.querySelector(".f19__update__save__title").style.display = "none";
         document.querySelector(".f19__update__saved-content").style.display = "none";
      }
   } else {
      css.transform = "rotateZ(0deg)";
      if (svg.className.animVal == "f19__update__header-svg") {
         if (document.querySelector(".container").clientWidth >= 886) {
            document.querySelector(".f19__update__title").style.display = "grid";
         }
         document.querySelector(".f19__update__head-container").style.display = "flex";
      } else {
         if (document.querySelector(".container").clientWidth >= 886) {
            document.querySelector(".f19__update__save__title").style.display = "grid";
         }
         document.querySelector(".f19__update__saved-content").style.display = "flex";
      }
   }
}
// Añadir
let date_now = new Date();
let day = date_now.getDate();
let month = date_now.getMonth() + 1;
if (month < 10) month = `0${month}`;
if (day < 10) day = `0${day}`;
container.innerHTML = `
   <div class="f19">
      <div class="f19__add">
         <div class="f19__add-Div">
            <h3>Nombre de la lectura</h3>
            <input type="text" class="f19__add-name" spellcheck="false">
            <p style="display: none">El nombre esta incompleto</p>
         </div>
         <div class="f19__add-Div">
            <h3>Cantidad de páginas</h3>
            <input type="number" class="f19__add-amount">
            <p style="display: none">La cantidad esta incompleta</p>
            <p style="display: none">La cantidad no es válida</p>
         </div>
         <div class="f19__add-Div">
            <h3>Fecha de entrega</h3>
            <input type="date" class="f19__add-date"
               value="${date_now.getFullYear()}-${month}-${day}"
               min="${date_now.getFullYear()}-${month}-${day}"
               max="${date_now.getFullYear() + 1}-${month}-${day}">
            <p style="display: none">La fecha esta incompleta</p>
         </div>
         <div class="f19__add-Div">
            <h3>Páginas avanzadas</h3>
            <input type="number" class="f19__add-progress" placeholder="0">
         </div>
         <div class="f19__add-Div">
            <input type="submit" class="f19__add-submit">
         </div>
      </div>
      <div class="f19__update">
         <div class="f19__update__head">
            <div class="f19__update__header">
               <svg class="f19__update__header-svg" viewbox="0 0 10 10" class="svg">
                  <polygon points=".8,2.5 5,10 9.2,2.5"fill="black"/>
               </sgv>
               <h3>Lecturas</h3>
               <div class="f19__update__header-buttons">
                  <button class="f19__update__header-save" style="display: none">Archivar</button>
                  <button class="f19__update__header-delete" style="display: none">Eliminar</button>
               </div>
            </div>
            <div class="f19__update__title">
               <svg class="f19__update__title-svg">
                  <circle class="f19__update-circleBack" cx="5" cy="5" r="4.8"></circle>
                  <circle class="f19__update-circleFront" cx="5" cy="5" r="3.5" style="fill:#ccc"></circle>
               </svg>
               <div class="f19__update__title-name">Nombre</div>
               <div class="f19__update__title-calculateTime">Tiempo Restante</div>
               <div class="f19__update__title-recommendation">Proporción</div>
               <div class="f19__update__title-time">Restante</div>
               <div class="f19__update__title-percentage">Porcentaje</div>
               <div class="f19__update__title-options">Opciones</div>
            </div>
         <div class="f19__update__head-container"></div>
         </div>
         <div class="f19__update__save">
            <div class="f19__update__saved">
               <svg class="f19__update__saved-svg" viewbox="0 0 10 10" class="svg">
                  <polygon points=".8,2.5 5,10 9.2,2.5"fill="black"/>
               </sgv>
               <h3>Archivados</h3>
               <div class="f19__update__header-buttons">
                  <button class="f19__update__save-save" style="display: none">Desarchivar</button>
                  <button class="f19__update__save-delete" style="display: none">Eliminar</button>
               </div>
            </div>
            <div class="f19__update__save__title" style="display: none">
               <svg class="f19__update__title-svg">
                  <circle class="f19__update__save-circleBack" cx="5" cy="5" r="4.8"></circle>
                  <circle class="f19__update__save-circleFront" cx="5" cy="5" r="3.5" style="fill:#ccc"></circle>
               </svg>
               <div class="f19__update__save__title-name">Nombre</div>
               <div class="f19__update__save__title-calculateTime">Tiempo Restante</div>
               <div class="f19__update__save__title-recommendation">Proporción</div>
               <div class="f19__update__save__title-time">Restante</div>
               <div class="f19__update__save__title-percentage">Porcentaje</div>
               <div class="f19__update__save__title-options">Opciones</div>
            </div>
            <div class="f19__update__saved-content" style="display: none"></div>
         </div>
      </div>
   </div>`;
// Ejecutar
document.querySelector(".f19__add-submit").addEventListener("click",()=>{
   let name = document.querySelector(".f19__add-name").value;
   let amount = parseInt(document.querySelector(".f19__add-amount").value);
   let amountProgress = 0;
   if (document.querySelector(".f19__add-progress").value != '') {
      amountProgress = parseInt(document.querySelector(".f19__add-progress").value);
   }
   let date = document.querySelector(".f19__add-date").value;
   let year = parseInt(date.substring(0,4));
   let month = parseInt(date.substring(5,7));
   let day = parseInt(date.substring(8,10));
   // Validación
   if (name.length > 0 && amount > 0 && amount < 10000 && !date == "") {
      let calculated = calculateMath(year, month, day, amount, amountProgress);
      let timed = calculateDate(year, month, day);
      let key = document.querySelectorAll(".f19__update-div").length - 1;
      let idKey;
      if (key == -1) {
         idKey = 0;
      } else idKey = parseInt(document.querySelectorAll(".f19__update-div")[key].id) + 1;
      addObject({
         nombre: name,
         calculo: calculated,
         total: timed,
         cantidad: amount,
         tiempo: [day, month, year],
         valor: amountProgress,
         lock: [false, false]
      });
      document.querySelector(".f19__add-name").value = "";
      document.querySelector(".f19__add-amount").value = "";
      document.querySelector(".f19__add-date").value = "";
      document.querySelector(".f19__add-progress").value = "";
      let element = buildDiv(name, calculated, timed, amount, [day, month, year], idKey, amountProgress, [false, false]);
      document.querySelector(".f19__update__head-container").appendChild(element);
   } else {
      // Manejo de errores en la validación
      let div = document.querySelectorAll(".f19__add-Div");
      document.querySelector(".f19__add").classList.add("f19__add__error-content");
      if (name.length == '') {
         let error = div[0].children[2];
         div[0].classList.add("f19__add-error");
         error.style.display = "block";
      }
      if (isNaN(amount)) {
         let error = div[1].children[2];
         div[1].classList.add("f19__add-error");
         error.style.display = "block";
      } else if (amount > 10000) {
         let error = div[1].children[3];
         div[1].classList.add("f19__add-error");
         error.style.display = "block";
      }
      if (date == "") {
         let error = div[2].children[2];
         div[2].classList.add("f19__add-error");
         error.style.display = "block";
      }
   }
});
// Check list primero
document.querySelector(".f19__update-circleFront").addEventListener("click",()=>{
   if (document.querySelector(".f19__update-circleFront").style.fill == "rgb(204, 204, 204)") {
      document.querySelector(".f19__update-circleFront").style.fill = "#000";
      document.querySelector(".f19__update__header-delete").style.display = "block";
      document.querySelector(".f19__update__header-save").style.display = "block";
      calculatedCheck(true, document.querySelector(".f19__update-circleFront"), false);
   } else {
      document.querySelector(".f19__update-circleFront").style.fill = "#ccc";
      document.querySelector(".f19__update__header-delete").style.display = "none";
      document.querySelector(".f19__update__header-save").style.display = "none";
      calculatedCheck(false, document.querySelector(".f19__update-circleFront"), false);
   }
});
// Check list segundo
document.querySelector(".f19__update__save-circleFront").addEventListener("click",()=>{
   if (document.querySelector(".f19__update__save-circleFront").style.fill == "rgb(204, 204, 204)") {
      document.querySelector(".f19__update__save-circleFront").style.fill = "#000";
      document.querySelector(".f19__update__save-delete").style.display = "block";
      document.querySelector(".f19__update__save-save").style.display = "block";
      calculatedCheck(true, document.querySelector(".f19__update-circleFront"), true);
   } else {
      document.querySelector(".f19__update__save-circleFront").style.fill = "#ccc";
      document.querySelector(".f19__update__save-delete").style.display = "none";
      document.querySelector(".f19__update__save-save").style.display = "none";
      calculatedCheck(false, document.querySelector(".f19__update-circleFront"), true);
   }
});
document.querySelector(".f19__update__header-delete").addEventListener("click",()=> selectCheck(0, 0));
document.querySelector(".f19__update__header-save").addEventListener("click",() => selectCheck(0, 1));
document.querySelector(".f19__update__save-delete").addEventListener("click",()=> selectCheck(1, 0));
document.querySelector(".f19__update__save-save").addEventListener("click",() => selectCheck(1, 1));

document.querySelector(".f19__update__header-svg").addEventListener("click",() => {'use strict';
   contractDiv(document.querySelector(".f19__update__header-svg"));
});
document.querySelector(".f19__update__saved-svg").addEventListener("click",() => {'use strict';
   contractDiv(document.querySelector(".f19__update__saved-svg"));
});