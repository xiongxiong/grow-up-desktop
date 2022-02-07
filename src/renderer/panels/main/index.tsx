import styled, { css } from "styled-components";
import {
    IoAddOutline,
    IoSearchOutline,
    IoCheckmarkDone,
} from "react-icons/io5";
import { BiTargetLock, BiRecycle } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { BsListTask } from "react-icons/bs";
import ToolBtn from "renderer/components/ToolBtn";
import ToolBtnGroup from "renderer/components/ToolBtnGroup";
import DateWheel from "renderer/components/DateWheel";
import { Dialog, SwipeableDrawer } from "@mui/material";
import { useCallback, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "renderer/components/NewTask";
import {
    NewTask as NewTaskData,
    Task,
    taskCreate,
    taskUpdate,
} from "renderer/store/data";
import TaskView from "renderer/components/TaskView";
import { RootState } from "renderer/store";
import {
    setSelectedTask,
    setTaskViewAnchor,
    setTaskViewUnit,
    switchTaskViewFinished,
    TaskViewUnits,
} from "renderer/store/settings";
import Button from "renderer/components/Button";

export default () => {
    const dispatch = useDispatch();

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

    const createNewTask = (task: NewTaskData) => {
        shutNewTask();
        dispatch(taskCreate(task));
    };

    const shutTaskDetail = () => dispatch(setSelectedTask(undefined));

    const onUpdateTaskTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        selectedTask &&
            dispatch(
                taskUpdate({ ...selectedTask, title: e.currentTarget.value })
            );
    };

    const onUpdateTaskFinishStatus = () => {
        selectedTask &&
            dispatch(
                taskUpdate({
                    ...selectedTask,
                    finishAt: selectedTask.finishAt ? undefined : Date.now(),
                })
            );
        shutTaskDetail();
    };

    const onUpdateTaskRemoveStatus = () => {
        selectedTask &&
            dispatch(
                taskUpdate({
                    ...selectedTask,
                    removeAt: selectedTask.removeAt ? undefined : Date.now(),
                })
            );
        shutTaskDetail();
    };

    const targetToCurrent = () => dispatch(setTaskViewAnchor(Date.now()));

    return (
        <Container>
            <ToolPanel>
                <ToolGroup>
                    <ToolPanelBtn onClick={openNewTask}>
                        <IoAddOutline />
                    </ToolPanelBtn>
                </ToolGroup>
                <ToolGroup>
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
                    <ToolBtnGroup
                        curIndex={TaskViewUnits.indexOf(taskViewUnit)}
                        buttons={viewBtns}
                    />
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
            <NewTaskDialog open={newTaskOpen}>
                <NewTask onCancel={shutNewTask} onSubmit={createNewTask} />
            </NewTaskDialog>
            <SwipeableDrawer
                anchor="right"
                open={selectedTask !== undefined}
                onClose={shutTaskDetail}
                onOpen={() => {}}
            >
                <TaskDetail>
                    <TaskDetailBtnGroup>
                        <TaskDetailStatusSwitchBtn
                            onClick={onUpdateTaskFinishStatus}
                        >
                            {selectedTask?.finishAt ? "Undone" : "Done"}
                        </TaskDetailStatusSwitchBtn>
                        <ToolBtn
                            onClick={onUpdateTaskRemoveStatus}
                            style={{ marginLeft: "4px" }}
                        >
                            <RiDeleteBin3Line />
                        </ToolBtn>
                    </TaskDetailBtnGroup>
                    <TaskDetailTextArea
                        value={selectedTask?.title}
                        onChange={onUpdateTaskTitle}
                    />
                </TaskDetail>
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

const NewTaskDialog = styled(Dialog)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const TaskDetail = styled.div`
    width: 400px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const TaskDetailBtnGroup = styled.div`
    display: flex;
`;

const TaskDetailStatusSwitchBtn = styled(Button)`
    flex: 1;
    height: 32px;
`;

const TaskDetailTextArea = styled.textarea`
    margin-top: 4px;
    height: 120px;
`;
