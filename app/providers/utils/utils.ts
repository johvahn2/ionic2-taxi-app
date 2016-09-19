import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {LoadingController,ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Utils {

  public LOADER:any;


  constructor(private http: Http,public toastCtrl:ToastController,private loadingCtrl: LoadingController ){
    /*EMPTY*/
  }

  showLoader(msg:string){
    this.LOADER = this.loadingCtrl.create({content: msg+"..."});
    this.LOADER.present();
  }

  showToast(msg:string,lng:number){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: lng,
      position: 'bottom'
    });
  }



}

