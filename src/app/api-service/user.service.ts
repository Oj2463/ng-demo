import { Injectable } from '@angular/core';
import { RespGetUser } from './modals/RespGetUser';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  GetUser() {
    return this.http.get<RespGetUser[]>(`${this.API_URL}/users`);
  }

  GetUserById(id: string) {
    return this.http.get<RespGetUser>(`${this.API_URL}/users/${id}`);
  }

  createUser(data: RespGetUser) {
    const { id, ...rest } = data;
    return this.http.post(`${this.API_URL}/users`, rest);
  }

  updateUser(data: RespGetUser) {
    const { id, ...rest } = data;
    return this.http.patch(`${this.API_URL}/users/${id}`, rest);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/users/${id}`);
  }

  checkIfUsernameExists(username: string, id: string = '') {
    return this.http
      .get<RespGetUser[]>(
        `${this.API_URL}/users?username=${username}&id_ne=${id}`
      )
      .pipe(
        map((data) => {
          return data.length > 0;
        })
      );
  }

  loginUser(username: string, password: string) {
    return this.http.get<RespGetUser[]>(
      `${this.API_URL}/users?username=${username}&password=${password}`
    );
  }
}
