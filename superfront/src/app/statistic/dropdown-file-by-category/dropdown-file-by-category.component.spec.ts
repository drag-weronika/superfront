import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFileByCategoryComponent } from './dropdown-file-by-category.component';

describe('DropdownFileByCategoryComponent', () => {
  let component: DropdownFileByCategoryComponent;
  let fixture: ComponentFixture<DropdownFileByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFileByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFileByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
