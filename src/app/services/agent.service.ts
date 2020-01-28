import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  findById(agentId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(agentId)) {
        reject("Invalid agent id");
      }

      this.http.get(environment.api_url+ '/agents/' + agentId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.agent == null) {
              reject("agent request did not return a valid result");
            }

            resolve(data.agent);
          },
        error  => {
          reject(error);
        });
    })
  }

  findByCompanyId(companyId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject("Invalid company id");
      }

      this.http.get(environment.api_url+ '/agents?company_id=' + companyId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.agents == null) {
              reject("Vehicle request did not return a valid result");
            }

            resolve(data.agents);
          },
        error  => {
          reject(error);
        });
    })
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/agents')
        .subscribe(
          (data:any)  => {
            if(data == null || data.agents == null) {
              reject("Agents request did not return a valid result");
            }

            resolve(data.agents);
          },
        error  => {
          reject(error);
        });
    })
  }

  insertOne(firstName: string, lastName: string, phone: string) {
    return new Promise((resolve, reject) => {
      if(typeof firstName !== 'string') {
        throw "Invalid first name"
      }

      if(typeof lastName !== 'string') {
        throw "Invalid last name"
      }

      if(typeof phone !== 'string') {
        throw "Invalid phone"
      }

      const obj = {
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }

      this.http.post(environment.api_url + "/agents", obj)
        .subscribe(
          (data:any)  => {
            if(data == null || data.agent == null) {
              reject("Agent request did not return a valid result");
            }

            resolve(data.agent);
          },
        error  => {
          reject(error)
        });
    });
  }

  updateById(agentId: number, firstName: string, lastName: string, phone: string) {
    return new Promise((resolve, reject) => {
      if(typeof agentId !== 'number') {
        throw "invalid agent id"
      }

      if(typeof firstName !== 'string') {
        throw "invalid first name"
      }

      if(typeof lastName !== 'string') {
        throw "invalid last name"
      }

      if(typeof phone !== 'string') {
        throw "invalid phone"
      }

      const obj = {
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }

      this.http.put(environment.api_url + "/agents/" + agentId, obj)
        .subscribe(
          (data:any)  => {
            if(data == null || data.agent == null) {
              reject("Agent request did not return a valid result");
            }

            resolve(data.agent);
          },
        error  => {
          reject(error)
        });
    });
  }
}
