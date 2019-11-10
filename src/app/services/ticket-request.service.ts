import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketRequestService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/ticket_requests')
        .subscribe(
          (data:any)  => {
            if(data == null || data.ticket_requests == null) {
              reject("Ticket requests did not return a valid result");
            }

            resolve(data.ticket_requests);
          },
        error  => {
          reject(error);
        });
    })
  }
}
