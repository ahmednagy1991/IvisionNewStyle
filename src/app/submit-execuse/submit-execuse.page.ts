import { Component, OnInit } from '@angular/core';
import { ExecuseService } from '../../Services/ExecuseService';
import { ExecuseModel } from '../../models/ExecuseModel';
import { ReasonsModel } from '../../models/ReasonsModel';
import { Heplers } from '../../providers/Helper/Helpers';
import { NavController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-execuse',
  templateUrl: './submit-execuse.page.html',
  styleUrls: ['./submit-execuse.page.scss'],
})
export class SubmitExecusePage implements OnInit {

  execuseForm: FormGroup;
  excModel: ExecuseModel = { to_time: new Date().toISOString(), desc: "", from_time: new Date().toISOString(), reason_id: 0, excuse_date: new Date().toISOString(), pay_status: 0 }
  resons: ReasonsModel[];
  response: any;
  constructor(private formBuilder: FormBuilder, public helper: Heplers, public excService: ExecuseService, public navCtrl: NavController) {
    this.LoadResons();

    this.execuseForm = this.formBuilder.group({
      description: ['', Validators.required],
      execuseDate:['', Validators.required],
      fromTime:['', Validators.required],
      toTime:['', Validators.required],
      payStatus:['', Validators.required],
      rasons:['', Validators.required]
    });

  }
  submitExecuse() {
    if(this.excModel.from_time<=this.excModel.to_time)
    {
      this.helper.showMessage("From time must be less than to time","Error");
    }
    else if (this.execuseForm.valid) {
      this.excService.RequestExecuse(this.excModel).subscribe((res: any) => {

        this.response = res;
        debugger;
        if (this.response.code == 0) {
          this.helper.showMessage("The request has been submited successfully", "Done");
        }
        else {
          this.helper.ShowErrorMessage(res.code);
        }

      });
    }
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
