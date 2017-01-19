import { Injectable } from '@angular/core';
import {iNotification} from "./app.component";

@Injectable()
export class DataService {

    constructor() { }

    defaultData =[
      {
        minutes: 60,
        text: 'Perfect! You made a good job. Now go have some rest',
        imageUrl: 'http://ship.5dev.com/files/pages/gift280.png',
        id: 1,
        timeTillNextNotification: null,
        alertTime: null,
        timer: null
      }
    ];

    data: iNotification[];


    getData(): iNotification[] {
      if(!this.data){
        this.data = JSON.parse(localStorage.getItem( 'notification-data' ));

        if (!this.data) {
          localStorage.setItem( 'notification-data', JSON.stringify(this.defaultData));
          this.data = this.defaultData;
        }
      }

      return this.data;
    }

    updateData(newData) {
      localStorage.setItem( 'notification-data', JSON.stringify(newData));
    }

}
