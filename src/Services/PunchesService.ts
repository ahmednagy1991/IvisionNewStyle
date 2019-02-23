import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { PunchModel } from '../models/PunchModel';
import { ApiParameters } from '../models/ApiParameters';
import { DateComponent } from '../models/DateComponent';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { SubmitGeoPunchModel } from '../models/SubmitGeoPunchModel';
import { ReaderModel } from '../models/ReaderModel';
import { SubmitAdjustmentModel } from '../models/SubmitAdjustmentModel';

@Injectable()
export class PunchesService {
    parms: ApiParameters;
    readerList:ReaderModel[];
    PunchTab: PunchModel[];
    dateComp: DateComponent = { from: new Date(), to: new Date() };

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

    GetPunches(FromDate: string, ToDate: string) {
        //.subscribe(res => this.PunchTab=res as PunchModel[]);
        //entry_type=0,3,2
        return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getpunches',
            'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&start_date=' + FromDate + '&end_date=' + ToDate + '&fields=PUNCH_DATETIME,PUNCH_TYPE,ENTRY_TYPE,READER_NAME&sort=PUNCH_DATETIME desc&token=' + this.parms.ApiToken);
    }


    PunchIn(punch: SubmitGeoPunchModel) {    
        //punch type 1 for IN 0 for Out
        let temp= 'emp_id=' + this.parms.EmpId + '&Punch_type=1&punch_date=' + punch.punch_date + '&punch_time=' + punch.punch_time + '&lat=' + punch.lat + '&lng=' + punch.lng + '&apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken;
        debugger;
        return this.api.callGet('/ivmtTrans.dll/api/v52/ivmtTrans/geopunch',
            'emp_id=' + this.parms.EmpId + '&Punch_type=1&punch_date=' + punch.punch_date + '&punch_time=' + punch.punch_time + '&lat=' + punch.lat + '&lng=' + punch.lng + '&apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken)
    }

    PunchOut(punch: SubmitGeoPunchModel) {    
        //punch type 1 for IN 0 for Out
        return this.api.callGet('/ivmtTrans.dll/api/v52/ivmtTrans/geopunch',
            'emp_id=' + this.parms.EmpId + '&Punch_type=0&punch_date=' + punch.punch_date + '&punch_time=' + punch.punch_time + '&lat=' + punch.lat + '&lng=' + punch.lng + '&apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken)
    }

    SubmitManulaAdjustment(adj:SubmitAdjustmentModel)
    {
        return this.api.callGet('/ivmtTrans.dll/api/v52/ivmtTrans/requestpunch',
        'emp_id=' + this.parms.EmpId + '&Punch_type='+adj.Punch_type+'&punch_date=' + adj.punch_date + '&punch_time=' + adj.punch_time + '&reader_id='+adj.reader_id+'&reason_id='+adj.reason_id+'&apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken)
    }

    GetReaderList() {        
        return this.LoadParms().then((res) => {
            this.parms = JSON.parse(res) as ApiParameters;           
            return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getreaderlist',
                'apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken);
        });
        
    }

    GetReasonList() {        
        return this.LoadParms().then((res) => {
            this.parms = JSON.parse(res) as ApiParameters;           
            return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getreasonlist',
                'apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken + '&reason_type=punch');
        });
        
    }

    
  
    GetMapAPIKEY(empId:string,Apki:string,ApiToken:string) {     
        // return this.api.callGet('/ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/GetGMapAPIKey',
        //     'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey +"&token="+ this.parms.ApiToken);

        return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/GetGMapAPIKey',
        'emp_id=' +empId + '&apikey=' + Apki +"&token="+ ApiToken);
    }

}