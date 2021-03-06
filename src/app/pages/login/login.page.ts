import { Component, OnInit, DebugElement } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController } from '@ionic/angular';
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
import { AccessRightsModel } from '../../../models/AccessRightsModel';

import { Heplers } from '../../../providers/Helper/Helpers';
import { LoadingController } from '@ionic/angular';
import { AppSettings } from '../../config/globals';
import { PunchesService } from '../../../Services/PunchesService';
import { UserService } from '../../../Services/UserService';

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

  account: AccountModel = { empId: "B00004", password: "123", rembmerMe: false };

  // Our translated text strings
  private loginErrorString: string;
  private stval: string;
  public chachPassword: boolean;
  loading: HTMLIonLoadingElement;

  constructor(public usrSer: UserService, public punchse: PunchesService, public loadingController: LoadingController, public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public Config: config, public api: Api, public helper: Heplers) {

    // this.storage.get(this.Config.MainURL_Key).then((res) => {
    //   AppSettings.API_ENDPOINT = res;
    // })
    //   .catch(err => this.helper.showMessage(err, "error Message"));

    // this.storage.get(this.Config.Username_Key).then((res) => {



    //   if (res != "" && res != null && res != "null" && res != undefined) {
    //     debugger;
    //     this.account = JSON.parse(res) as AccountModel;

    //     //this.doLogin();
    //   }

    // });


  }
  GetKey(res: any) {
    AppSettings.MAPS_API = res.result[0].mobile_gmap_api_key;
  }

  checkURL(res: string) {
    try {
      if (res == null || res == undefined) {
        this.helper.showMessage("null", "");
        this.enableLogin = false;
        return;
      }
      this.enableLogin = true;
      this.helper.showMessage(res, "");
    }
    catch (Error) {
      this.helper.showMessage(Error.message, "Login Error");
    }
  }


  validate(res: any,empId:string,Password:string) {

    try {


      //debugger;
      this.tokenReponse = res as TokenModel;
      if (this.tokenReponse.code == '0') {

        AppSettings.IsLogedIn=true;
        this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtreader/GetEmpInf?emp_id=' + empId
          + '&uuid=1213&apikey=' + config.APIKEY + '&fields=EMP_NAME,EMP_ID,DEPT_NAME,DEPT_ID,ORG_NAME,DOJ,STATUS&token=' + this.tokenReponse.result, "").subscribe((res) => {
            this.empResponse = ((res as any).result) as EmployeeModel;
            // this.storage.set(this.Config.UserInformation, JSON.stringify(res as EmployeeModel))
            AppSettings.USERNAME = this.empResponse.EMP_NAME;
            AppSettings.DEPARTMENT = this.empResponse.DEPT_NAME;
            AppSettings.DEPARTMENT_ID = this.empResponse.DEPT_ID;
            AppSettings.EMPID = this.empResponse.EMP_ID;
            AppSettings.ORG_NAME=this.empResponse.ORG_NAME;
            AppSettings.DOJ=this.empResponse.DOJ;
            AppSettings.floatDOJ=this.empResponse.floatDOJ;
            AppSettings.STATE=this.empResponse.STATE;

            
            





            //debugger;
          });

        this.Params = {
          ApiToken: this.tokenReponse.result,
          ApiKey: config.APIKEY,
          EmpId: empId
        }
        this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));

        //let temp = this.account.rembmerMe;
        //debugger;
        // if (this.account.rembmerMe == true) {
        //   this.storage.set(this.Config.Username_Key, JSON.stringify(this.account));
        // }
        //this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));
      
        this.punchse.GetMapAPIKEY(empId,config.APIKEY,this.tokenReponse.result).subscribe((res) => {
          this.GetKey(res);
        })

        this.usrSer.GetRightAccess(empId, config.APIKEY,this.tokenReponse.result).subscribe((res:any) => {        
          AppSettings.permissions = res.result as AccessRightsModel
          debugger;
          this.loading.dismiss();
          this.navCtrl.navigateRoot("Dashboard");
        });

      
      }
      else {
        this.helper.showMessage("Invalid Login", "Login Error");
      }
    }
    catch (Error) {
      this.helper.showMessage(Error.message + Error.stack, "validate function");
    }
  }


  doLogin() {
    try {
      let temp = AppSettings.API_ENDPOINT;
      //debugger;
      this.presentLoading();
      if (this.account.empId != undefined || this.account.empId != "") {
        this.usrSer.Login(this.account.empId, this.account.password).subscribe((res) => {
          this.validate(res,this.account.empId, this.account.password);
        });
      }
    }
    catch (Error) {
      this.helper.showMessage(Error.message, "Login Error");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait....', duration: 5000
    });
    return await this.loading.present();
  }


  async DismissLoadingSpinner() {
    return await this.loadingController.dismiss();
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
