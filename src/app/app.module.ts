import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TranslateProvider, HotelProvider } from './providers';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { LocationPageModule } from './pages/modal/location/location.module';



import { AttendanceService } from '../Services/AttendanceService'
import { PunchesService } from '../Services/PunchesService';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LeavesService } from '../Services/LeavesService';
import { TimeTableService } from '../Services/TimeTableService';
import { ExecuseService } from '../Services/ExecuseService';
import { RequestService } from '../Services/RequestService';
import { HelperService } from '../Services/HelperService';
import { UserService } from '../Services/UserService';
import { Settings, User, Api } from '../providers';
import { Heplers } from '../providers/Helper/Helpers';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { config } from '../providers/Config';
//import { Device } from '@ionic-native/device';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(environment.config),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ImagePageModule,
    LocationPageModule,
    IonicStorageModule.forRoot({
      name: '__ionbooking2',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    AttendanceService,
    PunchesService,
    LeavesService,
    Api,
    User,
    Heplers,
    //Device,
    DecimalPipe,
    DatePipe,
    config,
    TimeTableService,
    ExecuseService,
    RequestService,
    HelperService,
    UserService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    HotelProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
