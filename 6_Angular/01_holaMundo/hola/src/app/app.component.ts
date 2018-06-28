import { Component } from '@angular/core';

// Función decoradora que registra un componente
@Component({
  selector: 'app-root', // elemento html consumidor
  templateUrl: './app.component.html', // ruta relativa a la vista
  styleUrls: ['./app.component.css'] // hojas de estilo
})

// clase que representa un controlador
// con su modelo de datos (title ) y métodos de acción (aún no tiene)
// Esta clase es todo lo que se exporta en este fichero
// y esto se importará en app.module.ts para ser incorporado el módulo
// raíz
export class AppComponent {
  // las propiedades de la clase representan el modelo de datos
  // son accesibles desde la vista
  title = 'mi primer app Angular2';
  visible=true;

  mostrarOcultar(){
  	if (this.visible)
  		this.visible = false;
  	else
  		this.visible= true;
  }

}
