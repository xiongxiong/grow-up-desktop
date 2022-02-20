import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskTag } from "../data";

export enum ViewUnit {
    Month = "Month",
    Week = "Week",
    Day = "Day",
}

export const ViewUnits = [ViewUnit.Month, ViewUnit.Week, ViewUnit.Day];

const initialState = {
    viewUnit: ViewUnit.Day,
    timeAnchor: undefined as number | undefined, // 工具栏时间指示器指示的当前时间
    showFinish: false, // 是否查看已完成的任务
    showRemove: false, // 是否查看删除任务
    showCycle: false, // 是否查看周期任务
    selectedItem: undefined as Task | undefined,
    showSearch: false, // 是否进行搜索
    showSearchTagBar: false, // 是否显示标签搜索工具条
    searchTags: [] as TaskTag[],
    searchString: "",
};

type InitialState = typeof initialState;

export const slice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setViewUnit: (state, action: PayloadAction<ViewUnit>) => {
            state.viewUnit = action.payload;
        },
        switchViewUnit: (state) => {
            switch (state.viewUnit) {
                case ViewUnit.Day:
                    state.viewUnit = ViewUnit.Week;
                    break;
                case ViewUnit.Week:
                    state.viewUnit = ViewUnit.Month;
                    break;
                case ViewUnit.Month:
                    state.viewUnit = ViewUnit.Day;
                    break;
            }
        },
        setTimeAnchor: (state, action: PayloadAction<number>) => {
            state.timeAnchor = action.payload;
        },
        setTimeAnchorToNow: (state) => {
            state.viewUnit = ViewUnit.Day;
            state.timeAnchor = Date.now();
            state.showFinish = false;
        },
        switchShowFinish: (state) => {
            state.showFinish = !state.showFinish;
        },
        switchShowRemove: (state) => {
            state.showRemove = !state.showRemove;
        },
        switchShowCycle: (state) => {
            state.showCycle = !state.showCycle;
        },
        setSelectedTask: (state, action: PayloadAction<Task | undefined>) => {
            state.selectedItem = action.payload;
        },
        switchShowSearch: (state) => {
            if (state.showSearch) {
                state.showSearchTagBar = false;
                state.searchTags = [];
                state.searchString = "";
            }
            state.showSearch = !state.showSearch;
        },
        switchShowSearchTagBar: (state) => {
            state.showSearchTagBar = !state.showSearchTagBar;
        },
        appendSearchTags: (state, action: PayloadAction<TaskTag>) => {
            if (
                state.searchTags.findIndex(
                    (tag) => tag.id === action.payload.id
                ) === -1
            ) {
                state.searchTags = state.searchTags.concat([action.payload]);
            }
        },
        removeSearchTags: (state, action: PayloadAction<TaskTag>) => {
            state.searchTags = state.searchTags.filter(
                (tag) => tag.id !== action.payload.id
            );
        },
        updateSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
    },
});

export const {
    setViewUnit,
    switchViewUnit,
    setTimeAnchor,
    setTimeAnchorToNow,
    switchShowFinish,
    switchShowRemove,
    switchShowCycle,
    setSelectedTask,
    switchShowSearch,
    switchShowSearchTagBar,
    appendSearchTags,
    removeSearchTags,
    updateSearchString,
} = slice.actions;
