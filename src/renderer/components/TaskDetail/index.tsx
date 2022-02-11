import styled from "styled-components";
import { RiDeleteBin3Line } from "react-icons/ri";
import Button from "../Button";
import ToolBtn from "../ToolBtn";
import { Period, Task } from "renderer/store/data";
import { ChangeEvent } from "react";
import TaskPeriodView from "../TaskPeriodView";

export interface TaskDetailProps {
    task: Task;
    updateTask: (task: Task, shut: boolean) => void;
}

export default (props: TaskDetailProps) => {
    const { task, updateTask } = props;

    const updateTaskTitle = (e: ChangeEvent<HTMLTextAreaElement>) =>
        updateTask({ ...task, title: e.currentTarget.value }, false);

    const updateTaskFinishStatus = () =>
        updateTask(
            {
                ...task,
                finishAt: task.finishAt ? undefined : Date.now(),
            },
            true
        );

    const updateTaskRemoveStatus = () =>
        updateTask(
            {
                ...task,
                removeAt: task.removeAt ? undefined : Date.now(),
            },
            true
        );

    const updateTaskPeriod = (period: Period) => {
        updateTask(
          {
            ...task,
            period: period,
          }, false
        );
    };

    return (
        <Container>
            <BtnGroup>
                <StatusSwitchBtn onClick={updateTaskFinishStatus}>
                    {task?.finishAt ? "Undone" : "Done"}
                </StatusSwitchBtn>
                <ToolBtn
                    onClick={updateTaskRemoveStatus}
                    style={{ marginLeft: "4px" }}
                >
                    <RiDeleteBin3Line />
                </ToolBtn>
            </BtnGroup>
            <TextArea value={task?.title} onChange={updateTaskTitle} />
            <TaskPeriodView
                    period={task?.period}
                    updatePeroid={updateTaskPeriod}
                />
        </Container>
    );
};

const Container = styled.div`
    width: 600px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const BtnGroup = styled.div`
    display: flex;
`;

const StatusSwitchBtn = styled(Button)`
    flex: 1;
    height: 32px;
`;

const TextArea = styled.textarea`
    margin: 4px 0px;
    height: 120px;
`;
