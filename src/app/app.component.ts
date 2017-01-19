import {Component, OnInit} from '@angular/core';
import {DataService} from "./app.data.service";

export interface iNotification {
  minutes: number,
  text: string,
  imageUrl: string,
  id: number,
  timeTillNextNotification: Date,
  alertTime: Date,
  timer: number
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
  }

  emptyNotification: iNotification = {
    minutes: 0,
    text: '',
    imageUrl: '',
    id: 0,
    timeTillNextNotification: null,
    alertTime: null,
    timer: null
  };

  editableNotification: iNotification;
  savedCopyOfEditableNotification: iNotification;
  notificationList: iNotification[];

  addNotificationToList() {
    this.editableNotification.id = this.notificationList.reduce((a, b) => a > b.id ? a : b.id, 0) + 1;
    this.notificationList.push(this.editableNotification);
    this.savedCopyOfEditableNotification = null;
    this.editableNotification = null;
  }

  editNotification(id) {
    this.editableNotification = this.notificationList.find(elem => elem.id == id);
    this.savedCopyOfEditableNotification = Object.assign({}, this.editableNotification);
  }

  cancelEditNotification() {

    if (this.editableNotification.id) {
      this.editableNotification.minutes = this.savedCopyOfEditableNotification.minutes;
      this.editableNotification.text = this.savedCopyOfEditableNotification.text;
      this.editableNotification.imageUrl = this.savedCopyOfEditableNotification.imageUrl;
    }

    this.editableNotification = null;
    this.savedCopyOfEditableNotification = null;

  }

  updateNotification(event, id) {
    event.preventDefault();
    if (id) {
      this.savedCopyOfEditableNotification = null;
      this.editableNotification = null;

    } else {
      this.addNotificationToList();
    }

    this.dataService.updateData(this.notificationList);
  }

  deleteNotification(id) {
    let index = this.notificationList.indexOf(this.notificationList.find(elem => elem.id == id));
    this.notificationList.splice(index, 1);
    this.dataService.updateData(this.notificationList);
  }

  createNotification() {
    this.editableNotification = Object.assign({}, this.emptyNotification);
  }

  startTimer(id){
    this.runTimer(this.notificationList.find(elem => elem.id == id));

  }

  runTimer(elem) {

    let startTime = new Date();
    elem.alertTime = new Date(new Date().setMinutes(startTime.getMinutes() + elem.minutes));
    elem.timeTillNextNotification = new Date(elem.alertTime.getTime() - startTime.getTime());

    elem.timer = setInterval(() => {
      let currentTime = new Date();
      if (currentTime >= elem.alertTime) {
        let notification = new Notification(elem.text, {icon: elem.imageUrl});
        elem.alertTime = new Date(new Date().setMinutes(currentTime.getMinutes() + elem.minutes));
      } else {
        elem.timeTillNextNotification = new Date(elem.alertTime.getTime() - currentTime.getTime());
      }

    }, 1000);


  }

  stopTimer(id){
    let elem = this.notificationList.find(elem => elem.id == id);
    clearInterval(elem.timer);
    elem.timer = null;
    elem.alertTime = null;
    elem.timeTillNextNotification = null;
  }

  resetTimer(id){
    this.stopTimer(id);
    this.startTimer(id);


  }


}
