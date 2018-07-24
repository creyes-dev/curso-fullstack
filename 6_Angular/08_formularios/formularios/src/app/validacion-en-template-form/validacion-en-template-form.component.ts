import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-validacion-en-template-form',
  templateUrl: './validacion-en-template-form.component.html',
  styles: ['.ng-invalid.ng-touched:not(form) { border: 1px solid red; }']
})

export class ValidacionEnTemplateFormComponent {

  usuario: Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Femenino',
    acepta: false
  }

  paises = [{
    codigo: 'ARG',
    nombre: 'Argentina'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  },
  {
    codigo: 'CHL',
    nombre: 'Chile'
  }];

  sexos: string[] = ['Femenino', 'Masculino'];

    constructor() { }

    guardar(forma: NgForm) {
      console.log('Formulario guardado');
      console.log('NgForm ', forma);
      console.log('Valor ', forma.value);
      console.log('Usuario ', this.usuario);
    }

}
