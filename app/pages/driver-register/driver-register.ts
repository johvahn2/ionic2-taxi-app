import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { FormBuilder,  ControlGroup, Validators} from '@angular/common';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


import * as io from 'socket.io-client';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';

import {LandPage} from '../land/land';
@Component({
  templateUrl: 'build/pages/driver-register/driver-register.html',
  providers: [Utils]
})
export class DriverRegisterPage {
socket:any;
Info:any;
DRegisterForm:any;

user_email:any;
  constructor(private formBuilder2: FormBuilder,private navCtrl: NavController,private utils:Utils,private auther:Auther,private http:Http,private user:User) {
    this.socket = io.connect(this.auther.SOCKET_CONNECT);
      this.user_email =this.user.get('email',null);
      
      this.Info={
        email: this.user_email ,
        fullName: this.user.details.name,
        licence_number:'',
        reg_cars:{
          licence_plate:'',
          car_brand:'',
          car_color:''
        },
        address: ''
      }

      this.DRegisterForm = this.formBuilder2.group({
      LicenseNumber: ['', Validators.required],
      CarBrand: ['', Validators.required],
        CarColor:['', Validators.required],
      LicensePlate: ['', Validators.required],
      Address: ['', Validators.required],
      Ayear: [false,Validators.required]
        });

  }

  driver_reg(){
    if(this.Info.fullName != ''){
      console.log(this.Info);
    this.utils.showLoader("Registering");
      this.http.post(this.auther.DRIVER_SIGNUP_URL, JSON.stringify(this.Info), { headers: this.auther.contentHeader })
      .map(res=>res.json())
      .subscribe(
        data =>{
          if(data.success== 'true'){
              this.user.set('isDriver',true);
              this.user.save();

            this.navCtrl.setRoot(LandPage);
            this.utils.LOADER.dismiss();
           // window.location.reload();
          }else if(data.success== 'false'){
            console.log("Error while registering");
          }
        });
    }else{
      console.log('Please enter Full name');
    }
  }

}
