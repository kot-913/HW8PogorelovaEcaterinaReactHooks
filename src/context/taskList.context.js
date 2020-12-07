import React, { createContext, useReducer } from "react";
import { getState, saveState } from "../utils/localStorage";

const TaskListContext = createContext({});
export { TaskListContext };

export const { Provider } = TaskListContext;

const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  REMOVE_TASK: "REMOVE_TASK",
};

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      let id = id ? action.payload.id : Date.now();

      const task = {
        text: action.payload.text,
        id,
        isCompleted: action.payload.isCompleted,
      };

      const newTasks = [task, ...tasks.filter(({ id }) => id !== task.id)];

      const activeTasks = newTasks.filter((task) => task.isCompleted === false);
      const completedTasks = newTasks.filter(
        (task) => task.isCompleted === true
      );
      const newState = [...activeTasks, ...completedTasks];
      saveState(newState);
      return newState;

    case ACTIONS.EDIT_TASK:
      break;
    case ACTIONS.REMOVE_TASK:
      const newestTasks = tasks.filter((task) => task.id !== action.payload.id);
      console.log("id", tasks);
      saveState(newestTasks);
      return newestTasks;

    default:
      return tasks;
  }
}

export default function TaskListProvider(props) {
  const [tasks, dispatch] = useReducer(reducer, getState());

  const addTask = ({ text, id, isCompleted }) => {
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { text, id, isCompleted },
    });
  };

  const removeTask = (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: { id } });
  };

  return (
    <Provider
      value={{
        taskList: tasks,
        addTask,
        removeTask,
      }}
    >
      {props.children}
    </Provider>
  );
}
