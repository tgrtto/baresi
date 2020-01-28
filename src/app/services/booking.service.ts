import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/bookings')
        .subscribe(
          (data:any)  => {
            if(data == null || data.bookings == null) {
              reject("Bookings request did not return a valid result");
            }

            resolve(data.bookings);
          },
        error  => {
          reject(error);
        });
    })
  }
}
