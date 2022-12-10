import React, { ChangeEvent, useState } from "react";
import { BorderColor, Done, Delete } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { delTodo, editTodo } from "../actions";

const InputContainer = styled.div`
    margin: 10px;
    width: 30em;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius: 10px;
`;

const Check = styled.input`
    margin: 10px;
    transform: scale(1.5);
    cursor: pointer;
`

const Input = styled.input`
    border: none;
    width: 40em;
    padding: 5px;
`;

const DelButton = styled.button`
    width: 4em;
    border: none;
    border-radius: 0px 10px 10px 0px;
    background-color: crimson;
    color: white;
    cursor: pointer;
`;

const EditButton = styled.button`
    width: 4em;
    border: none;
    color: white;
    cursor: pointer;
`;


interface NewTodoProps {
  propsTodo : {id?: number, text?: string, active?: boolean}
}

export const Todo: React.FC<NewTodoProps> = ({ propsTodo }) => {
    const [todo, setTodo] = useState(propsTodo);
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();
    
    // edit checkbox
    const checkClick = () => {
        if (todo.id && todo.active !== undefined) {
            dispatch(editTodo({id: todo.id, active: !todo.active}));
        }
    };

    // edit todo text
    const editClick = () => {
        setIsEdit(!isEdit);
        if (isEdit && todo.id && todo.text)
        dispatch(editTodo({id: todo.id, text: todo.text}));
    };

    // delete todo
    const deleteClick = () => {
        if (todo.id)
            dispatch(delTodo({id: todo.id}));
    };

    // change todo text
    const updateTodoText = (event: ChangeEvent<HTMLInputElement>) => {
        if (isEdit) {
            setTodo({
                ...todo, 
                text: event.target.value,
            });
        }
    }

    // change todo active state
    const updateTodoCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo, 
            active: !event.target.checked
        });
        checkClick();
    }

    return (
    <InputContainer>
        <Check
            type="checkbox"
            checked={!todo.active}
            onChange={updateTodoCheck}
            id="check"
        />
        <Input
            type="text"
            value={todo.text}
            onChange={updateTodoText}
            disabled={!isEdit}
        />
        <EditButton
            onClick={editClick}
            style={{backgroundColor: isEdit? 'teal' : 'darkorange'}}
        >
            {isEdit
              ?
                <Done/>
               :
                <BorderColor/>
              }
        </EditButton>
        <DelButton onClick={deleteClick}>
            <Delete/>
        </DelButton>
    </InputContainer>
    );
};