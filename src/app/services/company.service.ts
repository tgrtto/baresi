import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/companies')
        .subscribe(
          (data:any)  => {
            if(data == null || data.companies == null) {
              reject("Companies request did not return a valid result");
            }

            resolve(data.companies);
          },
        error  => {
          reject(error);
        });
    })
  }

  findById(companyId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject("Invalid company id");
      }

      this.http.get(environment.api_url+ '/companies/' + companyId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.company == null) {
              reject("Companies request did not return a valid result");
            }

            resolve(data.company);
          },
        error  => {
          reject(error);
        });
    })
  }

  insertOne(name: string, country: string) {
    return new Promise((resolve, reject) => {
      if(typeof name !== 'string') {
        reject('Invalid name');
      }

      if(typeof country !== 'string') {
        reject('Invalid country');
      }

      this.http.post(environment.api_url + "/companies",
        {
          name: name,
          country: country
        })
        .subscribe(
          (data:any)  => {
            if(data == null || data.company == null) {
              reject("Company insert did not return a valid result");
            }

            resolve(data.company);
          },
        error  => {
          console.log(error);
          reject(error);
        });
    });
  }

  updateById(companyId: number, name: string, country: string) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject('Invalid id');
      }

      if(typeof name !== 'string') {
        reject('Invalid name');
      }

      if(typeof country !== 'string') {
        reject('Invalid country');
      }

      this.http.put(environment.api_url + "/companies/" + companyId,
        {
          name: name,
          country: country
        })
        .subscribe(
          (data:any)  => {
            if(data == null || data.company == null) {
              reject("Company insert did not return a valid result");
            }

            resolve(data.company);
          },
        error  => {
          console.log(error);
          reject(error);
        });
    });
  }
}
