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
export class RequestService {
    parms: ApiParameters;

    dateComp: DateComponent = { from: new Date(), to: new Date() };
    //resons: ReasonsModel[];

    constructor(public Config: config, public api: Api, public storage: Storage) {
        this.storage.get(this.Config.ConnectionParameter).then(res => this.MapApiParm(res));
        this.LoadParms();
    }

    LoadParms(): Promise<string> {
        return this.storage.ready().then(() => this.storage.get(this.Config.ConnectionParameter));
    }

    MapApiParm(res: any) {
        this.parms = JSON.parse(res) as ApiParameters;
    }
    GetRequestStatus(from: Date, to: Date) {
        // return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/GetWebRequestsStatus',
        // 'emp_id=' + this.parms.EmpId + '&start_date=' + from + '&end_date=' + to + '&apikey=' + this.parms.ApiKey + '&fields=WF_NAME, WF_STOP_POINT, WF_LEVEL, REQUEST_ID, REQUEST_DATE, REQUEST_TYPE, EMP_ID, REQUEST_FROM_DATE, REQUEST_TO_DATE, REQUEST_FROM_TIME, REQUEST_TO_TIME, REQUEST_DURATION, REQUEST_FROM_SITE, REQUEST_PARAM1, REQUEST_PARAM2, REQUEST_PARAM3, REQUEST_PARAM4, REQUEST_NOTE, REQUEST_STATUS, HANDLED_BY, HANDLED_NOTE, HANDLED_DATE, REQUEST_BY, WF_STOP_POINT_ID, WF_ID, EMP_NAME&sort=REQUEST_FROM_DATE&optimize=false&token=' + this.parms.ApiToken)


        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/GetWebRequestsStatus',
        'emp_id=' + this.parms.EmpId + '&start_date=' + from + '&end_date=' + to + '&apikey=' + this.parms.ApiKey + '&fields=WF_NAME, WF_STOP_POINT, WF_LEVEL, REQUEST_ID, REQUEST_DATE, REQUEST_TYPE, EMP_ID, REQUEST_FROM_DATE, REQUEST_TO_DATE, REQUEST_FROM_TIME, REQUEST_TO_TIME, REQUEST_DURATION, REQUEST_FROM_SITE, REQUEST_PARAM1, REQUEST_PARAM2, REQUEST_PARAM3, REQUEST_PARAM4, REQUEST_NOTE, REQUEST_STATUS, HANDLED_BY, HANDLED_NOTE, HANDLED_DATE, REQUEST_BY, WF_STOP_POINT_ID, WF_ID, EMP_NAME&sort=REQUEST_FROM_DATE&optimize=false&token=' + this.parms.ApiToken)
    }



}