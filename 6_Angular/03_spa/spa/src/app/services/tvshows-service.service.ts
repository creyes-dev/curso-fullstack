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

  addTvshow (tvshow) {
    return this.http.post(this.tvshowsUrl + 'tvshows', tvshow)
    .map( (resp: any) => {
      this.tvshow = resp;
      return this.tvshow;
    });
  }

  delTvshow(tvshowid: string) {
    return this.http.delete(this.tvshowsUrl + 'tvshow/' + tvshowid);
  }

  updateTvshow (tvshow) {
  console.log(tvshow);
    return this.http.put(this.tvshowsUrl + 'tvshows/' + tvshow._id, tvshow)
    .map( (resp: any) => {
      this.tvshow = resp;
      return this.tvshow;
    });
  }


}
