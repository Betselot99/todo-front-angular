import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../Todo';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css'],
})
export class AddEditTodoComponent implements OnInit {
  todoForm!: FormGroup;
  todoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Check if we are editing an existing todo
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.todoId = +id;
        this.todoService.getTodoById(this.todoId).subscribe((todo) => {
          this.todoForm.patchValue(todo);
        });
      }
    });
  }

  saveTodo(): void {
    const todo: Todo = this.todoForm.value;
    if (this.todoId) {
      // Editing an existing todo
      this.todoService.updateTodo(this.todoId, todo).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      // Adding a new todo
      this.todoService.addTodo(todo).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
