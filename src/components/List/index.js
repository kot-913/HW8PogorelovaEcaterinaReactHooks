import Task from "components/Task";
import { TaskListConsumer } from "context/taskList.context";
import React, { useEffect, useRef, useState } from "react";
import { StyledHeight, StyledList } from "./styles";

const List = (props) => {
  const listRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const newHeight = listRef.current && listRef.current.offsetHeight;

    if (newHeight && newHeight !== height) {
      setHeight(newHeight);
    }
  }, []);

  useEffect(() => {
    const newHeight = listRef.current && listRef.current.offsetHeight;

    if (newHeight && newHeight !== height) {
      setHeight(newHeight);
    }
  }, [props.taskList]);

  const { taskList = [] } = props;

  return (
    <StyledList ref={listRef}>
      {taskList.map(({ text, id }) => (
        <Task
          key={id}
          onDelete={props.removeTask}
          onSave={props.addTask}
          id={id}
        >
          {text}
        </Task>
      ))}

      <StyledHeight>List height: {height} px</StyledHeight>
    </StyledList>
  );
};

export default (componentProps) => (
  <TaskListConsumer>
    {(props) => <List {...props} {...componentProps} />}
  </TaskListConsumer>
);
