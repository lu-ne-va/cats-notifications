import {Component, OnInit} from '@angular/core';
import {DataService} from "./app.data.service";
import {Http} from "@angular/http";

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

    constructor(private dataService: DataService, private http: Http) {

    }

    ngOnInit() {
        this.removed = null;
        this.notificationList = this.dataService.getData();
        if (Notification.permission != 'granted') {
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
    removed: number;

    assignId() {
        return this.notificationList.reduce((a, b) => a > b.id ? a : b.id, 0) + 1;
    }


    saveNewNotification(newNotification) {
        this.editableNotification = null;
        if (newNotification) {
            newNotification.id = this.assignId();
            this.notificationList.unshift(newNotification);
            this.updateData();
        }
    }

    deleteNotification(notification) {
        this.removed = notification.id;
        setTimeout(() => {
            let index = this.notificationList.indexOf(this.notificationList.find(elem => elem.id == notification.id));
            this.notificationList.splice(index, 1);
            this.removed = null;
            this.updateData();
        }, 400);
    }

    createNotification() {
        this.editableNotification = Object.assign({}, this.emptyNotification);
    }

    updateData() {
        this.dataService.updateData(this.notificationList);
    }

}
