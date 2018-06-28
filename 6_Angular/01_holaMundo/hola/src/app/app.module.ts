// objetos con utilidades comunes del framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// El actual módulo raíz
// importa un componente especial para el arranque de la aplicación:
// El componente raíz AppComponent
import { AppComponent } from './app.component';

// decorador con metadata que define un módulo
@NgModule({
  declarations: [
    AppComponent
  ], // cosas declaradas en este módulo
  imports: [
    BrowserModule
  ], // otros módulos que necesitamos para que este funcione
  providers: [], // inyección de servicios comunes para la aplicación
  bootstrap: [AppComponent] // componente raíz para el arranque
})

// los módulos son clases contendoras
// habitualmente con poco o ningún código
export class AppModule { }
