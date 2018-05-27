import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodosService } from '../../shared/todos.service';
import { MatInput, MatDialogRef } from '@angular/material';

@Component({
  selector: 'osmi-todo-add-list-dialog',
  templateUrl: 'add-list-dialog.component.html'
})

export class AddListDialogComponent implements OnInit {
  @ViewChild('newList')
  newListInput: ElementRef;

  constructor(
    private readonly todosService: TodosService,
    public dialogRef: MatDialogRef<AddListDialogComponent>
  ) { }

  ngOnInit() {

  }

  addList(): void {
    const newListName = this.newListInput.nativeElement.value;

    if (!newListName || newListName.trim() === '') {
      return;
    }

    this.todosService.addTodo({ name: newListName });
    this.dialogRef.close();
  }
}
