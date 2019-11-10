import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { TicketRequestService } from '../services/ticket-request.service'

declare var moment:any;

@Component({
  selector: 'app-ticket-request-view',
  templateUrl: './ticket-request-view.component.html',
  styleUrls: ['./ticket-request-view.component.css']
})
export class TicketRequestViewComponent implements OnInit {

  loading = true;
  ticketRequest: any = {};
  ticketRequestId: string;
  error: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private router: Router) {
    this.ticketRequestId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/ticket_requests/' + this.ticketRequestId)
      .subscribe(
        (data:any)  => {
          this.ticketRequest = data.ticket_request;
          console.log(this.ticketRequest);

          this.ticketRequest['created'] =  moment(this.ticketRequest['created']).format("DD/MM/YYYY HH:mm:ss");
          this.ticketRequest['formattedDate'] = moment(this.ticketRequest['date']).format("DD/MM/YYYY");

          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
