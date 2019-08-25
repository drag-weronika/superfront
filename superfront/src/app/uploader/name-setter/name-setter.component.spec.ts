import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSetterComponent } from './name-setter.component';

describe('NameSetterComponent', () => {
  let component: NameSetterComponent;
  let fixture: ComponentFixture<NameSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
