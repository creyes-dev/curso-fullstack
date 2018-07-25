import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactivo-form',
  templateUrl: './reactivo-form.component.html',
  styleUrls: ['./reactivo-form.component.css']
})
export class ReactivoFormComponent {

  constructor() { }

  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }

}
