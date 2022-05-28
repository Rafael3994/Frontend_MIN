import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { URL_API } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  URL = URL_API

  form_user: User = {
    nombre: "",
    apellidos: "",
    email: "",
    password: ""
  };
  user : User[];

  getUsers() {
    return this.http.get<User[]>(this.URL);
  }

  createUser(user: User) {
    return this.http.post(this.URL, user);
  }

  updateUser(user: User){
    // console.log("llego")
    return this.http.put(`${this.URL}/${user._id}`, user);
  }

  deleteUser(_id: string){
    // return this.http.delete(this.URL_API + "/" + _id) son lo mismo
    return this.http.delete(`${this.URL}/${_id}`);
  }

  register(user: User) {
    console.log(`${this.URL}/register`);
    console.log(user);
    return this.http.post(`${this.URL}/register`, user);
  }
}
