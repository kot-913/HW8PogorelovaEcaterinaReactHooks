import Input from "components/Input";
import React, { Fragment, useState } from "react";
import {
  StyledButton,
  StyledButtonsWrapper,
  StyledDelete,
  StyledEdit,
  StyledEditForm,
  StyledTask,
  StyledText,
} from "./styles";

const Task = ({ id, children, onDelete, onSave, isCompleted }) => {
  //   const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [editValue, setEditValue] = useState("");
  const [isEdit, setIsIsEdit] = useState(false);

  const onEditPress = () => {
    setIsIsEdit(true);
    setEditValue(children);
  };

  const onSaveEdit = (e) => {
    e.preventDefault();

    // const isTaskExists = useMemo(
    // 	() => taskList.some(({ text }) => inputValue === text),
    // 	[taskList, inputValue]
    //   );

    if (editValue) {
      onSave({ id, text: editValue, isCompleted });
      setIsIsEdit(false);
      setEditValue("");
    }
  };

  const onChecked = () => {
    onSave({ id, text: children, isCompleted: !isCompleted });
  };

  return (
    <StyledTask>
      {isEdit ? (
        <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit}>
          <Input
            onChange={setEditValue}
            value={editValue}
            placeholder="Task must contain title"
          />
        </StyledEditForm>
      ) : (
        <Fragment>
          <input type="checkbox" checked={isCompleted} onChange={onChecked} />
          <StyledText
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
          >
            {children}
          </StyledText>
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
