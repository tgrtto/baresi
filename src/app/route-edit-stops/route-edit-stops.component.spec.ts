import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditStopsComponent } from './route-edit-stops.component';

describe('RouteEditStopsComponent', () => {
  let component: RouteEditStopsComponent;
  let fixture: ComponentFixture<RouteEditStopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteEditStopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEditStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
