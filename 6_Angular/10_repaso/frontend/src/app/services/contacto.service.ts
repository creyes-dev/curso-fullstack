import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  urlServicio: string;

  constructor(private _http: HttpClient) {
    this.urlServicio = 'http://localhost:3000/';
  }

  enviarMensaje(body) {
    return this._http.post(this.urlServicio + 'notificaciones', body);
  }

}
