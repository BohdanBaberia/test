
import { ActionPlayPause,ActionSetDuration,ActionSetTrack,ActionSetPlaylist } from "../../../Redux/thunk";
import { useDispatch } from "react-redux";
import { playPause,setTrack, playerSlice, setDuration } from "../../../Redux/toolkitSilce";


import { IconButton } from "@mui/material";
import { PauseRounded,PlayArrowRounded  } from "@mui/icons-material";

const Music = ({player,track,playlistIndex,active,item}) => {

    const dispatch = useDispatch()

    // if(!track.url){
    //     return (<></>)
    // } 
    
  


    const  handlePlayPause =  (item,status)  => {

        dispatch(ActionSetPlaylist({item,status}))
        dispatch(ActionSetTrack({track,playlistIndex}));
        dispatch(ActionPlayPause(status)) 
    }
 

  

    return (     
        <> 
            { active ? //if active=true it will change color
                <IconButton aria-label={player.isPlaying ? 'pause' : 'play'}  sx={{color:"#43a047",  }} onClick={() => {
                    if(active && player.isPlaying ){ 
                        handlePlayPause(item,false)

                    }
                    else {
                        handlePlayPause(item,true) } }}>
                    { active && player.isPlaying  ? <PauseRounded /> : <PlayArrowRounded />  }
                </IconButton>
            :
                <IconButton aria-label={player.isPlaying ? 'pause' : 'play'}  sx={{color:"#fff",  }} onClick={() => {
                    if(active && player.isPlaying ){ 
                        handlePlayPause(item,false)

                    }
                    else {
                        handlePlayPause(item,true) } }}>
                    { active && player.isPlaying  ? <PauseRounded /> : <PlayArrowRounded />  }
                </IconButton>
            }

          
        </>  
        
    );
 


}

export default Music