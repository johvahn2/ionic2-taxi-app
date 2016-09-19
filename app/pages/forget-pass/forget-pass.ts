import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/forget-pass/forget-pass.html',
})
export class ForgetPassPage {
Email:any;

Code:any;

newPass:any;
newPassRepeat:any;

  constructor(private navCtrl: NavController,public auth: Auth,public user: User) {

  }

  send(){
    this.auth.requestPasswordReset(this.Email);
  }


  changePass(){
    this.auth.confirmPasswordReset(this.Code, this.newPass).then(()=>{
      this.navCtrl.setRoot(LoginPage);
    });
  }


}
