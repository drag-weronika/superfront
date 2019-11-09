import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBinNumberComponent } from './dropdown-bin-number.component';

describe('DropdownBinNumberComponent', () => {
  let component: DropdownBinNumberComponent;
  let fixture: ComponentFixture<DropdownBinNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownBinNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownBinNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
