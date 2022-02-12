import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../data";

export enum TaskViewUnit {
    Month = "Month",
    Week = "Week",
    Day = "Day",
}

export const TaskViewUnits = [
    TaskViewUnit.Month,
    TaskViewUnit.Week,
    TaskViewUnit.Day,
];

export enum TaskViewMode {
    Common = "Common", // 查看待办和已办
    Circle = "Circle", // 查看周期任务
    Giveup = "Giveup", // 查看弃办
}

const initialState = {
    taskViewUnit: TaskViewUnit.Day,
    taskViewAnchor: undefined as number | undefined, // 工具栏时间指示器指示的当前时间
    taskViewFinish: false, // 是否查看已完成的任务
    taskViewMode: TaskViewMode.Common,
    selectedTask: undefined as Task | undefined,
};

type InitialState = typeof initialState;

export const slice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setTaskViewUnit: (state, action: PayloadAction<TaskViewUnit>) => {
            state.taskViewUnit = action.payload;
        },
        switchTaskViewUnit: (state) => {
            switch (state.taskViewUnit) {
                case TaskViewUnit.Day:
                    state.taskViewUnit = TaskViewUnit.Week;
                    break;
                case TaskViewUnit.Week:
                    state.taskViewUnit = TaskViewUnit.Month;
                    break;
                case TaskViewUnit.Month:
                    state.taskViewUnit = TaskViewUnit.Day;
                    break;
            }
        },
        setTaskViewAnchor: (state, action: PayloadAction<number>) => {
            state.taskViewAnchor = action.payload;
        },
        setTaskViewAnchorToNow: (state) => {
            state.taskViewUnit = TaskViewUnit.Day;
            state.taskViewAnchor = Date.now();
            state.taskViewFinish = false;
        },
        switchTaskViewFinish: (state) => {
            state.taskViewFinish = !state.taskViewFinish;
        },
        switchTaskViewMode: (state, action: PayloadAction<TaskViewMode>) => {
            state.taskViewMode = action.payload;
        },
        setSelectedTask: (state, action: PayloadAction<Task | undefined>) => {
            state.selectedTask = action.payload;
        },
    },
});

export const {
    setTaskViewUnit,
    switchTaskViewUnit,
    setTaskViewAnchor,
    setTaskViewAnchorToNow,
    switchTaskViewFinish,
    switchTaskViewMode,
    setSelectedTask,
} = slice.actions;
