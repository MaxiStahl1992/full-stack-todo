import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '@fst/shared/domain';

@Injectable()
export class ServerFeatureTodoService {
    private todos$$ = new BehaviorSubject<ITodo[]>([
        {
            id: 'test',
            title: 'Create more todos',
            description: 'One One One',
            completed: false,
        }
    ]);

    getAll(): ITodo[] {
        return this.todos$$.value;
    }

    getOne(id: string): ITodo {
        const todo = this.todos$$.value.find(td => td.id === id);
        if(!todo) {
            throw new NotFoundException('Todo was not found!')
        }
        return todo;
    }

    create(todo: Pick<ITodo, 'title' | 'description'>): ITodo {
        const current = this.todos$$.value;
        const newTodo: ITodo = {
            ...todo,
            id: `todo-${Math.floor(Math.random() * 10000)}`,
            completed: false,
        }
        this.todos$$.next([...current, newTodo])
        return newTodo;
    }

    update(id: string, data: Partial<Omit<ITodo, 'id'>>): ITodo {
        const todo = this.todos$$.value.find((td) => td.id === id);
        if (!todo) {
          throw new NotFoundException(`To-do could not be found!`);
        }
        const updated = { ...todo, ...data };
        this.todos$$.next([
          ...this.todos$$.value.map((td) => (td.id === id ? updated : td)),
        ]);
        return updated;
      }
    
      upsert(data: ITodo): ITodo {
        const todo = this.todos$$.value.find((td) => td.id === data.id);
        if (!todo) {
          this.todos$$.next([...this.todos$$.value, data]);
          return data;
        }
        const updated = { ...todo, ...data };
        this.todos$$.next([
          ...this.todos$$.value.map((td) => (td.id === updated.id ? updated : td)),
        ]);
        return updated;
      }
    
      delete(id: string): void {
        const todo = this.todos$$.value.find((td) => td.id === id);
        if (!todo) {
          throw new NotFoundException(`To-do could not be found!`);
        }
        this.todos$$.next([...this.todos$$.value.filter((td) => td.id !== id)]);
        return;
      }
}
