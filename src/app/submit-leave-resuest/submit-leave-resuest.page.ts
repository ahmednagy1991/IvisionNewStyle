import { Component, OnInit } from '@angular/core';

import {  NavController, NavParams } from '@ionic/angular';
import { ReasonsModel } from '../../models/ReasonsModel';
import { SubmitLeavModel } from '../../models/SubmitLeavModel';
import { LeavesService } from '../../Services/LeavesService'
import { Heplers } from '../../providers/Helper/Helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-leave-resuest',
  templateUrl: './submit-leave-resuest.page.html',
  styleUrls: ['./submit-leave-resuest.page.scss'],
})
export class SubmitLeaveResuestPage implements OnInit {
  leaveForm: FormGroup;
 
  resons: ReasonsModel[];
  leaveRequest: SubmitLeavModel = { Description: "", EndDate: new Date().toISOString(), Notes: "", Paystatus: 0, ReasonID: 0, StartDate: new Date().toISOString() };
  submited:boolean=false;

  constructor(private formBuilder: FormBuilder, public helper: Heplers, public leavService: LeavesService, public navCtrl: NavController) {
    this.LoadResons();

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    
    this.leaveForm = this.formBuilder.group({
      Description:['',Validators.required],
      StartDate:['',Validators.required],
      EndDate:['',Validators.required],
      PayStatus:['',Validators.required],
      Reasons:['',Validators.required],
      Notes:['']
    });


  }

  submitLeave() {
    this.submited=true;
    debugger;
    // if(this.leaveRequest.StartDate>=this.leaveRequest.EndDate)
    // {
    //   this.helper.showMessage("Start date must be less than end date","Error");
    // }
    if (this.leaveForm.valid) {
    this.leavService.RequestLeave(this.leaveRequest).subscribe((res: any) => {

      debugger;
      if (res.code == 0) {
        this.helper.showMessage("Leave request has been submitted successfully", "Done");
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }
    });
  }
  }

  LoadResons() {
    this.leavService.GetReasonList().then((res) => {
      res.subscribe((resons) => {
        this.resons = (resons as any).result as ReasonsModel[];
        debugger;
      });
    });
  }

  ngOnInit() {
  }

}
