import { Component, OnInit } from '@angular/core';
import { ExecuseService } from '../../../Services/ExecuseService';
import { ExecuseModel } from '../../../models/ExecuseModel';
import { ReasonsModel } from '../../../models/ReasonsModel';
import { ExecuseListModel } from '../../../models/ExecuseListModel';
import { DateComponent } from '../../../models/DateComponent';
import { Heplers } from '../../../providers/Helper/Helpers';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-execuses',
  templateUrl: './execuses.page.html',
  styleUrls: ['./execuses.page.scss'],
})
export class ExecusesPage implements OnInit {

  excModel: ExecuseModel = { to_time: new Date().toISOString(), desc: "", from_time: new Date().toISOString(), reason_id: 0, excuse_date: new Date().toISOString(), pay_status: 0 }
  resons: ReasonsModel[];
  exList: ExecuseListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  DefaultDateFormat:string;

  constructor(public helper: Heplers, public excService: ExecuseService, public navCtrl: NavController) {
    //this.LoadResons();
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });
  }

  LoadExecuses() {
    this.excService.GetExecuseList(this.dateComp.from, this.dateComp.to).subscribe((res: any) => {
      debugger;
      if (res.code == 0) {
        this.exList = res.result as ExecuseListModel[];
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }

    });
  }


  // LoadResons() {
  //   this.excService.GetReasonList().then((res) => {
  //     res.subscribe((resons) => {
  //       this.resons = (resons as any).result as ReasonsModel[];
  //       debugger;
  //     });
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcusesPage');
  }

  ngOnInit() {
  }

}
