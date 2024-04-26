import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../api-service/user.service';
import { RespGetUser } from '../../api-service/modals/RespGetUser';
import { HttpErrorResponse } from '@angular/common/http';

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

  userList: RespGetUser | null = null;
  name: string = '';
  username: string = '';
  password: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.GetUserById(id);
  }

  GetUserById(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (resp) => {
        this.userList = resp;
        this.name = resp.name;
        this.username = resp.username;
        this.password = resp.password;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  onClickUpdate() {
    debugger;
    var dataobj = {
      name: this.name,
      username: this.username,
      password: this.password,
    };
    this.userService.updateUser(this.userList?.id || '', dataobj).subscribe({
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
