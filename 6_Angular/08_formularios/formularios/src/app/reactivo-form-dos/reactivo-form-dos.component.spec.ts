import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivoFormDosComponent } from './reactivo-form-dos.component';

describe('ReactivoFormDosComponent', () => {
  let component: ReactivoFormDosComponent;
  let fixture: ComponentFixture<ReactivoFormDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivoFormDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivoFormDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
