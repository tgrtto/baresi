import { TestBed } from '@angular/core/testing';

import { TicketRequestService } from './ticket-request.service';

describe('TicketRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketRequestService = TestBed.get(TicketRequestService);
    expect(service).toBeTruthy();
  });
});
