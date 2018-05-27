import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';
import { Todo } from './todo.model';

export const initialTodosState: TodosState = {
  todos: []
};

export function todosReducer(state: TodosState = initialTodosState, action: TodosAction): TodosState {
  let newTodos: Todo[];

  switch (action.type) {
    case TodosActionTypes.UPSERT_SUCCESS:
      const isNewTodo = !state.todos.some(x => x._id === action.todo._id);

      if (isNewTodo) {
        newTodos = [action.todo, ...state.todos];
      } else {
        newTodos = [...state.todos];
        const indexOfExisting = newTodos.findIndex(x => x._id === action.todo._id);
        newTodos[indexOfExisting] = action.todo;
      }

      return {
        ...state,
        todos: newTodos
      };
    case TodosActionTypes.DELETE_SUCCESS:
      newTodos = state.todos.filter(x => x._id !== action.todoId);
      console.log(state.todos);

      return {
        ...state,
        todos: newTodos
      };
    case TodosActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        todos: action.todos
      };
    case TodosActionTypes.SELECT:
      newTodos = [...state.todos];
      const todoIndex = newTodos.indexOf(action.todo);
      const newTodo: Todo = {
        _id: action.todo._id,
        name: action.todo.name,
        todos: action.todo.todos,
        isSelected: action.isSelected
      };
      newTodos[todoIndex] = newTodo;
      return {
        ...state,
        todos: newTodos
      };
    default:
      return state;
  }
}
