import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule, CustomSerializer } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatChipsModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSnackBarModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDatepickerModule,
  MatBottomSheetModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HomeComponent } from './home/home.component';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppState, initialAppState } from 'src/app/app-state.model';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { todosReducer } from './shared/todos.reducer';
import { TodosService } from './shared/todos.service';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './shared/todos.effects';
import { EnterNameDialogComponent } from './todo-lists/enter-name-dialog/enter-name-dialog.component';
import { toolbarReducer } from 'src/app/toolbar/toolbar.reducer';
import { ToolbarService } from './toolbar/toolbar.service';
import { todoListsReducer } from './todo-lists/todo-lists.reducer';
import { TodoListsEffects } from './todo-lists/todo-lists.effects';
import { RouterStateUrl } from './app-routing.module';
import { MomentPipe, MomentFromNowPipe } from './shared/moment.pipes';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ClipboardComponent } from 'src/app/clipboard/clipboard.component';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  todos: todosReducer,
  todoLists: todoListsReducer,
  toolbar: toolbarReducer
};
export const effects = [
  TodosEffects,
  TodoListsEffects
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    TodoListComponent,
    HomeComponent,
    EnterNameDialogComponent,
    MomentPipe,
    MomentFromNowPipe,
    ClipboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: initialAppState
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    HttpClientModule
  ],
  providers: [
    TodosService,
    ToolbarService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  entryComponents: [
    EnterNameDialogComponent,
    ClipboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
