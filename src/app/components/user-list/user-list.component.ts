import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../api-service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespGetUser } from '../../api-service/modals/RespGetUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  userList: RespGetUser[] = [];

  constructor() {}

  ngOnInit() {
    this.GetUser();
  }

  GetUser() {
    this.userList = [];
    this.userService.GetUser().subscribe({
      next: (resp) => {
        this.userList = resp;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  onClickDelete(item: RespGetUser) {
    this.userService.deleteUser(item.id).subscribe({
      next: (resp) => {
        this.toastr.success('User Deleted', 'Success');
        this.GetUser();
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }
}
