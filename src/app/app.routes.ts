import { Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AddEditTodoComponent } from './todo/add-edit-todo/add-edit-todo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' }, 
  { path: 'todos', component: TodoListComponent }, 
  { path: 'add-todos', component: AddEditTodoComponent },
  { path: 'edit-todos/:id', component: AddEditTodoComponent },
  { path: '**', redirectTo: '/todos' }  
];
