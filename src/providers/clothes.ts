import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UserInfoProvider } from './user-info';

import { HttpFactory } from '../util/HttpFactory';

import { environment } from '../environment/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClothesProvider {

  private apiUrl: string = environment.apiUrl
  private routeClothes: string = 'clothes'

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

  public getClothes() {
    const promise = this.createRequest(this.apiUrl + this.routeClothes, 'get')

    return promise
  }

  public getClothesById(clotheID) {
    const route = `${this.routeClothes}/${clotheID}`
    const promise = this.createRequest(this.apiUrl + route, 'get')

    return promise
  }

  public addCltohes(clothe) {
    const clotheJSON = JSON.stringify(clothe)
    const promise = this.createRequest(this.apiUrl + this.routeClothes, 'post', clotheJSON)

    return promise
  }

  public editClothe(clotheID, clothe) {
    const route = `${this.routeClothes}/${clotheID}`
    const clotheJSON = JSON.stringify(clothe)
    const promise = this.createRequest(this.apiUrl + route, 'put', clotheJSON)

    return promise
  }

  public removeClothe(clotheID) {
    const route = `${this.routeClothes}/${clotheID}`
    const promise = this.createRequest(this.apiUrl + route, 'delete')

    return promise
  }

}