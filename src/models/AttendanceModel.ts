//import { DateTime } from "ionic-angular";
import { Datetime } from "@ionic/angular";

export class AttendanceModel {
    EMP_ID:string;
    AT_DATE:Datetime;
    AT_ID:number;
    AT_STATUS:number;
    AT_CALC_STATUS:number;
    AT_DAY_PUNCH_ENTRY:number;
    AT_TOTAL_ABSENT:number;
    AT_TOTAL_OVERTIME:number;
    AT_TOTAL_WORK:number;
    AT_ROW_ABSENT:null;   
    FROM_DATE_TIME:Datetime;
    AT_CALC_BEGIN_LATE:number;
    TO_DATE_TIME:Datetime;
    AT_TOTAL_GAP:number;
    AT_TOTAL_EXCUSE:number;
    AT_TOTAL_DUTIES:number;
    AT_TOTAL_WORK_DURATION:number;
    AT_TOTAL_DUTY_OVERTIME:number;
    AT_TOTAL_BREAK:number;
    AT_ROW_BEGIN_LATE:number;
    AT_ROW_OUT_EARLY:number;
    PUNCH_IN_DATE_TIME:Datetime; 
    float_AT_DATE:string;



}