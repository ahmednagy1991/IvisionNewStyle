import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../../Services/UserService';
import { RegisterUserModel } from '../../../models/RegisterUserModel';
import { ReasonsModel } from '../../../models/ReasonsModel';
import { DateComponent } from '../../../models/DateComponent';
import { Heplers } from '../../../providers/Helper/Helpers';
import { NavController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  usr: RegisterUserModel = { emp_id: "B00003", emp_pwd: "1234", uuid: "11223344" }
  response: any;
  passwordConfirm: string="1234";
  deviceId:string;
  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public helper: Heplers,
    private uniqueDeviceID: UniqueDeviceID,
  ) { 

  
  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(false);
  }

  ngOnInit() {
    // this.onRegisterForm = this.formBuilder.group({
    //   'fullName': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'email': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'password': [null, Validators.compose([
    //     Validators.required
    //   ])]
    // });
  }

  signUp() {
    if (this.passwordConfirm == this.usr.emp_pwd) {

      debugger;
    

      this.uniqueDeviceID.get()
      .then((uuid: any) => {
        //this.deviceId=uuid
        this.userService.RegisterUser(uuid, this.usr.emp_id, this.usr.emp_pwd).subscribe((res: any) => {
          this.response = res;
          if (this.response.code == 0) {
            this.helper.showMessage("The request has been submited successfully for device ", "Done");
          }
          else {
            this.helper.ShowErrorMessage(res.code);
          }

        });
       
      })
      .catch((error: any) => console.log(error));
      
     
     }
    else {
      this.helper.showMessage("Passwords not matched","Error");
    }
  

    // const loader = await this.loadingCtrl.create({
    //   duration: 2000
    // });

    // loader.present();
    // loader.onWillDismiss().then(() => {
    //   this.navCtrl.navigateRoot('/home');
    // });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
