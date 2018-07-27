import { Component, OnInit } from '@angular/core';
import { TvshowsServiceService } from '../../../services/tvshows-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {

  tvshow: Object = {
    _id: null,
    title: null,
    year: null,
    country: null,
    poster: null,
    seasons: null,
    genre: null,
    summary: null
  };

  constructor(public _tvshowsService: TvshowsServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

            ngOnInit() {
                this.activatedRoute.params.subscribe( params => {
                  this._tvshowsService.getTvshow(params['id'])
                  .subscribe((data) => this.tvshow = {
                    _id: data['_id'],
                    title: data['title'],
                    year: data['year'],
                    country: data['country'],
                    poster: data['poster'],
                    seasons: data['seasons'],
                    genre: data['genre'],
                    summary: data['summary']
                });

              });
            }

            modificar() {
              this._tvshowsService.updateTvshow(this.tvshow).subscribe(res => { this.router.navigate(['tvshows']); });
            }

            cancelar() {
              this.router.navigate(['/tvshows']);
            }

}
