// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { useDispatch,useSelector } from 'react-redux';
import { api,jwtDecode, useGetLoginMutation, useGetRegistrMutation } from '../Redux/api';
import { setCredentials } from '../Redux/toolkitSilce';
import { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { ActionFullRegistr } from '../Redux/thunk';




function Copyright(props) {

  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      <Link to="/login" style={{color:"white"}}>
        Do you have already account? Let's sign in!
       </Link>
       {/* {' '}
      {new Date().getFullYear()}
      {'.'}  */}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#4caf50',
      },
      Typography:{
        main:'#e8f5e9'
      }
    }
 
});

export default function SignUp() {
  let history = useHistory()

  const dispatch = useDispatch()
  const userAuth = useSelector((state)=> state.auth.user)

  const [registrQuery,{isLoading}] = useGetRegistrMutation()
  const [loginQuery,{isLoad}] = useGetLoginMutation()

  const [open,setOpen] = useState(false)
  const [stateLogin, setStateLogin] = useState("")
  const [statePassword, setStatePassword] = useState("")

  const disabled = stateLogin && statePassword ? false : true;
   
  const handleOpen = () => {
    setOpen(!open)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);

    const {data} = await registrQuery({
      login: dataForm.get('login'),
      password: dataForm.get('password')
    })
    

    if(data.createUser.login){

      const {data} = await loginQuery({
        login: dataForm.get('login'),
        password: dataForm.get('password')
      })
    
      if(data){
        const token = data.login
        const user = jwtDecode(token)
  
          if(user){
            dispatch(setCredentials({user,token}));
            dispatch(api.endpoints.getUser.initiate(user.sub.id))
            history.push("/playlist")
            localStorage.authToken = token
          } 
      }
      // dispatch(ActionFullRegistr(login,password))
      // const token = data
      // const user = data.createUser.login

      //   if(user){
      //     dispatch(setCredentials({user,token}))
      //     history.push("/playlist")
      //   }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: "white"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,borderColor: 'primary' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
              value={stateLogin}
              onChange={(e)=> setStateLogin(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={open ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={statePassword}
              onChange={(e)=> setStatePassword(e.target.value)}
            />
            <FormControlLabel onClick={handleOpen}
              control={<Checkbox value="remember" color="primary" />}
              label="Show password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Sign Up
            </Button>
        
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}