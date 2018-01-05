import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { UserInfoProvider } from './user-info';
import { HttpFactory } from '../util/HttpFactory';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalesProvider {

  private apiUrl: string = environment.apiUrl
  private routeSales: string = 'sales'

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

  public getSales() {
    const promise = this.createRequest(this.apiUrl + this.routeSales, 'get')

    return promise
  }

  public getSalesById(salesID) {
    const route = `${this.routeSales}/${salesID}`
    const promise = this.createRequest(this.apiUrl + route, 'get')

    return promise
  }

  public addSales(sales) {
    const salesJSON = JSON.stringify(sales)
    const promise = this.createRequest(this.apiUrl + this.routeSales, 'post', salesJSON)

    return promise
  }

  public editSales(saleID, sale) {
    const route = `${this.routeSales}/${saleID}`
    const saleJSON = JSON.stringify(sale)
    const promise = this.createRequest(this.apiUrl + route, 'put', saleJSON)

    return promise
  }

  public removeSales(saleID) {
    const route = `${this.routeSales}/${saleID}`
    const promise = this.createRequest(this.apiUrl + route, 'delete')

    return promise
  }

}
