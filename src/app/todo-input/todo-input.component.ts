import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/app/shared/todo.model';
import * as chrono from 'chrono-node';

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

  constructor(private readonly todosService: TodosService) { }

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
    const chronoResult = chrono.parse(inputText);
    const chronoDateResult = chrono.parseDate(inputText);
    const chronoText = chronoResult[0].text as string;
    const chronoDate = chronoDateResult as Date;
    const newTodoName = inputText.replace(chronoText, '').trim();

    console.log(chronoDate, chronoResult);

    if (!inputText || inputText === '') {
      return;
    }

    const newTodo: Todo = {
      name: newTodoName,
      parentId: this.parentTodo ? this.parentTodo._id : null,
      dueDate: chronoDate.toUTCString()
    };
    this.todosService.upsert(newTodo);
  }
}
