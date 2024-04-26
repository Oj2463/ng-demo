import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    AddTodoComponent,
    UpdateTodoComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserAddComponent,
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
