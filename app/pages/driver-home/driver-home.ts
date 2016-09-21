import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


import {DriverOnlinePage} from '../driver-online/driver-online';

import {LandPage} from '../land/land';

@Component({
  templateUrl: 'build/pages/driver-home/driver-home.html',
})
export class DriverHomePage {
carDetails:any;

driverName:any;
  constructor(private navCtrl: NavController,public navParam:NavParams,public user: User) {
    this.carDetails = this.navParam.get('CarDetials');

    this.driverName = this.user.details.name;
  }

  online(){
    this.navCtrl.push(DriverOnlinePage,{carData:this.carDetails});
  }

  goLanding(){
    this.navCtrl.setRoot(LandPage);
    
  }
}
