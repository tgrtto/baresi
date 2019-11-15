import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/stops')
        .subscribe(
          (data:any)  => {
            if(data == null || data.stops == null) {
              reject("Stops request did not return a valid result");
            }

            resolve(data.stops);
          },
        error  => {
          reject(error);
        });
    })
  }

  findById(stopId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(stopId)) {
        reject("Invalid stop id");
      }

      console.log(stopId);
      this.http.get(environment.api_url+ '/stops/' + stopId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.stop == null) {
              reject("stop request did not return a valid result");
            }

            resolve(data.stop);
          },
        error  => {
          reject(error);
        });
    })
  }

  insertOne(name :string, popular: boolean, country: string, timezone:string) {
    return new Promise((resolve, reject) => {
      if(typeof name !== 'string') {
        reject("Invalid name");
      }

      if(typeof popular !== 'boolean') {
        reject("Invalid popular");
      }

      if(typeof timezone !== 'string') {
        reject("Invalid timezone");
      }

      if(typeof country !== 'string') {
        reject("Invalid country");
      }

      const obj = {
        name: name,
        popular: popular,
        timezone: timezone,
        country: country
      }

      this.http.post(environment.api_url+ '/stops', obj)
        .subscribe(
          (data:any)  => {
            if(data == null || data.stop == null) {
              reject("Stops request did not return a valid result");
            }

            resolve(data.stop);
          },
        error  => {
          reject(error);
        });
    });
  }

  updateById(stopId: number, name :string, popular: boolean, country: string, timezone:string) {
    return new Promise((resolve, reject) => {
      if(isNaN(stopId)) {
        reject("invalid stop id")
      }

      if(typeof name !== 'string') {
        reject("Invalid name");
      }

      if(typeof popular !== 'boolean') {
        reject("Invalid popular");
      }

      if(typeof timezone !== 'string') {
        reject("Invalid timezone");
      }

      if(typeof country !== 'string') {
        reject("Invalid country");
      }

      this.http.put(environment.api_url + "/stops/" + stopId,
        {
          name: name,
          popular: popular,
          timezone: timezone,
          country: country
        })
        .subscribe(
          (data:any)  => {
            if(data == null || data.stop == null) {
              reject("Company insert did not return a valid result");
            }

            resolve(data.stop);
          },
        error  => {
          reject(error);
        });
    });
  }
}
