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
import { HelperService } from '../../../Services/HelperService';
import {AppSettings} from '../../config/globals';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  TTableModel: TimeTableModel = { TT_ID:"",DURATION: 0, TO_DATE_TIME: new Date(), FROM_DATE_TIME: new Date(), ENTRY_STATE: 0, OVERNIGHT_STATUS: 0, ST_ID: "", ST_TITLE: "", TT_DATE: new Date(), TT_STATE: 0 };
  TTListModel: TimeTableListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  DefaultDateFormat:string;
  DefaultTimeFormat:string;
  constructor(public helpService: HelperService,public modalCtrl: ModalController, public helper: Heplers, public TTSerivce: TimeTableService, public navCtrl: NavController) {
    this.dateComp.to=this.helper.AddDays(7,new Date()).toISOString();
    // helper.GetDateFormat().then((res)=>{
    //   this.DefaultDateFormat=res;
    // });

    // helper.GetTimeFormat().then((res)=>{
    //   this.DefaultTimeFormat=res;
    // });

    this.helpService.GetDateFormat().subscribe((res)=>{
     
      this.DefaultDateFormat=(res as any).result[0].Date_Format;
      AppSettings.ServerDateFormat=this.DefaultDateFormat;
    

      //this.storage.set("DateFormat",this.DefaultDateFormat);
    });

    this.helpService.GetTimeFormat().subscribe((res)=>{
    
      this.DefaultTimeFormat=(res as any).result[0].Time_Format;
      AppSettings.ServerTimeFormat=this.DefaultTimeFormat;
      //this.storage.set("TimeFormat",this.DefaultTimeFormat);
    });


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

<ion-grid>
<ion-row>
  <ion-col>
    
    <ion-list>
      <ion-item-sliding>
        <ion-item tappable>
          <ion-label>
            <h2>             
              <ion-text color="primary">Date : {{TTableModel.TT_DATE | date:DefaultDateFormat}}</ion-text>
            </h2>         
          </ion-label>
        </ion-item>
        
      </ion-item-sliding>




      <ion-item-sliding>
      <ion-item tappable>
        <ion-label>
          <h2>             
            <ion-text color="primary">Reg. HRS : {{helper.ToHoursString(TTableModel.DURATION)}}</ion-text>
          </h2>         
        </ion-label>
      </ion-item>
      
    </ion-item-sliding>



    <ion-item-sliding>
    <ion-item tappable>
      <ion-label>
        <h2>             
          <ion-text color="primary">From Time : {{TTableModel.FROM_DATE_TIME | date:DefaultTimeFormat}}</ion-text>
        </h2>         
      </ion-label>
    </ion-item>
    
  </ion-item-sliding>


  <ion-item-sliding>
  <ion-item tappable>
    <ion-label>
      <h2>             
        <ion-text color="primary">To Time : {{TTableModel.TO_DATE_TIME | date:DefaultTimeFormat}}</ion-text>
      </h2>         
    </ion-label>
  </ion-item>
  
</ion-item-sliding>


<ion-item-sliding>
<ion-item tappable>
  <ion-label>
    <h2>             
      <ion-text color="primary">Calc. Type : {{TTableModel.ST_ID}}</ion-text>
    </h2>         
  </ion-label>
</ion-item>

</ion-item-sliding>


<ion-item-sliding>
<ion-item tappable>
  <ion-label>
    <h2>             
      <ion-text color="primary">Tpl. Used : {{TTableModel.ST_TITLE}}</ion-text>
    </h2>         
  </ion-label>
</ion-item>

</ion-item-sliding>



  
    </ion-list>

  </ion-col>
</ion-row>
</ion-grid>

















<ion-card>

           
      

</ion-card>
</ion-content>
`
})
export class ModalTimTablePage {
  TTableModel: TimeTableModel
  DefaultDateFormat:string;
  DefaultTimeFormat:string;
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
  
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });

    helper.GetTimeFormat().then((res)=>{
      this.DefaultTimeFormat=res;
    });
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
