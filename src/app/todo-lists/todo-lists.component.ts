import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Key } from 'protractor';
import { Observable, EMPTY, Subject, of } from 'rxjs';
import { TodosService } from '../shared/todos.service';
import { MatInput, MatDialog } from '@angular/material';
import { filter, first, map, tap, switchMap } from 'rxjs/operators';
import { EnterNameDialogComponent } from './enter-name-dialog/enter-name-dialog.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { ListInputValueChanged } from '../shared/todos.actions';
import * as fromTodoLists from './todo-lists.selectors';
import * as moment from 'moment';
import { Moment } from 'moment';

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

  children: Observable<Todo[]>;
  self: Todo;
  parent: Todo;

  @ViewChild('newList')
  newListInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly todosService: TodosService,
    private readonly dialog: MatDialog,
    private readonly toolbarService: ToolbarService,
    private readonly store: Store<AppState>) { }

  ngOnInit() {
    this.toolbarService.setTitle('Manage Lists');

    this.children = this.store.select(fromTodoLists.selectChildren);
    this.store.select(fromTodoLists.selectSelf).subscribe(x => this.self = x);
    this.store.select(fromTodoLists.selectParent).subscribe(x => this.parent = x);

    this.children.subscribe(x => {
      this.isListEmpty = !x || x.length === 0;
    });
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

    const newTodo: Todo = { name: newListName, parentId: this.self ? this.self._id : null };
    console.log('upsert', newTodo);

    this.todosService.upsertTodo(newTodo);
  }

  upsertTodo(todo: Todo): void {
    console.log('upsert by event', todo);

    this.todosService.upsertTodo(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todosService.deleteTodo(todo);
  }

  changeDate(_moment: Moment) {
    this.todosService.upsertTodo({
      ...this.self,
      dueDate: _moment ? _moment.toString() : null
    });
  }

  openAddListDialog(): void {
    const dialogRef = this.dialog.open(EnterNameDialogComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.todosService.upsertTodo({ name: dialogResult.name });
    });
  }

  /*nextList(): void {
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
  }*/
}
