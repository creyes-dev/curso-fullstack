import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})

export class ResultadosBusquedaComponent implements OnInit {

  heroes: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _heroesService: HeroesService) {
                this.activatedRoute.params.subscribe( params => {
                  this.heroes = this._heroesService.buscarHeroe(params.texto);
                });
              }

  ngOnInit() {
  }

  verHeroe(idx: number) {
    this.router.navigate(['/heroe', idx]);
  }

}
