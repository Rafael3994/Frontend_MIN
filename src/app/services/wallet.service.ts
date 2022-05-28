import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Wallet } from "../models/wallet";
import { URL_API } from "./constants";
import { MonedaService } from "./moneda.service";



@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, public monedaService: MonedaService) { }

  URL = URL_API + "/api/wallets"

  form_wallet: Wallet = {
    nombre: "",
    moneda: "",
    direccion: "",
    saldo: "",
    valor_inicial: "",
    valor_actual: "",
    usuario: ""
  };
  
  wallet : Wallet[];

  //Funcion para obtener todas las Wallets a traves de una consulta a nuestra API
  getWallets(token) {
    // return this.http.get<Wallet[]>(`${this.URL}/${this.getCookie("token")}`, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Autorithation': "Min " + this.getCookie("token") })});
    return this.http.get<Wallet[]>(`${this.URL}/${token}`);
    // return this.http.put(`${this.URL}/${wallet._id}`, wallet);

  }

  // Funcion que crear Wallet a traves de los datos que nos pasa el usuario, de los que optenemos de la cookie
  // y los valores de la moneda que recogemos de la API externa
  createWallet(wallet: Wallet) {
    console.info(this.monedaService.allMonedas);
    wallet.usuario = this.getCookie("token");
        
    
    console.log(this.monedaService.allMonedas);
    // console.log(wallet);

    this.monedaService.allMonedas.forEach(element => {
      console.log("element");
      console.log(element);
      element.forEach(moneda => {
        console.log("moneda.id");
        console.log(moneda.id);
        if(moneda.id == wallet.moneda){
            // console.info(moneda["market_data"]["current_price"].eur);
            wallet.valor_inicial = moneda["market_data"]["current_price"].eur;
            wallet.valor_actual = moneda["market_data"]["current_price"].eur;
        }
      });
    });
console.log(wallet);
    return this.http.post(this.URL, wallet);
  }

  //Funcion que mira si existe una cookie
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Funcion que actualiza una Wallet a traves de una consulta a nuestra API
  updateWallet(wallet: Wallet){
    console.info(this.monedaService.allMonedas);
    // console.info(wallet);
    // console.log(wallet.moneda);

    this.monedaService.allMonedas.forEach(element => {
      // console.log(element);
      element.forEach(moneda => {
        // console.log(moneda.id);
        if(moneda.id == wallet.moneda){
            // console.info(moneda["market_data"]["current_price"].eur);
            wallet.valor_actual = moneda["market_data"]["current_price"].eur;
        }
      });
    });

    return this.http.put(`${this.URL}/${wallet._id}`, wallet);
  }

  // Funcion que elimina una Wallet a traves de una consulta a nuestra API
  deleteWallet(_id: string){
    // return this.http.delete(this.URL_API + "/" + _id) son lo mismo
    return this.http.delete(`${this.URL}/${_id}`);
  }
}