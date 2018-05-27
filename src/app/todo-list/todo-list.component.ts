import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Input } from '@angular/core';
import { TodosService } from '../shared/todos.service';

@Component({
  selector: 'osmi-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss']
})

export class TodoListComponent implements OnInit {
  @Input()
  todo: Todo;

  constructor(private readonly todosService: TodosService) { }

  ngOnInit() { }

  deleteList(): void {
    this.todosService.deleteTodo(this.todo.id);
  }
}
