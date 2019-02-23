import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { Pages } from './interfaces/pages';

import { EmployeeModel } from '../models/EmployeeModel';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Heplers } from '../providers/Helper/Helpers';

import { AppSettings } from '../app/config/globals';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages: Array<Pages>;
  // public listing;
  CurrentEmp: EmployeeModel = { EMP_ID: "", DEPT_NAME: "", DEPT_ID: "", EMP_NAME: "", ORG_NAME: "", DOJ: "", floatDOJ: "", STATE: "" };
  constructor(
    public helper: Heplers,
    public storage: Storage,
    public Myconfig: config,
    //private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public navCtrl: NavController
 
  ) {


debugger;

    this.appPages = [
      {
        title: 'Dashboard',
        url: 'Dashboard',
        direct: 'root',
        icon: 'home',
        pageName: 'dashboard'
      }
      ,
      {
        title: 'Attendance',
        url: 'attendance',
        direct: 'forward',
        icon: 'alarm',
        pageName: 'attendance'
      },

      {
        title: 'Timetable',
        url: 'TimeTable',
        direct: 'forward',
        icon: 'logo-buffer',
        pageName: 'timetable'
      },
      {
        title: 'My Punches',
        url: 'MyPunches',
        direct: 'forward',
        icon: 'finger-print',
        pageName: 'my_punches'
      },
      {
        title: 'Leaves',
        url: 'Leaves',
        direct: 'forward',
        icon: 'sunny',
        pageName: 'leaves'
      },
      {
        title: 'Execuses',
        url: 'Execuses',
        direct: 'forward',
        icon: 'walk',
        pageName: 'execuses'
      }
      ,
      {
        title: 'Duties',
        url: 'Duties',
        direct: 'forward',
        icon: 'briefcase',
        pageName: 'duties'
      },
      {
        title: 'Request Status',
        url: 'RequestStatus',
        direct: 'forward',
        icon: 'trending-up',
        pageName: 'request_status'
      }
      ,

      {
        title: 'Geo Punching',
        url: 'geo-punching',
        direct: 'forward',
        icon: 'map',
        pageName: 'geo_punching'
      },
      {
        title: 'Execuse Request',
        url: 'submit-execuse',
        direct: 'forward',
        icon: 'calendar',
        pageName: 'execuse_request'
      }
      ,
      {
        title: 'Manual Adjustment Request',
        url: 'manual-adjustment-request',
        direct: 'forward',
        icon: 'clock',
        pageName: 'manual_adjustment_request'
      }
      ,
      {
        title: 'Leave Request',
        url: 'submit-leave-resuest',
        direct: 'forward',
        icon: 'paper',
        pageName: 'leave_request'
      }
      ,
      {
        title: 'Change Password',
        url: 'change-password',
        direct: 'forward',
        icon: 'key',
        pageName: 'change_password'
      }



      // },
      // {
      //   title: 'Rent a Car',
      //   url: '/rentcar',
      //   direct: 'forward',
      //   icon: 'car'
      // },
      // {
      //   title: 'Trip Activities',
      //   url: '/activities',
      //   direct: 'forward',
      //   icon: 'beer'
      // },
      // {
      //   title: 'Local Weather',
      //   url: '/local-weather',
      //   direct: 'forward',
      //   icon: 'partly-sunny'
      // },
      // {
      //   title: 'About',
      //   url: '/about',
      //   direct: 'forward',
      //   icon: 'information-circle-outline'
      // },
      // {
      //   title: 'Support',
      //   url: '/support',
      //   direct: 'forward',
      //   icon: 'help-buoy'
      // }
    ];
    // platform.ready().then(() => {

    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();

    // this.androidPermissions.requestPermissions(
    //   [
    //     this.androidPermissions.PERMISSION.CAMERA,
    //     this.androidPermissions.PERMISSION.CALL_PHONE,
    //     this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    //     this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    //   ]
    // );


    // });

    this.initializeApp();

    this.CurrentEmp.EMP_NAME = AppSettings.USERNAME;
    this.CurrentEmp.DEPT_NAME = AppSettings.DEPARTMENT;
    debugger;
    this.storage.get(this.Myconfig.UserInformation).then(res => this.sh(res));
  }
  sh(res: any) {

    //this.CurrentEmp = JSON.parse(res).result as EmployeeModel;

    debugger;

  }
  initializeApp() {
    this.platform.ready().then(() => {

      this.platform.backButton.subscribe(() => {
        debugger;
        this.storage.remove(this.Myconfig.Username_Key);
        this.navCtrl.navigateRoot('login');
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();


      //  this.androidPermissions.requestPermissions(
      // [
      //   this.androidPermissions.PERMISSION.CAMERA,
      //   this.androidPermissions.PERMISSION.CALL_PHONE,
      //   this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      //   this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
      //   this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      // ])


      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.storage.remove(this.Myconfig.Username_Key);    
    this.navCtrl.navigateRoot('login',false, {replaceUrl: true});

  }
  goToPage(PageName: string) {
    // if(AppSettings.IsLogedIn)
    // {
      this.navCtrl.navigateRoot(PageName);
    // }
    // else
    // {
    //   this.navCtrl.navigateRoot('login');
    // }
    
  }

}
