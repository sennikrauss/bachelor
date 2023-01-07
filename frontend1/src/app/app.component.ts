import { Component } from '@angular/core';
import {GoogleApiService} from "./google-api.service";
import {UserInfo} from "./shared/tables";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

}
