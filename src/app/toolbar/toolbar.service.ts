import { Injectable } from '@angular/core';
import { AppState } from '../app-state.model';
import { Store } from '@ngrx/store';
import * as fromToolbar from 'src/app/toolbar';
import { Observable } from 'rxjs';

@Injectable()
export class ToolbarService {
  constructor(private readonly store: Store<AppState>) { }

  setTitle(title: string): void {
    this.store.dispatch(new fromToolbar.SetTitle(title));
  }

  get title(): Observable<string> {
    return this.store.select(fromToolbar.selectToolbarTitle);
  }
}
