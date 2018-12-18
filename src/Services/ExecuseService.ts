import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { ApiParameters } from '../models/ApiParameters';
import { DateComponent } from '../models/DateComponent';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { ExecuseModel } from '../models/ExecuseModel';
//import { DateTime } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { DatePipe } from '@angular/common';


@Injectable()
export class ExecuseService {
    parms: ApiParameters;
    dateComp: DateComponent = { from: new Date(), to: new Date() };


    constructor(public datepipe: DatePipe,public Config: config, public api: Api, public storage: Storage) {
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

    GetExecuseList(from: Date, to: Date) {
        debugger;
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getleavelist',
            'emp_id=' + this.parms.EmpId + '&leave_type=1&start_date=' + from + '&end_date=' + to + '&apikey=' + this.parms.ApiKey + '&fields=LV_ID,LV_TITLE,START_DATE,END_DATE,REASON_TITLE,START_TIME,END_TIME&sort=START_DATE&token=' + this.parms.ApiToken)
    }


    RequestExecuse(ExcModel: ExecuseModel) {
      
        return this.api.callGet('ivmtwebsdk/ivmtTrans.dll/api/v52/ivmtTrans/requestexcuse',
            'emp_id=' + this.parms.EmpId + '&pay_status=' + ExcModel.pay_status + '&excuse_date=' + ExcModel.excuse_date + '&from_time='+this.datepipe.transform(ExcModel.from_time, 'hh:mm:ss')+'&to_time='+this.datepipe.transform(ExcModel.to_time, 'hh:mm:ss')+'&apikey=' + this.parms.ApiKey + '&reason_id=' + ExcModel.reason_id + '&desc=' + ExcModel.desc + '&token=' + this.parms.ApiToken)
    }

    GetReasonList() {
        return this.LoadParms().then((res) => {
            this.parms = JSON.parse(res) as ApiParameters;
            return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getreasonlist',
                'apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken + '&reason_type=excuse');
        });

    }


}