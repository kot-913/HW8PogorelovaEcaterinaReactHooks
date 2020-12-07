export const saveState = (value) => {
  localStorage.setItem("tasks", JSON.stringify(value));
};

export const getState = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) return tasks;
  return [];
};
