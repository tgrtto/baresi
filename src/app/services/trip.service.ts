import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/trips')
        .subscribe(
          (data:any)  => {
            if(data == null || data.trips == null) {
              reject("Trip request did not return a valid result");
            }

            console.log(data.trips);
            resolve(data.trips);
          },
        error  => {
          reject(error);
        });
    })
  }

  findById(tripId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(tripId)) {
        reject("Invalid trip id");
      }

      this.http.get(environment.api_url+ '/trips/' + tripId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.trip == null) {
              reject("Trip request did not return a valid result");
            }

            resolve(data.trip);
          },
        error  => {
          console.log(error);
          reject(error);
        });
    })
  }

}
