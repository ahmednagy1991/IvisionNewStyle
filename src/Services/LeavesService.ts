import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { LeaveModel } from '../models/LeaveModel';
import { ApiParameters } from '../models/ApiParameters';
import { DateComponent } from '../models/DateComponent';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { LeavListModel } from '../models/LeavListModel';
import { SubmitLeavModel } from '../models/SubmitLeavModel';
//import { DateTime } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
//import { ReasonsModel } from '../models/ReasonsModel';
 
@Injectable()
export class LeavesService {
    parms: ApiParameters;
    LeavesTab: LeaveModel[];
    Leav_list: LeavListModel[];
    dateComp: DateComponent = { from: new Date(), to: new Date() };
    //resons: ReasonsModel[];

    constructor(public Config: config, public api: Api, public storage: Storage) {    
        this.storage.get(this.Config.ConnectionParameter).then(res=>this.MapApiParm(res));   
        this.LoadParms();
    }

    LoadParms(): Promise<string> {
        return this.storage.ready().then(() => this.storage.get(this.Config.ConnectionParameter));
    }
  
    MapApiParm(res: any) {
        this.parms = JSON.parse(res) as ApiParameters;
        this.GetReasonList();
    }

    GetLeaveList(from: Date, to: Date) {
        debugger;
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getleavelist',
            'emp_id=' + this.parms.EmpId + '&start_date=' + from + '&end_date=' + to + '&apikey=' + this.parms.ApiKey + '&fields=LV_ID,LV_TITLE&sort=START_DATE&token=' + this.parms.ApiToken)
    }


    GetDutyList(from: Date, to: Date) {
        debugger;
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getleavelist',
            'emp_id=' + this.parms.EmpId + '&leave_type=2&start_date=' + from + '&end_date=' + to + '&apikey=' + this.parms.ApiKey + '&fields=LV_ID,LV_TITLE&sort=START_DATE&token=' + this.parms.ApiToken)
    }


    GetTodayLeaves(LeaveID: number) {
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getleave',
            'emp_id=' + this.parms.EmpId + '&lid=' + LeaveID + '&apikey=' + this.parms.ApiKey + '&fields=LV_NOTE,REASON_TITLE,PAY_STATUS,LV_ID,LV_TITLE, START_DATE,END_DATE&token=' + this.parms.ApiToken)
    }
   
    RequestLeave(leavModel: SubmitLeavModel) {

        let temp='emp_id=' + this.parms.EmpId + '&start_date=' + leavModel.StartDate + '&end_date=' + leavModel.EndDate + '&apikey=' + this.parms.ApiKey + '&reason_id='+leavModel.ReasonID+'&desc='+leavModel.Description+'&token=' + this.parms.ApiToken;
        debugger;
        return this.api.callGet('ivmtwebsdk/ivmtTrans.dll/api/v52/ivmtTrans/requestleave',
        'emp_id=' + this.parms.EmpId + '&pay_status='+leavModel.Paystatus+'&start_date=' + leavModel.StartDate + '&end_date=' + leavModel.EndDate + '&apikey=' + this.parms.ApiKey + '&reason_id='+leavModel.ReasonID+'&desc='+leavModel.Description+'&token=' + this.parms.ApiToken)
    }
    
    GetReasonList() {        
        return this.LoadParms().then((res) => {
            this.parms = JSON.parse(res) as ApiParameters;           
            return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getreasonlist',
                'apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken + '&reason_type=leave');
        });
        
    }


}