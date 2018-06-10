import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { TodosService } from '../../shared/todos.service';
import { MatInput, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'osmi-todo-enter-name-dialog',
  templateUrl: 'enter-name-dialog.component.html',
  styleUrls: ['enter-name-dialog.component.scss']
})

export class EnterNameDialogComponent implements OnInit {
  todoName: string;

  constructor(
    private readonly todosService: TodosService,
    private dialogRef: MatDialogRef<EnterNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data && this.data.name) {
      this.todoName = this.data.name;
    }
  }

  ok(): void {
    if (!this.todoName || this.todoName.trim() === '') {
      return;
    }

    this.dialogRef.close({ name: this.todoName });
  }
}
