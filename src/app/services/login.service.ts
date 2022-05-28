import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { URL_API } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  URL = URL_API

  form_user: User = {
    nombre: "",
    apellidos: "",
    email: "",
    password: ""
  };
  
  user : User[];


  login(user) {
    console.log(`${this.URL}/login`);
    console.log(user);
    return this.http.post(`${this.URL}/login`, user);
  }
}