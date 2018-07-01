import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buscarHeroes( buscarTexto: string ) {
    console.log('this.router.navigate([/busqueda, buscarTexto]);');
    console.log(buscarTexto);

    this.router.navigate(['/busqueda', buscarTexto]);
  }

}
