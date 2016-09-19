import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {LoginPage} from '../login/login';
@Component({
  templateUrl: 'build/pages/land/land.html',
})
export class LandPage {

  constructor(private navCtrl: NavController,public auth: Auth,public user: User) {
  
  }

  
}
