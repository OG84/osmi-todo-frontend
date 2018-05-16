import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TodoList } from '../shared/todo-list.model';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { TodoListsService } from 'src/app/todo-lists/todo-lists.service';
import { Observable } from 'rxjs';

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

  todoLists: Observable<TodoList[]>;

  constructor(
    private readonly router: Router,
    private readonly todoListsService: TodoListsService) { }

  ngOnInit() {
    this.todoLists = this.todoListsService.getAll();
  }

  addNewList(): void {

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

  private createDummyLists(): TodoList[] {
    return [
      {
        id: '1',
        name: 'list 1'
      },
      {
        id: '2',
        name: 'list 2',
        todoLists: [
          {
            id: '11',
            name: 'list 1.1'
          },
          {
            id: '12',
            name: 'list 1.2',
            todoLists: [
              {
                id: '121',
                name: 'list 1.2.1'
              },
              {
                id: '122',
                name: 'list 1.2.2'
              }
            ]
          }
        ]
      },
      {
        id: '3',
        name: 'list 3'
      }
    ];
  }

}
