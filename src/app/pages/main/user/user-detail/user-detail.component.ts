import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../api-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespGetUser } from '../../../../api-service/modals/RespGetUser';
import { RoleService } from '../../../../api-service/role.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private roleService = inject(RoleService);

  constructor() {}

  userList: IUser | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.GetUserById(id);
  }

  GetUserById(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (resp) => {
        this.userList = resp;
        if (this.userList) {
          this.roleService.GetRoleById(this.userList.role).subscribe({
            next: (resp1) => {
              this.userList!.RoleName = resp1.name;
            },
          });
        }
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
