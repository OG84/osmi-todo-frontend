import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
