import { Component } from '@angular/core';
import { NavController,Platform,AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';
import {DriverHomePage} from '../driver-home/driver-home';

@Component({
  templateUrl: 'build/pages/driver-cars/driver-cars.html',
  providers: [Utils]
})
export class DriverCarsPage {

  cars:any;
  GETCARS_URL: string ;
  POSTCARS_URL: string;

  newcar:any;
  constructor(private alertCtrl:AlertController,public user: User,private utils:Utils,private auther:Auther,private platform: Platform,private navCtrl: NavController, public http:Http) {
    this.cars=[];

    this.GETCARS_URL= this.auther.MAIN_URL+"/driver/cars/"+this.user.details.name;
     this.POSTCARS_URL= this.auther.MAIN_URL+"/driver/cars";
    platform.ready().then(() => {
              return new Promise(resolve =>{
              this.http.get(this.GETCARS_URL)
              .map(res=>res.json())
              .subscribe(data=>{
                this.cars = data;
                console.log(this.cars);
                this.utils.LOADER.dismiss();
                resolve(this.cars);
              });
          });

        });
     }

ionViewLoaded(){
  this.utils.showLoader("Loading Cars");
//   setTimeout(() => {
//   this.utils.LOADER.dismiss();
// }, 5000);
}


       selectCar(car){
         let carDetails={
           CarPlate :car.licence_plate,
           CarColor :car.car_color,
           CarBrand :car.car_brand
         }
         this.user.set('CarDetials',carDetails);
         this.user.save();

    this.navCtrl.setRoot(DriverHomePage,{carData:carDetails});

 }

  addCar(){
    let prompt = this.alertCtrl.create({
      title: 'Add New Car',
      message: "",
      inputs: [
        {
          name: 'car_brand',
          placeholder: 'Car Brand'
        },
        {
          name: 'car_color',
          placeholder: 'Car Color'
        },
        {
          name: 'licence_plate',
          placeholder: 'licence Plate'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           this.cars.unshift(data);

           let newdata={
             fullName: this.user.details.name,
             car_brand: data.car_brand,
             car_color: data.car_color,
             licence_plate: data.licence_plate
           }
            //this.auth.getCars(newdata);
          this.http.post(this.POSTCARS_URL, JSON.stringify(newdata), { headers: this.auther.contentHeader })
            .map(res=> res.json())
            .subscribe(data=>{
              console.log(data);
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
