import { configureStore } from "@reduxjs/toolkit";
import FileReducer from "../features/FileSlice";
import ProjectReducer from "../features/ProjectSlice";
import EditingReducer from "../features/EditingSlice";

export const store = configureStore({
    reducer: {
        file: FileReducer,
        project: ProjectReducer,
        editing: EditingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch