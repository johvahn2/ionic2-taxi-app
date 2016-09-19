import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder,  ControlGroup, Validators} from '@angular/common';
import { InAppBrowser } from 'ionic-native';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import * as io from 'socket.io-client';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';

import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {LandPage} from '../land/land';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Utils]
})
export class LoginPage {
socket:any;

  usercreds:any;
  LoginForm: any;

  constructor(private navCtrl: NavController,public auth: Auth,public user: User,private formBuilder: FormBuilder,private utils:Utils,private auther:Auther) {
        
        this.usercreds = { email:"",password: "" }

        this.LoginForm = this.formBuilder.group({Email: ['', Validators.required],Password: ['', Validators.required]});

  }

  Login(){
    this.utils.showLoader("Authenticating")

    let loginData = {
    'email': this.usercreds.email,
    'password': this.usercreds.password
    };

    let loginOptions = {
      'remember': true,
      'inAppBrowserOptions': {'hidden': true}
    };

  this.auth.login('custom', loginData, loginOptions).then(() => {
      let isDriver = this.user.get('isDriver',false);
      if(!isDriver){

      this.navCtrl.setRoot(HomePage);
      this.utils.LOADER.dismiss();
      
      }else{
      this.navCtrl.setRoot(LandPage);
      this.utils.LOADER.dismiss();
      }
    }, (err) => { console.log(err) });
 
  }


  singup(){
    this.navCtrl.setRoot(HomePage);
  }




}
