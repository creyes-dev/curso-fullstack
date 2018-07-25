import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactivo-form-dos',
  templateUrl: './reactivo-form-dos.component.html',
  styleUrls: ['./reactivo-form-dos.component.css']
})
export class ReactivoFormDosComponent {

  // The FormBuilder service provides convenience methods to handle generating controls.
  // Underneath, the FormBuilder is creating and returning the instances in the same manner,
  // but with much less work.

  // The FormBuilder service has three methods: control(), group(), and array().
  // These methods are factory methods for generating form controls in your component class including a FormControl,
  // FormGroup, and FormArray respectively.
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  // updateProfile only replaces properties defined in the object that have changed in the
  // form model, because you’re only providing partial updates.
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

}

