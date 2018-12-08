import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
//import { Settings } from '../../../providers/settings/settings';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
import { User } from '../../../providers';
import { Api } from '../../../providers/api/api';
//import { MainPage } from '../';
import { Heplers } from '../../../providers/Helper/Helpers';
import { TokenModel } from '../../../models/TokenModel';
import { TimeTableModel } from '../../../models/TimeTableModel';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { ApiParameters } from '../../../models/ApiParameters';
import { AttendanceModel } from '../../../models/AttendanceModel';
import { PunchModel } from '../../../models//PunchModel';
import { TimeTableListModel } from '../../../models/TimeTableListModel';
import { AttendanceService } from '../../../Services/AttendanceService';
import { PunchesService } from '../../../Services/PunchesService';
import { TimeTableService } from '../../../Services/TimeTableService';
import { AttendanceStatisticsModel } from '../../../models/AttendanceStatisticsModel';
import { DecimalPipe } from '@angular/common';
import { HelperService } from '../../../Services/HelperService';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public radius       =    250;
    public stroke       =    "20" ;
    public semicircle   =    false;
    public rounded      =    true;
    public clockwise    =    false;
    public responsive   =    true;
    public duration     =    "800";
    public animation    =    'easeInOutQuart';

  
  account: { emp_id: string, emp_pwd: string, uuid: string, apikey: string, hash_ver: string } = {
    emp_id: "B00004",
    emp_pwd: "123",
    uuid: "1213",
    apikey: "8b50486998244ae4965678671206bbf3",
    hash_ver: "sha1"
  };

  CurrentTab: string = "TimeTable";
  Currentchart: string = "Present";
  Peroid: number = 29;
  TTableModel: TimeTableModel[];
  AttendanceTab: AttendanceModel[];
  PunchTable: PunchModel[];
  TTListModel: TimeTableListModel[];
  Employee: EmployeeModel;
  parms: ApiParameters;
  temp: TokenModel;
  attSummary: AttendanceStatisticsModel = { absent: 0, absentWithDuity: 0, NoTT: 0, OffDays: 0, VacDays: 0, workedDays: 0, workedWithDelay: 0, workingDays: 0, absent_Per: 0, workedDays_Per: 0, absentWithDuity_Per: 0, VacDays_Per: 0, workedWithDelay_Per: 0, NoTT_Per: 0, OffDays_Per: 0, workingDays_Per: 0 };;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  dashbrd: string;


  constructor(public splash: SplashScreen, public helpService: HelperService, public TTSerivce: TimeTableService, public punservice: PunchesService, public AttService: AttendanceService, public navCtrl: NavController, public Config: config,
    public storage: Storage,
    //public setStorage: Settings, 
    public helper: Heplers, public api: Api,
    // public navParams: NavParams
    //, public translateService: TranslateService
  ) {
    this.storage.get(this.Config.UserInformation).then(res => this.MapEmp(res));
    this.storage.get(this.Config.ConnectionParameter).then(res => this.MapApiParm(res));

    //this.Peroid = 0;
    this.CurrentTab = "TimeTable";
    //this.LoadDateFormat();

    this.ReloadChart();
    //this.splash.show();
    //this.renderChart();
  }
  MapPunchTable(res: any) {
    this.PunchTable = res.result as PunchModel[];
  }

  MapAttendanceTable(res: any) {
    debugger;
    this.AttendanceTab = res.result as AttendanceModel[];
  }

  MapApiParm(res: any) {

    this.parms = JSON.parse(res) as ApiParameters;
    this.GetTimeTable();
    this.GetAttendance();
    this.TodayPunches();
  }

  MapEmp(res: any) {
    this.Employee = JSON.parse(res).result as EmployeeModel;
  }

  MapTimeTable(res: any) {
    this.TTableModel = res.result as TimeTableModel[];

  }

  MapTTListTable(res: any) {
    this.TTListModel = res.result as TimeTableListModel[];

  }

  // LoadTTFormat() {
  //   this.helpService.GetDateFormat().subscribe((res) => {
  //     debugger;
  //   });
  // }

  // LoadDateFormat() {
  //   this.TTSerivce.GetDateFormat().subscribe((res) => {
  //     debugger;
  //   });
  // }


  GetTimeTable() {
    //+"emp_id=" + this.parms.EmpId + "&uuid=1213&apikey=" + this.parms.ApiKey + "&fields=EMP_NAME,EMP_ID,DEPT_NAME,DEPT_ID,ORG_NAME,DOJ,STATUS&token=" + this.parms.ApiToken
    // this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/gettimetable',
    //   'emp_id=' + this.parms.EmpId + '&&ttid=123&apikey=' + this.parms.ApiKey + '&fields=PG_TITLE,FROM_DATE_TIME,TO_DATE_TIME,TT_DATE&token=' + this.parms.ApiToken).subscribe(res => this.MapTimeTable(res));

    this.TTSerivce.GetTimeTableList(this.helper.getWeekStart(new Date()), this.helper.getWeekEnd(new Date())).subscribe(res => this.MapTTListTable(res));
  }

  GetAttendance() {
    //+"emp_id=" + this.parms.EmpId + "&uuid=1213&apikey=" + this.parms.ApiKey + "&fields=EMP_NAME,EMP_ID,DEPT_NAME,DEPT_ID,ORG_NAME,DOJ,STATUS&token=" + this.parms.ApiToken
    // this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getattendance',
    //   'emp_id=' + this.parms.EmpId + '&ttid=123&apikey=' + this.parms.ApiKey + '&start_date=2018-09-06 &end_date=2018-09-12&fields=AT_DATE,AT_TOTAL_ABSENT,AT_TOTAL_WORK,AT_CALC_STATUS,AT_ROW_ABSENT,AT_TOTAL_OVERTIME&sort=AT_DATE&token=' + this.parms.ApiToken).subscribe(res => this.MapAttendanceTable(res));

    this.AttService.GetAttendance(this.helper.getWeekStart(new Date()), this.helper.getWeekEnd(new Date())).subscribe(res => this.MapAttendanceTable(res));
  }

  TodayPunches() {

    this.punservice.GetPunches(this.helper.getWeekStart(new Date()), this.helper.getWeekEnd(new Date())).subscribe(res => this.MapPunchTable(res));
    //let ttt='ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getpunches'+'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&start_date=2018-09-06&end_date=2018-09-09&fields=PUNCH_DATETIME,PUNCH_TYPE,ENTRY_TYPE&sort=PUNCH_DATETIME&entry_type=0,3,2&token=' + this.parms.ApiToken;

    // this.api.callGet('ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/getpunches',
    //   'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&start_date=2018-08-01&end_date=2018-09-01&fields=PUNCH_DATETIME,PUNCH_TYPE,ENTRY_TYPE,READER_NAME&sort=PUNCH_DATETIME&entry_type=0,3,2&token=' + this.parms.ApiToken).subscribe(res => this.MapPunchTable(res));
  }


  ReloadChart() {
    debugger;
    this.attSummary = { absent: 0, absentWithDuity: 0, NoTT: 0, OffDays: 0, VacDays: 0, workedDays: 0, workedWithDelay: 0, workingDays: 0, absent_Per: 0, workedDays_Per: 0, absentWithDuity_Per: 0, VacDays_Per: 0, workedWithDelay_Per: 0, NoTT_Per: 0, OffDays_Per: 0, workingDays_Per: 0 };
    this.ionViewDidLoad();
  }

  refreshPunches() {
    //this.helper.showMessage("refresh","refresh");
  }
  renderChart() {
    this.dashbrd = "Reports";

    let options = {
      circumference: 15,
      rotation: 1.0 * Math.PI,
      percentageInnerCutout: 1,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 5
        }
      },
      layout: {
        padding: 0
      },
    }


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      options: options,
      data: {
        labels: ["Total Absence" + "(" + this.attSummary.absent + ")", "Total Delay" + "(" + this.attSummary.workedWithDelay + ")", "Total Leaves" + "(" + this.attSummary.VacDays + ")", "Total Working" + "(" + this.attSummary.workingDays + ")", "Worker Days" + "(" + this.attSummary.workedDays + ")", "Off Days" + "(" + this.attSummary.OffDays + ")", "No T.T" + "(" + this.attSummary.NoTT + ")"],
        datasets: [{
          label: '',
          data: [this.attSummary.absent_Per, this.attSummary.workedWithDelay_Per, this.attSummary.VacDays_Per, this.attSummary.workingDays_Per, this.attSummary.workedDays_Per, this.attSummary.OffDays_Per, this.attSummary.NoTT_Per],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(35, 142, 112, 1)',
            'rgba(195, 60, 43, 1)',
            'rgba(105, 200, 200, 1)',
            'rgba(99, 74, 80, 1)',
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#FF6383",
            "#FF6381",
          ]
        }]
      }

    });

  }
  ionViewDidLoad() {

    debugger;
    this.AttService.GetAttendanceSummary(this.helper.getLastDaysDate(this.Peroid), this.helper.GetCurrentDate()).then((res) => {
      // res.subscribe((ret)=>{
      //  // debugger;
      // });
      // this.SummaryModel = res.unsubscribe as AttendanceStatisticsModel;
      res.subscribe((ret) => {
        debugger;
        let obj = ret as any;
        let total_days = 0;

        obj.result.forEach(element => {
          total_days++;
          switch (element.AT_STATUS) {
            case 11:
              this.attSummary.OffDays++;
              break;
            case 1:
              this.attSummary.NoTT++;
              break;
            case 2:
              this.attSummary.workedDays++;
              break;
            case 5:
              this.attSummary.workedWithDelay++;
              break;
            case 6:
              this.attSummary.absent++;
              break;
            case 9:
              this.attSummary.VacDays++;
              break;
            case 12:
              this.attSummary.absentWithDuity++;
              break;
          }


        });
        this.attSummary.workingDays = total_days - (this.attSummary.VacDays + this.attSummary.OffDays);
        this.attSummary.workingDays_Per = (this.attSummary.workingDays / total_days) * 100;
        //this.attSummary.OffDays_Per = (this.attSummary.OffDays / total_days) * 100;
        this.attSummary.NoTT_Per = (this.attSummary.NoTT / total_days) * 100;
        this.attSummary.workedDays_Per = (this.attSummary.workedDays / total_days) * 100;
        this.attSummary.workedWithDelay_Per = (this.attSummary.workedWithDelay / total_days) * 100;
        this.attSummary.absent_Per = (this.attSummary.absent / total_days) * 100;
        this.attSummary.VacDays_Per = (this.attSummary.VacDays / total_days) * 100;
        this.attSummary.absentWithDuity_Per = (this.attSummary.absentWithDuity / total_days) * 100;
        this.renderChart();
      });


    });


    console.log('ionViewDidLoad DashboardPage');

  }

  TimeTablePage() {
    this.navCtrl.navigateRoot("TimeTablePage");
  }

  GeoPunchPage() {
    this.navCtrl.navigateRoot("PunchingPage");
  }


  ngOnInit() {
  }

getcenterStyle()
{
  return {  
    'text-align':'center'
  };
}
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(150%) ') + 'translateX(0%)';

    return {
      // 'top': isSemi ? 'auto' : '50%',
      // 'bottom': isSemi ? '5%' : 'auto',
      // 'left': '50%',
      // 'text-align': 'center',
      'transform': transform,
      // '-moz-transform': transform,
      // '-webkit-transform': transform,
      // 'font-size': this.radius / 7 + 'px'
      'text-align':'center'
    };
}


}
