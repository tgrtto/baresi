import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  findByCompanyId(companyId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject("Invalid company id");
      }

      this.http.get(environment.api_url+ '/vehicles?company_id=' + companyId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.vehicles == null) {
              reject("Vehicle request did not return a valid result");
            }

            resolve(data.vehicles);
          },
        error  => {
          reject(error);
        });
    })
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/vehicles')
        .subscribe(
          (data:any)  => {
            if(data == null || data.vehicles == null) {
              reject("Vehicle request did not return a valid result");
            }

            resolve(data.vehicles);
          },
        error  => {
          reject(error);
        });
    })
  }
}
