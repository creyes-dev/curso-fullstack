import { Component, OnInit } from '@angular/core';
import { TvshowsServiceService } from '../../services/tvshows-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit {

  tvshows: any[] = [];

  constructor(public _tvshowsService: TvshowsServiceService,
    private router: Router ) { }

    ngOnInit() {
      this._tvshowsService.getTvshows().subscribe(data => {
        console.log(data);
        this.tvshows = data;
      });
    }

  verTvshow(idx: number) {
    this.router.navigate(['/tvshow', idx]);
  }

  addTvshow() {
    this.router.navigate(['/tvshows', 'add']);
  }

}
