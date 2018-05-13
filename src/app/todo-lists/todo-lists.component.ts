import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TodoList } from '../shared/todo-list.model';
import { Router } from '@angular/router';
import { Key } from 'protractor';

@Component({
  selector: 'osmi-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {
  constructor(private readonly router: Router) { }

  ngOnInit() {

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
      case 39:
        this.nextList();
        break;
      case 37:
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
