import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FindingPage} from '../finding/finding';


@Component({
  templateUrl: 'build/pages/book/book.html',
})
export class BookPage {
Details:any;
  constructor(private navCtrl: NavController) {

    this.Details={
        current:'Antigua',
        destanation:'London',
        people: '3',
        note: 'hello world',
        price: '$23'
    }

  }

  bookIt(){
    this.navCtrl.push(FindingPage,{data:this.Details});
  }

}
