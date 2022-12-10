import React, { ChangeEvent } from "react";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
    width: 30em;
    height: 40px;
    background-color: white;
    display: flex;
    border: 1px solid lightgray;
`;

const Input = styled.input`
    border: none;
    width: 30em;
    padding-left: 10px;
`;

const Button = styled.button`
    width: 8em;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;


interface INewTodoProps {
  addTodo(todo: {id?: number, text?: string, active?: boolean}): void;
}

export const NewTodo: React.FC<INewTodoProps> = ({ addTodo }) => {
  const [todo, setTodo] = React.useState<{id?: number, text?: string, active?: boolean}>({})
  const updateTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo({text: event.target.value});
  };

  // adding new todo
  const onAddTodoClick = () => {
    if (todo.text) {
      todo.active = true
      todo.id = Date.now()
      addTodo(todo);
      setTodo({});
    }
  };

  return (
    <Container>
    <InputContainer>
        <Input
          placeholder='Enter todo here'
          onChange={updateTodo}
          value={ todo.text || ""}
          type="text"
        />
        <Button onClick={onAddTodoClick}>
            <h2>Submit</h2>
        </Button>
    </InputContainer>
  </Container>
  );
};