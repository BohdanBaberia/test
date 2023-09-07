import { useRef , useEffect, useState} from "react";
import { baseURL } from "../../Redux/api";


import { PauseRounded,PlayArrowRounded , VolumeUpRounded,VolumeDownRounded,FastForwardRounded,FastRewindRounded,} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import { Avatar, Box, Grid,ThemeProvider,Typography } from "@mui/material";
import Slider from '@mui/material/Slider';
import {createTheme} from "@mui/material/styles";
import { useSelector } from "react-redux";



const Player  = ({player,handleDuration,handleCurrentTime,handleVolume,handleEnded,handlePlayPause,handleNext,handlePrev }) => {
    
    const audioRef = useRef(new Audio(null))
   
    
    const [volume,setVolume] = useState(100)
    const [position,setPosition] = useState(0)

   function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = (value - minute * 60).toFixed(0);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
      }
    // const [paused,setPaused] = useState(true)

    useEffect(()=> {
        if(player.track.url){
            audioRef.current.src = `${baseURL + player.track.url}`
            audioRef.current.key = player.track?._id
    
            audioRef.current.ondurationchange = (e) => {
                handleDuration(audioRef.current.duration)
            };
            audioRef.current.ontimeupdate = (e) => {
                handleCurrentTime(audioRef.current.currentTime)
                setPosition(audioRef.current.currentTime)
               
            };
            audioRef.current.onvolumechange = (e) => {
                handleVolume(audioRef.current.volume)//audio.volume has lenght [0,1]
            }
            audioRef.current.onended = (e) => {
                handleEnded()
            };
           
    }},[player.track.url])
    
    

    if(player.isPlaying){
        audioRef.current.play()
        }
    if(!player.isPlaying) {
        audioRef.current.pause()
        }


        const theme = createTheme({
            palette: {
              primary: {
                main: '#43a047', //#1ed760
              },
              secondary: {
                main: '#4caf50',
              },
              typography:{
                main:'#fff'
              }
            }})



    return <> 
    <ThemeProvider theme={theme}>
         <Grid container direction="row" alignItems="center" spacing={2} padding={1} sx={{color:"#fff"}} >
            <Grid item xs={4} >
                <Box  sx={{display:"flex",flexDirection:"row",justifyContent:"center", alignItems:"center", }} >
                    <Avatar 
                        width="100%"
                        alt='owner'
                        src={ baseURL + player?.track?.owner?.avatar?.url  }
                    />
                    <Typography paddingLeft={2} >{player?.track?.owner?.login}</Typography>        
                </Box>
                <Box>
                    <Typography >{player?.track?.originalFileName}</Typography> 
                </Box>
                 
            </Grid>
            <Grid  item xs={6}>
                <Box justifyContent="center" alignItems="center">
                    <Box >
                        <IconButton aria-label="prev" sx={{color:"#fff",}} onClick={()=>{ handlePrev() }}>
                            <FastRewindRounded/>
                        </IconButton>
                        <IconButton aria-label={player.isPlaying ? 'pause' : 'play'} sx={{color:"#fff"}}  onClick={() => {
                            if(player.isPlaying){ 
                                handlePlayPause(false)
                            }
                            else {
                                handlePlayPause(true) } }}>
                            { player.isPlaying ? <PauseRounded/> : <PlayArrowRounded/>  }
                        </IconButton>
                        <IconButton aria-label="next" sx={{color:"#fff"}} onClick={()=>{ handleNext() }}>
                            <FastForwardRounded/>
                        </IconButton>
                    </Box>
                    <Box >
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            color="primary"
                            value={position} 
                            min={0}
                            step={1}
                            max={player.duration || 0}
                            onChange={(_, value) => {
                                audioRef.current.currentTime = value;
                                setPosition(value);
                                 }}>
                        </Slider>
                        <Box sx={{  display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: -2,
                        }}>
                            <Typography> {formatDuration(player.currentTime)} </Typography>
                            <Typography>-{formatDuration(player.duration - player.currentTime) } </Typography>
                                      {/* <TinyText>{formatDuration(position)}</TinyText>
                                      <TinyText>-{formatDuration(duration - position)}</TinyText> */}
                        </Box>
                                  
                    </Box>                   
                </Box>
            </Grid>
            <Grid item xs={2} alignItems="center">
                <Box display="flex" flexDirection="row" alignItems="center" >
                    <VolumeDownRounded />
                    <Slider defaultValue={volume} aria-label="Volume"  size="small" onChange={(event,value ) => {
                        setVolume(volume) 
                        audioRef.current.volume = value/100 }}>
                    </Slider>
                    <VolumeUpRounded />
                </Box>
            </Grid>
        </Grid>  
        </ThemeProvider>  
    </>
}

export default Player;