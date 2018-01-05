import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { UserInfoProvider } from './user-info';

import { HttpFactory } from '../util/HttpFactory';

import { Observable } from 'rxjs/Observable';

import { environment } from '../environment/environment';

@Injectable()
export class CustomersProvider {

  private apiUrl: string = environment.apiUrl
  private routeCustomers: string = 'customers'

  constructor(public http: Http, private userProvider: UserInfoProvider) {}

  private getAuthenticatedRequestOption() {
    const requestOptions = HttpFactory.getRequestOptions({
      'Authorization': `Bearer ${this.userProvider.user.token}`
    })

    return requestOptions
  }

  private createRequest(url: string, method: string, body?) {
    const requestOptions = this.getAuthenticatedRequestOption()
    let request: Observable<Response> = null

    switch (method) {
      case 'get':
        request = this.http.get(url, requestOptions)
        break

      case 'post':
        request = this.http.post(url, body, requestOptions)
        break

      case 'put':
        request = this.http.put(url, body, requestOptions)
        break
      
      case 'delete':
        request = this.http.delete(url, requestOptions)
        break
    
      default:
        request = null
        break
    }
    
    const promise = new Promise((resolve, reject) => {
      request.subscribe(
        data => resolve(data.json()),
        error => reject(error)
      )
    })

    return promise
  }

  public getCustomers() {
    const promise = this.createRequest(this.apiUrl + this.routeCustomers, 'get')

    return promise
  }

  public getCustomersById(customerID) {
    const route = `${this.routeCustomers}/${customerID}`
    const promise = this.createRequest(this.apiUrl + route, 'get')

    return promise
  }

  public addCustomers(customer) {
    const customerJSON = JSON.stringify(customer)
    const promise = this.createRequest(this.apiUrl + this.routeCustomers, 'post', customerJSON)

    return promise
  }

  public editCustomer(customerID, customer) {
    const route = `${this.routeCustomers}/${customerID}`
    const customerJSON = JSON.stringify(customer)
    const promise = this.createRequest(this.apiUrl + route, 'put', customerJSON)

    return promise
  }

  public removeCustomer(customerID) {
    const route = `${this.routeCustomers}/${customerID}`
    const promise = this.createRequest(this.apiUrl + route, 'delete')

    return promise
  }

}
