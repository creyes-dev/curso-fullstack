import { Component, OnInit } from '@angular/core';
import { ConectapiService } from '../../services/conectapi.service';

@Component({
  selector: 'app-conectapi',
  templateUrl: './conectapi.component.html'
})
export class ConectapiComponent implements OnInit {
  posts: any[] = [];

  constructor(public _conectapiService: ConectapiService) { console.log('constructorConectapiComponent'); }

  ngOnInit() {
    console.log('heyheyhey');
    this._conectapiService.getPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
    });
  }

}
