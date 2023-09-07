import { IconButton } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Box from "@mui/material/Box";

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material/styles";
import { WidthFull } from "@mui/icons-material";

export const PlayButton = ({PlayPlaylist,player,playlist,active}) => {

  const handlePropagation = (event) => {
    event.stopPropagation()
  }


  const theme = createTheme({
    palette: {
      primary: {
        main: '#1ed760',
      },
      secondary: {
        main: '#4caf50',
      },
      typography:{
        main:'#000000'
      }
    }})

    return (     
        <> 
        <ThemeProvider theme={theme}>
          <Box className="playlistButtons" sx={{"&:hover": {transform:"scale(1.2)"}}}  onClick={(e)=>handlePropagation(e)}>
            <IconButton 
              aria-label={player.isPlaying ? 'pause' : 'play'} 
              color="primary"
              onClick={() => {
                if(active && player.isPlaying ){ 
                    PlayPlaylist(playlist,false)
                    
                }
                else {
                    PlayPlaylist(playlist,true) } }}>
                { active && player.isPlaying  ? <PauseCircleIcon sx={{fontSize:"48px", }}  />
                 : <PlayCircleIcon sx={{fontSize:"48px"}}  />  }
            </IconButton>
            </Box>
            </ThemeProvider> 
        </>  
        
    );
 


}
export const DeleteButton = (active,) => {
  return <>
  
            <div className="deleteButtons">
              <IconButton aria-label="deletePlaylist"   >
                 { active && <ClearRoundedIcon fontSize="large" color="primary"/> }
              </IconButton>
            </div>
        </>
}
