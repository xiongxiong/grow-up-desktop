import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface Period {
  timeHead?: number,
  timeTail?: number,
}

export enum CycleUnit {
  Year = "Year",
  Month = "Month",
  Week = "Week",
  Day = "Day",
}

export interface CycleExecSpot {
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  minute?: number,
  second?: number,
}

export interface CyclePeriod {
  timeHead?: CycleExecSpot,
  timeTail?: CycleExecSpot,
}

export interface NewTask {
  title: string,
  period?: Period,
  cycleUnit?: CycleUnit,
  cyclePeriods?: CyclePeriod[],
};

export interface Task {
  id: string,
  cycleId?: string,
  title: string,
  period?: Period,
  finishAt?: number,
  removeAt?: number,
  timeCreate: number,
}

export interface CycleTask {
  cycleUnit: CycleUnit,
  cyclePeriods?: CyclePeriod[],
}

export interface DayTask {
  day: string,
  todoTasks: Task[],
  doneTasks: Task[],
}

const initialState = {
  tasks: [] as Task[],
  nextTasks: [] as Task[],
  cycleTasks: [] as CycleTask[],
};

type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    taskCreate: (state, action: PayloadAction<NewTask>) => {
      state.tasks.push({...action.payload, id: nanoid(), timeCreate: Date.now()});
    },
    taskUpdate: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.tasks[idx] = action.payload;
      }
    },
    taskRemove: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.tasks.splice(idx, 1);
      }
    },
  }
});

export const {
  taskCreate,
  taskUpdate,
  taskRemove,
} = slice.actions;
