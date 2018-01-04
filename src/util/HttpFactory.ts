import { Headers, RequestOptions } from '@angular/http';

export class HttpFactory {
    static getRequestOptions(params?) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        for(var property in params) {
            headers.append(property, params[property])
        }

        let options = new RequestOptions({ headers: headers })

        return options
    }
}