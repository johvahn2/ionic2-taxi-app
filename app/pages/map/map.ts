import { Component,OnInit } from '@angular/core';
import { NavController,Platform,NavParams,AlertController } from 'ionic-angular';
import {GoogleMap,GoogleMapsEvent,Geocoder,Geolocation,GoogleMapsMarker,GoogleMapsLatLng} from 'ionic-native';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import * as io from 'socket.io-client';

import {Auther} from '../../providers/auth/auth';
import {Utils} from '../../providers/utils/utils';

import {FindingPage} from '../finding/finding';
import {PickPlacePage} from '../pick-place/pick-place';

declare var google;

@Component({
  templateUrl: 'build/pages/map/map.html',
  providers: [Utils]
})
export class MapPage implements OnInit {

  // Map
  private map:any;



  // show - hide booking form
  private showForm:boolean = false;

  // show - hide modal bg
  private showModalBg:boolean = false;



  //current location varible
  currrent_location:any;
  current_locationId:any;

  current_place:any;

  current_lat:any;
  current_lng:any;


  //destanttion
  destanation_pick:any;

//form varibles
  bookingNote:any;
  amountofPeople:any=1;


  service = new google.maps.places.AutocompleteService();

  private socket:any;


  constructor(private navCtrl: NavController,private alertCtrl:AlertController,private user:User,private utils:Utils,private platform: Platform,private navParams: NavParams,public auther:Auther) {
    //this.socket = io(this.auther.SOCKET_CONNECT);

    platform.ready().then(() => {
           this.amountofPeople=1;  
           this.current_place = 'Current Place';        

          setTimeout(() => {
            this.utils.LOADER.dismiss();
          }, 5000);

          Geolocation.getCurrentPosition().then((resp)=>{
          this.current_lat =resp.coords.latitude; this.current_lng =resp.coords.longitude;

          console.log(resp.coords.latitude,resp.coords.longitude,"Current Location");

          this.currrent_location =new GoogleMapsLatLng(resp.coords.latitude,resp.coords.longitude);

            this.initializeMap();

            this.get_current_place();
          });
      });
  }

  ngOnInit(){
    this.utils.showLoader('Please Wait');


      setTimeout(() => {
        this.utils.LOADER.dismiss();
      }, 5000);

          Geolocation.getCurrentPosition().then((resp)=>{
          this.current_lat =resp.coords.latitude; this.current_lng =resp.coords.longitude;

          console.log(resp.coords.latitude,resp.coords.longitude,"Current Location");

          this.currrent_location =new GoogleMapsLatLng(resp.coords.latitude,resp.coords.longitude);

            this.initializeMap();

            this.get_current_place();
          });
  }


    ionViewLoaded(){
      this.get_current_place();
        let place = this.navParams.get('place');
        this.destanation_pick = place;
  }


  initializeMap() {
        this.map = new GoogleMap('map', {
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


          //adding Marker
          this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.map.setClickable( false );

                  this.map.addMarker({
                    position: this.currrent_location,
                    title: "Current location"
                  }).then((re)=>{
                    re.showInfoWindow();
             });
        });


  }

  // Show note popup when click to 'Notes to driver'
  showNotePopup() {
    let prompt = this.alertCtrl.create({
      title: 'Notes to driver',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Note'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Canceled note');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.bookingNote = data;
          }
        }
      ]
    });

    prompt.present();
  };

  people(type){ //Amount of people
    if(type == 'add'){
      this.amountofPeople+=1;
    }else if(type == 'sub'){
      if(this.amountofPeople>1){
         this.amountofPeople-=1;
      }
    }
  }


  choosePlace(){
      this.navCtrl.push(PickPlacePage);
    }


  // toggle form
  toggleForm() {
    this.showForm = !this.showForm;
    this.showModalBg = (this.showForm == true);
  }


  book(){
    // hide booking form
    this.toggleForm();

    let current_LatLng = {
      Lat: this.current_lat,
      Lng: this.current_lng
    }

    // let info={
    //   current_location: current_LatLng,
    //   destanation_place: this.destanation_pick,
    //   note: this.bookingNote.note,
    //   people: this.amountofPeople,
    //   name: this.user.details.name,
    //   price: '245GD'
      
    // }

    let info={
      current_location: current_LatLng,
      destanation_place: this.destanation_pick,
      note: this.bookingNote.note,
      people: this.amountofPeople,
      name: "Frank Brown",
      price: '245GD'
      
    }
    this.navCtrl.push(FindingPage,{data:info});
  }



  wallet(){

  }


    get_current_place(){

      var request={
        position: this.currrent_location
      };

      Geocoder.geocode(request).then((res)=>{
        if(res.length){
          var result = res[0];

        var address = [
        //  result.subThoroughfare || "",
          result.thoroughfare || "",
          result.locality || "",
          result.adminArea || "",
          result.country || ""].join(", ");

           
 this.service.getPlacePredictions({ input: address, componentRestrictions: {country: 'AG'} }, (predictions, status) =>{

                this.current_place = predictions[0].description;
                console.log(this.current_place);
          });
        }
      });
    }
}

