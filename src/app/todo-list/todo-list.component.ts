import { Component, OnInit, OnChanges, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Input } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { MatCheckboxChange, MatFormField, MatInput } from '@angular/material';
import { timer } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

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
  dueDate: Moment;

  @Output()
  updated = new EventEmitter<Todo>();

  @Output()
  deleted = new EventEmitter<Todo>();

  @ViewChildren('nameInput')
  nameInputs: QueryList<ElementRef>;

  constructor(private readonly todosService: TodosService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.name = this.todo.name;
    this.dueDate = moment(this.todo.dueDate);
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
    this.deleted.emit(this.todo);
  }

  editList(): void {
    this.isEditing = true;
  }

  updateList(): void {
    const updatedTodo: Todo = {
      ...this.todo,
      name: this.name,
      dueDate: this.dueDate.toString()
    };

    this.updated.emit(updatedTodo);
    this.isEditing = false;
  }

  changeDate(_moment: Moment) {
    this.dueDate = _moment;
  }
}
