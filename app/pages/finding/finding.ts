import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import {Auther} from '../../providers/auth/auth';

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

  constructor(private navCtrl: NavController, public auther:Auther,private navParam: NavParams) {
      this.socket = io.connect(this.auther.SOCKET_CONNECT);

      this.info = this.navParam.get('data');

      this.socket.emit('getBookingInfo',this.info);

      this.Status = 'Finding Driver...';
      this.driverName= '...';
      this.driverRating="..";

  this.socket.on('ContactingStatus',(driverInfo)=>{
    console.log(driverInfo);
     this.Status = 'Contacting...';
     this.driverName = driverInfo.driver_name;
     this.driverRating = driverInfo.rating;
  });

  }

}
