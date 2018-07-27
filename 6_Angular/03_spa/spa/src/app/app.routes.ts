import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent} from './components/heroe/heroe.component';
import { ResultadosBusquedaComponent} from './components/resultados-busqueda/resultados-busqueda.component';
import { ConectapiComponent} from './components/conectapi/conectapi.component';
import { TvshowsComponent} from './components/tvshows/tvshows.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { AddComponent } from './components/crud/add/add.component';
import { UpdateComponent } from './components/crud/update/update.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'busqueda/:texto', component: ResultadosBusquedaComponent },
  { path: 'conectapi', component: ConectapiComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'tvshow/:id', component: TvshowComponent },
  { path: 'tvshows/add', component: AddComponent },
  { path: 'tvshows/update/:id', component: UpdateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true } );
