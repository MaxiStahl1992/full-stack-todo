import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITodo } from '@fst/shared/domain';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  getAllToDoItems(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`/api/todos`);
  }
  
  getToDoById(todoId: string): Observable<ITodo> {
    return this.http.get<ITodo>(`/api/todos/${todoId}`);
  } 

  createToDo(todoData: unknown): Observable<ITodo> {
    return this.http.post<ITodo>(`/api/todos`, todoData);
  }

  updateToDo(todoId: string, todoData: unknown): Observable<ITodo> {
    return this.http.patch<ITodo>(`/api/todos/${todoId}`, todoData);
  }

  createOrUpdateToDo(todoId: string, todoData: unknown): Observable<ITodo> {
    return this.http.put<ITodo>(`/api/todos/${todoId}`, todoData);
  }

  deleteToDo(todoId: string): Observable<never> {
    return this.http.delete<never>(`/api/todos/${todoId}`);
  }
}
