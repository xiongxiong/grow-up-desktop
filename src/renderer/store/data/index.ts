import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Thing {
  id: string,
  name: string,
  desp?: string,
  timeHead?: number,
  timeTail?: number,
}

export enum PeriodUnit {
  Year = "Year",
  Month = "Month",
  Day = "Day",
  Hour = "Hour",
  Minute = "Minute",
  Second = "Second",
}

export interface Period {
  id: string,
  name: string,
  length: number,
  unit: PeriodUnit,
  enabled: boolean,
  things: Thing[],
}

const initialState = {
  periods: [] as Period[],
  todos: [] as Thing[],
};

type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    periodCreate: (state, action: PayloadAction<Period>) => {
      state.periods.push(action.payload);
    },
    periodUpdate: (state, action: PayloadAction<Period>) => {
      const idx = state.periods.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.periods[idx] = action.payload;
      }
    },
    periodRemove: (state, action: PayloadAction<Period>) => {
      const idx = state.periods.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.periods.splice(idx, 1);
      }
    },
    todoCreate: (state, action: PayloadAction<Thing>) => {
      state.todos.push(action.payload);
    },
    todoUpdate: (state, action: PayloadAction<Thing>) => {
      const idx = state.todos.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.todos[idx] = action.payload;
      }
    },
    todoRemove: (state, action: PayloadAction<Thing>) => {
      const idx = state.todos.findIndex(({id}) => id === action.payload.id);
      if (idx >= 0) {
        state.todos.splice(idx, 1);
      }
    },
  }
});

export const {
  periodCreate,
  periodUpdate,
  periodRemove,
  todoCreate,
  todoUpdate,
  todoRemove,
} = slice.actions;
