import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../api-service/todo.service';
import { RespGetTodo } from '../../api-service/modals/GetTodo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  get id() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      return Number(id) || 0;
    }
    return 0;
  }

  todo: RespGetTodo | null = null;
  // localTodo: RespGetTodo | null = null;

  ngOnInit() {
    let localTodo = JSON.parse(localStorage.getItem('todo') || 'null');

    if (!localTodo) {
      this.router.navigate(['/todos']);
      return;
    }

    this.todo = localTodo;
    // if (this.id > 0) {
    //   this.getTodoById(this.id);
    // } else {
    //   this.todo = null;
    //   this.router.navigate(['/todos']);
    // }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('todo');
  }

  getTodoById(id: number) {
    this.todoService.GetTodoById(id).subscribe({
      next: (resp) => {
        this.todo = resp;
        if (!this.todo) {
          this.router.navigate(['/todos']);
        }
      },
      error: () => {},
    });
  }
}
