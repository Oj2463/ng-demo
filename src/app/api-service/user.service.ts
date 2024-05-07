import { Injectable } from '@angular/core';
import { RespGetUser } from './modals/RespGetUser';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = environment.CrudApi;

  constructor(private http: HttpClient) {}

  GetUser() {
    return this.http.get<RespGetUser[]>(`${this.API_URL}/Users`);
  }

  GetUserById(id: number) {
    return this.http.get<RespGetUser>(`${this.API_URL}/Users/${id}`);
  }

  createUser(data: RespGetUser) {
    const { id, ...rest } = data;
    return this.http.post(`${this.API_URL}/Users/0`, rest);
  }

  updateUser(data: RespGetUser) {
    const { id, ...rest } = data;
    return this.http.post(`${this.API_URL}/Users/${id}`, rest);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/Users/${id}`);
  }

  checkIfUsernameExists(username: string, id?: number) {
    return this.http
      .get<RespGetUser[]>(
        `${this.API_URL}/Users/UserExists/${username}?id=${id}`
      )
      .pipe(
        map((data) => {
          return data.length > 0;
        })
      );
  }

  loginUser(username: string, password: string) {
    return this.http.get<RespGetUser[]>(
      `${this.API_URL}/Users/username=${username}&password=${password}`
    );
  }
}
