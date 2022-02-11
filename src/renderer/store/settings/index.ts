import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TaskViewUnit {
  Month = "Month",
  Week = "Week",
  Day = "Day",
};

export const TaskViewUnits = [
  TaskViewUnit.Month,
  TaskViewUnit.Week,
  TaskViewUnit.Day,
];

const initialState = {
  taskViewUnit: TaskViewUnit.Day,
  taskViewAnchor: undefined as number | undefined, // 工具栏时间指示器指示的当前时间
  taskViewFinished: false, // 是否查看已完成的任务
  selectedTaskId: undefined as string | undefined,
};

type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTaskViewUnit: (state, action: PayloadAction<TaskViewUnit>) => {
      state.taskViewUnit = action.payload;
    },
    setTaskViewAnchor: (state, action: PayloadAction<number>) => {
      state.taskViewAnchor = action.payload;
    },
    setTaskViewAnchorToNow: (state) => {
      state.taskViewUnit = TaskViewUnit.Day;
      state.taskViewAnchor = Date.now();
      state.taskViewFinished = false;
    },
    switchTaskViewFinished: (state) => {
      state.taskViewFinished = !state.taskViewFinished;
    },
    setSelectedTask: (state, action: PayloadAction<string | undefined>) => {
      state.selectedTaskId = action.payload;
    }
  }
});

export const {
  setTaskViewUnit,
  setTaskViewAnchor,
  setTaskViewAnchorToNow,
  switchTaskViewFinished,
  setSelectedTask,
} = slice.actions;
