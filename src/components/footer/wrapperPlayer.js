import { useSelector,useDispatch } from "react-redux"
import Player from "./player"
import { ActionPlayPause,ActionNextTrack ,ActionSetTrack,ActionPrevTrack,ActionSetDuration, ActionSetCurrentTime,ActionSetVolume} from "../../Redux/thunk";


const WrapperPlayer = () => {
    const dispatch = useDispatch()
    const player = useSelector(state => state.player)
    const auth = useSelector(state => state.auth)
   

    function handleDuration  (duration)  {
        dispatch(ActionSetDuration(duration))
    }
    function handleCurrentTime  (currentTime)  {
        dispatch(ActionSetCurrentTime(currentTime))
    }
    function handleVolume (volume)  {
        dispatch(ActionSetVolume(volume))
    }
    function handleEnded  ()  {
        dispatch(ActionNextTrack())
    }

   function handlePlayPause (status) {
        // dispatch(ActionSetTrack({player.track,player.playlistIndex}));
        dispatch(ActionPlayPause(status))
    }
    function handleNext (){
        dispatch(ActionNextTrack())
    }
    function handlePrev (){
        dispatch(ActionPrevTrack())
    }


    return <>
        { auth?.token && //if the user has a token player will be displayed
           <Player 
                player = {player} 
                handleDuration = {handleDuration}
                handleCurrentTime = {handleCurrentTime}
                handleVolume = {handleVolume}
                handleEnded = {handleEnded}
                handlePlayPause = {handlePlayPause}
                handleNext = {handleNext}
                handlePrev = {handlePrev}

           ></Player>
        }
           </>
}

export default WrapperPlayer;