import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  constructor(private http: HttpClient) { }
  
  // allMonedas = "";
  allMonedas = [];

  getMonedas() {
    this.http.get("https://api.coingecko.com/api/v3/coins").subscribe(data => {
      console.log(data);
      // console.info(typeof(data));
      // this.allMonedas = data;
      this.allMonedas.push(data);
      // console.log(this.allMonedas);
    });
  }
}
