import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';
import { Router, RouterLink } from '@angular/router'; // To navigate to add/edit component
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  deleteTodo(id: number | undefined): void {
    if (id !== undefined) {  // Check if id is defined
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
    }
  }
  
  editTodo(id: number | undefined): void {
    if (id !== undefined) {  // Check if id is defined
      this.router.navigate([`/edit-todos/${id}`]); // Navigates to the edit component
    }
  }
  

  addTodo(): void {
    console.log("Hello AddToDo")
    this.router.navigate(['/add-todos']); // Navigates to the add component
  }
}
