import {Component} from '@angular/core';
import {UserInfo} from "../shared/tables";
import {Router} from "@angular/router";
import {GoogleApiService} from "../google-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userInfo?: UserInfo;

  constructor(private readonly google: GoogleApiService, private router: Router) {
    google.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }

  logout() {
    this.google.signOut();
  }

  redirectToCountries() {
    return this.router.navigateByUrl('countries');
  }

}
