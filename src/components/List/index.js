import Task from "components/Task";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskListContext } from "../../context/taskList.context";
import { StyledHeight, StyledList } from "./styles";

function useHeight(list) {
  const listRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const newHeight = listRef.current && listRef.current.offsetHeight;

    if (newHeight && newHeight !== height) {
      setHeight(newHeight);
    }
  }, [list]);
  return { height, listRef };
}

const List = () => {
  const { taskList, addTask, removeTask } = useContext(TaskListContext);
  const { height, listRef } = useHeight(taskList);

  return (
    <StyledList ref={listRef}>
      {taskList.map(({ text, id, isCompleted }) => (
        <Task
          key={id}
          onDelete={removeTask}
          onSave={addTask}
          isCompleted={isCompleted}
          id={id}
        >
          {text}
        </Task>
      ))}

      <StyledHeight>List height: {height} px</StyledHeight>
    </StyledList>
  );
};

export default List;
