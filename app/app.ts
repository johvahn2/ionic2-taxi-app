import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { provideCloud, CloudSettings } from '@ionic/cloud-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { MapPage } from './pages/map/map';

import {Auther} from './providers/auth/auth';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ec0d2bdf'
  }
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,[provideCloud(cloudSettings),Auther]);
