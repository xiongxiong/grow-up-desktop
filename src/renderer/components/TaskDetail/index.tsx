import styled, { css } from "styled-components";
import { RiDeleteBin3Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdCenterFocusStrong, MdTimerOff } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { IoAddOutline, IoCheckmarkDone } from "react-icons/io5";
import { AiOutlineFieldTime } from "react-icons/ai";
import Button from "../Button";
import ToolBtn from "../ToolBtn";
import { CyclePeriod, Period, Task } from "renderer/store/data";
import { ChangeEvent } from "react";
import TaskPeriodView from "../TaskPeriod";
import CyclePeriodView from "../CyclePeriod";
import { BsListTask } from "react-icons/bs";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";

export interface TaskDetailProps {
    task: Task;
    updateTask: (task: Task, shut: boolean) => void;
}

export default (props: TaskDetailProps) => {
    const { task, updateTask } = props;

    const showRemove = useSelector(
        (state: RootState) => state.settings.showRemove
    );

    const showCycle = useSelector(
        (state: RootState) => state.settings.showCycle
    );

    const updateTaskTitle = (e: ChangeEvent<HTMLTextAreaElement>) =>
        updateTask({ ...task, title: e.currentTarget.value }, false);

    const updateTaskFinishStatus = () => {
        const {
            timing: { isTiming = false, start = 0, total = 0 } = {},
        } = task;
        updateTask(
            {
                ...task,
                finishAt: task.finishAt ? undefined : Date.now(),
                timing: task.timing
                    ? {
                          isTiming: false,
                          start,
                          total: isTiming ? total + Date.now() - start : total,
                      }
                    : undefined,
            },
            true
        );
    };

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

    const switchTaskTimingStatus = () => {
        const {
            timing: { isTiming = false, start = 0, total = 0 } = {},
        } = task;
        const now = Date.now();
        updateTask(
            {
                ...task,
                timing: {
                    isTiming: !isTiming,
                    start: isTiming ? start : now,
                    total: isTiming ? total + now - start : total,
                },
            },
            false
        );
    };

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

    const detailTask = () => {
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
                        <SmallBtn
                            bgColor={
                                task.timing?.isTiming ? "#457B9D" : "#ff9f1c"
                            }
                            onClick={switchTaskTimingStatus}
                            style={{ marginRight: "4px" }}
                        >
                            {task.timing?.isTiming ? (
                                <MdTimerOff />
                            ) : (
                                <AiOutlineFieldTime />
                            )}
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

    const detailCycle = () => {
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

    const detailRemove = () => {
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
        if (showCycle) {
            return showRemove ? detailRemove() : detailCycle();
        } else {
            return showRemove ? detailRemove() : detailTask();
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
