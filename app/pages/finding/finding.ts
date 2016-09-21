import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import {Auther} from '../../providers/auth/auth';
import {FoundDriverPage} from '../found-driver/found-driver';

import * as io from 'socket.io-client';

@Component({
  templateUrl: 'build/pages/finding/finding.html',
})
export class FindingPage {

socket:any;

info:any;

Status:any;
driverName:any;
driverRating:any;

estimateTime:any;

  constructor(private navCtrl: NavController, public auther:Auther,private navParam: NavParams) {
      
      this.socket = io.connect(this.auther.SOCKET_CONNECT);
      this.info = this.navParam.get('data');

      this.Status = 'Finding Driver...';
      this.estimateTime = '5 mintues'
      this.driverName= '...';
      this.driverRating="..";

      this.socket.emit('setBookingInfo',this.info);

  }
  

ionViewLoaded(){
    this.socket.on('ContactingStatus',(driverInfo)=>{
      console.log(driverInfo);
      this.Status = 'Contacting...';
      this.driverName = driverInfo.driver_name;
      this.driverRating = driverInfo.rating;
    });

      this.socket.on('newDriverStatus',(status)=>{
      this.Status = status;
      this.driverName= '...';
      this.driverRating="..";
    });

    this.socket.on('DriverFound',(driverInfo)=>{
        this.navCtrl.setRoot(FoundDriverPage,{data:driverInfo});
    });
  }

}