import { useState } from "react"

import DragAndDrop from "../DragAndDrop/dragAndDrop";
import { Item } from "../components/globals/dnd";
import Dnd from "../components/globals/dnd"
import Loading from "../components/globals/loading";
import history from "../components/history";
import { ActionCreatePlaylist } from "../Redux/thunk";
import { useDispatch } from "react-redux";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const CreatePlaylistForm = () => {
    const dispatch = useDispatch();

    const [files,setFiles] = useState([])
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    
    // function onSubmit({name,description,files}){
    //    return ActionCreatePlaylist({name,description,files})
    // }

    return (
        <>
            <FormControl error={!name.length} fullWidth sx={{m:1}} variant="outlined">
                <InputLabel htmlFor="outlined-adorment-name">Name of playlist</InputLabel>
                <OutlinedInput
                    autoFocus
                    value={name}
                    id="outlined-adorment-name"
                    endAdornment={
                        <InputAdornment position="end"/>
                    }
                    onChange={(e)=>setName(e.target.value)}
                    aria-describedby={ `outlined-weight-helper-text`}
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    label="Name"

                />

            </FormControl>
            <FormControl fullWidth sx={{m:1}} variant="outlined">
                <TextField
                    multiline
                    rows={4}
                    value={description}
                    id="outlined-adorment-description"
                    onChange={(e)=>setDescription(e.target.value)}
                    label="Description"
                >
                </TextField>
            </FormControl>
            <FormControl fullWidth sx={{m:1}} variant="outlined">
                    <DragAndDrop
                        fileType={"audio/*"} 
                        handleFiles={(files)=>setFiles(files)}
                    />
            </FormControl>
            <FormControl fullWidth sx={{m:1}} variant="outlined" >
                    <Dnd
                        items={files}
                        render={Item}
                        itemProp={"data"}
                        keyField={"name"}
                        onChange={(items)=>setFiles(items)}
                        onDelete={(item)=>setFiles(files.filter((file) => item !== file ))}
                    >
                    </Dnd>
            </FormControl>
            <FormControl fullWidth sx={{m:1}} variant="outlined">
                    {
                        loading ? <Loading/> : <Button variant="contained"
                            onClick={()=>{
                                setLoading(true);
                                dispatch(ActionCreatePlaylist({name,description,files})).then( (response) => {
                                    if(response?.data?.PlaylistUpsert?._id){
                                        history.push(`/playlist/${response.data.PlaylistUpsert._id}`)
                                    }
                                }) ;
                                setFiles([]);
                                setName('')
                                setDescription('')
                                setLoading(false)
                            }}
                        >
                            Create Playlist
                        </Button>
                    }
            </FormControl>
        </>
    )
}

export default CreatePlaylistForm;