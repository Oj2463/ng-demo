import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../api-service/todo.service';
import { RespGetTodo } from '../../api-service/modals/GetTodo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  userList: RespGetTodo[] = [];

  private router = inject(Router);
  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.getUser();
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

  onClickDetail(item: RespGetTodo) {
    localStorage.setItem('todo', JSON.stringify(item));
    this.router.navigate(['/todos', item.id, 'detail']);
  }
}
