import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';
import { Todo } from './todo.model';

export const initialTodosState: TodosState = {
  listInputValue: '',
  isListInputShaking: false
};

export function todosReducer(state: TodosState = initialTodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case TodosActionTypes.LIST_INPUT_VALUE_CHANGED:
      return {
        ...state,
        listInputValue: action.value
      };
    case TodosActionTypes.LIST_INPUT_SHAKING_START:
      return {
        ...state,
        isListInputShaking: true
      };
    case TodosActionTypes.LIST_INPUT_SHAKING_STOP:
      return {
        ...state,
        isListInputShaking: false
      };
    default:
      return state;
  }
}
