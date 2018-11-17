import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Heplers } from '../../../providers/Helper/Helpers';
import { UserService } from '../../../Services/UserService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;

  constructor(public usrService: UserService, public helper: Heplers, public navCtrl: NavController) {
  }

  ChangePassword() {
    if (this.ConfirmPassword != this.NewPassword) {
      this.helper.showMessage("Passwords dose not matched", "Error")
    }
    else {
      this.usrService.ChangePassword(this.OldPassword, this.NewPassword).subscribe((res: any) => {
        if (res.code == 0) {
          this.helper.showMessage("Password has been changed successfully", "Done");
        }
        else {
          this.helper.ShowErrorMessage(res.code);
        }
      });
    }

  }


  ngOnInit() {
  }

}
