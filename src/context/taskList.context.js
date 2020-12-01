import React, { Component, createContext } from "react";
import { v4 } from "uuid";
import { saveState } from "../utils/localStorage";

const TaskListContext = createContext({});
export { TaskListContext };

export const { Provider, Consumer: TaskListConsumer } = TaskListContext;

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

  addTask = ({ text, id }) => {
    let task = id
      ? this.state.list.find(({ id: taskId }) => taskId === id) || { id: v4() }
      : { id: v4() };

    task = {
      ...task,
      text,
    };

    const state = [task, ...this.state.list.filter(({ id }) => id !== task.id)];

    saveState(state);

    return this.setState({ list: state });
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
