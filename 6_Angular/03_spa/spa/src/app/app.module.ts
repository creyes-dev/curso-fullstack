import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTING } from './app.routes';

// Servicios
import { HeroesService } from './services/heroes.service';
import { ConectapiService } from './services/conectapi.service';
import { TvshowsServiceService } from './services/tvshows-service.service';

// importación automática de componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { ConectapiComponent } from './components/conectapi/conectapi.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { AddComponent } from './components/crud/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    HeroeComponent,
    ResultadosBusquedaComponent,
    ConectapiComponent,
    TvshowsComponent,
    TvshowComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    HeroesService,
    ConectapiService,
    TvshowsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
