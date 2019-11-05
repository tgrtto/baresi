import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditSegmentsComponent } from './route-edit-segments.component';

describe('RouteEditSegmentsComponent', () => {
  let component: RouteEditSegmentsComponent;
  let fixture: ComponentFixture<RouteEditSegmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteEditSegmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEditSegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
