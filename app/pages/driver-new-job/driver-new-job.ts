import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/driver-new-job/driver-new-job.html',
})
export class DriverNewJobPage {
details:any;
  constructor(private navCtrl: NavController,public navParam:NavParams) {
   this.details = this.navParam.get('data');
   console.log(this.details);
  }



}
