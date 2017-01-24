import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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


    savedCopyOfEditableNotification: iNotification;
    imageUrlIsCorrect: boolean;
    defaultImageUrl = 'http://lionsiteswebdesign.com/wp-content/uploads/2013/03/mail1.png';

    ngOnInit() {
        this.savedCopyOfEditableNotification = Object.assign({}, this.editableNotification);
        this.imageUrlIsCorrect = false;
    }

    cancelEditNotification() {
        if (this.editableNotification.id) {
            this.editableNotification.minutes = this.savedCopyOfEditableNotification.minutes;
            this.editableNotification.text = this.savedCopyOfEditableNotification.text;
            this.editableNotification.imageUrl = this.savedCopyOfEditableNotification.imageUrl;
        }
        this.savedCopyOfEditableNotification = null;
        this.onFinishEdit.emit(this.editableNotification.id ? this.editableNotification : null);
    }

    updateNotification(event) {
        event.preventDefault();
        if (this.editableNotification) {
            this.savedCopyOfEditableNotification = null;
            this.editableNotification.imageUrl = this.imageUrlIsCorrect
                ? this.editableNotification.imageUrl
                : this.defaultImageUrl;
            this.onFinishEdit.emit(this.editableNotification);

        }
    }

    changeImageStatus(newStatus) {
        this.imageUrlIsCorrect = newStatus;
    }

}
