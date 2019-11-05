import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsCitiesComponent } from './insights-cities.component';

describe('InsightsCitiesComponent', () => {
  let component: InsightsCitiesComponent;
  let fixture: ComponentFixture<InsightsCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
