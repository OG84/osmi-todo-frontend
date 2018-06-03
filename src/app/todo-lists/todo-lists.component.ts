import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { Observable } from 'rxjs';
import { TodosService } from '../shared/todos.service';
import { MatInput, MatDialog } from '@angular/material';
import { filter, first } from 'rxjs/operators';
import { EnterNameDialogComponent } from './enter-name-dialog/enter-name-dialog.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { ListInputValueChanged } from '../shared/todos.actions';

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
  isSelectionActive = false;
  isSingleSelectionActive = false;
  isListEmpty = false;

  @ViewChild('newList')
  newListInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly todosService: TodosService,
    private readonly dialog: MatDialog,
    private readonly toolbarService: ToolbarService,
    private readonly store: Store<AppState>) { }

  ngOnInit() {
    this.toolbarService.setTitle('Manage Lists');

    this.todos.subscribe(x => {
      this.isListEmpty = x.length === 0;
    });

    this.todosService.selectedTodos.subscribe(x => {
      this.isSelectionActive = x.length > 0;
      this.isSingleSelectionActive = x.length === 1;
    });
  }

  get todos(): Observable<Todo[]> {
    return this.todosService.todos;
  }

  get listInputValue(): Observable<string> {
    return this.todosService.listInputValue;
  }

  get isListInputShaking(): Observable<boolean> {
    return this.todosService.isListInputShaking;
  }

  updateListInputValue(value: string): void {
    this.todosService.updateListInputValue(value);
  }

  addList(): void {
    const newListName = this.newListInput.nativeElement.value;

    if (!newListName || newListName.trim() === '') {
      return;
    }

    this.todosService.addTodo({ name: newListName });
  }

  openAddListDialog(): void {
    const dialogRef = this.dialog.open(EnterNameDialogComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.todosService.addTodo({ name: dialogResult.name });
    });
  }

  deleteSelected(): void {
    this.todosService.selectedTodos.pipe(
      first()
    ).subscribe(x => x.forEach(todo => this.todosService.deleteTodo(todo._id)));
  }

  editSelected(): void {
    this.todosService.selectedTodos.pipe(
      first()
    ).subscribe(x => {
      if (x.length === 0) {
        return;
      }

      const selectedTodo = x[0];
      const dialogRef = this.dialog.open(EnterNameDialogComponent, { data: { name: selectedTodo.name } });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (!dialogResult) {
          return;
        }

        const updatedTodo: Todo = {
          _id: selectedTodo._id,
          isSelected: selectedTodo.isSelected,
          todos: selectedTodo.todos,
          name: dialogResult.name
        };
        this.todosService.updateTodo(updatedTodo);
      });
    });
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
