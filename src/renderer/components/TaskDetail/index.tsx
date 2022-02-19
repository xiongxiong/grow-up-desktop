import styled, { css } from "styled-components";
import { RiDeleteBin3Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdCenterFocusStrong } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";
import Button from "../Button";
import ToolBtn from "../ToolBtn";
import { CyclePeriod, Period, Task } from "renderer/store/data";
import { ChangeEvent } from "react";
import TaskPeriodView from "../TaskPeriod";
import CyclePeriodView from "../CyclePeriod";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { TaskViewMode } from "renderer/store/settings";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";

export interface TaskDetailProps {
    task: Task;
    updateTask: (task: Task, shut: boolean) => void;
}

export default (props: TaskDetailProps) => {
    const { task, updateTask } = props;

    const taskViewMode = useSelector(
        (state: RootState) => state.settings.taskViewMode
    );

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

    const appendCyclePeriod = () => {
        updateTask(
            {
                ...task,
                cyclePeriods: [...(task.cyclePeriods || []), {}],
            },
            false
        );
    };

    const updateCyclePeriod = (cyclePeriod: CyclePeriod, index: number) => {
        updateTask(
            {
                ...task,
                cyclePeriods: task.cyclePeriods?.map((item, idx) =>
                    idx === index ? cyclePeriod : item
                ),
            },
            false
        );
    };

    const removeCyclePeriod = (index: number) => {
        updateTask(
            {
                ...task,
                cyclePeriods: task.cyclePeriods?.filter(
                    (_, idx) => idx !== index
                ),
            },
            false
        );
    };

    const restoreTask = () => {
        updateTask({ ...task, removeAt: undefined }, true);
    };

    const detailCommon = () => {
        if (task.cycleId) {
            return (
                <>
                    <BtnGroup>
                        <LargeBtn
                            bgColor="#02c39a"
                            onClick={updateTaskFinishStatus}
                        >
                            <IoCheckmarkDone />
                        </LargeBtn>
                        <SmallBtn
                            bgColor="#ff1654"
                            style={{ marginLeft: "4px" }}
                        >
                            <RiLogoutCircleRLine />
                        </SmallBtn>
                    </BtnGroup>
                </>
            );
        } else {
            return (
                <>
                    <BtnGroup>
                        <SmallBtn
                            bgColor={task.focus ? "#457B9D" : "#ff9f1c"}
                            onClick={switchTaskFocusStatus}
                            style={{ marginRight: "4px" }}
                        >
                            <MdCenterFocusStrong />
                        </SmallBtn>
                        <LargeBtn
                            bgColor={task.finishAt ? "#ff9f1c" : "#02c39a"}
                            onClick={updateTaskFinishStatus}
                        >
                            {task.finishAt ? (
                                <BsListTask />
                            ) : (
                                <IoCheckmarkDone />
                            )}
                        </LargeBtn>
                        <SmallBtn
                            bgColor="#ff1654"
                            onClick={updateTaskRemoveStatus}
                            style={{ marginLeft: "4px" }}
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
            );
        }
    };

    const detailCircle = () => {
        return (
            <>
                <BtnGroup>
                    <LargeBtn
                        bgColor="#ff1654"
                        onClick={updateTaskRemoveStatus}
                    >
                        <RiDeleteBin3Line />
                    </LargeBtn>
                </BtnGroup>
                <TextArea value={task.title} onChange={updateTaskTitle} />
                <TaskPeriodView
                    period={task.period}
                    updatePeroid={updateTaskPeriod}
                />
                {task.cyclePeriods?.map((cyclePeriod, index) => (
                        <CyclePeriodView
                            key={nanoid()}
                            cyclePeriod={cyclePeriod}
                            updateCyclePeriod={(cyclePeriod) =>
                                updateCyclePeriod(cyclePeriod, index)
                            }
                            removeCyclePeriod={() => removeCyclePeriod(index)}
                        />
                    ))}
                <Button onClick={appendCyclePeriod}>
                    <IoAddOutline />
                </Button>
            </>
        );
    };

    const detailGiveup = () => {
        return (
            <>
                <BtnGroup>
                    <LargeBtn bgColor="#ff9f1c" onClick={restoreTask}>
                        <TiArrowBackOutline />
                    </LargeBtn>
                </BtnGroup>
            </>
        );
    };

    const renderDetail = () => {
        switch (taskViewMode) {
            case TaskViewMode.Common:
                return detailCommon();
            case TaskViewMode.Circle:
                return detailCircle();
            case TaskViewMode.Giveup:
                return detailGiveup();
            default:
                return undefined;
        }
    };

    return <Container>{renderDetail()}</Container>;
};

const Container = styled.div`
    min-width: 500px;
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
