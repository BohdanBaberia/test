import { Token } from "@mui/icons-material"
import { baseURL } from "../Redux/api"
import {store} from "../Redux/store"

//////// Upload ///////////////

export const uploadBase = async (url,data) => {
    const headers = { Accept : "application/json",}
    console.log(url,data)

    try{
        const token = store.getState().auth.token
        if(token){
            headers.Authorization = `Bearer ${token}`
        }
    }
    catch (e){
        console.log(e)
    }
    
    return await fetch(url,{
        method : "POST",
        headers: headers,
        body : data
    }).then(data=>data.json()).catch(error=>console.log(error))

}


export const uploadTrack = async (file) => {
    console.log(file)
    const data = new FormData();
    data.append('track',file);
    console.log(data)
    return await uploadBase(`${baseURL}track`,data)
}


export const uploadPhoto = async (file) => {
    const data = new FormData()
    data.append('photo',file)
    return await uploadBase(`${baseURL}upload`,data)
}