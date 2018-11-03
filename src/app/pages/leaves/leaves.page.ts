import { Component, OnInit } from '@angular/core';
import { LeaveModel } from '../../../models/LeaveModel';
import { DateComponent } from '../../../models/DateComponent';
import { LeavesService } from '../../../Services/LeavesService';
import { Heplers } from '../../../providers/Helper/Helpers';
//import { TranslateService } from '@ngx-translate/core';
import { LeavListModel } from '../../../models/LeavListModel';
import { NavController, LoadingController, ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
})
export class LeavesPage implements OnInit {

  LeavesTab: LeaveModel = { LV_ID: 0, LV_TITLE: "", START_DATE: new Date(), END_DATE: new Date(), LV_NOTE: "", PAY_STATUS: 0, REASON_TITLE: "" };
  LeavList: LeavListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  constructor(public modalCtrl: ModalController, public helper: Heplers, public LevService: LeavesService, public navCtrl: NavController) {
    //this.GetLeaves();
  }


  MapLeavesTable(res: any) {
    debugger;
    if (res.code == 0) {
      this.LeavesTab = res.result as LeaveModel;
      //const modal = this.modalCtrl.create(ModalContentPage, { leavesTab: this.LeavesTab });
     // modal.present();
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }


  }

  MapLeavesListTable(res: any) {
    debugger;
    if (res.code == 0) {
      this.LeavList = res.result as LeavListModel[];
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }


  }


  GetLeaveList() {
    this.LevService.GetLeaveList(this.dateComp.from, this.dateComp.to).subscribe(res => this.MapLeavesListTable(res));
  }


  GetLeaves(LeaveId: number) {
    debugger;
    this.LevService.GetTodayLeaves(LeaveId).subscribe(res => this.MapLeavesTable(res));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavesPage');
  }

  ngOnInit() {
  }

}
@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Leave Details
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>

<ion-card>

<ion-grid>
<div>
    <ion-row nowrap class="ro">Leave Id : {{LeavesTab.LV_ID}}</ion-row>
    <ion-row nowrap class="ro">Leave Title : {{LeavesTab.LV_TITLE}}</ion-row>
    <ion-row nowrap class="ro">Leave From : {{LeavesTab.START_DATE}}</ion-row>
    <ion-row nowrap class="ro">Leave To : {{LeavesTab.END_DATE}}</ion-row>
    <ion-row nowrap class="ro">Leave Notes : {{LeavesTab.LV_NOTE}}</ion-row>
    <ion-row nowrap class="ro">Leave Reason : {{LeavesTab.REASON_TITLE}}</ion-row>
    <ion-row nowrap class="ro">Leave Status : {{helper.getPayStatus(LeavesTab.PAY_STATUS)}}</ion-row>
</div>
 
</ion-grid>
</ion-card>
</ion-content>
`
})
export class ModalContentPage {
  LeavesTab: LeaveModel;

  constructor(
    public helper: Heplers,
   // public params: NavParams,
    //public viewCtrl: ViewController
  ) {
    //this.LeavesTab = params.get("leavesTab");

  }

  dismiss() {
   // this.viewCtrl.dismiss();
  }
}
