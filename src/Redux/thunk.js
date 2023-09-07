import { playerSlice } from "./toolkitSilce";
import { authSlice } from "./toolkitSilce";
import { api, useGetRegistrMutation, useGetUserQuery } from "./api";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
import passwordApi from "./passwordApi";
import { uploadTrack } from "../requests/requests";


const { playPause, nextTrack,prevTrack,setTrack,
    setDuration,setPlaylist,setCurrentTime,setVolume,} = playerSlice.actions


////////////////////////////////////Player///////////////////////////////////////////

export const ActionPlayPause = (isPlaying) =>
    async (dispatch, getState) => {
        await dispatch(playPause(isPlaying));
};

export const ActionNextTrack = (playlist) =>
    async (dispatch, getState) => {
        await dispatch(nextTrack());
};

export const ActionPrevTrack = (playlist) =>
    async (dispatch, getState) => {
        await dispatch(prevTrack());
};

export const ActionSetTrack = (track,playlistIndex) =>
    async (dispatch, getState) => {
        await dispatch(setTrack(track,playlistIndex));
};

export const ActionSetPlaylist = (playlist) =>
    async (dispatch, getState) => {
        await dispatch(setPlaylist(playlist));
};

export const ActionSetDuration = (duration) =>
    async (dispatch, getState) => {
        await dispatch(setDuration(duration));
};

export const ActionSetCurrentTime = (currentTime) =>
    async (dispatch, getState) => {
        await dispatch(setCurrentTime(currentTime));
};

export const ActionSetVolume = (volume) =>
    async (dispatch, getState) => {
        await dispatch(setVolume(volume));
};

/////////////////////////////USER////////////////////////////

export const ActionAboutMe = (id) =>
async (dispatch, getState) => {
    await dispatch(api.endpoints.getUser(id));
};

export const ActionSetPassword = (user) => 
async (dispatch,getState) => {
    return await dispatch (passwordApi.endpoints.setPassword.initiate(user))
}



/////////////////////////////LogIn and Regisrtation/////////////////////////

// export const ActionFullRegistr = (login, password) =>
// async (dispatch) => {
//    let userRegistr =  await dispatch(useGetRegistrMutation(login,password)) 
//    if(userRegistr){
//         dispatch(actionFullLogin(login,password))
//     }
// }



////////////////////////////Create Playlist/////////////////////////////////////

export const ActionCreatePlaylist = ({name,description,files}) =>
async (dispatch,getState) => {
    await dispatch (api.endpoints.playlistUpsert.initiate({
        name,
        description,
        tracks: await ActionUploadTrack(files)
    }))
}

////////////////////////////////// Upload /////////////////////////////////////

export const ActionUploadTrack = async (files) => {
    await Promise.all(Array.from(files).map(async (item)=>{
        const track = await uploadTrack(item) 
        console.log(track)
        return { _id : track._id}
    }))
}