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
        return this.api.callGet('/ivmtTrans.dll/api/v52/ivmtTrans/ChangePassword',
        'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&old_password='+OldPassword+'&new_password='+NewPassword+'&token=' + this.parms.ApiToken)
    }

    RegisterUser(UUID:string,EMPID:string,PASSWORD:string) {
        
        let tttt = 'emp_id=' + EMPID + '&access_type=0' + '&emp_pwd=' + PASSWORD + '&apikey=' + this.parms.ApiKey
        debugger;
        ///ivmtwebsdk/ea.dll/api/v52/emxauth2/RegisterDevice
        return this.api.callGet('/ea.dll/api/v52/emxauth2/RegisterDevice',
        'emp_id=' + EMPID + '&access_type=0'+'&emp_pwd='+PASSWORD+'&apikey=' + this.parms.ApiKey)
    }

    Login(EMPID:string,PASSWORD:string) {
        debugger;
        return this.api.callGet('/ea.dll/api/v52/emxauth2/gettoken',
        'emp_id=' + EMPID
        + '&emp_pwd=' + PASSWORD + '&uuid=1213&apikey=' + config.APIKEY + '&hash_ver=sha1')
    }

    GetRightAccess(empId:string,api_key:string,token:string) {      
       debugger;
        return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/GetAccessRightsStatus',
            'emp_id=' + empId + '&apikey=' + api_key + '&token=' + token)
    }


}