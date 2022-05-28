import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../services/register.service";
import { NgForm } from "@angular/forms";
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public registerService: RegisterService,
    public router: Router
    ) { }

  token = ""

  ngOnInit(): void {
    if (this.getCookie("token") != "") {
      this.router.navigate(['/wallet']);
      // console.log("Muestro: "+ this.getCookie("token"));
    } 
  }

    //Funcion que elimina una cookie al pasar su nombre
    delete_cookie = function(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
  
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

  resetForm(form: NgForm) {
    form.reset();
  }

  registerUser(form: NgForm) {
    this.registerService.register(form.value).subscribe(
      (res:any) => {
        console.log(res);
        var token = res.token;  
        // localStorage.setItem('token', token); //ejemplo tener token en localstorage
        document.cookie = "token="+token; //setea una cookie
        form.reset();
        this.router.navigate(['/']);
      },
      err => console.log(err)
    );
  }
  
}