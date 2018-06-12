import { TodosState } from './todos.state';
import { TodosAction, TodosActionTypes } from './todos.actions';
import { Todo } from './todo.model';

export const initialTodosState: TodosState = {
  todos: null,
  listInputValue: '',
  isListInputShaking: false
};

export function todosReducer(state: TodosState = initialTodosState, action: TodosAction): TodosState {
  let newTodos: Todo[];

  switch (action.type) {
    case TodosActionTypes.UPSERT_ROOT_SUCCESS:
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
    case TodosActionTypes.UPSERT_CHILD_SUCCESS:
      newTodos = [...state.todos];

      const existingRootIndex = newTodos.findIndex(x => x._id === action.upsertedRootTodo._id);
      if (existingRootIndex === -1) {
        newTodos.push(action.upsertedRootTodo);
      }

      newTodos[existingRootIndex] = action.upsertedRootTodo;

      return {
        ...state,
        todos: newTodos
      };
    case TodosActionTypes.DELETE_SUCCESS:
      newTodos = state.todos.filter(x => x._id !== action.todoId);

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

function findTodoById(todos: Todo[], id: string): Todo {
  for (const todo of todos) {
    if (todo._id === id) {
      return todo;
    }

    const childTodo = this.findTodoById(todo.todos, id);
    if (childTodo) {
      return childTodo;
    }
  }

  return null;
}
