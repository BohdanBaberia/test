 import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import SpatialTrackingOutlinedIcon from '@mui/icons-material/SpatialTrackingOutlined';
import { useHistory, Link } from 'react-router-dom';
import { useSelect } from '@mui/base';
import { useSelector,useDispatch } from 'react-redux';
import { useGetUserQuery } from '../../Redux/api';
import { authSlice} from '../../Redux/toolkitSilce';
import { baseURL } from '../../Redux/api';

import Search from '../main/contentPage/search';




const pages = ['Blog'];


function ResponsiveAppBar() {
  
  let history = useHistory()
  const dispatch = useDispatch()
  const userAuth = useSelector((state)=> state.auth)
  const sub = userAuth.user?.sub
  const _id = sub?.id 
  // const _id = userAuth.user?.sub?.id 



  const {data: payload,isLoading } = useGetUserQuery(_id)
  const user = payload?.userFindOne
  //  const nick = user?.nick[0]

  const {logOut: actionLogOut} =  authSlice.actions;

  const settings = [<Link to={`/user/${userAuth.user?.sub?.id}`}>Profile</Link>, 'Account', 'Dashboard', 'Logout'];

  const [nick,setNick]= useState(user?.nick[0] ? user.nick[0] : "A")
  
 console.log(user)
  


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [disabled,setDisabled] = useState(true)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function toLoginForm () {
    history.push("/login");
  } 

  function toLogOut () {
    dispatch(actionLogOut())
    localStorage.clear()
    history.push("/login")
  }



  return <>
    <AppBar position="relative" >
      <Container maxWidth="xl" style={{backgroundColor: "#121212"}}>
        <Toolbar disableGutters>
          
          <SpatialTrackingOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} ></SpatialTrackingOutlinedIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spopipy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spopipy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {  userAuth?.token ?  <Search ></Search> : null }
          { userAuth?.token ? <Button variant='outlined'  color='success'sx={{margin:"1%"}} onClick={toLogOut}> Log Out </Button> : 
          <Button variant='outlined' color='success' sx={{margin:"1%"}} onClick={toLoginForm} > Log In </Button> 
          }
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.avatar?.url ? baseURL + user?.avatar?.src : "#"} >
                  { nick ? nick : "A"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
              </>;
}
export default ResponsiveAppBar;