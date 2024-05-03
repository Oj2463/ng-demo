import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../../../api-service/todo.service';
import { RespGetTodo } from '../../../../api-service/modals/GetTodo';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private todoService = inject(TodoService);

  todo: RespGetTodo | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTodoById(id);
  }

  getTodoById(id: string) {
    this.todoService.GetTodoById(id).subscribe({
      next: (resp) => {
        this.todo = resp;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
        this.router.navigateByUrl('/todos');
      },
    });
  }
}
