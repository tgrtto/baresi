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
}
