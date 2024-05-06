import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../api-service/user.service';
import { RespGetUser } from '../../../../api-service/modals/RespGetUser';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../../../api-service/role.service';
import { catchError, of } from 'rxjs';
import { Role } from '../../../../api-service/modals/Role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private roleService = inject(RoleService);

  id: string = '';
  name: string = '';
  username: string = '';
  password: string = '';
  role: string = '';

  roles = this.roleService.GetRole().pipe(catchError((x) => of([] as Role[])));

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.GetUserById(id);
  }

  GetUserById(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (resp) => {
        this.id = resp.id;
        this.name = resp.name;
        this.username = resp.username;
        this.password = resp.password;
        this.role = resp.role;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  onClickUpdate() {
    var dataobj: RespGetUser = {
      id: this.id,
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role,
    };
    this.userService.updateUser(dataobj).subscribe({
      next: (resp) => {
        this.toastr.success('Record Updated successfully');
        this.router.navigate(['/user']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
      },
    });
  }

  validateForm() {}
}
