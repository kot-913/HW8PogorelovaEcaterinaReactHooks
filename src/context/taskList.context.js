import React, { createContext, useReducer } from "react";
import { getState, saveState } from "../utils/localStorage";

const TaskListContext = createContext({});
export { TaskListContext };

export const { Provider } = TaskListContext;

const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  CHECK_TASK: "CHECK_TASK",
  REMOVE_TASK: "REMOVE_TASK",
};

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      let id = id ? action.payload.id : Date.now();
      const task = {
        text: action.payload.text,
        id,
        isCompleted: false,
      };
      const newTasks = [task, ...tasks.filter((id) => id !== task.id)];
      saveState(newTasks);
      return newTasks;

    case ACTIONS.REMOVE_TASK:
      const newestTasks = tasks.filter((task) => task.id !== action.payload.id);
      saveState(newestTasks);
      return newestTasks;

    case ACTIONS.CHECK_TASK:
      const newTask = {
        ...action.payload,
      };
      tasks = tasks
        .map((task) => (task.id === action.payload.id ? newTask : task))
        .sort((a, b) => (a.isCompleted - b.isCompleted ? 1 : 0));

      saveState(tasks);
      return tasks;

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

  const checkTask = ({ task }) => {
    dispatch({
      type: ACTIONS.CHECK_TASK,
      payload: task,
    });
  };

  return (
    <Provider
      value={{
        taskList: tasks,
        addTask,
        removeTask,
        checkTask,
      }}
    >
      {props.children}
    </Provider>
  );
}
