import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { FormBuilder,  ControlGroup, Validators} from '@angular/common';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Auther} from '../../providers/auth/auth';

import {LandPage} from '../land/land';
@Component({
  templateUrl: 'build/pages/driver-register/driver-register.html',
})
export class DriverRegisterPage {

Info:any;
DRegisterForm:any;
  constructor(private formBuilder2: FormBuilder,private navCtrl: NavController,private auther:Auther,private http:Http,private user:User) {
      this.Info={
        fullName: user.details.name,
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
      this.http.post(this.auther.DRIVER_SIGNUP_URL, JSON.stringify(this.Info), { headers: this.auther.contentHeader })
      .map(res=>res.json())
      .subscribe(
        data =>{
          if(data.success== 'true'){
              this.user.set('isDriver',true);

            this.navCtrl.setRoot(LandPage);
           // window.location.reload();
          }
        });
      }

}
