import { Component, OnInit } from '@angular/core';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './../popover/popover.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-patientstatus',
  templateUrl: './patientstatus.page.html',
  styleUrls: ['./patientstatus.page.scss'],
})
export class PatientstatusPage implements OnInit {

  pName
  pEmail
  pMobile
  pAge
  pCovidStatus

  tempEmail

  constructor(private popoverController: PopoverController , private sqlite : SQLite , private nativeStorage :NativeStorage) { }

  patientDetail=[];
  ngOnInit() {
    this.getEmail();
    this.getPatientDetail();
  }

  //get email of selected patient
  getEmail(){
    this.nativeStorage.getItem('email')
    .then(
    data => 
    this.tempEmail=data,
    error => console.error(error)
  );
  }

  //covid status popover
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component:PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss()
    .then((data:any)=>{

      console.log("Popover data" , data.data.fromPopover);
      this.pCovidStatus= data.data.fromPopover;
    });

    return  await popover.present();
  }

  //get Patient Detail
  getPatientDetail(){
    this.sqlite
    .create({
      name: "patientList.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(
        "SELECT * FROM patients " , []
      ).then(data => {
        console.log("data"+data)

        if(data.rows.length > 0){
          for(var i=0;i<data.rows.length ;i++){
            if( data.rows.item(i).email == this.tempEmail){
              console.log("match")
              this.pName= data.rows.item(i).name;
              this.pEmail = data.rows.item(i).email;
              this.pMobile= data.rows.item(i).mobile;
              this.pAge= data.rows.item(i).age;
              this.patientDetail.push({ name : data.rows.item(i).name, email: data.rows.item(i).email , mobile: data.rows.item(i).mobile , age: data.rows.item(i).age , covidStatus: data.rows.item(i).covidStatus , date: data.rows.item(i).date })
            }
          }
          console.log(this.patientDetail)
        }
        else{
          alert("There is no patient available .")
        }
      })
        .catch(e => {
          console.log(e);
          console.log("FAILED CREATE DB login:" + JSON.stringify(e));
        });
    })
  }


  //update patient data
  updatePatientData(){
    this.sqlite
    .create({
      name: "patientList.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(
        `UPDATE patients set name = '${this.pName}', email='${this.pEmail}' , mobile='${this.pMobile}' , age='${this.pAge}' , covidStatus='${this.pCovidStatus}' WHERE mobile =` +this.pMobile+`` , []
      ).then(data => {
        console.log("data"+data)
      })
        .catch(e => {
          console.log(e);
          console.log("FAILED CREATE DB login:" + JSON.stringify(e));
        });
    })
  }

  //back icon arrow button
  back(){
    window.history.back();
  }

}
