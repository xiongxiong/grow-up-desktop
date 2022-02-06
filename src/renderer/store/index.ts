import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { autoRehydrate } from 'redux-phoenix';
import {slice as sliceData} from "./data";
import {slice as sliceSettings} from "./settings";

const reducer = combineReducers({
  data: sliceData.reducer,
  settings: sliceSettings.reducer,
});

const store = createStore(reducer, compose(applyMiddleware(logger), autoRehydrate));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
