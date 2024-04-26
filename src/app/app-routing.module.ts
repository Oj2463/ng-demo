import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddComponent } from './components/user-add/user-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/add', component: AddTodoComponent },
  { path: 'todos/edit/:id', component: UpdateTodoComponent },
  { path: 'todos/detail/:id', component: TodoDetailComponent },

  { path: 'user', component: UserListComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '/user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
