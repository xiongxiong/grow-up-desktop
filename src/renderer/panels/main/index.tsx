import styled from "styled-components";
import {
    IoAddOutline,
    IoSearchOutline,
    IoCheckmarkDone,
    IoPricetagsOutline,
} from "react-icons/io5";
import { BiTargetLock, BiRecycle } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import {GoSettings} from "react-icons/go";
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
    switchShowSearchTagBar,
    removeSearchTags,
    updateSearchString,
    appendSearchTags,
    switchShowSearch,
} from "renderer/store/settings";
import TaskDetail from "renderer/components/TaskDetail";
import TaskTagView from "renderer/components/TaskTag";
import SettingsDialog from "renderer/components/SettingsDialog";

const initialMsgState = {
    open: false,
    level: "warning" as AlertColor,
    message: "",
    duration: 3000,
};

type MsgState = typeof initialMsgState;

export default () => {
    const dispatch = useDispatch();

    const showSearch = useSelector(
        (state: RootState) => state.settings.showSearch
    );

    const showSearchTagBar = useSelector(
        (state: RootState) => state.settings.showSearchTagBar
    );

    const searchTags = useSelector(
        (state: RootState) => state.settings.searchTags
    );

    const searchString = useSelector(
        (state: RootState) => state.settings.searchString
    );

    const [msgState, msgDispatch] = useReducer(
        (state: MsgState, action: { type: string; payload?: any }) => {
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
                    return initialMsgState;
                default:
                    return initialMsgState;
            }
        },
        initialMsgState
    );

    const closeMsg = () => msgDispatch({ type: "shut" });

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
                msgDispatch({
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

    const mostTags = useSelector((state: RootState) => state.data.tags);

    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <Container>
            <Snackbar
                open={msgState.open}
                onClose={closeMsg}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
            >
                <Alert severity={msgState.level} onClose={closeMsg}>
                    {msgState.message}
                </Alert>
            </Snackbar>
            <ToolPanel>
                {showSearch ? (
                    <SearchingArea>
                        <ToolPanelBtn
                            selected={showSearchTagBar}
                            onClick={() => dispatch(switchShowSearchTagBar())}
                        >
                            <IoPricetagsOutline />
                        </ToolPanelBtn>
                        <TagsBox>
                            {searchTags.map((tag) => (
                                <TaskTagView
                                    key={tag.id}
                                    tag={tag}
                                    showIcon
                                    onClick={(t) =>
                                        dispatch(removeSearchTags(t))
                                    }
                                />
                            ))}
                        </TagsBox>
                        <Input
                            onChange={(e) =>
                                dispatch(
                                    updateSearchString(e.currentTarget.value)
                                )
                            }
                        />
                    </SearchingArea>
                ) : !showCycle && !showRemove ? (
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
                    <SpringBox />
                )}
                <ToolGroup>
                    <ToolPanelBtn onClick={() => dispatch(switchShowSearch())}>
                        {showSearch ? <VscChromeClose /> : <IoSearchOutline />}
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
                    {!showSearch && !showCycle && !showRemove && <ToolPanelBtn
                        onClick={() => setSettingsOpen(true)}
                    >
                        <GoSettings />
                    </ToolPanelBtn>}
                </ToolGroup>
            </ToolPanel>
            {showSearchTagBar && (
                <TagsPanel>
                    {mostTags.map((tag) => (
                        <TaskTagView
                            key={tag.id}
                            tag={tag}
                            onClick={(t) => dispatch(appendSearchTags(t))}
                        />
                    ))}
                </TagsPanel>
            )}
            <TaskView />
            <StatusPanel></StatusPanel>
            <Dialog open={newTaskOpen}>
                <NewTaskView onCancel={shutNewTask} onSubmit={createNewTask} />
            </Dialog>
            <Dialog open={settingsOpen} onBackdropClick={() => setSettingsOpen(false)}>
                <SettingsDialog />
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
    height: 40px;
    padding: 0px 4px;
    background-color: #f7f5f1;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TagsPanel = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    padding: 0px 6px;
    background-color: #f7f5f1;
`;

const ToolPanelBtn = styled(ToolBtn)`
    margin: 0px 4px;
    background-color: ${(props) => props.bgColorNormal};
`;

const SearchingArea = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const TagsBox = styled.div`
    display: flex;
    overflow: hidden;
`;

const Input = styled.input`
    flex: 1;
    padding: 0px 8px;
    margin: 0px 4px;
    height: 32px;
    min-width: 40%;
    border: none;
    border-radius: 4px;
    background-color: white;

    &:focus {
        outline: none;
    }
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

const SpringBox = styled.div`
    flex: 1;
`;
