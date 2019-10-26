import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovarianceComponent } from './covariance.component';

describe('CovarianceComponent', () => {
  let component: CovarianceComponent;
  let fixture: ComponentFixture<CovarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovarianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
