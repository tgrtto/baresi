import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService {

  constructor(private http: HttpClient) { }

  findByPageAndSize(page: number, size: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(page)) {
        reject("Invalid page");
      }

      if(isNaN(size)) {
        reject("Invalid size");
      }

      this.http.get(environment.api_url+ '/upcoming?page=' + page + '&size=' + size)
        .subscribe(
          (data:any)  => {
            if(data == null || data.upcoming == null) {
              reject("upcoming request did not return a valid result");
            }

            resolve(data.upcoming);
          },
        error  => {
          reject(error);
        });
    })
  }
}
