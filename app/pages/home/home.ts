import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Auther} from '../../providers/auth/auth';

import * as io from 'socket.io-client';

import {LoginPage} from '../login/login';
import {BookPage} from '../book/book';
import {DriverHomePage} from '../driver-home/driver-home';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  socket:any;
  constructor(public navCtrl: NavController,public auth: Auth,public user: User,public auther: Auther) {
    this.socket = io.connect(this.auther.SOCKET_CONNECT);
  }

  book(){

    this.navCtrl.push(BookPage);

  }

  driverHome(){
    this.navCtrl.setRoot(DriverHomePage);
  }

  LogOut(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
