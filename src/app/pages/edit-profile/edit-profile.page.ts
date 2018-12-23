import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';

import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { Heplers } from '../../../providers/Helper/Helpers';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  // constructor(
  //   public navCtrl: NavController, 
  //   public loadingCtrl: LoadingController, 
  //   public toastCtrl: ToastController,
  //   private translate: TranslateProvider
  //   ) { }
  Employee: EmployeeModel={EMP_ID:"",DEPT_NAME:"",DEPT_ID:"",EMP_NAME:"",ORG_NAME:"",DOJ:"",floatDOJ:"",STATE:""};;
  constructor(public helper:Heplers,public Config: config,public storage: Storage,public navCtrl: NavController) {
    this.storage.get(this.Config.UserInformation).then(res => this.MapEmp(res));
  }
  MapEmp(res: any) {
    debugger;
    this.Employee = JSON.parse(res).result as EmployeeModel;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  ngOnInit() {
  }

  // async sendData() {
  //   // send booking info
  //   const loader = await this.loadingCtrl.create({
  //     duration: 2000
  //   });

  //   loader.present();
  //   loader.onWillDismiss().then(async l => {
  //     const toast = await this.toastCtrl.create({
  //       showCloseButton: true,
  //       cssClass: 'bg-profile',
  //       message: 'Your Data was Edited!',
  //       duration: 3000,
  //       position: 'bottom'
  //     });

  //     toast.present();
  //     this.navCtrl.navigateForward('/home');
  //   });
  //   // end
  // }

}
