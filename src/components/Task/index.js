import Input from "components/Input";
import React, { Fragment, useContext, useMemo, useState } from "react";
import { TaskListContext } from "../../context/taskList.context";
import {
  StyledButton,
  StyledButtonsWrapper,
  StyledDelete,
  StyledEdit,
  StyledEditForm,
  StyledTask,
  StyledText,
} from "./styles";

const Task = ({ id, children, isCompleted }) => {
  const [editValue, setEditValue] = useState("");
  const [isEdit, setIsIsEdit] = useState(false);
  const { taskList, removeTask, addTask, checkTask } = useContext(
    TaskListContext
  );

  const onEditPress = () => {
    setIsIsEdit(true);
    setEditValue(children);
  };

  let taskAlreadyExists = useMemo(
    () => taskList.some((item) => editValue === item.text),
    [taskList, editValue]
  );

  const onSaveEdit = (e) => {
    e.preventDefault();

    if (editValue && !taskAlreadyExists) {
      addTask({ id, text: editValue, isCompleted });
      setIsIsEdit(false);
      setEditValue("");
    }
  };

  const onChecked = () => {
    checkTask({ task: { id, text: children, isCompleted: !isCompleted } });
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
            <StyledButton onClick={() => removeTask(id)}>
              <StyledDelete />
            </StyledButton>
          </StyledButtonsWrapper>
        </Fragment>
      )}
    </StyledTask>
  );
};

export default Task;
