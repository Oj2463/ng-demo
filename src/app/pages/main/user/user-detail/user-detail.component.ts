import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../api-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespGetUser } from '../../../../api-service/modals/RespGetUser';

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

  constructor() {}

  userList: RespGetUser | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.GetUserById(id);
  }

  GetUserById(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (resp) => {
        this.userList = resp;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }
}
