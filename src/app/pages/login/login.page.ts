import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';


import { User } from '../../../providers';


//import { Settings } from '../../providers/settings/settings';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
import { Api } from '../../../providers/api/api';
import { TokenModel } from '../../../models/TokenModel';
import { ApiParameters } from '../../../models/ApiParameters';
import { AccountModel } from '../../../models/AccountModel';
import { EmployeeModel } from '../../../models/EmployeeModel';

import { Heplers } from '../../../providers/Helper/Helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  enableLogin: boolean;
  tokenReponse: TokenModel;
  empResponse: EmployeeModel;
  Params: ApiParameters;

  account: AccountModel = { empId: "", password: "", rembmerMe: false };

  // Our translated text strings
  private loginErrorString: string;
  private stval: string;
  public chachPassword: boolean;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public Config: config, public api: Api, public helper: Heplers) {
    this.storage.get(this.Config.Username_Key).then((res) => {
      debugger;
      if (res != "" && res != null && res != "null" && res != undefined) {
        this.account = JSON.parse(res) as AccountModel;
        this.doLogin();
      }

    });
  }

  checkURL(res: string) {
    if (res == null || res == undefined) {
      this.helper.showMessage("null","");
      this.enableLogin = false;
      return;
    }
    this.enableLogin = true;
    this.helper.showMessage(res,"");
  }









  validate(res: any) {
    debugger;
    this.tokenReponse = res as TokenModel;
    if (this.tokenReponse.code == '0') {

      this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtreader/GetEmpInf?emp_id=' + this.account.empId
        + '&uuid=1213&apikey=' + config.APIKEY + '&fields=EMP_NAME,EMP_ID,DEPT_NAME,DEPT_ID,ORG_NAME,DOJ,STATUS&token=' + this.tokenReponse.result, "").subscribe(res => this.storage.set(this.Config.UserInformation, JSON.stringify(res as EmployeeModel)))

      this.Params = {
        ApiToken: this.tokenReponse.result,
        ApiKey: config.APIKEY,
        EmpId: this.account.empId
      }
      this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));

      let temp = this.account.rembmerMe;
      debugger;
      if (this.account.rembmerMe == true) {
        this.storage.set(this.Config.Username_Key, JSON.stringify(this.account));
      }
      this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));     
      this.navCtrl.navigateRoot("DashboardPage");     
    }
    else {
      this.helper.showMessage("Invalid Login", "Login Error");
    }
  }
  doLogin() {
    debugger;
    if (this.account.empId != undefined || this.account.empId != "") {
      this.api.callGet('ivmtwebsdk/ea.dll/api/v52/emxauth2/gettoken?emp_id=' + this.account.empId
        + '&emp_pwd=' + this.account.password + '&uuid=1213&apikey=' + config.APIKEY + '&hash_ver=sha1', "")
        .subscribe((res) => {
          this.validate(res);

        });
    }

  

  }



  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }







  
  // public onLoginForm: FormGroup;

  // constructor(
  //   public navCtrl: NavController,
  //   public menuCtrl: MenuController,
  //   public toastCtrl: ToastController,
  //   public alertCtrl: AlertController,
  //   public loadingCtrl: LoadingController,
  //   private translate: TranslateProvider,
  //   private formBuilder: FormBuilder
  // ) { }

  // ionViewWillEnter() {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
    // document.querySelector('video').play();

    // this.onLoginForm = this.formBuilder.group({
    //   'email': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'password': [null, Validators.compose([
    //     Validators.required
    //   ])]
    // });
  }

  // async forgotPass() {
  //   const alert = await this.alertCtrl.create({
  //     header: this.translate.get('app.pages.login.label.forgot'),
  //     message: this.translate.get('app.pages.login.text.forgot'),
  //     inputs: [
  //       {
  //         name: 'email',
  //         type: 'email',
  //         placeholder: this.translate.get('app.label.email')
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Confirm',
  //         handler: async () => {
  //           const loader = await this.loadingCtrl.create({
  //             duration: 2000
  //           });

  //           loader.present();
  //           loader.onWillDismiss().then(async l => {
  //             const toast = await this.toastCtrl.create({
  //               showCloseButton: true,
  //               message: this.translate.get('app.pages.login.text.sended'),
  //               duration: 3000,
  //               position: 'bottom'
  //             });

  //             toast.present();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // // // //
  

  // goToHome() {
  //   this.navCtrl.navigateRoot('/home');
  // }

}
