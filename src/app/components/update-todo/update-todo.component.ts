import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespGetTodo } from '../../api-service/modals/GetTodo';
import { TodoService } from '../../api-service/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
})
export class UpdateTodoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private todoService = inject(TodoService);

  todo: RespGetTodo | null = null;

  title: string = '';
  completed: boolean = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTodoById(id);
  }

  getTodoById(id: string) {
    this.todoService.GetTodoById(id).subscribe({
      next: (resp) => {
        this.todo = resp;
        this.title = this.todo?.title;
        this.completed = this.todo?.completed;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
        this.router.navigateByUrl('/todos');
      },
    });
  }

  onClickUpdate($event: MouseEvent) {
    const el = $event.target as HTMLButtonElement;

    if (!this.validateForm()) {
      return;
    }

    this.todoService
      .updateTodo(this.todo?.id || '', this.title, this.completed)
      .subscribe({
        next: (resp) => {
          this.toastr.success('Record Updated successfully');
          this.router.navigate(['/todos']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
        },
      });
  }

  validateForm() {
    if (this.title.trim() == '') {
      this.toastr.warning('Title is required', 'Invalid');
      return false;
    }

    return true;
  }
}
