import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/app/shared/todo.model';

@Component({
  selector: 'osmi-todo-input',
  templateUrl: 'todo-input.component.html',
  styleUrls: ['todo-input.component.scss']
})

export class TodoInputComponent implements OnInit {
  @ViewChild('newList')
  newListInput: ElementRef;

  @Input()
  parentTodo: Todo;

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
    const newListName = this.newListInput.nativeElement.value;
    if (!newListName || newListName.trim() === '') {
      return;
    }

    const newTodo: Todo = { name: newListName, parentId: this.parentTodo ? this.parentTodo._id : null };
    this.todosService.upsert(newTodo);
  }
}
