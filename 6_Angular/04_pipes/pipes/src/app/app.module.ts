import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para que tome las fechas en español
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { capitalizadoPipe } from '../pipes/capitalizado.pipe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    capitalizadoPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
