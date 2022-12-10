import { Action } from "./actions"

export interface ITodo {
  id?: number,
  text?: string,
  active?: boolean
}

export interface ITodosState {
  todos: ITodo[]
}

const defaultState:ITodosState = {
  todos: []
}

// setting todos in localStorage
const setTodosInStorage = (todos:ITodo[]) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export const todosReducer = (
  state:ITodosState = defaultState,
  action: Action
  ):ITodosState => {
  switch(action.type){
    // getting persist todos from localStorage and clear the storage
    case "PERSIST_TODOS": {
      if (state.todos.length !== 0)
        return state
      const str = window.localStorage.getItem('todos');
      if (typeof(str) !== 'string')
        return defaultState
      const todosTmp = JSON.parse(str);
      window.localStorage.removeItem('todos');
      const todos:ITodo[] = todosTmp;
      return {...state, todos: todos}
    }
    //adding new todo
    case "ADD_TODO": {
      const todosPersist = [...state.todos, action.payload]
      setTodosInStorage(todosPersist)
      return {...state, todos: todosPersist}
    }
    // delete existing todo
    case "DEL_TODO": {
      const todosPersist = state.todos.filter((item) => item.id !== action.payload.id)
      setTodosInStorage(todosPersist)
      return {...state, todos: todosPersist }
    }
    // edit existing todo
    case "EDIT_TODO": {
      const todosPersist = state.todos.map( todo => {
        if (todo.id === action.payload.id) {
          return {
            id: todo.id,
            text: action.payload.text !== undefined ? 
              action.payload.text : 
              todo.text,
            active: action.payload.active !== undefined ? 
              action.payload.active :
              todo.active 
          }
        }
        return todo;
      })
      setTodosInStorage(todosPersist)
      return {...state, todos: todosPersist}
    }
    default:
      return state
  }
}