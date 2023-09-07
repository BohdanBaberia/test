import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../../context';


export default function Search() {
    const {query,onSearch} = useAppContext()
    const [value,setValue] = useState("");
    
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  }}
        >
            <InputBase
                value={value}
                name={`query`}
                onChange={(e) => setValue(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton onClick={() =>  onSearch(value)} type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    ); 
}