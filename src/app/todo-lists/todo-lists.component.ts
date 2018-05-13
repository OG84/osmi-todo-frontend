import { Component, OnInit, Input } from '@angular/core';
import { TodoList } from '../shared/todo-list.model';

@Component({
  selector: 'osmi-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {

  @Input()
  isEditable = true;
  todoLists: TodoList[];
  isAdding = false;

  constructor() { }

  ngOnInit() {
    this.todoLists = this.createDummyLists();
  }

  addNewList(): void {
    this.isAdding = true;

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
