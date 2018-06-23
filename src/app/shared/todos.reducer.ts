import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';
import { Todo } from './todo.model';

export const initialTodosState: TodosState = {
  listInputValue: '',
  isListInputShaking: false,
  clipboard: []
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
    case TodosActionTypes.CLIPBOARD_ADD:
      const newClipboard = [...state.clipboard];
      const existingIndex = newClipboard.findIndex(x => x.todoId === action.clipboardAction.todoId);

      if (existingIndex > -1) {
        newClipboard[existingIndex] = action.clipboardAction;
      } else {
        newClipboard.push(action.clipboardAction);
      }

      return {
        ...state,
        clipboard: newClipboard
      };
    case TodosActionTypes.CLIPBOARD_REMOVE:
      return {
        ...state,
        clipboard: state.clipboard.filter(x => x.todoId !== action.todoId)
      };
    case TodosActionTypes.CLIPBOARD_CLEAR:
      return {
        ...state,
        clipboard: []
      };
    default:
      return state;
  }
}
