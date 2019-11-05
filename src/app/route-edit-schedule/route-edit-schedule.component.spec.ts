import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditScheduleComponent } from './route-edit-schedule.component';

describe('RouteEditScheduleComponent', () => {
  let component: RouteEditScheduleComponent;
  let fixture: ComponentFixture<RouteEditScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteEditScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEditScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
