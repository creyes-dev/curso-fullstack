import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class TvshowsServiceService {

  tvshows: any[] = [];
  tvshow: any = {};

  tvshowsUrl: string = 'http://localhost:3000/';

  constructor(public http: HttpClient) { }

  getTvshows() {
    return this.http.get(this.tvshowsUrl + 'tvshows')
    .map( (resp: any) => {
      this.tvshows = resp;
      return this.tvshows;
    });
  }

  getTvshow(idx: string) {
    return this.http.get(this.tvshowsUrl + 'tvshows/' + idx);
  }


}
