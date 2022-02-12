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
import { NewTask, Task, taskCreate, taskUpdate } from "renderer/store/data";
import TaskView from "renderer/components/TaskView";
import { RootState } from "renderer/store";
import {
    setSelectedTask,
    setTaskViewAnchorToNow,
    switchTaskViewFinish,
    switchTaskViewMode,
    TaskViewMode,
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

    const taskViewFinish = useSelector(
        (state: RootState) => state.settings.taskViewFinish
    );

    const taskViewMode = useSelector(
        (state: RootState) => state.settings.taskViewMode
    );

    const selectedTask = useSelector((state: RootState) => {
        const theTask = state.settings.selectedTask;
        return theTask
            ? theTask.virtual
                ? theTask
                : state.data.tasks.find((task) => task.id === theTask.id)
            : undefined;
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

    const shutTaskDetail = () => dispatch(setSelectedTask(undefined));

    const updateTask = (task: Task, shut: boolean) => {
        if (validTask(task)) {
            const {focus, finishAt, removeAt} = task;
            shut && shutTaskDetail();
            dispatch(taskUpdate({...task, virtual: undefined, focus: (finishAt || removeAt) ? undefined : focus}));
        }
    };

    const targetToCurrent = () => dispatch(setTaskViewAnchorToNow());

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
                {taskViewMode === TaskViewMode.Common ? (
                    <>
                        <ToolGroup>
                            <ToolPanelBtn onClick={openNewTask}>
                                <IoAddOutline />
                            </ToolPanelBtn>
                        </ToolGroup>
                        <ToolGroup>
                            <ToolPanelBtn
                                selected={taskViewFinish}
                                onClick={() => dispatch(switchTaskViewFinish())}
                            >
                                {taskViewFinish ? (
                                    <IoCheckmarkDone />
                                ) : (
                                    <BsListTask />
                                )}
                            </ToolPanelBtn>
                            <ToolPanelBtn onClick={targetToCurrent}>
                                <BiTargetLock />
                            </ToolPanelBtn>
                            <DateWheel />
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
                        selected={taskViewMode === TaskViewMode.Circle}
                        onClick={() =>
                            dispatch(
                                switchTaskViewMode(
                                    taskViewMode === TaskViewMode.Circle
                                        ? TaskViewMode.Common
                                        : TaskViewMode.Circle
                                )
                            )
                        }
                    >
                        <BiRecycle />
                    </ToolPanelBtn>
                    <ToolPanelBtn
                        selected={taskViewMode === TaskViewMode.Giveup}
                        onClick={() =>
                            dispatch(
                                switchTaskViewMode(
                                    taskViewMode === TaskViewMode.Giveup
                                        ? TaskViewMode.Common
                                        : TaskViewMode.Giveup
                                )
                            )
                        }
                    >
                        <AiOutlineDelete />
                    </ToolPanelBtn>
                </ToolGroup>
            </ToolPanel>
            <TaskView />
            <StatusPanel></StatusPanel>
            <Dialog maxWidth={false} open={newTaskOpen}>
                <NewTaskView onCancel={shutNewTask} onSubmit={createNewTask} />
            </Dialog>
            <SwipeableDrawer
                anchor="right"
                open={selectedTask !== undefined}
                onClose={shutTaskDetail}
                onOpen={() => {}}
            >
                {selectedTask && (
                    <TaskDetail task={selectedTask} updateTask={updateTask} />
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
