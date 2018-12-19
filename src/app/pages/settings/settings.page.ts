import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HelperService } from '../../../Services/HelperService';
import { Settings } from '../../../providers';
//import { File } from '@ionic-native/file';


//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { config } from '../../../providers/Config';
import { Storage } from '@ionic/storage';
import { Heplers } from '../../../providers/Helper/Helpers';
//import { Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  // lang: any;
  // enableNotifications: any;
  // paymentMethod: any;
  // currency: any;
  // enablePromo: any;
  // enableHistory: any;

  // languages: any = ['English', 'Portuguese', 'French'];
  // paymentMethods: any = ['Paypal', 'Credit Card'];
  // currencies: any = ['USD', 'BRL', 'EUR'];

  // constructor(public navCtrl: NavController) { }

  ngOnInit() {

  }

  // editProfile() {
  //   this.navCtrl.navigateForward('edit-profile');
  // }

  // logout() {
  //   this.navCtrl.navigateRoot('login');
  // }


  options: any;
  MainURL: string;
  settingItem: { mainurl: string } = {
    mainurl: ''

  };


  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController, public helperService: HelperService,
    private platform: Platform,
    
    // public settings: Settings,
    //public formBuilder: FormBuilder,
    // public navParams: NavParams,
    // public translate: TranslateService,
    //private qrScanner: QRScanner,
    //private file: File,
    // public platform: Platform,
    //public alertCtrl: AlertController,
    public helper: Heplers, public Config: config, public storage: Storage) {

    this.storage.get(this.Config.MainURL_Key).then(res => this.settingItem.mainurl = res);

  }




  // scanServiceURL() {
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted

  //         this.helper.showMessage("Authorized", 'Error is');
  //         // start scanning
  //         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //           console.log('Scanned something', text);

  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //         });
  //         this.qrScanner.show();

  //       } else if (status.denied) {
  //         this.helper.showMessage("Denied", 'Error is');
  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => this.helper.showMessage(e, 'Error is'));
  // }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    //this.form = this.formBuilder.group({});
  }

  // ionViewWillEnter() {
  //   // Build an empty form for the template to render
  //   this.form = this.formBuilder.group({});

  //   this.page = this.navParams.get('page') || this.page;
  //   this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

  //   this.translate.get(this.pageTitleKey).subscribe((res) => {
  //     this.pageTitle = res;
  //   })

  //   this.settings.load().then(() => {
  //     this.settingsReady = true;
  //     this.options = this.settings.allSettings;

  //     this._buildForm();
  //   });
  // }


  CheckURL(res: any) {
    debugger;
    if (res.code == 0 || res.code == 8) {
      this.helper.presentToast("Please Wait While Saving changes then restart application.....", 8000);
      this.storage.set(this.Config.MainURL_Key, this.settingItem.mainurl);
      setTimeout(() => {
        debugger;

        this.navCtrl.navigateRoot('login');
        //this.platform.
        //this.platform.exitApp();
        //this.platform.
        //this.navCtrl.navigateRoot();
        //this.platform.exitApp();
        // this.navCtrl.setRoot('WelcomePage');
        // this.navCtrl.push('WelcomePage');
        //this.storage.get(this.config.MainURL_Key).then(res=> console.log('Main URL VAlue', res)); 
      }, 9000);
    }
    else {
      this.helper.presentToast("Invalid URL", 1000);
    }
  }

  showErr() {
    this.helper.presentToast("Invalid URL", 1000);
  }
  saveSettings() {



    this.helperService.CheckTimeFormat(this.settingItem.mainurl).subscribe(res => this.CheckURL(res), err => this.showErr());
    //debugger;
    //var temp2222=this.config.MainURL_Key;
    //  let temp = this.settingItem.mainurl;
    //this.storage.remove(this.config.MainURL_Key); 


    //this.storage.get(this.config.MainURL_Key).then(res=> console.log('Main URL VAlue', res));
    //window.location.reload();
    // this.navCtrl.push('WelcomePage')
    //this.navCtrl.setRoot('WelcomePage');

    // window.location.reload()




    //debugger;
    //this.file.writeFile(this.file.dataDirectory, "SettingFile",this.settingItem.mainurl);
    //this.file.createFile(this.file.dataDirectory, "SettingFile",true);
    //this.file.checkFile(this.file.dataDirectory, "SettingFile").then(_ => this.saveSettingsConfirmation("File Found")).catch(err => this.saveSettingsConfirmation(err));
  }



  // saveSettingsConfirmation(message: string) {
  //   const alert = this.alertCtrl.create({
  //     title: "",
  //     subTitle: '',
  //     buttons: ['OK']
  //   });

  //   this.translate.get("SetConfTitle").subscribe((res) => {
  //     alert.setTitle(res);
  //   });
  //   if (typeof message != 'undefined' && message) {
  //     alert.setSubTitle(message);

  //   }
  //   else {
  //     this.translate.get("SetConfBody").subscribe((res) => {
  //       alert.setSubTitle(res);
  //     })
  //   }


  //   alert.present();
  // }


  ngOnChanges() {

    console.log('Ng All Changes');
  }

}
