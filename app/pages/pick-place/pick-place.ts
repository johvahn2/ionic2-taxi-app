import { Component,NgZone } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

import {MapPage} from '../map/map';

import {Utils} from '../../providers/utils/utils';
declare var google;

@Component({
  templateUrl: 'build/pages/pick-place/pick-place.html',
  providers: [Utils]
})
export class PickPlacePage {
  //dummy holders
  recentPlaces:any=[{
    name: 'Namer',
    address: '1st Name street',
    distance: '124'
  },{
    name: 'Namer',
    address: '1st Name street',
    distance: '124'
  },{
    name: 'Namer',
    address: '1st Name street',
    distance: '124'
  },{
    name: 'Namer',
    address: '1st Name street',
    distance: '124'
  },{
    name: 'Namer',
    address: '1st Name street',
    distance: '124'
  }]

  autocompleteItems:any;
  autocomplete:any;

   service = new google.maps.places.AutocompleteService();

  constructor(private loadingCtrl: LoadingController,private navCtrl: NavController,private zone: NgZone,private utils:Utils) {
      this.autocompleteItems = [];
      this.autocomplete = {query: ''};
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'AG'} }, (predictions, status) =>{
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions != null || predictions != 0 ){
        predictions.forEach(prediction => {
          console.log(prediction);
        
          me.autocompleteItems.push(prediction);

          });
        }
      });
    });
  }

  chooseItem(item){
    this.utils.showLoader('Please wait');
 
  console.log(item.description);
  this.autocomplete.query = item.description;
    this.navCtrl.setRoot(MapPage,{place:item.description});
    
    this.utils.LOADER.dismiss();
  }

}
