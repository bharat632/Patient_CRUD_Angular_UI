import { Component, OnInit, PlatformRef } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.page.html',
  styleUrls: ['./patientlist.page.scss'],
})
export class PatientlistPage implements OnInit {
  allPatientList = [] ;
  constructor(private sqlite : SQLite , private platform : Platform , private route: Router , private nativeStorage : NativeStorage) {
    this.platform.ready().then(()=>{
      this.getDataFromDatabase();
    })
   }

  ngOnInit() {
  }

  //discharge/delete Patient
  dischargePatient(mobile){
    this.sqlite
    .create({
      name: "patientList.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(
        "DELETE FROM patients WHERE mobile = "+mobile+"" , []
      ).then(data => {
        console.log("data"+data)

        // if(data.rows.length > 0){
        //   for(var i=0;i<data.rows.length ;i++){
        //     if( data.rows.item(i).email == this.tempEmail){
        //       console.log("match")
        //       this.pName= data.rows.item(i).name;
        //       this.pEmail = data.rows.item(i).email;
        //       this.pMobile= data.rows.item(i).mobile;
        //       this.pAge= data.rows.item(i).age;
        //       this.patientDetail.push({ name : data.rows.item(i).name, email: data.rows.item(i).email , mobile: data.rows.item(i).mobile , age: data.rows.item(i).age , covidStatus: data.rows.item(i).covidStatus , date: data.rows.item(i).date })
        //     }
        //   }
        //   console.log(this.patientDetail)
        // }
        // else{
        //   alert("There is no patient available .")
        // }
      })
        .catch(e => {
          console.log(e);
          console.log("FAILED CREATE DB login:" + JSON.stringify(e));
        });
    })
  }

  //check status of patient
  patientStatus(email){
    console.log("email"+email);
    this.nativeStorage.setItem('email', email)
    .then(() => 
    this.route.navigate(["patientstatus"]),
    error => console.error('Error storing item', error)
  );
  }

  //fetch all data from database
  getDataFromDatabase(){

    this.sqlite
    .create({
      name: "patientList.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(
        "SELECT * FROM patients", []
      ).then(data => {
        console.log(data)

        if(data.rows.length > 0){
          for(var i=0;i<data.rows.length ;i++){
            this.allPatientList.push({ name : data.rows.item(i).name, email: data.rows.item(i).email , mobile: data.rows.item(i).mobile , age: data.rows.item(i).age , covidStatus: data.rows.item(i).covidStatus , date: data.rows.item(i).date })
          }
          console.log(this.allPatientList)
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
}
