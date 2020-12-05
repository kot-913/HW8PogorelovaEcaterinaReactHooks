import React, { Component, createContext } from "react";
import { v4 } from "uuid";
import { saveState } from "../utils/localStorage";

const TaskListContext = createContext({});
export { TaskListContext };

export const { Provider } = TaskListContext;

class TaskListProvider extends Component {
  state = {
    list: [],
  };

  constructor(props) {
    super(props);

    const { defaultState } = props;

    if (Array.isArray(defaultState))
      this.state = {
        list: [...defaultState],
      };
  }

  addTask = ({ text, id, isCompleted }) => {
    let task = id
      ? this.state.list.find(({ id: taskId }) => taskId === id) || { id: v4() }
      : { id: v4() };

    task = {
      ...task,
      text,
      isCompleted,
    };

    const state = [task, ...this.state.list.filter(({ id }) => id !== task.id)];

    const activeTasks = state.filter((task) => task.isCompleted === false);
    const completedTasks = state.filter((task) => task.isCompleted === true);
    const newState = [...activeTasks, ...completedTasks];

    saveState(newState);

    return this.setState({ list: newState });
  };

  removeTask = (taskId) => {
    const state = [...this.state.list.filter(({ id }) => id !== taskId)];

    saveState(state);

    return this.setState({ list: state });
  };

  render() {
    const { addTask, removeTask } = this;
    const { children } = this.props;

    return (
      <Provider
        value={{
          taskList: this.state.list,
          addTask,
          removeTask,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default TaskListProvider;
