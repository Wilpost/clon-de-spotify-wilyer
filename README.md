# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

[] Al añadir una música a una lista se añade a la lista de la libreria

En la primera carga obtener los datos, luego que se alamacenen los datos, acceder desde localStorage para no tener que hacer multiples e inncesaras requests, amenos que sean datos nuevos

# Posibles Soluciones para manipular la etiqueta audio

- .1 Hacerla una etiqueta gobal en un nivel superior donde se puedo acceder desde cualquier archivo mendiante props
- .2 Duplicar la etiqueta, para que aparesca en el footer y en la pagina de songPage
- .3 Agregar a un estado el elemento HTML considerando los problemas que se obtendrán al guardar en localStorage el estado  
   ya que se debe tranformar a un string, y al obtener el valor del estado el resultado seria [Object Undefined], entonces tendria que investigar si existe una manera de transformar un string a formato HTML...

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
