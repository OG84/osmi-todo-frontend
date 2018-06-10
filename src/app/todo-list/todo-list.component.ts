import { Component, OnInit, OnChanges, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Input } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { MatCheckboxChange, MatFormField, MatInput } from '@angular/material';
import { timer } from 'rxjs';

@Component({
  selector: 'osmi-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss']
})

export class TodoListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  todo: Todo;
  isEditing = false;
  name: string;

  @ViewChildren('nameInput')
  nameInputs: QueryList<ElementRef>;

  constructor(private readonly todosService: TodosService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.name = this.todo.name;
  }

  ngAfterViewInit(): void {
    this.nameInputs.changes.subscribe(x => {
      if (!this.nameInputs.first) {
        return;
      }

      timer(100).subscribe(t => this.nameInputs.first.nativeElement.select());
    });
  }

  deleteList(): void {
    this.todosService.deleteTodo(this.todo._id);
  }

  editList(): void {
    this.isEditing = true;
  }

  updateList(): void {
    const updatedTodo: Todo = {
      ...this.todo,
      name: this.name
    };

    this.todosService.updateTodo(updatedTodo);
    this.isEditing = false;
  }

  select(checkboxChange: MatCheckboxChange): void {
    this.todosService.selectTodo(this.todo, checkboxChange.checked);
  }
}
