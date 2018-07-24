import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-validacion-en-componente-form',
  templateUrl: './validacion-en-componente-form.component.html',
  styles: []
})
export class ValidacionEnComponenteFormComponent {

  forma: FormGroup;

  usuario: Object = {
    nombre: 'Veronica',
    apellido: 'Pineyro',
    correo: 'veropineyro@hotmail.com',
    pasatiempos: ['Correr']
  };

  constructor() {

    this.forma = new FormGroup({
      'nombre': new FormControl('' , [ Validators.required,  Validators.minLength(5) ]),
      'apellido': new FormControl('', Validators.required ),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos' : new FormArray([
        new FormControl ('' , Validators.required )
      ])
    });

    this.forma.setValue(this.usuario);
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  guardarCambios() {
    console.log( this.forma.value );
    console.log( this.forma );

    this.forma.reset({
      'nombre' : '',
      'apellido' : '',
      'correo' : ''
    });
  }

}
