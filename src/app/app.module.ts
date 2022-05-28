import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { MonedaComponent } from './components/moneda/moneda.component';
import { ContactComponent } from './components/homePage/contact/contact.component';
import { FeedbackComponent } from './components/homePage/feedback/feedback.component';
import { FooterComponent } from './components/homePage/footer/footer.component';
import { HomeComponent } from './components/homePage/home/home.component';
import { MarketComponent } from './components/homePage/market/market.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { LoginComponent } from './components/login/login.component';
import { ToplistComponent } from './components/homePage/toplist/toplist.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    MonedaComponent,
    ContactComponent,
    FeedbackComponent,
    FooterComponent,
    HomeComponent,
    MarketComponent,
    IndexComponent,
    RegisterComponent,
    MovimientoComponent,
    LoginComponent,
    ToplistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
