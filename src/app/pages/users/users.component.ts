import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UsersService} from "../../shared/services/users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sub?: Subscription[];

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'role'];
  dataSource: User[] = [];

  constructor(public userService: UsersService) {
  }

  ngOnInit(): void {
    this.sub?.push(this.userService.getUsers().subscribe(res => {
      this.dataSource = res;
    }));
  }

  ngOnDestroy(): void {
    this.sub?.forEach(s => s.unsubscribe());
  }
}
