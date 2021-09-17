import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addnewpatient',
  templateUrl: './addnewpatient.page.html',
  styleUrls: ['./addnewpatient.page.scss'],
})
export class AddnewpatientPage implements OnInit {

  pName='';
  pEmail='';
  pMobile='';
  pAge='';
  pcovidstatus = "";
  date
  msg='';

  constructor(private sqlite : SQLite , private route : Router , private toastController : ToastController) { }

  ngOnInit() {
    this.createDate()
  }

  //error toast message
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  //validation of data 
  validateUser(){
    if(this.pName != ''){
      if(this.pEmail != ''){
        if(this.pMobile != ''){
          if(this.pAge != ''){
            this.addPatientToDatabase();
          }else{
            this.msg= "Patient age can not be empty ."
            this.presentToast(this.msg);
          }
        }else{
          this.msg = "Patient mobile can not be empty ."
          this.presentToast(this.msg);
        }
      }else{
        this.msg = "Patient email can not be empty ."
        this.presentToast(this.msg);
      }
    }else{
      this.msg = "Patient name can not be empty ."
      this.presentToast(this.msg);
    }
  }

  //create database and save data of patient 
  addPatientToDatabase(){
    this.sqlite
      .create({
        name: "patientList.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db.executeSql(
          "CREATE TABLE IF NOT EXISTS patients (name varchar , email varchar , mobile varchar, age varchar , covidStatus varchar , date varchar )", []
        )
        db.executeSql(
          "INSERT INTO patients (name , email , mobile , age , covidStatus ,date ) VALUES (?,?,?,?,?,?)",
          [
            this.pName,
            this.pEmail,
            this.pMobile,
            this.pAge,
            this.pcovidstatus,
            this.date
          ]
        )
          .then(response => {
            this.route.navigate(["patientlist"]);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
        console.log("FAILED CREATE DB login:" + JSON.stringify(e));
      });

  }

  //create date
  createDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    month++;
    var year = date.getFullYear();
    var hr = date.getHours();
    var min = date.getMinutes();

    this.date = day+'/'+month+'/'+year+' '+hr+':'+min
    console.log(this.date);
  }

  //back header icon button
  back(){
    window.history.back();
  }

}
