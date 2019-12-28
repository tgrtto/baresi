import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url+ '/routes')
        .subscribe(
          (data:any)  => {
            if(data == null || data.routes == null) {
              reject("Route request did not return a valid result");
            }

            resolve(data.routes);
          },
        error  => {
          reject(error);
        });
    })
  }

  findByCompanyId(companyId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject("Invalid company id")
      }

      this.http.get(environment.api_url+ '/routes?company_id=' + companyId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.routes == null) {
              reject("Route request did not return a valid result");
            }

            resolve(data.routes);
          },
        error  => {
          reject(error);
        });

    });
  }

  insertOne(companyId: number, stops: any) {
    return new Promise((resolve, reject) => {
      if(stops == null || stops.length < 1) {
        reject("invalid stops");
      }

      if(isNaN(companyId)) {
        reject("Invalid company id")
      }

      this.http.post(environment.api_url + "/routes/new",
        {
          stops: stops,
          company_id: companyId
        })
        .subscribe(
          (data:any)  => {
            if(data == null || data.route == null) {
              reject("Route insert did not return a valid result");
            }

            resolve(data.route);
          },
        error  => {
          reject(error);
        });
    });
  }

  cloneById(companyId: number, routeId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        reject("Invalid company id")
      }

      if(isNaN(routeId)) {
        reject("Invalid route id")
      }

      this.http.post(environment.api_url + "/routes/clone",
        {
          company_id: companyId,
          route_id: routeId
        })
        .subscribe(
          (data:any)  => {
            if(data == null || data.route == null) {
              reject("Route clone did not return a valid result");
            }

            resolve(data.route);
          },
        error  => {
          reject(error);
        });
    });
  }
}
