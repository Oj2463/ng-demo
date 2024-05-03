import { Injectable } from '@angular/core';
import { RespGetUser } from './modals/RespGetUser';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Role } from './modals/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  GetRole() {
    return this.http.get<Role[]>(`${this.API_URL}/roles`);
  }

  GetRoleById(id: string) {
    return this.http.get<Role>(`${this.API_URL}/roles/${id}`);
  }
}
