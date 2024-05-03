import { Component, inject, OnInit } from '@angular/core';
import { RespGetTodo } from '../../../../api-service/modals/GetTodo';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../../../api-service/todo.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  private router = inject(Router);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);

  todo: RespGetTodo | null = null;

  ngOnInit() {}

  title: string = '';
  completed: boolean = false;

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.todoService.createTodo(this.title, this.completed).subscribe({
      next: () => {
        this.toastr.success('Record created successfully');
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
