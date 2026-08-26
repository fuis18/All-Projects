'use strict';
const IDBRequest = indexedDB.open("daltobase",1);
IDBRequest.addEventListener("upgradeneeded",()=> IDBRequest.result.createObjectStore("name",{autoIncrement: true}));
IDBRequest.addEventListener("success",() => readObject());
IDBRequest.addEventListener("error",() => alert("ocurrio un error al abrir la base de datos"));
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
         let element = nameHTML(cursor.result.key,cursor.result.value);
         fragment.appendChild(element);
         cursor.result.continue();
         document.querySelector(".names").appendChild(element);
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
const IDBTransaction = IDBRequest.result.transaction("name",mode);
   const objectStore = IDBTransaction.objectStore("name");
   // IDBTransaction.addEventListener("complete",()=>{
   // 	if (msg) alert.log(msg);
   // });
   return objectStore;
}
const nameHTML = (id, result) => {'use strict';
   const container = document.createElement("DIV");
   const h2 = document.createElement("h2");
   const options = document.createElement("DIV");
   const saveButton = document.createElement("button");
   const deleteButton = document.createElement("button");
   container.classList.add("name");
   options.classList.add("options");
   saveButton.classList.add("impossible");
   deleteButton.classList.add("delete");
   saveButton.textContent = "Guardar";
   deleteButton.textContent = "Eliminar";
   h2.textContent = result.name;
   h2.setAttribute("contenteditable","true");
   h2.setAttribute("spellcheck","false");
   options.appendChild(saveButton);
   options.appendChild(deleteButton);
   container.appendChild(h2);
   container.appendChild(options);
   h2.addEventListener("keyup",()=>{
      saveButton.classList.replace("impossible","possibly");
   });
   saveButton.addEventListener("click",()=>{
      if (saveButton.className == "possibly") {
         modificarObject(id,{name: h2.textContent});
         saveButton.classList.replace("possibly","impossible");
      }
   });
   deleteButton.addEventListener("click",()=>{
      eliminarObject(id);
      container.remove();
   });
   return container;
}
document.getElementById("add").addEventListener("click",()=> {'use strict';
   let name = document.getElementById("name").value;
   if (name.length > 0) {
      if (document.querySelector(".possibly") != undefined) {
         if (confirm("Hay Elementos sin guardar: ¿Quiéres continuar?")) {
            addObject({name});
            document.getElementById("name").value = "";
            readObject();
         }
         else {
            addObject({name});
            document.getElementById("name").value = "";
            readObject();
         }
      }
      else {
         addObject({name});
         document.getElementById("name").value = "";
         readObject();
      }
   }		
});