import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Output,
  HostListener,
  HostBinding
} from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Input } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { MatCheckboxChange, MatFormField, MatInput } from '@angular/material';
import { timer } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DropType } from '../todo-lists/todo-lists.actions';

@Component({
  selector: 'osmi-todo-list-item',
  templateUrl: 'todo-list-item.component.html',
  styleUrls: ['todo-list-item.component.scss']
})

export class TodoListItemComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  todo: Todo;
  isEditing = false;
  name: string;
  dueDate: Moment;
  isImportant = false;

  @Output()
  updated = new EventEmitter<Todo>();

  @Output()
  deleted = new EventEmitter<Todo>();

  @ViewChildren('nameInput')
  nameInputs: QueryList<ElementRef>;

  isDraggedBefore = false;
  isDraggedAfter = false;
  isDragging = false;

  constructor(
    private readonly todosService: TodosService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.name = this.todo.name;
    this.dueDate = moment(this.todo.dueDate);
    const dateIn24Hours = moment().add(24, 'h');
    this.isImportant = this.dueDate.isBefore(dateIn24Hours);
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
      dueDate: this.dueDate ? this.dueDate.valueOf() : moment().utc().valueOf()
    };

    this.updated.emit(updatedTodo);
    this.isEditing = false;
  }

  changeDate(_moment: Moment) {
    this.dueDate = _moment;
  }

  copy(): void {
    this.todosService.copy(this.todo);
  }

  cut(): void {
    this.todosService.cut(this.todo);
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event: DragEvent): void {
    event.dataTransfer.setData('todoId', this.todo.id);
    this.isDragging = true;
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const clientRect = target.getBoundingClientRect();
    const yTop = clientRect.top;
    const yCenter = clientRect.top + clientRect.height / 2;
    const yBottom = clientRect.top + clientRect.height;

    this.isDraggedBefore = false;
    this.isDraggedAfter = false;

    if (event.clientY >= yTop && event.clientY < yCenter) {
      this.isDraggedBefore = true;
      this.isDraggedAfter = false;
      event.preventDefault();
      return;
    }

    if (event.clientY >= yCenter && event.clientY < yBottom) {
      this.isDraggedBefore = false;
      this.isDraggedAfter = true;
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  drop(event: DragEvent): void {
    this.isDragging = false;

    if (!this.isDraggedAfter && !this.isDraggedBefore) {
      return;
    }

    event.preventDefault();
    const dragStartTodoId = event.dataTransfer.getData('todoId');
    this.todosService.drop(dragStartTodoId, this.todo, this.isDraggedAfter ? DropType.AFTER : DropType.BEFORE);

    this.isDraggedBefore = false;
    this.isDraggedAfter = false;
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(): void {
    this.isDraggedBefore = false;
    this.isDraggedAfter = false;
  }
}
