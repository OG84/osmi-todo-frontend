import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { Observable } from 'rxjs';
import { TodosService } from '../shared/todos.service';
import { MatInput, MatDialog } from '@angular/material';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';

@Component({
  selector: 'osmi-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {
  readonly LEFT_ARROW = 37;
  readonly UP_ARROW = 38;
  readonly RIGHT_ARROW = 39;
  readonly DOWN_ARROW = 40;

  isAddNewListSelected = true;
  isKeyboardMode = false;

  @ViewChild('newList')
  newListInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly todosService: TodosService,
    private readonly dialog: MatDialog) { }

  ngOnInit() {

  }

  get todoLists(): Observable<Todo[]> {
    return this.todosService.todos;
  }

  addList(): void {
    const newListName = this.newListInput.nativeElement.value;

    if (!newListName || newListName.trim() === '') {
      return;
    }

    this.todosService.addTodo({ name: newListName });
    this.newListInput.nativeElement.value = '';
  }

  openAddListDialog(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent);
  }

  nextList(): void {
    this.router.navigate(['/lists', 2]);
  }

  previousList(): void {
    this.router.navigate(['/lists', 1]);
  }

  @HostListener('document:keyup', ['$event'])
  private keyUp(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case this.RIGHT_ARROW:
        this.nextList();
        break;
      case this.LEFT_ARROW:
        this.previousList();
        break;
    }
  }
}
