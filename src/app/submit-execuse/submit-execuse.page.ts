import { Component, OnInit } from '@angular/core';
import { ExecuseService } from '../../Services/ExecuseService';
import { ExecuseModel } from '../../models/ExecuseModel';
import { ReasonsModel } from '../../models/ReasonsModel';
import { Heplers } from '../../providers/Helper/Helpers';
import { NavController, LoadingController, ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-submit-execuse',
  templateUrl: './submit-execuse.page.html',
  styleUrls: ['./submit-execuse.page.scss'],
})
export class SubmitExecusePage implements OnInit {

  excModel: ExecuseModel = { to_time: new Date(), desc: "", from_time: new Date(), reason_id: 0, excuse_date: new Date(), pay_status: 0 }
  resons: ReasonsModel[];
  response: any;
  constructor(public helper: Heplers, public excService: ExecuseService, public navCtrl: NavController) {
    this.LoadResons();
  }
  submitExecuse() {
    this.excService.RequestExecuse(this.excModel).subscribe((res:any) => {

      this.response = res;
      if (this.response.code == 0) {
        this.helper.showMessage("The request has been submited successfully", "Done");
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }

    });
  }

  LoadResons() {
    this.excService.GetReasonList().then((res) => {
      res.subscribe((resons) => {
        this.resons = (resons as any).result as ReasonsModel[];
        debugger;
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitExecusePage');
  }
  ngOnInit() {
  }

}
