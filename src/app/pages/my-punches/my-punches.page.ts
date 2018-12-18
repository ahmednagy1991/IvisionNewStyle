import { Component, OnInit } from '@angular/core';
import { DateComponent } from '../../../models/DateComponent';
import { PunchesService } from '../../../Services/PunchesService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { PunchModel } from '../../../models/PunchModel';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-punches',
  templateUrl: './my-punches.page.html',
  styleUrls: ['./my-punches.page.scss'],
})
export class MyPunchesPage implements OnInit {

 

  ngOnInit() {
  }

  PunchTable: PunchModel[];
  DefaultDateFormat:string;
  DefaultTimeFormat:string;
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };

  constructor(public helper: Heplers,public punchService: PunchesService, public navCtrl: NavController) {
    this.dateComp.from=this.helper.SubDays(7,new Date()).toISOString();
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });
    helper.GetTimeFormat().then((res)=>{
      this.DefaultTimeFormat=res;
    });
  }


  MapPunchTable(res: any) {
    debugger;
    if (res.code == 0) {
      this.PunchTable = res.result as PunchModel[];
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }

  }


  GetPunches() {
    this.punchService.GetPunches(this.dateComp.from.toString(), this.dateComp.to.toString()).subscribe(res => this.MapPunchTable(res));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPunchingPage');
  }

}
