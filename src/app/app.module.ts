import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HomeComponent } from './home/home.component';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppState } from 'src/app/app-state.model';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
