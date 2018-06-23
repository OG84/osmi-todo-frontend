import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/shared/todo.model';
import { flatMap, map, withLatestFrom } from 'rxjs/operators';
import { ClipboardAction, ClipboardActionType } from '../shared/todos.actions';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'osmi-clipboard',
  templateUrl: 'clipboard.component.html',
  styleUrls: ['clipboard.component.scss']
})

export class ClipboardComponent implements OnInit {
  clipboard: Observable<ClipboardAction[]>;

  constructor(
    private readonly todosService: TodosService,
    private readonly bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.clipboard = this.todosService.clipboard;
  }

  pasteCopy(action: ClipboardAction): void {
    const pasteCopyAction: ClipboardAction = {
      ...action,
      type: ClipboardActionType.COPY
    };
    this.todosService.paste(pasteCopyAction);
  }

  pasteCut(action: ClipboardAction): void {
    const pasteCutAction: ClipboardAction = {
      ...action,
      type: ClipboardActionType.CUT
    };
    this.todosService.paste(pasteCutAction);
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
