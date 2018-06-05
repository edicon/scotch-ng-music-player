import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

    // org: clientId = '2f98992c40b8edf17423d93bda2e04ab';
    clientId = '95f22ed54a5c297b1c41f72d713623ef';

    constructor(
      private http: Http
    ) {}

    get(url, attachClientId?) {
      let u;
      attachClientId ? u = this.prepareUrl(url) : u = url;
      return this.http.get(u);
    }

    prepareUrl(url) {
      //Attach client id to stream url
      return `${url}?client_id=${this.clientId}`
    }

}
