import {Component, OnInit} from '@angular/core';
import {User} from "../shared/tables";
import {BackendService} from "../shared/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users!: User[];
  user!: User;
  constructor(
    private bs:BackendService,
    private route:ActivatedRoute,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.readAll();
  }

  trackByData(index: number, user: User): number {
    return user.id;
  }

  readAll(): void {
    this.bs.getAllUsers().subscribe(
      {
        next: (response) => {
          this.users = response;
          console.log(this.users);
          return this.users;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }
}
