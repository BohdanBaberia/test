import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({user,onNick}) => {
  const [open, setOpen] = useState(false);
  const [nick,setNick] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Change Nick</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { "Change your nick" }
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { user?.nick ? user.nick : "No Nick" }
          </Typography>
          <input value={nick}  onChange={(e)=>{setNick(e.target.value)}}/>
          <button onClick={()=>onNick(nick)}
            disabled = { nick.length > 0 ? false : true }
          >
            {"Change"}
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export const ChangePasswordModal = ({login,onPassword}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [repeatPassword,setRepeatPassword] = useState("")
  const [unbar,setUnbar] = useState(true)
  
  return (
    <div>
      <Button onClick={handleOpen}>Change Password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { "Change your password" }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Current password"}
          </Typography>
          <input value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"New password"}
          </Typography>
          <input value={newPassword}  onChange={(e)=>{setNewPassword(e.target.value)}}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Repeat new password"}
          </Typography>
          <input value={repeatPassword}  onChange={(e)=>{setRepeatPassword(e.target.value)}}/>
          <button onClick={()=>onPassword({login,currentPassword,newPassword})}
            disabled = { currentPassword.length > 0 && repeatPassword === newPassword && repeatPassword.length > 0 ? false : true }
          >
            {"Change"}
          </button>
         
        </Box>
      </Modal>
    </div>
  );

}
