import { useEffect } from 'react';
import { NewTodo } from "./components/NewTodo";
import { Todo } from "./components/Todo";
import { useSelector, useDispatch } from "react-redux";
import { ITodosState } from "./todosReducer";
import { addTodo, persistTodos } from "./actions";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
function App() {

  // initialize todos
  const todos = useSelector<ITodosState, ITodosState["todos"]>(
    (state) => state.todos
  );

  const dispatch = useDispatch();

  // adding todo
  const onAddTodo = (todo: {id: number, text: string, active: boolean}) => {
    dispatch(addTodo(todo));
  };

  // get todos from localStorage
  useEffect(() => {
    dispatch(persistTodos());
  }, [dispatch]);

  // useEffect(()=> {
  //   console.log('todos', todos);
  // }, [todos]);

  return(
    <>
    <NewTodo addTodo={onAddTodo} />
    <hr />
    <Container>
      {todos.map((todo) => {
        return <Todo propsTodo={todo} key={todo.id}/>;
      })}
    </Container>
    </>
  );
}

export default App;