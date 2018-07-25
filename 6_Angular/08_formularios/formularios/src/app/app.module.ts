import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { ValidacionEnTemplateFormComponent } from './validacion-en-template-form/validacion-en-template-form.component';
import { ReactivoFormComponent } from './reactivo-form/reactivo-form.component';
import { ReactivoFormDosComponent } from './reactivo-form-dos/reactivo-form-dos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    ValidacionEnTemplateFormComponent,
    ReactivoFormComponent,
    ReactivoFormDosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
