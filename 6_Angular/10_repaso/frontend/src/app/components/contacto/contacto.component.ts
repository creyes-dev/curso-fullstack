import { Component } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  constructor(public _contactoService: ContactoService) { }

  enviarFormularioContacto(form) {
    this._contactoService.enviarMensaje(form).subscribe(() => {
      swal('Formulario de contacto', 'Mensaje enviado correctamente', 'success');
    });
  }

}
