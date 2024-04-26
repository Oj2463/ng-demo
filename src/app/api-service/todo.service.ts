import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespGetTodo } from './modals/GetTodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  GetTodo() {
    return this.http.get<RespGetTodo[]>(`${this.API_URL}/todos`);
  }

  GetTodoById(id: string) {
    return this.http.get<RespGetTodo>(`${this.API_URL}/todos/${id}`);
  }

  createTodo(title: string, completed: boolean) {
    const data = { title, completed };
    return this.http.post(`${this.API_URL}/todos`, data);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.API_URL}/todos/${id}`);
  }

  updateTodo(id: string, title: string, completed: boolean) {
    const data = { title, completed };
    return this.http.patch(`${this.API_URL}/todos/${id}`, data);
  }
}
