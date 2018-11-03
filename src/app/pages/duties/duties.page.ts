import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController,NavParams } from '@ionic/angular';
import { LeaveModel } from '../../../models/LeaveModel';
import { DateComponent } from '../../../models/DateComponent';
import { LeavesService } from '../../../Services/LeavesService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { TranslateService } from '@ngx-translate/core';
import { DutiesListModel } from '../../../models/DutiesListModel';

@Component({
  selector: 'app-duties',
  templateUrl: './duties.page.html',
  styleUrls: ['./duties.page.scss'],
})
export class DutiesPage implements OnInit {

  DutiyList: DutiesListModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };

  constructor(public helper: Heplers, public LevService: LeavesService, public navCtrl: NavController) {
  }


  MapDutiesListTable(res: any) {
    debugger;
    if (res.code == 0) {
      this.DutiyList = res.result as DutiesListModel[];
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }

  }


  GetDutiesList() {
    this.LevService.GetDutyList(this.dateComp.from, this.dateComp.to).subscribe((res) => {
      debugger;
      this.MapDutiesListTable(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DutiesPage');
  }

  ngOnInit() {
  }

}
