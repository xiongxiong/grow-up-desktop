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

export const CycleUnits = [
  CycleUnit.Year,
  CycleUnit.Month,
  CycleUnit.Week,
  CycleUnit.Day,
];

export interface CycleSpot {
  month?: number,
  weekday?: number,
  day?: number,
  hour?: number,
  minute?: number,
  second?: number,
}

export interface CyclePeriod {
  spotHead?: CycleSpot,
  spotTail?: CycleSpot,
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
  createAt: number,
}

export interface Cycle {
  id: string,
  title: string,
  period?: Period,
  cycleUnit: CycleUnit,
  cyclePeriods?: CyclePeriod[],
  removeAt?: number,
  createAt: number,
}

export interface DayTask {
  day: string,
  todoTasks: Task[],
  doneTasks: Task[],
}

const initialState = {
  tasks: [] as Task[],
  cycles: [] as Cycle[],
};

type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    taskCreate: (state, action: PayloadAction<NewTask>) => {
      if (action.payload.cycleUnit) {
        state.cycles.push({...action.payload, id: nanoid(), cycleUnit: action.payload.cycleUnit, createAt: Date.now()})
      } else {
        state.tasks.push({...action.payload, id: nanoid(), createAt: Date.now()});
      }
    },
    taskUpdate: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.tasks[idx] = action.payload;
      } else {
        state.tasks.push(action.payload);
      }
    },
    taskRemove: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.tasks.splice(idx, 1);
      }
    },
    cycleUpdate: (state, action: PayloadAction<Cycle>) => {

    },
    cycleRemove: (state, action: PayloadAction<Cycle>) => {

    }
  }
});

export const {
  taskCreate,
  taskUpdate,
  taskRemove,
} = slice.actions;
