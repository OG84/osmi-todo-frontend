import { TodoListsState } from 'src/app/todo-lists/todo-lists.state';
import { TodoListsAction, TodoListsActionTypes } from 'src/app/todo-lists/todo-lists.actions';
import { TodosActionTypes } from '../shared/todos.actions';
import { Todo } from '../shared/todo.model';

export const initialTodoListsState: TodoListsState = {
  parent: null,
  children: [],
  self: null
};

export function todoListsReducer(state: TodoListsState = initialTodoListsState, action: TodoListsAction): TodoListsState {
  switch (action.type) {
    case TodoListsActionTypes.FETCH_CHILDREN_SUCCESS:
      const sortedChildren = action.todos;
      sortedChildren.sort(sortByPrioAndDate);

      return {
        ...state,
        children: sortedChildren
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

const sortByPrioAndDate = (a: Todo, b: Todo) => {
  let mostUrgendTodo: Todo;

  if (a.dueDate < b.dueDate) {
    mostUrgendTodo = a;
  }

  if (a.dueDate > b.dueDate) {
    mostUrgendTodo = b;
  }

  let mostPrioTodo: Todo;
  if (a.prio < b.prio) {
    mostPrioTodo = a;
  }

  if (a.prio > b.prio) {
    mostPrioTodo = b;
  }

  if (mostUrgendTodo === a && mostUrgendTodo === mostPrioTodo) {
    return -1;
  }

  if (mostUrgendTodo === b && mostUrgendTodo === mostPrioTodo) {
    return 1;
  }

  if (mostUrgendTodo === a && mostPrioTodo === b) {
    return 1;
  }

  if (mostUrgendTodo === b && mostPrioTodo === a) {
    return -1;
  }

  return 0;
};
