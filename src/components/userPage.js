import { useSelector } from "react-redux"
import { useGetUserQuery,useSetNickMutation } from "../Redux/api"
import { Avatar, Box, Grid, Typography } from "@mui/material"
import { baseURL } from "../Redux/api"
import {BasicModal,ChangePasswordModal} from "./modals"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { useState } from "react"

const settings=["Login","Name","Created"]





const UserPage = ({userInfo,handleNewNick,handlePassword}) => {
    // const auth = useSelector( state => state.auth ) 
    // const _id = auth.user?.sub?.id 
    // const {data : payload} = useGetUserQuery(_id)
    // const userInfo = payload?.UserFindOne

    // const [nickQuery,isLoading] = useSetNickMutation()
    const [nickName,setNickName] = useState("")

    const timestamp = userInfo?.createdAt ? new Date(+userInfo.createdAt) : null
    const date1 = timestamp ? timestamp.toUTCString() : "invalid time"
    const login = userInfo?.login

    // const handleNewNick = async (nickName) => {
    //       const {data} = await nickQuery({
    //        _id:auth.user?.sub?.id ,
    //        nick: nickName
    //       })
    //       console.log(data)
    //   }
    
   
    return (
        <>
            <Grid container direction="column" padding={2}>
                <Box>
                   <Typography variant="h3">Account overview</Typography> 
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems:"center",
                    margin:"2%",
                    padding:"1%",
                }} >
                    <Avatar 
                        src={ userInfo?.avatar?.src ? baseURL+userInfo?.avatar?.src : "#"  } 
                        alt="User_Avatar"
                        sx={{width:72,height:72}}
                    >
                        { userInfo?.nick ? userInfo.nick[0] : "A" }
                    </Avatar>
                    
                    
                    
                    
                </Box>
                <Box>
               
                    <Table aria-label="simple table">
                      <TableBody key="table_user">
                          <TableRow
                            key="Nick"
                          >
                            <TableCell component="th" scope="row" >
                              {"Nick"}
                            </TableCell>
                            <TableCell align="left">{userInfo?.nick ? userInfo.nick : "No Nick" }
                            </TableCell>
                            <TableCell align="left"><BasicModal user={userInfo} onNick={(value)=>(handleNewNick(value))}></BasicModal>
                            </TableCell>
                            
                          </TableRow>
                          
                          <TableRow
                            key="Login"
                            
                          >
                            <TableCell component="th" scope="row">
                              {"Login"}
                            </TableCell>
                            <TableCell align="left">{userInfo?.login ? userInfo.login : "No login" }</TableCell>
                          </TableRow>
                          
                          <TableRow
                            key="Created"
                            
                          >
                            <TableCell component="th" scope="row">
                              {"Created at"}
                            </TableCell>
                            <TableCell align="left">{date1}</TableCell>
                          </TableRow>
                          
                        
                      </TableBody>
                    </Table>
                 
                  <ChangePasswordModal login={login}  onPassword={(user)=>handlePassword(user)} /> 
    
                </Box>
            </Grid>
            
        </>
    )
} 
export default UserPage;