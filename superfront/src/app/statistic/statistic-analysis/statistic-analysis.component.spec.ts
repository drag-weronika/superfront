import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticAnalysisComponent } from './statistic-analysis.component';

describe('StatisticAnalysisComponent', () => {
  let component: StatisticAnalysisComponent;
  let fixture: ComponentFixture<StatisticAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
