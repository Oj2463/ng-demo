import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { TodoListComponent } from './pages/main/todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './pages/main/todo/todo-detail/todo-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './pages/main/todo/add-todo/add-todo.component';
import { UpdateTodoComponent } from './pages/main/todo/update-todo/update-todo.component';
import { UserListComponent } from './pages/main/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/main/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/main/user/user-edit/user-edit.component';
import { UserAddComponent } from './pages/main/user/user-add/user-add.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavbarComponent } from './layouts/home-layout/navbar/navbar.component';
import { HomeComponent } from './pages/main/home/home.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { TodoGridEditComponent } from './pages/main/todo/todo-grid-edit/todo-grid-edit.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginLayoutComponent,
    HomeLayoutComponent,

    TodoListComponent,
    TodoDetailComponent,
    AddTodoComponent,
    UpdateTodoComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserAddComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    TodoGridEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
