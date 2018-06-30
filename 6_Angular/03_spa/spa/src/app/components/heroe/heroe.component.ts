import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent {

  heroe: any = {};

  constructor( private activatedRoute:ActivatedRoute,
               private router: Router,
               private _heroesService: HeroesService
  ) {
    this.activatedRoute.params.subscribe( params => {
      //console.log(params['id']);
      this.heroe = this._heroesService.getHeroe(params['id']);
      console.log(this.heroe);
    })
  }

  volverAlListado() {
    this.router.navigate(['/heroes']);
  }

}
