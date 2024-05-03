import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../api-service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespGetUser } from '../../../../api-service/modals/RespGetUser';
import { RoleService } from '../../../../api-service/role.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private roleService = inject(RoleService);

  userList: IUser[] = [];

  constructor() {}

  ngOnInit() {
    this.GetUser();
  }

  GetUser() {
    this.userList = [];
    this.userService.GetUser().subscribe({
      next: (resp) => {
        this.userList = resp;

        const obs = this.userList.map((x) =>
          this.roleService.GetRoleById(x.role)
        );

        forkJoin(obs).subscribe({
          next: (resp1) => {
            resp1.forEach((x, i) => {
              this.userList[i].RoleName = x.name;
            });
          },
        });
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

interface IUser extends RespGetUser {
  RoleName?: string;
}
