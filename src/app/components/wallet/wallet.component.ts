import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { NgForm } from "@angular/forms";
import { Wallet } from 'src/app/models/wallet';
import { MonedaService } from "./../../services/moneda.service";


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(public walletService: WalletService, public monedaService: MonedaService) { }
  token = this.getCookie("token")
  ngOnInit(): void {
    this.monedaService.getMonedas();
    this.getWallets(this.token);
  }

  // Funcion que reseteara los valores del formulario
  resetForm(form: NgForm) {
    form.reset();
  }

  // Funcion que ira al Service para mostrar todas las Wallets
  getWallets(token) {
    this.walletService.getWallets(token).subscribe(
      res => {
        console.log(res)
        this.walletService.wallet = res;
        // console.log(this.walletService)
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

  // Funcion que comprovara el id que se le pasa en el form para ver como proceder
  // en caso de que exista esta id llamaremos al update de Service para que actualize la Wallet
  // de no tener id crearemos una nueva Wallet 
  addWallet(form: NgForm) {
    if (form.value._id) {
      this.walletService.updateWallet(form.value).subscribe(
        res => {
          this.getWallets(this.token);
          form.reset();
        },
        err => console.log(err)
      );
    }
    else {
      this.walletService.createWallet(form.value).subscribe(
        res => {
          this.getWallets(this.token);
          form.reset();
        },
        err => console.log(err)
      );
    }
  }

  // Funcion que le pasara al Service de Wallet la Wallet editada, despues de actualizarla, la mostrara de nuevo
  editWallet(wallet: Wallet) {
    this.walletService.form_wallet = wallet;
    this.getWallets(this.token);
  }

  // Funcion que te hace confirmar si quieres eliminar la Wallet,
  // en caso positivo se conecta al Service de Wallet para eliminar la Wallet, luego vuelve a mostrar todas las Wallets
  deleteWallet(id: string) {
    if (confirm("Seguro que lo quieres borrar?")) {
      this.walletService.deleteWallet(id).subscribe(
        res => {
          // console.log(res)
          this.getWallets(this.token);
        },
        err => console.error(err)
      );
    }
  }
}