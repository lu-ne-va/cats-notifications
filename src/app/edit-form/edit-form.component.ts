import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface iNotification {
  minutes: number,
  text: string,
  imageUrl: string,
  id: number
}

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.less']
})
export class EditFormComponent implements OnInit {

  @Input() editableNotification: iNotification;
  @Output() onFinishEdit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  savedCopyOfEditableNotification: iNotification;

  ngOnInit() {
    this.savedCopyOfEditableNotification = Object.assign({}, this.editableNotification);
  }


  cancelEditNotification() {
    if(this.editableNotification.id){
      this.editableNotification.minutes = this.savedCopyOfEditableNotification.minutes;
      this.editableNotification.text = this.savedCopyOfEditableNotification.text;
      this.editableNotification.imageUrl = this.savedCopyOfEditableNotification.imageUrl;
    }
    this.savedCopyOfEditableNotification = null;
    this.onFinishEdit.emit(this.editableNotification);
  }

  updateNotification(event) {
    event.preventDefault();
    if (this.editableNotification) {
      this.savedCopyOfEditableNotification = null;
      this.onFinishEdit.emit(this.editableNotification);

    } else {
      // this.addNotificationToList();
    }

    // this.dataService.updateData(this.notificationList);
  }

}
