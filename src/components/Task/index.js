import Input from "components/Input";
import React, { Fragment, useReducer } from "react";
import {
  StyledButton,
  StyledButtonsWrapper,
  StyledDelete,
  StyledEdit,
  StyledEditForm,
  StyledTask,
  StyledText,
} from "./styles";

const initialState = { editValue: "", isEdit: false };

function tasksReducer(state, action) {
  switch (action.type) {
    case "EDIT_VALUE": {
      return { ...state, editValue: action.value };
    }
    case "TOGGLE_ISEDIT": {
      return { ...state, isEdit: action.value };
    }

    default:
      return state;
  }
}

const Task = ({ id, children, onDelete, onSave }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const { editValue, isEdit } = state;

  const onEditChange = (value) => dispatch({ type: "EDIT_VALUE", value });

  const onEditPress = () => {
    dispatch({ type: "TOGGLE_ISEDIT", value: true });
    dispatch({ type: "EDIT_VALUE", value: children });
  };

  const onSaveEdit = (e) => {
    e.preventDefault();

    if (editValue) {
      onSave({ id, text: editValue });
      dispatch({ type: "EDIT_VALUE", value: "" });
      dispatch({ type: "TOGGLE_ISEDIT", value: false });
    }
  };

  return (
    <StyledTask>
      {isEdit ? (
        <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit}>
          <Input
            onChange={onEditChange}
            value={editValue}
            placeholder="Task must contain title"
          />
        </StyledEditForm>
      ) : (
        <Fragment>
          <StyledText>{children}</StyledText>

          <StyledButtonsWrapper>
            <StyledButton onClick={onEditPress}>
              <StyledEdit />
            </StyledButton>
            <StyledButton onClick={() => onDelete(id)}>
              <StyledDelete />
            </StyledButton>
          </StyledButtonsWrapper>
        </Fragment>
      )}
    </StyledTask>
  );
};

export default Task;
