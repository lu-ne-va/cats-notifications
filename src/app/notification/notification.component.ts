import {Component, Input, Output, EventEmitter} from '@angular/core';

export interface iNotification {
    minutes: number,
    text: string,
    imageUrl: string,
    id: number
}

@Component({
    selector: 'notification-item',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less']
})
export class NotificationItem {

    @Input() item: iNotification;
    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    @Output() onListChanged: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    onInit() {
        this.isTurned = false;
        this.showEditableNotification = false;
    }


    timeTillNextNotification: Date;
    alertTime: Date;
    timer;//: number;
    isTurned: boolean;
    showEditableNotification: boolean;


    deleteNotification() {
        this.onDelete.emit(this.item);
    }

    editNotification() {
        this.isTurned = true;
        this.showEditableNotification = true;
    }

    finishEditNotification() {
        this.isTurned = false;
        setTimeout(() => {
            this.showEditableNotification = false;
        }, 1000);
        this.onListChanged.emit();
    }

    turnNotification() {
        this.isTurned = !this.isTurned;
    }


    askPermission() {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                let notification = new Notification("Now you have kittens in your life!", {icon: 'http://allaboutwindowsphone.com/images/appicons/242381.png'});
            }
        })
    }


    startTimer() {

        let startTime = Date.now();
        this.alertTime = new Date(startTime + this.item.minutes * 60000);
        this.timeTillNextNotification = new Date(this.alertTime.getTime() - startTime);

        this.timer = setInterval(() => {
            let currentTime = new Date();
            if (currentTime >= this.alertTime) {
                let notification = new Notification(this.item.text, {icon: this.item.imageUrl});
                this.alertTime = new Date(currentTime.getTime() + this.item.minutes * 60000);
            } else {
                this.timeTillNextNotification = new Date(this.alertTime.getTime() - currentTime.getTime());
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
        this.alertTime = null;
        this.timeTillNextNotification = null;
    }

    resetTimer() {
        this.stopTimer();
        this.startTimer();
    }

}
