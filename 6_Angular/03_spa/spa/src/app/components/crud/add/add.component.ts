import { Component, OnInit } from '@angular/core';
import { TvshowsServiceService } from '../../../services/tvshows-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  tvshow: Object = {
    title: null,
    year: null,
    country: null,
    poster: null,
    seasons: null,
    genre: null,
    summary: null
  };

  constructor(public _tvshowsService: TvshowsServiceService,
              private router: Router ) { }

  ngOnInit() {
  }

  alta() {
    this._tvshowsService.addTvshow(this.tvshow).subscribe(res => {console.log('subscribe'); this.router.navigate(['tvshows']); });
  }

  cancelar() {
    this.router.navigate(['/tvshows']);
  }

}
