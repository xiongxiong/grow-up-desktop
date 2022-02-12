import styled, { css } from "styled-components";
import { RiDeleteBin3Line, RiLogoutCircleRLine } from "react-icons/ri";
import {MdCenterFocusStrong} from "react-icons/md";
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

        const switchTaskFocusStatus = () =>
        updateTask(
            {
                ...task,
                focus: !task.focus,
            },
            false
        );

    const updateTaskPeriod = (period: Period) => {
        updateTask(
            {
                ...task,
                period: period,
            },
            false
        );
    };

    const restoreTask = () => {
        updateTask({ ...task, removeAt: undefined }, true);
    };

    return (
        <Container>
            {task.removeAt ? (
                <>
                    <BtnGroup>
                        <LargeBtn bgColor="#ff9f1c" onClick={restoreTask}>
                            Restore
                        </LargeBtn>
                    </BtnGroup>
                </>
            ) : task.virtual ? (
                <>
                    <BtnGroup>
                        <LargeBtn bgColor="#02c39a" onClick={restoreTask}>
                            Done
                        </LargeBtn>
                        <SmallBtn bgColor="#ff1654">
                            <RiLogoutCircleRLine />
                        </SmallBtn>
                    </BtnGroup>
                </>
            ) : (
                <>
                    <BtnGroup>
                    <SmallBtn
                            bgColor={task.focus ? "#457B9D" : "#ff9f1c"}
                            onClick={switchTaskFocusStatus}
                            style={{marginRight: "4px"}}
                        >
                            <MdCenterFocusStrong />
                        </SmallBtn>
                        <LargeBtn
                            bgColor={task.finishAt ? "#ff9f1c" : "#02c39a"}
                            onClick={updateTaskFinishStatus}
                        >
                            {task.finishAt ? "Undone" : "Done"}
                        </LargeBtn>
                        <SmallBtn
                            bgColor="#ff1654"
                            onClick={updateTaskRemoveStatus}
                            style={{marginLeft: "4px"}}
                        >
                            <RiDeleteBin3Line />
                        </SmallBtn>
                    </BtnGroup>
                    <TextArea value={task.title} onChange={updateTaskTitle} />
                    <TaskPeriodView
                        period={task.period}
                        updatePeroid={updateTaskPeriod}
                    />
                </>
            )}
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

const SmallBtn = styled(ToolBtn).attrs({} as { bgColor: string })`
    color: white;
    background-color: ${(props) => props.bgColor};
`;

const LargeBtn = styled(Button).attrs({} as { bgColor: string })`
    flex: 1;
    height: 32px;
    color: white;
    background-color: ${(props) => props.bgColor};
`;

const TextArea = styled.textarea`
    margin: 4px 0px;
    height: 120px;
`;
