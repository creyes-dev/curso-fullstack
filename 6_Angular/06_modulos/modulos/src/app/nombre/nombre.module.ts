import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Automaticamente se agrega la referencia al componente generado para este modulo
import { MiComponenteComponent } from './mi-componente/mi-componente.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MiComponenteComponent], // Automaticamente se ha agregado el componente al módulo
  exports: [MiComponenteComponent]       // Manualmente se agrega el componente a exportar para que se pueda utilizar en otros módulos
})
export class NombreModule { }
