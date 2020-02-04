import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  findLayoutByTripIdAndDateAndStopId(tripId: number, date: any, stopId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(tripId)) {
        reject("Invalid tripId");
      }

      if(isNaN(stopId)) {
        reject("Invalid stopId");
      }

      if(date == null) {
        reject("Invalid date");
      }

      let params = new HttpParams()
        .set("tripId", tripId.toString())
        .set("date", date.toString())
        .set("stopId", stopId.toString())

      this.http.get(environment.api_url+ '/bookings', {params: params})
        .subscribe(
          (data:any)  => {
            if(data == null || data.layout == null || data.bookings == null) {
              reject("Bookings request did not return a valid result");
            }

            resolve(data);
          },
        error  => {
          reject(error);
        });
    })
  }
}
