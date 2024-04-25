import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../api-service/todo.service';
import { RespGetTodo } from '../../api-service/modals/GetTodo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  userList: RespGetTodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserById(1);
  }

  getUser() {
    this.userList = [];
    this.todoService.GetTodo().subscribe({
      next: (resp) => {
        this.userList = resp;
      },
      error: () => {},
    });
  }

  getUserById(id: number) {
    this.todoService.GetTodoById(id).subscribe({
      next: (resp) => {
        console.log(id);
      },
      error: () => {},
    });
  }
}
