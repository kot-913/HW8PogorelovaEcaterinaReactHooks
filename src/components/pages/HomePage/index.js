import Form from "components/Form";
import List from "components/List";
import TaskListProvider from "context/taskList.context";
import React from "react";
import { getState } from "utils/localStorage";
import { StyledWrapper } from "./styles";

const defaultStateValue = getState() || [];

const HomePage = () => {
  return (
    <TaskListProvider defaultState={defaultStateValue}>
      <StyledWrapper>
        <Form />
        <List />
      </StyledWrapper>
    </TaskListProvider>
  );
};

export default HomePage;
