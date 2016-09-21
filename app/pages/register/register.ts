import { Component } from '@angular/core';
import { NavController,LoadingController,ToastController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { InAppBrowser,Camera } from 'ionic-native';
import { FormBuilder,  ControlGroup, Validators} from '@angular/common';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/register/register.html',
  providers: [Utils]
})
export class RegisterPage {


  RegisterForm: any;
  usercreds:any;

  constructor(public navCtrl: NavController,public utils:Utils,public auth: Auth,public auther:Auther ,public user: User,private formBuilder2: FormBuilder) {
   
    this.RegisterForm = this.formBuilder2.group({Firstname: ['', Validators.required],Lastname: ['', Validators.required],userEmail:['', Validators.required], userPassword: ['', Validators.required],phoneNumber: ['', Validators.required]});

    this.usercreds = {email: "",firstName:"",lastName:"",password: "",phoneNumber:""}

  }
  

  SignUp(){
  
     this.utils.showLoader("Authenticating");
     let me = this;


    this.auther.signup(this.usercreds.email,this.usercreds.firstName,this.usercreds.lastName,this.usercreds.password,this.usercreds.phoneNumber).then((msg:string)=>{
   
        me.utils.LOADER.dismiss().then(()=>{

          this.utils.showToast(msg,2000);

      if(msg =='Succesfully Signed up'){
    
        me.utils.showLoader("Logining in");

      let loginInfo = {
      'email': me.usercreds.email,
      'password': me.usercreds.password
      };

    let loginOptions = {
      'remember': true,
      'inAppBrowserOptions': {'hidden': true}
  };

  me.auth.login('custom', loginInfo, loginOptions).then(() => {
                me.user.details.name = me.usercreds.firstName+' '+me.usercreds.lastName;
                me.user.details.image = 'https://pbs.twimg.com/profile_images/617058765167329280/9BkeDJlV.png';
                me.user.set('isDriver', false);
                me.user.set('Rating', '0');
                me.user.save().then(()=>{
                    console.log('Saved!!!');
                });

                me.navCtrl.setRoot(HomePage);
                me.utils.LOADER.dismiss();

            });
           } 
        });
    
    });

  }

}
