import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';

export const initialTodosState: TodosState = {
  todos: []
};

export function todosReducer(state: TodosState = initialTodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case TodosActionTypes.ADD:
      return {
        ...state,
        todos: [...state.todos, action.todo]
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
