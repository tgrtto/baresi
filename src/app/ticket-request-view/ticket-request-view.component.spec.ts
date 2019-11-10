import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRequestViewComponent } from './ticket-request-view.component';

describe('TicketRequestViewComponent', () => {
  let component: TicketRequestViewComponent;
  let fixture: ComponentFixture<TicketRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
