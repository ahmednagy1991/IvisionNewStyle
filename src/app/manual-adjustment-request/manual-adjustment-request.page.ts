import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { PunchesService } from '../../Services/PunchesService';
import { ReaderModel } from '../../models/ReaderModel';
import { ReasonsModel } from '../../models/ReasonsModel';
import { SubmitAdjustmentModel } from '../../models/SubmitAdjustmentModel';
import { Heplers } from '../../providers/Helper/Helpers';



@Component({
  selector: 'app-manual-adjustment-request',
  templateUrl: './manual-adjustment-request.page.html',
  styleUrls: ['./manual-adjustment-request.page.scss'],
})
export class ManualAdjustmentRequestPage implements OnInit {

 

  readerList: ReaderModel[];
  resons: ReasonsModel[];
  adj: SubmitAdjustmentModel = { punch_date: new Date().toISOString(), punch_time: new Date().toISOString(), Punch_type: 0, reader_id: 0, reason_id: 0, req_note: "" };

  constructor( public helper: Heplers, public punchSer: PunchesService, public navCtrl: NavController) {
    this.LoadResons();
    this.LoadReaders();

    
  }

  submitAdjustment() {

   
      this.punchSer.SubmitManulaAdjustment(this.adj).subscribe((res: any) => {

        if (res.code == 0) {
          this.helper.showMessage("Request has been submited successfully", "Done");

        }
        else {
          debugger;
          this.helper.ShowErrorMessage(res.code);
        }

      });
    
  }


  LoadReaders() {
    this.punchSer.GetReaderList().then((res) => {
      res.subscribe((ret) => {
        debugger;
        this.readerList = (ret as any).result as ReaderModel[];
        debugger;
      });
    });
  }

  LoadResons() {
    this.punchSer.GetReasonList().then((res) => {
      res.subscribe((resons) => {
        this.resons = (resons as any).result as ReasonsModel[];
        debugger;
      });
    });
  }

  ngOnInit() {
  }

}
