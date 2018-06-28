import {
  Component,
  OnInit,
} from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TodosService } from '../shared/todos.service';
import { MatDialog } from '@angular/material';
import {
  debounceTime
} from 'rxjs/operators';
import { EnterNameDialogComponent } from './enter-name-dialog/enter-name-dialog.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import * as fromTodoLists from './todo-lists.selectors';
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

  isListEmpty = false;

  children: Observable<Todo[]>;
  self: Todo;
  parent: Todo;

  selfName: string;
  private updatedSelfName = new Subject<string>();

  constructor(
    private readonly todosService: TodosService,
    private readonly dialog: MatDialog,
    private readonly toolbarService: ToolbarService,
    private readonly store: Store<AppState>) { }

  ngOnInit() {
    this.toolbarService.setTitle('Manage Lists');

    this.children = this.store.select(fromTodoLists.selectChildren);
    this.store.select(fromTodoLists.selectSelf).subscribe(x => {
      this.self = x;
      if (this.self) {
        this.selfName = this.self.name;
      }
    });
    this.store.select(fromTodoLists.selectParent).subscribe(x => this.parent = x);

    this.children.subscribe(x => {
      this.isListEmpty = !x || x.length === 0;
    });

    this.updatedSelfName.pipe(debounceTime(500)).subscribe(x => {
      const updatedTodo = {
        ...this.self,
        name: x
      };

      this.upsertTodo(updatedTodo);
    });
  }

  upsertTodo(todo: Todo): void {
    this.todosService.upsert(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todosService.delete(todo);
  }

  changeDate(_moment: Moment) {
    this.todosService.upsert({
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
      const newTodo: Todo = { name: dialogResult.name, parentId: this.self ? this.self._id : null };
      this.todosService.upsert(newTodo);
    });
  }

  copySelf(): void {
    if (!this.self) {
      return;
    }

    this.todosService.copy(this.self);
  }

  updateName(value: string): void {
    this.updatedSelfName.next(value);
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
