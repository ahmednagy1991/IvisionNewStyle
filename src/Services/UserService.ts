import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { ApiParameters } from '../models/ApiParameters';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserService {
    parms: ApiParameters;
  

    constructor(public Config: config, public api: Api, public storage: Storage) {
        this.storage.get(this.Config.ConnectionParameter).then(res=>this.MapApiParm(res));  
        this.LoadParms();
    }

    LoadParms(): Promise<string> {
        return this.storage.ready().then(() => this.storage.get(this.Config.ConnectionParameter));
    }

    MapApiParm(res: any) {
        this.parms = JSON.parse(res) as ApiParameters;        
    }

    ChangePassword(OldPassword:string,NewPassword:string) {
        debugger;
        return this.api.callGet('ivmtwebsdk/ivmtTrans.dll/api/v52/ivmtTrans/ChangePassword',
        'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&old_password='+OldPassword+'&new_password='+NewPassword+'&token=' + this.parms.ApiToken)
    }

   


}