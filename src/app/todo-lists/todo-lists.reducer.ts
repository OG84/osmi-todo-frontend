import { TodoListsState } from 'src/app/todo-lists/todo-lists.state';
import { TodoListsAction, TodoListsActionTypes } from 'src/app/todo-lists/todo-lists.actions';

export const initialTodoListsState: TodoListsState = {
  todos: [],
  todo: null
};

export function todoListsReducer(state: TodoListsState = initialTodoListsState, action: TodoListsAction): TodoListsState {
  switch (action.type) {
    case TodoListsActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos
      };
    case TodoListsActionTypes.SET_PARENT_TODO:
      return {
        ...state,
        todo: action.parentTodo
      };
  }

  return state;
}
