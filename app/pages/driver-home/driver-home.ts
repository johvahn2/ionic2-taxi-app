import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {DriverOnlinePage} from '../driver-online/driver-online';

@Component({
  templateUrl: 'build/pages/driver-home/driver-home.html',
})
export class DriverHomePage {

  constructor(private navCtrl: NavController) {

  }

  online(){
    this.navCtrl.push(DriverOnlinePage);
  }

}
