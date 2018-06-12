import { NgModule } from '@angular/core';
import { Routes, RouterModule, Params, RouterStateSnapshot } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HomeComponent } from './home/home.component';
import { RouterReducerState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    component: TodoListsComponent,
    path: 'lists'
  },
  {
    component: TodoListsComponent,
    path: 'lists/:todoId'
  },
  {
    path: '**',
    redirectTo: 'lists',
    pathMatch: 'full'
  }
];

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
  ],
  exports: [RouterModule],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class AppRoutingModule { }
