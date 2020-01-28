import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/transactions')
        .subscribe(
          (data:any)  => {
            if(data == null || data.transactions == null) {
              reject("Transaction request did not return a valid result");
            }

            resolve(data.transactions);
          },
        error  => {
          reject(error);
        });
    })
  }
}
