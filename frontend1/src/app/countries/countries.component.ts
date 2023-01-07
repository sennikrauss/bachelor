import {Component, OnInit} from '@angular/core';
import {Country} from "../shared/tables";
import {BackendService} from "../shared/backend.service";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "../authConfig";
import {Router} from "@angular/router";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit{
  country! : Country;
  countries!: Country[];
  constructor(
    private bs:BackendService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.readAll();
  }

  trackByData(index: number, country: Country): string {
    return country.code;
  }

  readAll(): void {
    this.bs.getAllCountries().subscribe(
      {
        next: (response) => {
          this.countries = response;
          console.log(this.countries);
          return this.countries;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  goToUser() {
    return this.router.navigateByUrl('users');
  }
}
