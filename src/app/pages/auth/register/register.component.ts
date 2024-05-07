import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../api-service/user.service';
import { RespGetUser } from '../../../api-service/modals/RespGetUser';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { checkIfUsernameExists } from '../../main/user/user-add/user-add.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  userList: RespGetUser[] = [];
  submitted = false;

  registerformgroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl(
      '',
      [Validators.required, Validators.minLength(3)],
      [checkIfUsernameExists('')]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit() {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerformgroup.controls;
  }

  OnClickRegister() {
    this.submitted = true;

    var data = this.registerformgroup.value;
    this.userService.checkIfUsernameExists(data.username || '').subscribe({
      next: (isExist) => {
        if (!isExist) {
          this.userService
            .createUser({
              id: 0,
              roleId: 3,
              name: data.name || '',
              password: data.password || '',
              username: data.username || '',
            })
            .subscribe({
              next: () => {
                this.toastr.success('Record created successfully');
                this.router.navigate(['/user']);
              },
              error: (err: HttpErrorResponse) => {
                this.toastr.error(
                  err?.error ?? 'Something went wrong',
                  'Error'
                );
              },
            });
        } else {
          this.toastr.error('Username already exists', 'Error');
        }
      },
    });
  }
}
