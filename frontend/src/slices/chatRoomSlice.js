import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomInfo: localStorage.getItem('roomInfo') ? JSON.parse(localStorage.getItem('roomInfo')) : null
};

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState,
    reducers: {
        setRoomData: (state,action) => {
            state.roomInfo = action;
            localStorage.setItem('roomInfo', JSON.stringify(action.payload))
        },
        clearRoomData: (state) => {
            state.roomInfo = null;
            localStorage.removeItem('roomInfo')
        },
    },
});

export const { setRoomData, clearRoomData } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
