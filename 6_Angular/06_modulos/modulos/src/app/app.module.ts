import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Manualmente importar los módulos acccesibles desde el módulo de la aplicación
import { NombreModule } from './nombre/nombre.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NombreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
