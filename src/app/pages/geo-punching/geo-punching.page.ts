import { Component, OnInit } from '@angular/core';

import { NavController, ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';
import { ActivatedRoute, Router } from '@angular/router';

import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs/Observable';
import { Platform } from '@ionic/angular';

import { SubmitGeoPunchModel } from '../../../models/SubmitGeoPunchModel';
import { PunchesService } from '../../../Services/PunchesService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment'
import { LoadingController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocationAddressModel } from '../../../models/LocationAddressModel';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';


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


  MyAddress: LocationAddressModel = { administrativeArea: "", countryCode: "", countryName: "", locality: "", subAdministrativeArea: "" };
  CurrentAddress: string;
  loading: HTMLIonLoadingElement;
  CurrentTime: string;
  enablePunchingButtons: boolean = false;
  EnableButtons: boolean = false;
  MyLocation: { Latitude: number, Longitude: number } = { Latitude: 0, Longitude: 0 };
  Address: { countryCode: string, countryName: string, administrativeArea: string, subAdministrativeArea: string, locality: string, thoroughfare: string }

  geoPunch: SubmitGeoPunchModel = { lat: "", lng: "", punch_date: "", punch_time: "", Punch_type: 0 };


  constructor(private diagnostic: Diagnostic,private nativeGeocoder: NativeGeocoder, public datepipe: DatePipe, public loadingController: LoadingController, private geolocation: Geolocation, private platform: Platform, public helper: Heplers, public punchSer: PunchesService, public navCtrl: NavController) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.diagnostic.isLocationEnabled()
    .then((state) => {
      if (state){
        // do something
        this.helper.showMessage("GPS Enabled","GPS Enabled");
      } else {
        // do something else
        this.helper.showMessage("GPS Disabled","GPS Disabled");
      }
    }).catch(e => console.error(e));




    this.presentLoading();
    platform.ready().then(() => {

      try {


        //this.loading.dismiss();
        // get position
        geolocation.getCurrentPosition().then(pos => {
          debugger;
          this.nativeGeocoder.reverseGeocode( pos.coords.latitude, pos.coords.longitude, options)
            // this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude, options)
            .then((result: NativeGeocoderReverseResult[]) => {
              this.MyAddress = result[0];
            })
            .catch((error: any) => console.log(error));
          //this.helper.showMessage(pos.coords.latitude.toString(),pos.coords.latitude.toString());
          this.MyLocation.Latitude = pos.coords.latitude;
          this.MyLocation.Longitude = pos.coords.longitude;
          this.enablePunchingButtons = true;
          this.loading.dismiss();
          
          //this.DismissLoadingSpinner();
          console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
        });


        // watch position
        // const watch = geolocation.watchPosition().subscribe(pos => {
        //   console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
        //   let temp = pos;
        //   this.MyLocation.Latitude = pos.coords.latitude;
        //   this.MyLocation.Longitude = pos.coords.longitude;
        //   this.enablePunchingButtons = true;
        //   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude, options)
        //     .then((result: NativeGeocoderReverseResult[]) => {
        //       this.MyAddress = result[0] as LocationAddressModel;
        //     })
        //     .catch((error: any) => console.log(error));
        //   //this.DismissLoadingSpinner();
        //   this.loading.dismiss();
        //   //this.helper.showMessage(pos.coords.latitude.toString(),pos.coords.latitude.toString());
        //   debugger;
        // });

        // // to stop watching
        // watch.unsubscribe();
      }
      catch (Error) {
        this.helper.showMessage(Error.message, "Geo punching error");
      }
    });




  }

  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 5000,
  //     message: 'Please wait...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await loading.present();
  // }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait while loading your location', duration: 6000
    });
    return await this.loading.present();
  }


  async DismissLoadingSpinner() {
    return await this.loadingController.dismiss();
  }



  punchIn() {
    this.geoPunch.Punch_type = 1;
    this.geoPunch.punch_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.geoPunch.punch_time = this.datepipe.transform(new Date(), 'hh:mm:ss');
    this.geoPunch.lat = this.MyLocation.Latitude.toString();
    this.geoPunch.lng = this.MyLocation.Longitude.toString();
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
    this.geoPunch.punch_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.geoPunch.punch_time = this.datepipe.transform(new Date(), 'hh:mm:ss');
    this.geoPunch.lat = this.MyLocation.Latitude.toString();
    this.geoPunch.lng = this.MyLocation.Longitude.toString();
    this.punchSer.PunchOut(this.geoPunch).subscribe((res: any) => {
      if (res.code == 0) {
        this.helper.showMessage("Geo Punching Successfully submited", "Done");
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }
    });
  }


  GetMapStyle() {
    return {
      "height": "400px"
    }

  }

  ngOnInit() {


  }


}
