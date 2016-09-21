import { Component } from '@angular/core';
import { NavController,Platform,NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {GoogleMap,GoogleMapsEvent,Geocoder,Geolocation,GoogleMapsMarker,GoogleMapsLatLng} from 'ionic-native';


import * as io from 'socket.io-client';

import {Auther} from '../../providers/auth/auth';
import {DriverNewJobPage} from '../driver-new-job/driver-new-job';
import {DriverHomePage} from '../driver-home/driver-home';

@Component({
  templateUrl: 'build/pages/driver-online/driver-online.html',
})
export class DriverOnlinePage {

  socket:any;

      //current location varible
  currrent_location:any;

  current_lat:any;
  current_lng:any;

    driverDetails:any;

    map:any;
  constructor(private navCtrl: NavController,private navParam:NavParams,public user: User,private platform: Platform,public auther: Auther) {
    this.socket = io(this.auther.SOCKET_CONNECT);

    let carDetail = this.navParam.get('CarDetials');

    platform.ready().then(() => {

      //getting current coords
           Geolocation.getCurrentPosition().then((resp)=>{
           this.current_lat =resp.coords.latitude; this.current_lng =resp.coords.longitude;

            this.currrent_location =new GoogleMapsLatLng(resp.coords.latitude,resp.coords.longitude);
           });

          this.driverDetails={
            lat: this.current_lat,
            lng: this.current_lng,
            name: this.user.details.name,
            carBrand: carDetail.CarBrand,
            carColor: carDetail.CarColor,
            Lplate: carDetail.CarPlate,
            rating: '0'

          }

      this.socket.emit('imOnline',this.driverDetails);


      this.initializeMap();

      console.log(this.driverDetails);
    });
  }


  ionViewLoaded(){
    this.socket.on(this.user.details.name,(pass_info)=>{
      this.navCtrl.setRoot(DriverNewJobPage,{data:pass_info});

      });

  }

  initializeMap() {
    this.map = new GoogleMap('mapDriver', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': false
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': this.currrent_location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

  }

  goOffline(){
      this.socket.emit('goOffline',this.user.details.name);
      this.navCtrl.setRoot(DriverHomePage);
  }

  

}
