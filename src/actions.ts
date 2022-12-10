export type Action = { type: string; payload: {id?: number, text?: string, active?: boolean} };

export const addTodo = (todo: {text: string, active: boolean}): Action => ({
  type: "ADD_TODO",
  payload: todo,
});

export const delTodo = (todo: {id: number}): Action => ({
  type: "DEL_TODO",
  payload: todo,
});

export const editTodo = (todo: {id: number, text?: string, active?: boolean}): Action => ({
  type: "EDIT_TODO",
  payload: todo,
});

export const persistTodos = (): Action => ({
  type: "PERSIST_TODOS",
  payload: {}
});