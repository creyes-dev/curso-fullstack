import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvshowsServiceService } from '../../services/tvshows-service.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent {

  tvshow: Object = {
    title: null,
    year: null,
    country: null,
    poster: null,
    seasons: null,
    genre: null,
    summary: null
  };

  /*
    constructor( private activatedRoute: ActivatedRoute,
                 private _tvshowsService: TvshowsServiceService) {
    this.activatedRoute.params.subscribe( params => {
      this.activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this._tvshowsService.getTvshow(params['id'])
        .subscribe((data: tvshow) => this.tvshow = {
          title: data['title'],
          year: data['year'],
          country: data['country'],
          poster: data['poster'],
          seasons: data['seasons'],
          genre: data['genre'],
          summary: data['summary']
        });
      });
    });
  }
*/

}
