import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AttendanceModel } from '../../../models/AttendanceModel';
import { DateComponent } from '../../../models/DateComponent';
import { AttendanceService } from '../../../Services/AttendanceService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { AttendancePunches } from '../../../models/AttendancePunches';
import { AttendanceTotalsModel } from '../../../models/AttendanceTotalsModel';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  CurrentTab: string = "Attendance";
  AttendanceTab: AttendanceModel[];
  Attendancepunchtab: AttendancePunches;
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  Totals: AttendanceTotalsModel = {
    RegHoursTotal: 0,
    WorkHoursTotal: 0,
    AbsentTotal: 0,
    OTTotal: 0,
    DutiesOTTotal: 0,
    BreakTotal: 0,
    DuitesTotal: 0,
    ExecusesTotal: 0,
    BeginLateTotal: 0,
    OutEarlyTotal: 0,
    GapTotal: 0
  };



  constructor(public helper: Heplers, public AttService: AttendanceService, public navCtrl: NavController) {

  }

  MapAttendanceTable(res: any) {
    //debugger;
    if (res.code == 0) {
      this.AttendanceTab = res.result as AttendanceModel[];
      this.AttendanceTab.forEach((value) => {
        debugger;
        //this.Totals.RegHoursTotal += (value.AT_TOTAL_WORK_DURATION !== null) ? value.AT_TOTAL_WORK_DURATION : 0;
        this.Totals.RegHoursTotal += this.chechNull(value.AT_TOTAL_WORK_DURATION);
        this.Totals.WorkHoursTotal += this.chechNull(value.AT_TOTAL_WORK);
        this.Totals.AbsentTotal += this.chechNull(value.AT_TOTAL_ABSENT);
        this.Totals.OTTotal += this.chechNull(value.AT_TOTAL_OVERTIME);
        this.Totals.DutiesOTTotal += this.chechNull(value.AT_TOTAL_DUTY_OVERTIME);
        this.Totals.BreakTotal += this.chechNull(value.AT_TOTAL_BREAK);
        this.Totals.ExecusesTotal += this.chechNull(value.AT_TOTAL_EXCUSE);
        this.Totals.BeginLateTotal += this.chechNull(value.AT_ROW_BEGIN_LATE);
        this.Totals.OutEarlyTotal += this.chechNull(value.AT_ROW_OUT_EARLY);
        this.Totals.GapTotal += this.chechNull(value.AT_TOTAL_GAP);
      });
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }


  }

  chechNull(value: any) {
    debugger;
    if (value == null || value == "null" || value == undefined || value == "undefined") {
      return 0;
    }
    return value;
  }

  GetAttendance() {
    this.AttService.GetAttendance(this.dateComp.from.toString(), this.dateComp.to.toString()).subscribe(res => this.MapAttendanceTable(res));
  }

  GetAttendancePunch(attId: number) {
    this.AttService.GetAttendancePunches(attId).subscribe(res => this.Attendancepunchtab = res as AttendancePunches);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
  }

  AttendanceDetails() {
    this.navCtrl.navigateRoot("AttendanceDetailsPage");
  }


  ngOnInit() {
  }

}
