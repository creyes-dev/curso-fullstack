import { Directive } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( private el:ElementRef ) {
    // console.log("Directiva llamada");
    // el.nativeElement.style.backgroundColor = "yellow";
  }

  @Input("appResaltado") nuevoColor: string;

  @HostListener('mouseenter') mouseEntro() {
    // console.log(this.nuevoColor);
    this.resaltar( this.nuevoColor || 'yellow' );
    // si eliminamos la funcion resaltar comentamos su llamado y descomentamos esta linea de abajo solo reslata en amarillo.
    // La funcion resaltar me permite recibir el color por parametro y resaltar en ese color en lugar de siempre en amarillo
    // como lo hariamos en la linea de abajo, en este caso tendriamos que sacar en el html el pasaje del parametro
    // this.el.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener('mouseleave') mouseSalio() {
    this.resaltar( null );
    // si eliminamos la funcion resaltar comentamos su llamado y descomentamos esta linea de abajo solo reslata en amarillo
    // this.el.nativeElement.style.backgroundColor = null;
  }

  private resaltar( color: string ) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
