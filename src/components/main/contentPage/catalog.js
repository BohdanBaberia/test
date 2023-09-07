import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import {Skeleton} from '@mui/material';
import {ThemeProvider, createTheme} from "@mui/material/styles";


import { Grid,Box, Typography } from '@mui/material';
import { baseURL } from '../../../Redux/api';
import {PlayButton,DeleteButton} from './buttons';



export default function Catalog({userID,player,data,PlayPlaylist,LookPlaylist,DeletePlaylist,isLoading}) {
 
  const imageUrl = "https://variety.com/wp-content/uploads/2021/09/Drake-publicity3-2021.jpg?w=1000" // Fake image if playlist doesn't have it

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#4caf50',
      },
      typography:{
        main:'#fff'
      }
    }}) 
    
  return (<>

    <Grid container padding={3} spacing={1} direction='row' justifyContent="center" flexWrap="wrap">
    {data &&  data.map((item) => ( 
      
     <Box  key={item._id}  onClick={(e)=>{LookPlaylist(item)}}    padding={1} margin={1}  
      sx={{
        display:"flex",
        width:"20%",
        height:"auto",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center", 
        backgroundColor: "#242424",
        color:"#fff",
        '&:hover':{opacity:"80%",cursor:"pointer"}}}>
         
         { !isLoading ? <Box  sx={{
            width: "100%",
            height:"100vh",
            position:"relative",
            maxHeight:"200px",
            backgroundImage: `url(${ item?.owner.avatar?.url ? baseURL+item.owner.avatar.url : imageUrl })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flex: "1 0 auto",
            opacity:"90%", 
            }}>

            { userID === item.owner._id && <DeleteButton active={item._id === player.playlist._id} onClick={(e)=>{DeletePlaylist(item)}}/> }
            
            <PlayButton  
            playlist={item}
            PlayPlaylist={PlayPlaylist}
            player={player}
            active={item._id === player.playlist._id} 
           
            />
          </Box> : <Skeleton variant='rectangular' width="100%"/> }

          { !isLoading ? <Box  sx={{display: "flex", flex:"0 0 auto",flexDirection:"column",}} >
            <Typography >{item.name ? item?.name : "bohdan" }</Typography>
            <Typography>{item.description ? item?.description : "noDescription" }</Typography>
            </Box> : <Skeleton variant='rectangular' width="100%"/>
          }
      </Box> 
      
      ))  }
      
    </Grid>
    {/* {isLoading && isFetching }  */}
   
    
  </>);
}

