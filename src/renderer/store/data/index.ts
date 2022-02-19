import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface Period {
  timeHead?: number,
  timeTail?: number,
}

export interface CycleHead {
  month?: number,
  weekday?: number,
  day?: number,
  hour?: number,
  minute?: number,
  second?: number,
}

export enum CycleDuration {
  TheYear = "TheYear",
  TheMonth = "TheMonth",
  TheWeek = "TheWeek",
  TheDay = "TheDay",
  OneYear = "OneYear",
  OneMonth = "OneMonth",
  OneWeek = "OneWeek",
  OneDay = "OneDay",
  Custom = "Custom",
}

export const CycleDurationList: CycleDuration[] = [
  CycleDuration.TheDay,
  CycleDuration.TheWeek,
  CycleDuration.TheMonth,
  CycleDuration.TheYear,
  CycleDuration.OneDay,
  CycleDuration.OneWeek,
  CycleDuration.OneMonth,
  CycleDuration.OneYear,
  CycleDuration.Custom,
];

export interface CycleTail {
  cycleDuration?: CycleDuration,
  duration?: number, // 自定义任务持续时间
}

export interface CyclePeriod {
  cycleHead?: CycleHead,
  cycleTail?: CycleTail,
}

export interface NewTask {
  title: string,
  period?: Period,
  cyclePeriods?: CyclePeriod[], // 周期任务执行周期：undefined -- 普通任务；others -- 周期任务
};

export interface BasicTask extends NewTask {
  id: string,
  removeAt?: number,
  createAt: number,
}

export interface Task extends BasicTask {
  cycleId?: string, // 周期任务id
  focus?: boolean, // 是否聚焦，聚焦任务排序优先
  finishAt?: number,
}

export interface DayTask {
  day: string,
  todoTasks: Task[],
  doneTasks: Task[],
}

const initialState = {
  tasks: [] as Task[],
  cycles: [] as Task[],
};

type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    taskCreate: (state, action: PayloadAction<NewTask>) => {
      if (action.payload.cyclePeriods) {
        state.cycles.push({...action.payload, id: nanoid(), createAt: Date.now()})
      } else {
        state.tasks.push({...action.payload, id: nanoid(), createAt: Date.now()});
      }
    },
    taskUpdate: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) => task.id === action.payload.id ? action.payload : task);
    },
    taskRemove: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(({id}) => id !== action.payload.id);
    },
    taskToCycle: (state, action: PayloadAction<Task>) => {
      state.cycles.push({...action.payload, id: nanoid(), cycleId: undefined, focus: undefined, finishAt: undefined, removeAt: undefined});
    },
    cycleUpdate: (state, action: PayloadAction<Task>) => {
      state.cycles = state.cycles.map((cycle) => cycle.id === action.payload.id ? action.payload : cycle);
    },
    cycleRemove: (state, action: PayloadAction<Task>) => {
      state.cycles = state.cycles.filter(({id}) => id !== action.payload.id);
    },
  }
});

export const {
  taskCreate,
  taskUpdate,
  taskRemove,
  taskToCycle,
  cycleUpdate,
  cycleRemove,
} = slice.actions;
