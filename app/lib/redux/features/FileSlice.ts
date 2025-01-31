import { createSlice } from "@reduxjs/toolkit";

interface FileProps{
    currentFile: string | null;
    currentCode:{
        [key: string]: string
    }
    currentLanguage: string;
    fileSaved: {
        [key: string]: boolean
    };
    output: {
        [key: string]: string
    };
}

const initialState: FileProps = {
    currentFile: null,
    currentCode: {},
    currentLanguage: '',
    fileSaved: {},
    output: {}
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setCurrentFile: (state, action) => {
            state.currentFile = action.payload;
        },
        setCurrentCode: (state, action) => {
            const { fileId, code } = action.payload;
            state.currentCode[fileId] = code;
        },
        setCurrentLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
        setFileSaved: (state, action) => {
            const { fileId, saved } = action.payload;
            state.fileSaved[fileId] = saved;
        },
        setOutput: (state, action) => {
            const { fileId, output } = action.payload;
            state.output[fileId] = output;
        }
    }
});

export const { setCurrentFile, setCurrentCode, setCurrentLanguage, setFileSaved, setOutput } = fileSlice.actions;
export default fileSlice.reducer;