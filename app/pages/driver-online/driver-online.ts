import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as io from 'socket.io-client';

import {Auther} from '../../providers/auth/auth';
import {DriverNewJobPage} from '../driver-new-job/driver-new-job';

@Component({
  templateUrl: 'build/pages/driver-online/driver-online.html',
})
export class DriverOnlinePage {

  socket:any;
  constructor(private navCtrl: NavController,public auther: Auther) {
    this.socket = io(this.auther.SOCKET_CONNECT);

    this.socket.on('newJob',(pass_info)=>{
        this.navCtrl.setRoot(DriverNewJobPage,{data:pass_info});

        });
  }

}
