import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {AppComponent} from "./app.component";
import {CountriesComponent} from "./countries/countries.component";

const routes: Routes = [
  {path: '',component: AppComponent},
  {path: 'users', component: UsersComponent},
  {path: 'countries', component: CountriesComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
