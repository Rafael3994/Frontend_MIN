import { Component, OnInit } from '@angular/core';
import { MovimientoService } from "../../services/movimiento.service";
import { NgForm } from "@angular/forms";
import { Movimiento } from 'src/app/models/movimiento';


@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  constructor(public movimientoService: MovimientoService) { }
  token = this.getCookie("token")
  ngOnInit(): void {
    this.getMovimientos(this.token);
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getMovimientos(token) {
    this.movimientoService.getMovimientos(token).subscribe(
      res => {
        // console.log(res)
        this.movimientoService.movimiento = res;
        // console.log(this.movimientoService)
      },
      err => console.error(err)
    );
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

  addMovimiento(form: NgForm) {
    if (form.value._id) {
      this.movimientoService.updateMovimiento(form.value).subscribe(
        res => {
          this.getMovimientos(this.token);
          form.reset();
        },
        err => console.log(err)
      );
    }
    else {
      this.movimientoService.createMovimiento(form.value).subscribe(
        res => {
          this.getMovimientos(this.token);
          form.reset();
        },
        err => console.log(err)
      );
    }
  }

  editMovimiento(movimiento: Movimiento) {
    this.movimientoService.form_movimiento = movimiento;
    this.getMovimientos(this.token);
  }

  deleteMovimiento(id: string) {
    if (confirm("Seguro que lo quieres borrar?")) {
      this.movimientoService.deleteMovimiento(id).subscribe(
        res => {
          // console.log(res)
          this.getMovimientos(this.token);
        },
        err => console.error(err)
      );
    }
  }
}