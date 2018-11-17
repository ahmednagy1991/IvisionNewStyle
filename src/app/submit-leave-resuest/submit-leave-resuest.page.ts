import { Component, OnInit } from '@angular/core';

import {  NavController, NavParams } from '@ionic/angular';
import { ReasonsModel } from '../../models/ReasonsModel';
import { SubmitLeavModel } from '../../models/SubmitLeavModel';
import { LeavesService } from '../../Services/LeavesService'
import { Heplers } from '../../providers/Helper/Helpers';

@Component({
  selector: 'app-submit-leave-resuest',
  templateUrl: './submit-leave-resuest.page.html',
  styleUrls: ['./submit-leave-resuest.page.scss'],
})
export class SubmitLeaveResuestPage implements OnInit {

 
  resons: ReasonsModel[];
  leaveRequest: SubmitLeavModel = { Description: "", EndDate: new Date(), Notes: "", Paystatus: 0, ReasonID: 0, StartDate: new Date() };

  constructor(public helper: Heplers, public leavService: LeavesService, public navCtrl: NavController) {
    this.LoadResons();
  }

  submitLeave() {
    debugger;
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
