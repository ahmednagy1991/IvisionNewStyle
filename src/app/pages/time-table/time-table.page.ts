import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
//import { User } from '../../providers';
//import { Api } from '../../providers/api/api';
import { Heplers } from '../../../providers/Helper/Helpers';
import { TimeTableModel } from '../../../models/TimeTableModel';
import { TimeTableListModel } from '../../../models/TimeTableListModel';
import { TimeTableService } from '../../../Services/TimeTableService';
import { DateComponent } from '../../../models/DateComponent';
//import { ModalController, Platform, ViewController } from 'ionic-angular';
import { NavController, LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  TTableModel: TimeTableModel = { TT_ID:"",DURATION: 0, TO_DATE_TIME: new Date(), FROM_DATE_TIME: new Date(), ENTRY_STATE: 0, OVERNIGHT_STATUS: 0, ST_ID: "", ST_TITLE: "", TT_DATE: new Date(), TT_STATE: 0 };
  TTListModel: TimeTableListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };


  constructor(public modalCtrl: ModalController, public helper: Heplers, public TTSerivce: TimeTableService, public navCtrl: NavController) {
  }


  MapTTListTable(res: any) {
    debugger;
    this.TTListModel = res.result as TimeTableListModel[];

  }

  async MapTTListTableDetails(res: any) {
    debugger;

    if (res.code == 0) {
      this.TTableModel = res.result as TimeTableModel;
      //const modal =await this.modalCtrl.create(ModalTimTablePage, { TTTab: this.TTableModel });
      const modal = await this.modalCtrl.create({ component: ModalTimTablePage, id: this.TTableModel.TT_ID })
      modal.present();
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }


  }

  LoadTimeTable() {
    this.TTSerivce.GetTimeTableList(this.helper.ToDateString(this.dateComp.from), this.helper.ToDateString(this.dateComp.to)).subscribe(res => this.MapTTListTable(res));
  }

  LoadTimeTableDetails(TTID: number) {
    debugger;

    this.TTSerivce.GetTimeTableDetails(TTID).subscribe(res => this.MapTTListTableDetails(res));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeTablePage');
  }

  TimeTableDetails() {
    this.navCtrl.navigateRoot("TimeTableDetailsPage");
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

    <ion-button full (click)="dismiss()" icon-left size="medium" expand="full" shape="round" color="danger" tappable>
    <ion-ripple-effect></ion-ripple-effect>
    <ion-icon name="close"></ion-icon>
    Close
  </ion-button>

  </ion-toolbar>
</ion-header>
<ion-content>

<ion-card>

           
      
<ion-grid>
  <div>
      <ion-row nowrap class="ro">Date : {{TTableModel.TT_DATE | date:'yyyy/MM/dd'}}</ion-row>
      <ion-row nowrap class="ro">Reg. HRS : {{helper.ToHoursString(TTableModel.DURATION)}}</ion-row>
      <ion-row nowrap class="ro">From Time : {{TTableModel.FROM_DATE_TIME | date:'HH:MM'}}</ion-row>
      <ion-row nowrap class="ro">To Time : {{TTableModel.TO_DATE_TIME | date:'HH:MM'}}</ion-row>
      <ion-row nowrap class="ro">Calc. Type : {{TTableModel.ST_ID}}</ion-row>
      <ion-row nowrap class="ro">Tpl. Used : {{TTableModel.ST_TITLE}}</ion-row>
     
  </div>
   
</ion-grid>
</ion-card>
</ion-content>
`
})
export class ModalTimTablePage {
  TTableModel: TimeTableModel

  constructor(
    // public platform: Platform,
    public helper: Heplers,
    public params: NavParams,
    private modalCtrl: ModalController,
    public TTSerivce: TimeTableService
    //public viewCtrl: ViewController
  ) {
    debugger;
    // this.TTableModel = params.get("TTTab");
    this.LoadTimeTableDetails(params.data.modal["id"]);

  }

  LoadTimeTableDetails(TTID: number) {
    debugger;

    this.TTSerivce.GetTimeTableDetails(TTID).subscribe(res => this.MapTTListTableDetails(res));
  }

  MapTTListTableDetails(res: any) {
    if (res.code == 0) {
      this.TTableModel = res.result as TimeTableModel;

    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
