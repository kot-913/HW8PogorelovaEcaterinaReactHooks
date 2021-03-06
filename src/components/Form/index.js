import Input from "components/Input";
import React, { useContext, useMemo } from "react";
import { TaskListContext } from "../../context/taskList.context";
import { StyledAddButton, StyledForm } from "./styles";

const Form = () => {
  const [inputValue, setInputValue] = React.useState("");
  const context = useContext(TaskListContext);
  const { taskList, addTask: onAddTask } = context;

  const onChange = (value) => setInputValue(value);

  const addTask = (e) => {
    e.preventDefault();

    if (inputValue) {
      onAddTask({ text: inputValue });
      setInputValue("");
    }
  };

  const isTaskExists = useMemo(
    () => taskList.some(({ text }) => inputValue === text),
    [taskList, inputValue]
  );

  return (
    <StyledForm onSubmit={addTask}>
      <Input value={inputValue} onChange={onChange} />

      <StyledAddButton disabled={!inputValue || isTaskExists}>
        ADD TASK
      </StyledAddButton>
    </StyledForm>
  );
};
export default Form;
