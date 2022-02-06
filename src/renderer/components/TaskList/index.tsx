import { memo } from "react";
import { Task } from "renderer/store/data";
import styled from "styled-components";
import TaskItem from "../TaskItem";

export interface TaskListProps {
  tasks: Task[],
};

export default memo((props: TaskListProps) => {
  const {tasks = []} = props;

  return (
    <Container>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

