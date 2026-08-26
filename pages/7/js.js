'use strict';
const hexa = color => {
   let newColor = [];
   for (let i = 0; i < 2; i++) {
      switch (color.substr(i,1)) {
         case "a":
            newColor[i] = 10;
            break;
         case "b":
            newColor[i] = 11;
            break;
         case "c":
            newColor[i] = 12;
            break;
         case "d":
            newColor[i] = 13;
            break;
         case "e":
            newColor[i] = 14;
            break;
         case "f":
            newColor[i] = 15;
            break;
         default:
            newColor[i] = parseInt(color.substr(i,1));
      }
   }
   return (newColor[0] * 16 + newColor[1]);
}
const rgb = hexcolor => {
   let red = hexcolor.substr(1,2);
   let green = hexcolor.substr(3,2)
   let blue = hexcolor.substr(5,2);
   red = hexa(red);
   green = hexa(green);
   blue = hexa(blue);
   return [red,green,blue];
}
let text = 0;
let input = document.getElementById("color");
const rgb_ia = (r,g,b) => {
   let red = 0;
   let green = 0;
   let blue = 0;
   if (text == 0) {
      if (r > .5 || g > .5 || b > .5) {
         red = 255;
         green = 255;
         blue = 255;
      }
   } else if (text == 1) {
      red = r*255;
      green = g*255;
      blue = b*255;
   }
   return `rgb(${red},${green},${blue})`;
}
const div = document.getElementById("sitio");
const color_run = () => {
   let entrada = {
      rojo: (rgb(input.value)[0]) + 1 / 256,
      verde: (rgb(input.value)[1]) + 1 / 256,
      azul: (rgb(input.value)[2]) + 1 / 256,
   }
   let result = network.run(entrada);
   let red = result.rojo;
   let green = result.verde;
   let blue = result.azul;
   let end = rgb_ia(red,green,blue);
   div.style.color = end;
   div.style.borderWidth = "2px";
   div.style.borderStyle = "solid";
   div.style.borderColor = end;
}
let network = new brain.NeuralNetwork();
network.fromJSON(trainData);

let in_color = document.querySelector(".text input");
in_color.addEventListener("input", () => {
   text = in_color.checked ? 1 : 0;
   color_run();
});
input.addEventListener("input", () => {
   div.style.backgroundColor = input.value;
   color_run();
});
