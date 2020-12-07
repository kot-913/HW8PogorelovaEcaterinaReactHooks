import Task from "components/Task";
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
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
  const { taskList } = useContext(TaskListContext);
  const { height, listRef } = useHeight(taskList);

  const taskListMemo = useMemo(() => {
    return taskList.map(({ text, id, isCompleted }) => (
      <Task key={id} id={id} isCompleted={isCompleted}>
        {text}
      </Task>
    ));
  }, [taskList]);

  return (
    <StyledList ref={listRef}>
      {taskListMemo}
      <StyledHeight>List height: {height} px</StyledHeight>
    </StyledList>
  );
};

export default List;
