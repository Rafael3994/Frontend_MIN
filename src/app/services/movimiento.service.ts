import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movimiento } from "../models/movimiento";
import { URL_API } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }

  URL = URL_API+"/api/movimientos"

  form_movimiento: Movimiento = {
    nombre_moneda_original: "",
    valor_moneda_original: "",
    cantidad_moneda_original: "",
    nombre_moneda_nueva: "",
    valor_moneda_nueva: "",
    cantidad_moneda_nueva: "",
    fecha_operacion: "",
    usuario: ""
  };

  movimiento : Movimiento[];

  getMovimientos(token) {
    return this.http.get<Movimiento[]>(`${this.URL}/${token}`);
  }

  createMovimiento(movimiento: Movimiento) {
    let date = new Date();
    let fecha_opercion = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    // console.log(fecha_opercion);
    movimiento.fecha_operacion = fecha_opercion;
    movimiento.usuario = this.getCookie("token");
    return this.http.post(this.URL, movimiento);
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

  updateMovimiento(movimiento: Movimiento){
    // console.log("llego")
    return this.http.put(`${this.URL}/${movimiento._id}`, movimiento);
  }

  deleteMovimiento(_id: string){
    // return this.http.delete(this.URL_API + "/" + _id) son lo mismo
    return this.http.delete(`${this.URL}/${_id}`);
  }
}