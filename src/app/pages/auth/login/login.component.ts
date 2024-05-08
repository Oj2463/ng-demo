import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../api-service/user.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../services/storage.service';
import { RespGetUser } from '../../../api-service/modals/RespGetUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private storage = inject(StorageService);
  submitted = false;

  loginform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.storage.LoggedUser.remove();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  onLogin() {
    this.submitted = true;
    if (!this.loginform.valid) {
      return;
    }

    var data = this.loginform.value;

    this.userService
      .loginUser(data.username || '', data.password || '')
      .subscribe({
        next: (resp) => {
          if (resp) {
            //console.log(resp);
            const respAsUser: RespGetUser = resp as RespGetUser;
            this.storage.LoggedUser.set(respAsUser);

            this.toastr.success('Login Successfull');
            this.router.navigate(['/users']);
          } else {
            this.toastr.error('Username or Password is Incorrect');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
        },
      });
  }
}
