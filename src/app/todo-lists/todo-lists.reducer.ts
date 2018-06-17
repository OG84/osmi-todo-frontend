import { TodoListsState } from 'src/app/todo-lists/todo-lists.state';
import { TodoListsAction, TodoListsActionTypes } from 'src/app/todo-lists/todo-lists.actions';

export const initialTodoListsState: TodoListsState = {
  parent: null,
  children: [],
  self: null
};

export function todoListsReducer(state: TodoListsState = initialTodoListsState, action: TodoListsAction): TodoListsState {
  switch (action.type) {
    case TodoListsActionTypes.FETCH_CHILDREN_SUCCESS:
      return {
        ...state,
        children: action.todos
      };
    case TodoListsActionTypes.FETCH_SELF_SUCCESS:
      return {
        ...state,
        self: action.todo
      };
    case TodoListsActionTypes.FETCH_PARENT_SUCCESS:
      return {
        ...state,
        parent: action.todo
      };
  }

  return state;
}
