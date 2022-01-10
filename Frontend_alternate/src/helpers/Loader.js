import * as React from 'react';
import '../css/Loader.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <div className="myload" >
            <Box sx={{ display: 'flex' }} className="loader">
                <CircularProgress />
            </Box>
        </div>

    );
}