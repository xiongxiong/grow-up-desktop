import { memo } from "react";
import { DayTask } from "renderer/store/data";
import styled from "styled-components";
import TaskList from "../TaskList";

export interface TaskDayProps {
  taskViewFinished: boolean,
  dayTask: DayTask;
};

export default memo((props: TaskDayProps) => {
  const {taskViewFinished, dayTask: {day, todoTasks, doneTasks}} = props;

  return (
    <Container>
      <Title>{day}</Title>
      <TaskList tasks={taskViewFinished ? doneTasks : todoTasks} />
    </Container>
  );
});

const Container = styled.div`
  margin: 4px;
  min-width: 400px;
  background-color: lightcyan;
  border-radius: 4px;
`;

const Title = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
