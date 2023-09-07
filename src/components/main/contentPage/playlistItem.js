// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { CheckBox } from '@mui/icons-material';
import { baseURL } from '../../../Redux/api';
import { useGetPlaylistOneQuery } from '../../../Redux/api';
import { useParams } from 'react-router-dom';
import Music from './music';
import { useSelector } from 'react-redux';
import { useRef , useEffect, useState} from "react";
import { Box, Grid } from '@mui/material';






export default function PlaylistItem() {
  const player = useSelector(state => state.player)
  const {id : playlistID} = useParams()
  const hookResult = useGetPlaylistOneQuery(playlistID)
  const {data, isLoading} = hookResult
  
  const imageUrl = "https://variety.com/wp-content/uploads/2021/09/Drake-publicity3-2021.jpg?w=1000"

  const audioRef = useRef(new Audio(null))
  
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = (value - minute * 60).toFixed(0);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  if(isLoading)
    return <h2>LOADING</h2>
    
  return ( <>


  
     <TableContainer component={Paper} >
       <Table sx={{ Width: "100%",bgcolor:"#2a2a2a", }} aria-label="simple table">
        
         <TableHead >
           <TableRow >
             <TableCell sx={{border : 0,}}></TableCell>
             <TableCell align="right" sx={{border : 0,}}>Name</TableCell>
             <TableCell align="right" sx={{border : 0,}}>Owner</TableCell>
             <TableCell align="right" sx={{border : 0,}}>Duration</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          
         { data && data.PlaylistFindOne.tracks.map((row,index) =>(
          
            row?.url && <TableRow
               key={row._id + "row"}
               sx={{ 
                '&:last-child td, &:last-child th': { border: 0 }, 
                "&:hover" : {background:"hsla(0,0%,100%,.07)"} }}
             >
            
               <TableCell key ={row._id } component="th" scope="row" sx={{border : 0,}}>
                <Music 
                  key={row._id+"music"}  
                  player={player} 
                  item={data.PlaylistFindOne}
                  track={row} 
                  playlistIndex={index} 
                  active={row._id === player.track._id} >
                </Music>
               </TableCell>
               <TableCell align="right" sx={{color:"#fff",border : 0}}>{row.originalFileName}</TableCell>
               <TableCell align="right" sx={{border : 0,}}>{row?._id + "d"}</TableCell>
               <TableCell align="right" sx={{border : 0,}}>{ row._id === player.track._id ? formatDuration(player.duration) : "Time"}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table> 
     </TableContainer>
  </>
  );
}

