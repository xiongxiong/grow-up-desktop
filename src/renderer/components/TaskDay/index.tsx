import { memo } from "react";
import { DayTask } from "renderer/store/data";
import styled from "styled-components";
import TaskList from "../TaskList";

export interface TaskDayProps {
    showFinish: boolean;
    dayTask: DayTask;
}

export default memo((props: TaskDayProps) => {
    const {
        showFinish,
        dayTask: { day, todoTasks, doneTasks },
    } = props;

    return (
        <Container>
            <Title>{day}</Title>
            <List>
                <TaskList tasks={showFinish ? doneTasks : todoTasks} />
            </List>
        </Container>
    );
});

const Container = styled.div`
    margin: 4px;
    padding: 4px;
    min-width: 400px;
    border: 1px solid gray;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const List = styled.div`
    flex: 1;
    overflow-y: auto;
`;
