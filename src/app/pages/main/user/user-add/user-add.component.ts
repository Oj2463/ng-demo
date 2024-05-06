import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../api-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { RespGetUser } from '../../../../api-service/modals/RespGetUser';
import { catchError, map, Observable, of } from 'rxjs';
import { RoleService } from '../../../../api-service/role.service';
import { Role } from '../../../../api-service/modals/Role';

export function checkIfUsernameExists(idKey: string): AsyncValidatorFn {
  const userService = inject(UserService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control?.value;
    // const id = (control.parent as any)?.controls[idKey]?.value;
    return userService.checkIfUsernameExists(username || '').pipe(
      map((isExist) => {
        if (isExist) {
          return { checkIfUsernameExists: true };
        }
        return null;
      })
    );
  };
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private roleService = inject(RoleService);

  userList: RespGetUser[] = [];
  submitted = false;

  userformgroup = new FormGroup({
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
    role: new FormControl('', Validators.required),
  });

  roles = this.roleService.GetRole().pipe(catchError((x) => of([] as Role[])));

  ngOnInit() {
    this.GetUser();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userformgroup.controls;
  }

  onClickAdd() {
    this.submitted = true;
    if (!this.validateForm()) {
      return;
    }

    var data = this.userformgroup.value;
    this.userService.checkIfUsernameExists(data.username || '').subscribe({
      next: (isExist) => {
        if (!isExist) {
          this.userService
            .createUser({
              id: '',
              role: data.role || '',
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

  validateForm() {
    var { name, password, username, role } = this.userformgroup.value;

    if ((name || '').trim() == '') {
      return false;
    }

    if ((username || '').trim() == '') {
      return false;
    }

    if ((username || '').trim().length < 3) {
      return false;
    }

    if ((password || '').trim() == '') {
      return false;
    }
    if ((password || '').length < 6) {
      return false;
    }

    if ((role || '').trim() == '') {
      return false;
    }

    return true;
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
}
