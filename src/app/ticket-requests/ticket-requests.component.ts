import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { TicketRequestService } from '../services/ticket-request.service'

declare var moment:any;

@Component({
  selector: 'app-ticket-requests',
  templateUrl: './ticket-requests.component.html',
  styleUrls: ['./ticket-requests.component.css']
})
export class TicketRequestsComponent implements OnInit {

  loading: boolean = true;
  ticketRequests: any = [];
  error: string;

  constructor(
    private contextService: ContextService,
    private ticketRequestService: TicketRequestService,
    private router: Router) {

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.ticketRequests = await this.ticketRequestService.findAll();
      for(let t of this.ticketRequests) {
        t['formattedDate'] = moment(t['date']).format("YYYY/MM/DD");
      }
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
