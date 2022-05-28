import { Component, OnInit } from '@angular/core';
import { ToplistService } from "../../../services/toplist.service";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;

  constructor(private _data: ToplistService) {

  }

  ngOnInit() {
    this._data.getPrices()
      .subscribe(res => {
        this.cryptos = res;
        console.log(res);
      });
  }

}
