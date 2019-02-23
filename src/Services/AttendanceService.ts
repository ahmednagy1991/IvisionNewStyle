import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { AttendanceModel } from '../models/AttendanceModel';
import { ApiParameters } from '../models/ApiParameters';
import { DateComponent } from '../models/DateComponent';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { AttendanceStatisticsModel } from '../models/AttendanceStatisticsModel';

@Injectable()
export class AttendanceService {
  parms: ApiParameters;
  AttendanceTab: AttendanceModel[];
  dateComp: DateComponent = { from: new Date(), to: new Date() };
  attSummary: AttendanceStatisticsModel = { absent: 0, absentWithDuity: 0, NoTT: 0, OffDays: 0, VacDays: 0, workedDays: 0, workedWithDelay: 0, workingDays: 0,absent_Per:0,workedDays_Per:0,absentWithDuity_Per:0,VacDays_Per:0,workedWithDelay_Per:0,NoTT_Per:0,OffDays_Per:0,workingDays_Per:0 };


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


  GetAttendance(FromDate: string, ToDate: string) {
    return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getattendance',
      'emp_id=' + this.parms.EmpId + '&ttid=123&&apikey=' + this.parms.ApiKey + '&start_date=' + FromDate + '&end_date=' + ToDate + '&fields=AT_DATE,AT_ROW_OUT_EARLY,AT_ROW_BEGIN_LATE,AT_ID,FROM_DATE_TIME,AT_CALC_BEGIN_LATE,TO_DATE_TIME,AT_TOTAL_ABSENT,AT_TOTAL_GAP,CT_TITLE,AT_TOTAL_DUTY_OVERTIME,AT_TOTAL_WORK,AT_CALC_STATUS,AT_ROW_ABSENT,AT_TOTAL_OVERTIME,AT_TOTAL_WORK_DURATION,AT_TOTAL_BREAK&sort=AT_DATE desc&token=' + this.parms.ApiToken)
  }

  GetTodayAttendance() {
    return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getattendance',
      'emp_id=' + this.parms.EmpId + '&ttid=123&apikey=' + this.parms.ApiKey + '&start_date=' + '2018-09-01' + '&end_date=' + '2018-09-16' + '&fields=AT_DATE,AT_ROW_OUT_EARLY,AT_ROW_BEGIN_LATE,AT_ID,FROM_DATE_TIME,AT_CALC_BEGIN_LATE,TO_DATE_TIME,AT_TOTAL_ABSENT,AT_TOTAL_GAP,CT_TITLE,AT_TOTAL_DUTY_OVERTIME,AT_TOTAL_WORK,AT_CALC_STATUS,AT_ROW_ABSENT,AT_TOTAL_OVERTIME,AT_TOTAL_WORK_DURATION,AT_TOTAL_BREAK&sort=AT_DATE desc&token=' + this.parms.ApiToken)
  }

  GetAttendancePunches(AttId: number) {
    return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getattendancepunches',
      'at_id=' + AttId + '&apikey=' + this.parms.ApiKey + '&sort=PUNCH_IN_DATE_TIME&token=' + this.parms.ApiToken)
  }


  GetAttendanceSummary(FromDate: string, ToDate: string) {
   
    return this.LoadParms().then((res) => {
      this.parms = JSON.parse(res) as ApiParameters;
      let temppp= 'emp_id=' + this.parms.EmpId + '&ttid=123&&apikey=' + this.parms.ApiKey + '&start_date=' + FromDate + '&end_date=' + ToDate + '&fields=AT_STATUS,AT_CALC_STATUS,AT_DAY_PUNCH_ENTRY,AT_TOTAL_ABSENT,AT_TOTAL_OVERTIME,AT_TOTAL_WORK,AT_ROW_ABSENT,AT_ROW_OVERTIME,AT_ROW_WORK,AT_TOTAL_BREAK,AT_TOTAL_DUTIES,AT_TOTAL_DUTY_OVERTIME,AT_TOTAL_EXCUSE,AT_TOTAL_WORK_DURATION,AT_ROW_BEGIN_LATE,AT_CALC_BEGIN_LATE,AT_ROW_OUT_EARLY,AT_TOTAL_OUT_EARLY,AT_TOTAL_GAP&sort=AT_DATE&token=' + this.parms.ApiToken;
      debugger;
      return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/getattendance',
        'emp_id=' + this.parms.EmpId + '&ttid=123&&apikey=' + this.parms.ApiKey + '&start_date=' + FromDate + '&end_date=' + ToDate + '&fields=AT_STATUS,AT_CALC_STATUS,AT_DAY_PUNCH_ENTRY,AT_TOTAL_ABSENT,AT_TOTAL_OVERTIME,AT_TOTAL_WORK,AT_ROW_ABSENT,AT_ROW_OVERTIME,AT_ROW_WORK,AT_TOTAL_BREAK,AT_TOTAL_DUTIES,AT_TOTAL_DUTY_OVERTIME,AT_TOTAL_EXCUSE,AT_TOTAL_WORK_DURATION,AT_ROW_BEGIN_LATE,AT_CALC_BEGIN_LATE,AT_ROW_OUT_EARLY,AT_TOTAL_OUT_EARLY,AT_TOTAL_GAP&sort=AT_DATE&token=' + this.parms.ApiToken)
        });
       
  
  }


}