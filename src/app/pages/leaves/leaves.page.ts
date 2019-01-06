import { Component, OnInit } from '@angular/core';
import { LeaveModel } from '../../../models/LeaveModel';
import { DateComponent } from '../../../models/DateComponent';
import { LeavesService } from '../../../Services/LeavesService';
import { Heplers } from '../../../providers/Helper/Helpers';
//import { TranslateService } from '@ngx-translate/core';
import { LeavListModel } from '../../../models/LeavListModel';
import { NavController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import {AppSettings} from '../../config/globals';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
})
export class LeavesPage implements OnInit {

  DefaultDateFormat:string;
  LeavesTab: LeaveModel = { LV_ID: 0, LV_TITLE: "", START_DATE: new Date(), END_DATE: new Date(), LV_NOTE: "", PAY_STATUS: 0, REASON_TITLE: "" };
  LeavList: LeavListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  constructor(public modalCtrl: ModalController, public helper: Heplers, public LevService: LeavesService, public navCtrl: NavController) {
    //this.GetLeaves();
   
    // helper.GetDateFormat().then((res)=>{
    //   this.DefaultDateFormat=res;
    // });
    this.DefaultDateFormat= AppSettings.ServerDateFormat;
    debugger;
  }

  //, { leavesTab: this.LeavesTab }
  async MapLeavesTable(res: any) {
    debugger;
    if (res.code == 0) {
      this.LeavesTab = res.result as LeaveModel;
      const modal = await this.modalCtrl.create({ component: ModalContentPage, id: this.LeavesTab.LV_ID.toString() });
      return await modal.present();
    }
    else {
      this.helper.ShowMessage(res.code,"Information");
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
     
    </ion-title>
    <ion-button (click)="dismiss()" icon-left size="medium" expand="full" shape="round" color="danger" tappable>
    <ion-ripple-effect></ion-ripple-effect>
    <ion-icon name="close"></ion-icon>
   Close
  </ion-button>
  </ion-toolbar>
</ion-header>
<ion-content>

<ion-card>



<ion-grid>
<ion-row>
  <ion-col>
    
    <ion-list>
      <ion-item-sliding>
        <ion-item tappable>
          <ion-label>
            <h2>             
              <ion-text color="primary">Leave Id : {{LeavesTab.LV_ID}}</ion-text>
            </h2>         
          </ion-label>
        </ion-item>
        
      </ion-item-sliding>




      <ion-item-sliding>
      <ion-item tappable>
        <ion-label>
          <h2>             
            <ion-text color="primary">Leave Title : {{LeavesTab.LV_TITLE}}</ion-text>
          </h2>         
        </ion-label>
      </ion-item>
      
    </ion-item-sliding>



    <ion-item-sliding>
    <ion-item tappable>
      <ion-label>
        <h2>             
          <ion-text color="primary">Leave From : {{LeavesTab.START_DATE | date:DefaultDateFormat}}</ion-text>
        </h2>         
      </ion-label>
    </ion-item>
    
  </ion-item-sliding>


  <ion-item-sliding>
  <ion-item tappable>
    <ion-label>
      <h2>             
        <ion-text color="primary">Leave To : {{LeavesTab.END_DATE | date:DefaultDateFormat}}</ion-text>
      </h2>         
    </ion-label>
  </ion-item>
  
</ion-item-sliding>


<ion-item-sliding>
<ion-item tappable>
  <ion-label>
    <h2>             
      <ion-text color="primary">Leave Notes : {{LeavesTab.LV_NOTE}}</ion-text>
    </h2>         
  </ion-label>
</ion-item>

</ion-item-sliding>


<ion-item-sliding>
<ion-item tappable>
  <ion-label>
    <h2>             
      <ion-text color="primary">Leave Reason : {{LeavesTab.REASON_TITLE}}</ion-text>
    </h2>         
  </ion-label>
</ion-item>

</ion-item-sliding>

<ion-item-sliding>
<ion-item tappable>
  <ion-label>
    <h2>             
      <ion-text color="primary">Leave Status : {{helper.getPayStatus(LeavesTab.PAY_STATUS)}}</ion-text>
    </h2>         
  </ion-label>
</ion-item>

</ion-item-sliding>




  
    </ion-list>

  </ion-col>
</ion-row>
</ion-grid>






</ion-card>
</ion-content>
`
})
export class ModalContentPage {
  LeavesTab: LeaveModel;
  DefaultDateFormat:string;
  DefaultTimeFormat:string;

  constructor(
    public helper: Heplers,
    public params: NavParams,
    public LevService: LeavesService,
    private modalCtrl: ModalController) {

    this.GetLeaves(params.data.modal["id"]);
    debugger;
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });

    helper.GetTimeFormat().then((res)=>{
      this.DefaultTimeFormat=res;
    });
  }

  MapLeave(res: any) {
    if (res.code == 0) {
      this.LeavesTab = res.result as LeaveModel;
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }

  }
  GetLeaves(LeaveId: number) {
    debugger;
    this.LevService.GetTodayLeaves(LeaveId).subscribe(res => this.MapLeave(res));
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
