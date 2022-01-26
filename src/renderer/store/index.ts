import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {slice as sliceData} from "./data";
import {slice as sliceSettings} from "./settings";

const reducer = combineReducers({
  data: sliceData.reducer,
  settings: sliceSettings.reducer,
});

const store = createStore(reducer, applyMiddleware(logger));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
