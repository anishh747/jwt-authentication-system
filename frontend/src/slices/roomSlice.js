import { apiSlice } from "./apiSlice";
const ROOM_URL = '/api/room';


export const roomSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createRoom: builder.mutation({
            query: (data) => ({
                url: `${ROOM_URL}/createroom`,
                method: 'POST',
                body: data,
            })
        }),
        inviteRoom: builder.mutation({
            query: (data) =>({
                url: `${ROOM_URL}/inviteroom`,
                method: 'POST',
                body: data,
            })
        }),
        joinRoom: builder.mutation({
            query: (data) =>({
                url: `${ROOM_URL}/joinroom`,
                method: 'POST',
                body: data,
            })
        }),
        endRoom: builder.mutation({
            query: (data) =>({
                url: `${ROOM_URL}/endroom`,
                method: 'POST',
                body: data,
            })
        })
    })
})

export const {useCreateRoomMutation, useEndRoomMutation, useJoinRoomMutation, useInviteRoomMutation} = roomSlice;