import {Component, OnInit} from '@angular/core';
import {Country} from "../shared/tables";
import {BackendService} from "../shared/backend.service";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit{
  country! : Country;
  countries!: Country[];
  constructor(private bs:BackendService) {
  }
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

}
