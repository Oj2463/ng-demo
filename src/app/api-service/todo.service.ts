import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespGetTodo } from './modals/GetTodo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  GetTodo() {
    return this.http.get<RespGetTodo[]>(`${this.API_URL}/todos`);
  }

  GetTodoById(id: number) {
    return this.http.get<RespGetTodo>(`${this.API_URL}/todos/${id}`);
  }
}
