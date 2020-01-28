import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  findById(vehicleId: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(vehicleId)) {
        reject("Invalid vehicle id");
      }

      this.http.get(environment.api_url+ '/vehicles/' + vehicleId)
        .subscribe(
          (data:any)  => {
            if(data == null || data.vehicle == null) {
              reject("vehicle request did not return a valid result");
            }

            resolve(data.vehicle);
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

  insertOne(companyId: number, brand :string, ac: boolean, wifi: boolean, toilet:boolean, rows: number, columns: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(companyId)) {
        throw "company id is not a number"
      }

      if(typeof rows !== 'number' || rows == 0) {
        throw "Please add rows"
      }

      if(typeof columns !== 'number' || columns == 0) {
        throw "Please add columns"
      }

      if(typeof brand !== 'string') {
        throw "Please add a brand"
      }

      if(typeof wifi !== 'boolean') {
        throw "Please check whether bus has wifi or not."
      }

      if(typeof ac !== 'boolean') {
        throw "Please check whether bus has ac or not."
      }

      if(typeof toilet !== 'boolean') {
        throw "Please check whether bus has a toilet or not."
      }

      const obj = {
        company_id: companyId,
        brand: brand,
        rows: rows,
        columns: columns,
        wifi: wifi,
        ac: ac,
        toilet: toilet
      }

      this.http.post(environment.api_url + "/vehicles", obj)
        .subscribe(
          (data:any)  => {
            if(data == null || data.vehicle == null) {
              reject("Vehicle request did not return a valid result");
            }

            resolve(data.vehicle);
          },
        error  => {
          reject(error)
        });
    });
  }

  updateById(vehicleId: number, companyId: number, brand :string, ac: boolean, wifi: boolean, toilet:boolean, rows: number, columns: number) {
    return new Promise((resolve, reject) => {
      if(isNaN(vehicleId)) {
        throw "vehicle id is not a number"
      }

      if(isNaN(companyId)) {
        throw "company id is not a number"
      }

      if(typeof rows !== 'number' || rows == 0) {
        throw "Please add rows"
      }

      if(typeof columns !== 'number' || columns == 0) {
        throw "Please add columns"
      }

      if(typeof brand !== 'string') {
        throw "Please add a brand"
      }

      if(typeof wifi !== 'boolean') {
        throw "Please check whether bus has wifi or not."
      }

      if(typeof ac !== 'boolean') {
        throw "Please check whether bus has ac or not."
      }

      if(typeof toilet !== 'boolean') {
        throw "Please check whether bus has a toilet or not."
      }

      const obj = {
        company_id: companyId,
        brand: brand,
        rows: rows,
        columns: columns,
        wifi: wifi,
        ac: ac,
        toilet: toilet
      }

      this.http.put(environment.api_url + "/vehicles/" + vehicleId, obj)
        .subscribe(
          (data:any)  => {
            if(data == null || data.vehicle == null) {
              reject("Vehicle request did not return a valid result");
            }

            resolve(data.vehicle);
          },
        error  => {
          reject(error)
        });
    });
  }
}
