import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';
import { Todo } from './todo.model';

export const initialTodosState: TodosState = {
  listInputValue: '',
  isListInputShaking: false,
  copiedTodoIds: [],
  cuttedTodoIds: []
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
    case TodosActionTypes.COPY_ADD:
      const newCopiedTodoIds = [...state.copiedTodoIds];
      let existingIndex = newCopiedTodoIds.findIndex(x => x === action.todoId);

      if (existingIndex > -1) {
        newCopiedTodoIds[existingIndex] = action.todoId;
      } else {
        newCopiedTodoIds.push(action.todoId);
      }

      return {
        ...state,
        copiedTodoIds: newCopiedTodoIds,
        cuttedTodoIds: state.cuttedTodoIds.filter(x => x !== action.todoId)
      };
    case TodosActionTypes.COPY_REMOVE:
      return {
        ...state,
        copiedTodoIds: state.copiedTodoIds.filter(x => x !== action.todoId)
      };
    case TodosActionTypes.CUT_ADD:
      const newCuttedTodoIds = [...state.cuttedTodoIds];
      existingIndex = newCuttedTodoIds.findIndex(x => x === action.todoId);

      if (existingIndex > -1) {
        newCuttedTodoIds[existingIndex] = action.todoId;
      } else {
        newCuttedTodoIds.push(action.todoId);
      }

      return {
        ...state,
        copiedTodoIds: state.copiedTodoIds.filter(x => x !== action.todoId),
        cuttedTodoIds: newCuttedTodoIds
      };
    case TodosActionTypes.CUT_REMOVE:
      return {
        ...state,
        cuttedTodoIds: state.cuttedTodoIds.filter(x => x !== action.todoId)
      };
    case TodosActionTypes.PASTE_SUCCESS:
      return {
        ...state,
        copiedTodoIds: [],
        cuttedTodoIds: []
      };
    default:
      return state;
  }
}
