import { createSlice } from "@reduxjs/toolkit";

interface EditingProps{
    fileUserMap: {
        [key: string]: string
    }
}

const initialState: EditingProps = {
    fileUserMap: {},
}

export const EditingSlice = createSlice({
    name: 'editing',
    initialState,
    reducers: {
        setFileUser: (state, action) => {
            const { name, fileId } = action.payload;
            state.fileUserMap[fileId] = name;
        }
    }
});

export const { setFileUser } = EditingSlice.actions;
export default EditingSlice.reducer;