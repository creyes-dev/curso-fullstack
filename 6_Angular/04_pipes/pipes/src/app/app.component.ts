import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  nombre:string = 'Veronica';

  arr = [1,2,3,4,5,6,7,8,9,10];

  PI = Math.PI;   //3.1416....

  a = 0.234;

  salario = 2553.5;

  empleado = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 50,
    direccion: {
      calle: "Mendoza",
      numero: 1234
    }
  }

  valorPromesa = new Promise ((resolve,reject)=>{
    setTimeout( ()=>resolve('Llego la data'),3500 );
  });

  fecha = new Date();

  nombre2 = "maria Veronica PINeyro";
}
