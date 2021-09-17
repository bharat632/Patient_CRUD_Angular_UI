import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  covidStatus=[
    "Positive",
    "Negative"
  ]
  constructor(private popoverController:PopoverController) { }

  ngOnInit() {
  }

  //getting status of patient
  getCovidStatus(status:string){
    console.log(status);
    this.popoverController.dismiss({
      "fromPopover":status
    });
  }

}
