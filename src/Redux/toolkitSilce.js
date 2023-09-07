import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from './api'
import { api } from './api'

let initialState = {
    user: null, token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut(){ 
            return initialState;
        },
        setCredentials: (state,{ payload: { user, token } }) => {
            state.user = user
            state.token = token
          },
        },

    // extraReducers: builder => 
    //     builder.addMatcher(api.endpoints.login.matchFulfilled,
    //                       (state, {payload}) => {
    //                           const tokenPayload = jwtDecode(payload.login)
    //                           if (tokenPayload){
    //                               state.token = payload.login
    //                               state.payload = tokenPayload
    //                           }
    //                       })    
})

export const {logOut,setCredentials} = authSlice.actions

export const playerSlice = createSlice({
    name: "player",
    initialState : {
        isPlaying: false,
        duration : 0, //общая длительность трека
        track: {},
        playlist:{},
        playlistIndex: 0,
        currentTime: 0,// текущая позиция в треке
        volume : 1,
    },
    reducers:{
        playPause (state,{payload}) {
            state.isPlaying = payload;
           
            
        },
        nextTrack : (state) => {
            // if([state.playlistIndex + 1] > state.playlist.tracks.length ){
            //     state.track = state.playlist.tracks[0]
            //     state.playlistIndex = 0
            //     state.isPlaying = true  
            // }
            
                if(state.playlist.tracks[state.playlistIndex + 1]?.url ){
                    state.track = state.playlist.tracks[state.playlistIndex + 1]
                    state.playlistIndex = state.playlistIndex + 1
                    state.isPlaying = true     
                }
           
           
        },
        prevTrack : (state) => {
            if(state.playlist.tracks[state.playlistIndex-1]){
                state.track = state.playlist.tracks[state.playlistIndex-1] 
                state.playlistIndex = state.playlistIndex-1
                state.isPlaying = true
            } 
        },
        setTrack: (state,{payload: {track,playlistIndex}}) => {
            state.track = track
            state.playlistIndex = playlistIndex 
        },
        setDuration: (state,{payload}) => {
            state.duration = payload
        },
        setPlaylist : (state,{payload:{item,status}}) => {
            if(!item.tracks[state.playlistIndex] || !item.tracks[state.playlistIndex].url ){
                return state
            }
            state.playlist = item
            state.track = item.tracks[0]
            state.isPlaying = status
        },
        setCurrentTime : (state,{payload}) => {
            state.currentTime = payload
        },
        setVolume : (state,{payload}) => {
            state.volume = payload
        },
    }

})

export const {playPause,nextTrack,prevTrack,setTrack,
    setDuration,setPlaylist,setCurrentTime,setVolume,} = playerSlice.actions
