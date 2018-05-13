import { Component, OnInit } from '@angular/core';
import { TodoList } from '../shared/todo-list.model';
import { Input } from '@angular/core';

@Component({
  selector: 'osmi-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss']
})

export class TodoListComponent implements OnInit {
  @Input()
  todoList: TodoList;

  constructor() { }

  ngOnInit() { }
}
