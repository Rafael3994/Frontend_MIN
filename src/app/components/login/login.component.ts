import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { NgForm } from "@angular/forms";
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public loginService: LoginService, 
    public router: Router
    ) { }

  token = ""
  user = {
    email: "",
    password: ""
  }

  ngOnInit(): void {
    if (this.getCookie("token") == "") {
      // console.log("Muestro NADA: "+ this.getCookie("token"));  
    } else {
      // console.log("Muestro: "+ this.getCookie("token"));
      this.delete_cookie("token");
      this.router.navigate(['/']);
    }
    console.log("RESULTADO FINAL: "+document.cookie);
  }

  // ¿¿¿ SE UTILIZA / UTILIZARA ???
  resetForm(form: NgForm) {
    form.reset();
  }

 // Funcion a la que se le pasa el formulario de login y hace una consulta para ver si existe en la base de datos.
 // Si las credenciales son correctas creara una cookie con el id cifrado del usuario, si no son correctas salta un alert.
  loginUser(form: NgForm) {
    console.log(form.value)
      this.loginService.login(form.value).subscribe(
        (res:any) => {
          console.log("res:");
          var token = res.token;  
          // localStorage.setItem('token', token); //ejemplo tener token en localstorage
          document.cookie = "token="+token; //setea una cookie
          form.reset();
          this.router.navigate(['/']);
        },
        // err => console.log(err),
        err => alert("Credenciales Incorrectas."), 
      );
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
}
