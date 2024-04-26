import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../api-service/todo.service';
import { RespGetTodo } from '../../api-service/modals/GetTodo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  private router = inject(Router);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getTodo();
    //this.getUserById(1);
  }
  todoList: RespGetTodo[] = [];

  getTodo() {
    this.todoList = [];
    this.todoService.GetTodo().subscribe({
      next: (resp) => {
        this.todoList = resp;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  onClickDetail(item: RespGetTodo) {
    this.router.navigate(['/todos', 'detail', item.id]);
  }

  onClickUpdate(item: RespGetTodo) {
    this.router.navigate(['/todos', 'edit', item.id]);
  }

  onClickDelete(item: RespGetTodo) {
    this.todoService.deleteTodo(item.id).subscribe({
      next: (resp) => {
        this.toastr.success('Record deleted successfully');
        this.getTodo();
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }
}
