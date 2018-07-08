import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/app/shared/todo.model';
import * as chrono from 'chrono-node';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state.model';
import { selectChildren } from '../todo-lists/todo-lists.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'osmi-todo-input',
  templateUrl: 'todo-input.component.html',
  styleUrls: ['todo-input.component.scss']
})

export class TodoInputComponent implements OnInit {
  @ViewChild('newList')
  todoInputControl: ElementRef;

  @Input()
  parentTodo: Todo;

  chronoDate: string;

  constructor(
    private readonly todosService: TodosService,
    private readonly store: Store<AppState>) { }

  ngOnInit() { }

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
    const inputText: string = this.todoInputControl.nativeElement.value;
    const chronoResult = chrono.parse(inputText) as Array<any>;
    const chronoDateResult = chrono.parseDate(inputText);
    let chronoText, chronoDate;
    if (chronoDateResult) {
      chronoText = chronoResult[0].text as string;
      chronoDate = chronoDateResult as Date;
    }

    const newTodoName = inputText.replace(chronoText, '').trim();

    if (!inputText || inputText === '') {
      return;
    }

    this.store.select(selectChildren).pipe(first()).subscribe(children => {
      const newTodo: Todo = {
        name: newTodoName,
        parentId: this.parentTodo ? this.parentTodo.id : null,
        dueDate: chronoDate ? moment(chronoDate).valueOf() : moment().utc().valueOf(),
        prio: children.length
      };
      this.todosService.upsert(newTodo);
    });
  }
}
