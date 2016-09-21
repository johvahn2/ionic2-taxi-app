import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';

import * as io from 'socket.io-client';

import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { LandPage } from '../land/land';

import {DriverRegisterPage} from '../driver-register/driver-register';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Utils]
})
export class HomePage {
  isDriver:boolean;
  socket:any;
  constructor(public navCtrl: NavController,public util:Utils,public auth: Auth,public user: User,public auther: Auther) {
    this.socket = io.connect(this.auther.SOCKET_CONNECT);
     this.isDriver = this.user.get('isDriver',false)
     

  }
isTransitioning(){
    this.util.showLoader("Loading map");
            setTimeout(() => {
          this.util.LOADER.dismiss();
        }, 3000);
}
  book(){

    this.navCtrl.setRoot(MapPage);
   
  }

  driverHome(){
    if(!this.isDriver){
      this.navCtrl.setRoot(DriverRegisterPage);
    }else if(this.isDriver){
    this.navCtrl.setRoot(LandPage);

    }
  }

  LogOut(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}

