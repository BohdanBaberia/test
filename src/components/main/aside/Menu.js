// import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Menu() {
    const history = useHistory()

  return (
    <Box sx={{ width: '100%', color: "#fff"}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{history.push("/playlist")}}>
              <ListItemIcon>
               <QueueMusicRoundedIcon sx={{color: "#fff"}}/>
              </ListItemIcon>
              <ListItemText primary="Playlists" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageSearchRoundedIcon sx={{color:"#fff"}}/>
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{history.push("/create")}}>
              <ListItemIcon>
               <AddBoxOutlinedIcon sx={{color: "#fff"}}/>
              </ListItemIcon>
              <ListItemText primary="Create Playlist" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

