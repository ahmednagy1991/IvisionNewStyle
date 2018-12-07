import { Component, OnInit } from '@angular/core';

import { NavController, ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';
import { ActivatedRoute, Router } from '@angular/router';

import {  ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Observable} from 'rxjs/Observable';
import { Platform } from '@ionic/angular';

import { SubmitGeoPunchModel } from '../../../models/SubmitGeoPunchModel';
import { PunchesService } from '../../../Services/PunchesService';
import { Heplers } from '../../../providers/Helper/Helpers';

import { environment } from '../../../environments/environment'


import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-geo-punching',
  templateUrl: './geo-punching.page.html',
  styleUrls: ['./geo-punching.page.scss'],
})
export class GeoPunchingPage implements OnInit {

  CurrentAddress: string;
  
  CurrentTime: string;
  enablePunchingButtons: boolean = false;
  EnableButtons: boolean = false;
  MyLocation: { Latitude: number, Longitude: number } = { Latitude: 0, Longitude: 0 };
  Address: { countryCode: string, countryName: string, administrativeArea: string, subAdministrativeArea: string, locality: string, thoroughfare: string }
 
  geoPunch: SubmitGeoPunchModel = { lat: "", lng: "", punch_date: "", punch_time: "", Punch_type: 0 };

 
  constructor(private geolocation: Geolocation,private platform: Platform,public helper: Heplers, public punchSer: PunchesService, public navCtrl: NavController) {
   
    platform.ready().then(() => {

      // get position
      geolocation.getCurrentPosition().then(pos => {
        debugger;
        //this.helper.showMessage(pos.coords.latitude.toString(),pos.coords.latitude.toString());
        this.MyLocation.Latitude=pos.coords.latitude;
        this.MyLocation.Longitude=pos.coords.longitude;
        this.enablePunchingButtons = true;
        console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
      });


      // watch position
      const watch = geolocation.watchPosition().subscribe(pos => {
        console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
        let temp = pos;
        this.MyLocation.Latitude=pos.coords.latitude;
        this.MyLocation.Longitude=pos.coords.longitude;
        this.enablePunchingButtons = true;
        //this.helper.showMessage(pos.coords.latitude.toString(),pos.coords.latitude.toString());
        debugger;
      });

      // to stop watching
      watch.unsubscribe();
    });

    
  }



  punchIn() {
    this.geoPunch.Punch_type = 1;
    this.punchSer.PunchIn(this.geoPunch).subscribe((res: any) => {
      if (res.code == 0) {
        this.helper.showMessage("Geo Punching Successfully submited", "Done");
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }    
    });
  }
  punchOut() {
    this.geoPunch.Punch_type = 0;
    this.punchSer.PunchOut(this.geoPunch).subscribe((res:any) => {
      if (res.code == 0) {
        this.helper.showMessage("Geo Punching Successfully submited", "Done");
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }
    });
  }

 
  ngOnInit() {
   

  }
  

}
