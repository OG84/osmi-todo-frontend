import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoList } from '../shared/todo-list.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TodoListsService {
  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(`${environment.apiBasePath}todos`);
  }
}
