import styled from "styled-components";
import {
    IoAddOutline,
    IoSearchOutline,
    IoCheckmarkDone,
} from "react-icons/io5";
import { BiTargetLock, BiRecycle } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import ToolBtn from "renderer/components/ToolBtn";
import ToolBtnGroup from "renderer/components/ToolBtnGroup";
import DateWheel from "renderer/components/DateWheel";
import {
    Dialog,
    Snackbar,
    Alert,
    SwipeableDrawer,
    AlertColor,
} from "@mui/material";
import { useCallback, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTaskView from "renderer/components/NewTask";
import {
    NewTask,
    Task,
    taskCreate,
    taskUpdate,
} from "renderer/store/data";
import TaskView from "renderer/components/TaskView";
import { RootState } from "renderer/store";
import {
    setSelectedTask,
    setTaskViewAnchorToNow,
    setTaskViewUnit,
    switchTaskViewFinished,
    TaskViewUnits,
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

    const closeTip = () => tipDispatch({type: "shut"});

    const taskViewUnit = useSelector(
        (state: RootState) => state.settings.taskViewUnit
    );

    const taskViewFinished = useSelector(
        (state: RootState) => state.settings.taskViewFinished
    );

    const selectedTask = useSelector((state: RootState) =>
        state.settings.selectedTaskId
            ? state.data.tasks.find(
                  (task) => task.id === state.settings.selectedTaskId
              )
            : undefined
    );

    const viewBtns = TaskViewUnits.map((name) => ({
        name,
        onClick: () => dispatch(setTaskViewUnit(name)),
    }));

    const [newTaskOpen, setNewTaskOpen] = useState(false);

    const openNewTask = () => setNewTaskOpen(true);

    const shutNewTask = () => setNewTaskOpen(false);

    const validTask = (task: NewTask) => {
      const {period: {timeHead, timeTail} = {}} = task;
      if (timeHead && timeTail) {
        if (timeHead > timeTail) {
          tipDispatch({
            type: "open",
            payload: {
              message: "Invalid period : timeHead should before timeTail",
            }
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
          shut && shutTaskDetail();
          dispatch(taskUpdate(task));
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
                <ToolGroup>
                    <ToolPanelBtn onClick={openNewTask}>
                        <IoAddOutline />
                    </ToolPanelBtn>
                </ToolGroup>
                <ToolGroup>
                    <ToolBtnGroup
                        curIndex={TaskViewUnits.indexOf(taskViewUnit)}
                        buttons={viewBtns}
                    />
                    <ToolPanelBtn
                        onClick={useCallback(
                            () => dispatch(switchTaskViewFinished()),
                            []
                        )}
                    >
                        {taskViewFinished ? (
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
                <ToolGroup>
                    <ToolPanelBtn>
                        <IoSearchOutline />
                    </ToolPanelBtn>
                    <ToolPanelBtn>
                        <BiRecycle />
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
