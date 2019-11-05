import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditSeatsComponent } from './route-edit-seats.component';

describe('RouteEditSeatsComponent', () => {
  let component: RouteEditSeatsComponent;
  let fixture: ComponentFixture<RouteEditSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteEditSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEditSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
