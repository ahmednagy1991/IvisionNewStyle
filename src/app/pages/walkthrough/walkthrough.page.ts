import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Slides, MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { Heplers } from '../../../providers/Helper/Helpers';
//import { Device } from '@ionic-native/device';
import { config } from '../../../providers/Config';
import { Api } from '../../../providers/api/api';
import { TokenModel } from '../../../models/TokenModel';
import { EmployeeModel } from '../../../models/EmployeeModel';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(Slides) slides: Slides;


  enableLogin: boolean;
  empResponse: EmployeeModel;
  currentUsernmae: string;
  CurrentPassword: string
  tokenReponse: TokenModel;
//, private device: Device
  constructor(public navCtrl: NavController, public Config: config, public api: Api, public helper: Heplers, public config: config, public storage: Storage) {
    debugger;
   
    this.LoadMainURL();

   

    //this.storage.set(this.config.UUID_Key, this.device.uuid);
   
  }
 

  LoadMainURL() {
    this.storage.get(this.config.MainURL_Key).then(res => this.ValidateUrl(res))
      .catch(err => this.helper.showMessage(err, "error Message"));
  }


  setEmployeeInfo(response: any) {
    this.empResponse = response.result as EmployeeModel;
    debugger;
    this.storage.set(this.Config.EmployeeName_Key, this.empResponse.EMP_NAME);
    this.storage.set(this.Config.EmployeeDepartment_Key, this.empResponse.DEPT_NAME);
    this.storage.set(this.Config.EmployeeOrganization_Key, this.empResponse.ORG_NAME);
  }


  validate(res: any) {
    debugger;
    this.tokenReponse = res as TokenModel;
    if (this.tokenReponse.code == '0') {

      this.storage.set(this.Config.Username_Key, config.EmpID);
      this.storage.set(this.Config.Password_Key, config.CurrentPassword);
     


      //this.navCtrl.push(MainPage);
      this.navCtrl.navigateRoot("");

    }
    else {
      this.helper.showMessage("Invalid Login", "Login Error");
    }
  }


  ValidateUrl(res: string) {
    debugger;
    if (res == null || res == undefined || res == "") {
      this.helper.presentToast("Please set valid url for service ", 9000);
    }
    this.enableLogin = this.helper.checkURL(res)
  }


  login() {
    this.navCtrl.navigateRoot('LoginPage');
  }

  signup() {
    this.navCtrl.navigateRoot('SignupPage');
  }

  settings() {
    this.navCtrl.navigateRoot('settings');
  }












  
  
  
  
  
  
  
  
  
  // showSkip = true;
  // slideOpts = {
  //   effect: 'flip',
  //   speed: 1000
  // };
  // dir: string = 'ltr';

  // slideList: Array<any> = [
  //   {
  //     title: 'What is ion<strong>Booking</strong>?',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp01.png',
  //   },
  //   {
  //     title: 'Why ionBooking?',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp02.png',
  //   },
  //   {
  //     title: 'Your Vacation is coming!',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp03.png',
  //   }
  // ];

  // constructor(
  //   public navCtrl: NavController,
  //   public menuCtrl: MenuController,
  //   public router: Router
  // ) {
  // }

  // ionViewWillEnter() {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
  }

  // onSlideNext() {
  //   this.slides.slideNext(1000, false);
  // }

	// onSlidePrev() {
  //   this.slides.slidePrev(300);
  // }

  // // onLastSlide() {
  // // 	this.slides.slideTo(3, 300)
  // // }

  // openHomePage() {
  //   this.navCtrl.navigateRoot('/home');
  //   // this.router.navigateByUrl('/tabs/(home:home)');
  // }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}
