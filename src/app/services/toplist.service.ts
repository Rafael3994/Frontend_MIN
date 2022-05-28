import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ToplistService {

  result:any;

  constructor(private _http: HttpClient) { }

  getPrices() {
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BNB,ADA,DOT,LIT,VET,XLM,LINK,DOGE&tsyms=EUR')
      .pipe(map((result => this.result = result)));
  }

}
