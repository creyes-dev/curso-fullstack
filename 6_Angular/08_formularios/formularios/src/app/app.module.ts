import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { ValidacionEnTemplateFormComponent } from './validacion-en-template-form/validacion-en-template-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    ValidacionEnTemplateFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
