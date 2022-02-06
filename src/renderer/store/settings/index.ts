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
  taskViewFinished: false,
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
  switchTaskViewFinished,
  setSelectedTask,
} = slice.actions;
