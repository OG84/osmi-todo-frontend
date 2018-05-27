import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';

export const initialTodosState: TodosState = {
  todos: []
};

export function todosReducer(state: TodosState = initialTodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case TodosActionTypes.UPSERT_SUCCESS:
      return {
        ...state,
        todos: [action.todo, ...state.todos]
      };
    case TodosActionTypes.DELETE_SUCCESS:
      const newTodos = state.todos.filter(x => x.id !== action.todoId);
      return {
        ...state,
        todos: newTodos
      };
    case TodosActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        todos: action.todos
      };
    default:
      return state;
  }
}
