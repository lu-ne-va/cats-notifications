import {Component, OnInit} from '@angular/core';
import {DataService} from "./app.data.service";

export interface iNotification {
  minutes: number,
  text: string,
  imageUrl: string,
  id: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.notificationList = this.dataService.getData();
    if (Notification.permission != 'granted'){
      this.askPermission();
    }
  }

  askPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        let notification = new Notification("Now you have kittens in your life!", {icon: 'http://allaboutwindowsphone.com/images/appicons/242381.png'});
      }
    })
  }

  emptyNotification: iNotification = {
    minutes: 0,
    text: '',
    imageUrl: '',
    id: 0
  };

  editableNotification: iNotification;
  notificationList: iNotification[];

  addNotificationToList(newNotification) {
    newNotification.id = this.notificationList.reduce((a, b) => a > b.id ? a : b.id, 0) + 1;
    this.notificationList.unshift(newNotification);
    this.editableNotification = null;
  }


  saveNewNotification(newNotification) {
    this.addNotificationToList(newNotification);
    this.updateData();
  }

  deleteNotification(notification) {
    let index = this.notificationList.indexOf(this.notificationList.find(elem => elem.id == notification.id));
    this.notificationList.splice(index, 1);
    this.updateData();
  }

  createNotification() {
    this.editableNotification = Object.assign({}, this.emptyNotification);
  }

  updateData(){
    this.dataService.updateData(this.notificationList);
  }

}
