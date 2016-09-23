import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Utils} from '../../providers/utils/utils';

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {DriverCarsPage} from '../driver-cars/driver-cars'
@Component({
  templateUrl: 'build/pages/land/land.html',
  providers: [Utils]
})
export class LandPage {
isDriver:any;
  constructor(private navCtrl: NavController,private utils:Utils,public auth: Auth,public user: User) {
      this.isDriver = this.user.get('isDriver',false);
      console.log( this.user.data);
  }

  passenger(){
  this.utils.showLoader("Loading");
  if (this.auth.isAuthenticated()) {
   this.navCtrl.setRoot(HomePage)
   }else{
     this.utils.showToast('Please Sign In',2000);
     this.navCtrl.setRoot(LoginPage);
   }
   this.utils.LOADER.dismiss();

  }

  driver(){
  this.utils.showLoader("Loading");
  if (this.auth.isAuthenticated() && this.isDriver ) {
   this.navCtrl.push(DriverCarsPage);
   }else{
      this.utils.showToast('Not autherized',2000);
      this.passenger();
   }
   this.utils.LOADER.dismiss();
 }

  
}
