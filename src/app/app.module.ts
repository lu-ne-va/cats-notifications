import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NotificationItem} from './notification/notification.component';
import {DataService} from "./app.data.service";
import {EditFormComponent} from './edit-form/edit-form.component';

import 'rxjs/add/operator/toPromise';

@NgModule({
    declarations: [
        AppComponent,
        NotificationItem,
        EditFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
