import { Component, OnInit } from '@angular/core';
import { MonedaService } from "./../../services/moneda.service";


@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})
export class MonedaComponent implements OnInit {

  constructor(public monedaService: MonedaService) { }

  ngOnInit(): void {
    this.getMonedas();  
    if(this.getCookie("token")) {
      document.getElementById("grafico").innerHTML = this.createGraficoUsuario();
    } else {
      document.getElementById("grafico").innerHTML = this.createGraficoTop();
    }
    
  }

  getMonedas () {
    this.monedaService.getMonedas();
  }

  createGraficoTop () {
    console.log("createGraficoTop");
    return "createGraficoTop";
  }

  createGraficoUsuario () {
    console.log("createGraficoUsuario");
    return "createGraficoUsuario";
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
