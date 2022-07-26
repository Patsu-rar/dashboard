import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UsersService} from "../../shared/services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'role'];
  dataSource: User[] = [];

  constructor(public userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.dataSource = res;
    });
  }
}
