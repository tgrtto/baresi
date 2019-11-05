import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsUsersComponent } from './insights-users.component';

describe('InsightsUsersComponent', () => {
  let component: InsightsUsersComponent;
  let fixture: ComponentFixture<InsightsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
