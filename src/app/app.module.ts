import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatMenuModule, MatListModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HomeComponent } from './home/home.component';

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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
