import styled from "styled-components";
import {
    IoAddOutline,
    IoSearchOutline,
    IoCheckmarkDone,
} from "react-icons/io5";
import { BiTargetLock, BiRecycle } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import ToolBtn from "renderer/components/ToolBtn";
import DateWheel from "renderer/components/DateWheel";
import {
    Dialog,
    Snackbar,
    Alert,
    SwipeableDrawer,
    AlertColor,
} from "@mui/material";
import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTaskView from "renderer/components/NewTask";
import {
    Task,
    cycleUpdate,
    NewTask,
    taskCreate,
    taskUpdate,
} from "renderer/store/data";
import TaskView from "renderer/components/TaskView";
import { RootState } from "renderer/store";
import {
    setSelectedTask,
    setTimeAnchorToNow,
    switchShowFinish,
    switchShowRemove,
    switchShowCycle,
} from "renderer/store/settings";
import TaskDetail from "renderer/components/TaskDetail";

const initialTipState = {
    open: false,
    level: "warning" as AlertColor,
    message: "",
    duration: 3000,
};

type TipState = typeof initialTipState;

export default () => {
    const dispatch = useDispatch();

    const [tipState, tipDispatch] = useReducer(
        (state: TipState, action: { type: string; payload?: any }) => {
            switch (action.type) {
                case "open":
                    // action as {type: string, payload: {level: AlertColor, message: string, duration: number}}
                    return {
                        ...state,
                        open: true,
                        level: action.payload.level || state.level,
                        message: action.payload.message || state.message,
                        duration: action.payload.duration || state.duration,
                    };
                case "shut":
                    return initialTipState;
                default:
                    return initialTipState;
            }
        },
        initialTipState
    );

    const closeTip = () => tipDispatch({ type: "shut" });

    const showFinish = useSelector(
        (state: RootState) => state.settings.showFinish
    );

    const showRemove = useSelector(
        (state: RootState) => state.settings.showRemove
    );

    const showCycle = useSelector(
        (state: RootState) => state.settings.showCycle
    );

    const selectedItem = useSelector((state: RootState) => {
        if (state.settings.showCycle) {
            const theCycle = state.settings.selectedItem as Task;
            return theCycle
                ? state.data.cycles.find((cycle) => cycle.id === theCycle.id)
                : undefined;
        } else {
            const theTask = state.settings.selectedItem as Task;
            return theTask
                ? theTask.cycleId
                    ? theTask
                    : state.data.tasks.find((task) => task.id === theTask.id)
                : undefined;
        }
    });

    const [newTaskOpen, setNewTaskOpen] = useState(false);

    const openNewTask = () => setNewTaskOpen(true);

    const shutNewTask = () => setNewTaskOpen(false);

    const validTask = (task: NewTask) => {
        const { period: { timeHead, timeTail } = {} } = task;
        if (timeHead && timeTail) {
            if (timeHead > timeTail) {
                tipDispatch({
                    type: "open",
                    payload: {
                        message:
                            "Invalid period : timeHead should before timeTail",
                    },
                });
                return false;
            }
        }
        return true;
    };

    const createNewTask = (task: NewTask) => {
        if (validTask(task)) {
            shutNewTask();
            dispatch(taskCreate(task));
        }
    };

    const shutDetail = () => dispatch(setSelectedTask(undefined));

    const updateTask = (task: Task, shut: boolean) => {
        if (validTask(task)) {
            shut && shutDetail();
            if (task.cyclePeriods) {
                dispatch(cycleUpdate(task));
            } else {
                const { focus, finishAt, removeAt } = task;
                dispatch(
                    taskUpdate({
                        ...task,
                        focus: finishAt || removeAt ? undefined : focus,
                    })
                );
            }
        }
    };

    const targetToCurrent = () => dispatch(setTimeAnchorToNow());

    return (
        <Container>
            <Snackbar
                open={tipState.open}
                onClose={closeTip}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
            >
                <Alert severity={tipState.level} onClose={closeTip}>
                    {tipState.message}
                </Alert>
            </Snackbar>
            <ToolPanel>
                {!showCycle && !showRemove ? (
                    <>
                        <ToolGroup>
                            <ToolPanelBtn onClick={openNewTask}>
                                <IoAddOutline />
                            </ToolPanelBtn>
                        </ToolGroup>
                        <ToolGroup>
                            <ToolPanelBtn
                                selected={showFinish}
                                onClick={() => dispatch(switchShowFinish())}
                            >
                                {showFinish ? (
                                    <IoCheckmarkDone />
                                ) : (
                                    <BsListTask />
                                )}
                            </ToolPanelBtn>
                            <ToolPanelBtn onClick={targetToCurrent}>
                                <BiTargetLock />
                            </ToolPanelBtn>
                            <TheDateWheel />
                        </ToolGroup>
                    </>
                ) : (
                    <ToolPanelSpring />
                )}
                <ToolGroup>
                    <ToolPanelBtn>
                        <IoSearchOutline />
                    </ToolPanelBtn>
                    <ToolPanelBtn
                        selected={showCycle}
                        onClick={() => dispatch(switchShowCycle())}
                    >
                        <BiRecycle />
                    </ToolPanelBtn>
                    <ToolPanelBtn
                        selected={showRemove}
                        onClick={() => dispatch(switchShowRemove())}
                    >
                        <AiOutlineDelete />
                    </ToolPanelBtn>
                </ToolGroup>
            </ToolPanel>
            <TaskView />
            <StatusPanel></StatusPanel>
            <Dialog open={newTaskOpen}>
                <NewTaskView onCancel={shutNewTask} onSubmit={createNewTask} />
            </Dialog>
            <SwipeableDrawer
                anchor="right"
                open={selectedItem !== undefined}
                onClose={shutDetail}
                onOpen={() => {}}
            >
                {selectedItem && (
                    <TaskDetail task={selectedItem} updateTask={updateTask} />
                )}
            </SwipeableDrawer>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const ToolPanel = styled.div`
    padding: 4px;
    background-color: #f7f5f1;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ToolPanelBtn = styled(ToolBtn)`
    margin: 0px 4px;
    background-color: ${(props) => props.bgColorNormal};
`;

const ToolPanelSpring = styled.div`
    flex: 1;
`;

const ToolGroup = styled.div`
    display: flex;
    align-items: center;
`;

const StatusPanel = styled.div`
    background-color: #f7f5f1;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    font-size: x-small;
`;

const TheDateWheel = styled(DateWheel)`
    margin-left: 4px;
`;
