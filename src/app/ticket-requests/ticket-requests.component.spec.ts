import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRequestsComponent } from './ticket-requests.component';

describe('TicketRequestsComponent', () => {
  let component: TicketRequestsComponent;
  let fixture: ComponentFixture<TicketRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
