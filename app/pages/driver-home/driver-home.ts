import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Utils} from '../../providers/utils/utils';

import {LoginPage} from '../login/login';

import {DriverOnlinePage} from '../driver-online/driver-online';

import {LandPage} from '../land/land';

@Component({
  templateUrl: 'build/pages/driver-home/driver-home.html',
  providers: [Utils]
})
export class DriverHomePage {
carDetails:any;

driverName:any;
  constructor(private navCtrl: NavController,public navParam:NavParams,private utils:Utils,private auth:Auth,public user: User) {
    this.carDetails = this.navParam.get('carData');

    this.driverName = this.user.details.name;
  }

  online(){
    if (this.auth.isAuthenticated()) {
    this.navCtrl.setRoot(DriverOnlinePage,{carData:this.carDetails});
    }else{
     this.utils.showToast('Please Sign In',2000);
     this.navCtrl.setRoot(LoginPage);
    }
  }

  goLanding(){
    this.navCtrl.setRoot(LandPage);
    
  }
}
