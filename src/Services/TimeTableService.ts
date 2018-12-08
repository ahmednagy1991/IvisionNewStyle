import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { TimeTableModel } from '../models/TimeTableModel';
import { TimeTableListModel } from '../models/TimeTableListModel';
import { ApiParameters } from '../models/ApiParameters';
import { DateComponent } from '../models/DateComponent';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';

@Injectable()
export class TimeTableService {
    parms: ApiParameters;
    AttendanceTab: TimeTableModel[];
    TimeTableList: TimeTableListModel[];
    dateComp: DateComponent = { from: new Date(), to: new Date() };



    constructor(public Config: config, public api: Api, public storage: Storage) {

        this.storage.get(this.Config.ConnectionParameter).then(res => this.MapApiParm(res));
    }

    MapApiParm(res: any) {
        this.parms = JSON.parse(res) as ApiParameters;
    }

    GetTimeTableList(FromDate: string, ToDate: string) {
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/gettimetablelist',
            'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&start_date=' +FromDate + '&end_date=' + ToDate + '&fields=TT_ID,FROM_DATE_TIME,TO_DATE_TIME,TT_STATE,TT_DATE&sort=from_date_time desc&token=' + this.parms.ApiToken)
    }

    GetTimeTableDetails(TTID: number) {
        return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/gettimetable',
            'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&ttid=' + TTID + '&fields=TT_ID,TT_DATE,ENTRY_STATE,FROM_DATE_TIME,TO_DATE_TIME,OVERNIGHT_STATUS,DURATION,TT_STATE,ST_ID,ST_TITLE&token=' + this.parms.ApiToken)
    }

    // GetDateFormat() {
    //     return this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getdateformat',
    //         'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey+'&token=' + this.parms.ApiToken)
    // }


}