import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.definirButtonLogin();
    this.definirButtonRegistrar();
    this.definirButtonMovimiento();
  }

  //Funcion que definira que pondra el boton dependiendo de si existe una cookie
  definirButtonLogin () {
    if(this.getCookie("token") == ""){
      document.getElementById("bt-login").textContent = "Iniciar sesión"
    } else {
      document.getElementById("bt-login").textContent = "Cerrar sesión"
    }
  }
  
  definirButtonMovimiento () {
    if(this.getCookie("token") != ""){
      document.getElementById("btn-provisional").style.display = "block";
    } else {
      document.getElementById("btn-provisional").style.display = "none";
    }
  }

  //Funcion que definira que pondra el boton dependiendo de si existe una cookie
  definirButtonRegistrar () {
    if(this.getCookie("token") == ""){
      document.getElementById("bt-begin").textContent = "Empieza ahora"
    } else {
      document.getElementById("bt-begin").textContent = "Añadir Cartera"
    }
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

}