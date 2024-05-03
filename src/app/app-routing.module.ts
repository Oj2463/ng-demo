import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './pages/main/todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './pages/main/todo/todo-detail/todo-detail.component';
import { AddTodoComponent } from './pages/main/todo/add-todo/add-todo.component';
import { UpdateTodoComponent } from './pages/main/todo/update-todo/update-todo.component';
import { UserListComponent } from './pages/main/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/main/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/main/user/user-edit/user-edit.component';
import { UserAddComponent } from './pages/main/user/user-add/user-add.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/main/home/home.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'dashboard', component: HomeComponent },

      {
        path: 'todos',
        children: [
          { path: '', component: TodoListComponent, pathMatch: 'full' },
          { path: 'add', component: AddTodoComponent },
          { path: 'edit/:id', component: UpdateTodoComponent },
          { path: 'detail/:id', component: TodoDetailComponent },
        ],
      },

      {
        path: 'user',
        children: [
          { path: '', component: UserListComponent, pathMatch: 'full' },
          { path: 'add', component: UserAddComponent },
          { path: 'edit/:id', component: UserEditComponent },
          { path: 'detail/:id', component: UserDetailComponent },
        ],
      },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
