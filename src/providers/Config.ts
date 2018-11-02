import { Injectable } from '@angular/core';


@Injectable()
export class config {
    public MainURL_Key:string;
    public Username_Key: string;
    public Password_Key: string;
    public UUID_Key: string;
    public ConnectionParameter:string="ConnPar";
    public UserInformation:string="UserInf";
    static CurrentUsername:string="";
    static CurrentPassword:string="";
    public CurrentEmpID: string;
    public APIToken: string="Token";
    //static APIKEY:"8b50486998244ae4965678671206bbf3";
    static APIKEY:string="8b50486998244ae4965678671206bbf3";
    public EmployeeName_Key:string;
    public EmployeeDepartment_Key:string;
    public EmployeeOrganization_Key:string;
    static EmpID:string;
    static MainURLValue:string="";

    //Settings: Array<string> = [this.MainURL_Key, this.Username_Key, this.Password_Key];

    constructor() {
        // this.Settings.forEach(element => {
        //     this.file.checkFile(this.file.dataDirectory, element).then(_ => this.file.createFile(this.file.dataDirectory, element, true));
        // });
        this.MainURL_Key = "MainURl";
        this.Username_Key = "Username";
        this.Password_Key = "Password";
        this.UUID_Key = "UUDI";
        //this.EmpID="";
        
        this.CurrentEmpID = "";
       // this.APIToken= "";
        //this.APIKEY="8b50486998244ae4965678671206bbf3";
        this.EmployeeName_Key="EmpName";
        this.EmployeeDepartment_Key="EmpDep";
        this.EmployeeOrganization_Key="EmpOrg";

    }

    // GetSetting(SettingKey: string) {
    //     return this.file.readAsText(this.file.dataDirectory, SettingKey);
    // }

    // SetSetting(SettingKey: string,Value:string) {
    //     return this.file.writeFile(this.file.dataDirectory,SettingKey, Value);
    // }


}