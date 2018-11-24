import { Component, OnInit } from '@angular/core';

import { NavController, ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';
import { ActivatedRoute, Router } from '@angular/router';

import {  ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
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
   
   
   }

   
  

 
  ngOnInit() {
   

  }
  

}
