import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivoFormComponent } from './reactivo-form.component';

describe('ReactivoFormComponent', () => {
  let component: ReactivoFormComponent;
  let fixture: ComponentFixture<ReactivoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
