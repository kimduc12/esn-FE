import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import loadingGif from '../../assets/images/loading.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
}));

export function LoadingOverlay() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box>
                <img src={loadingGif} alt="" />
            </Box>
        </Box>
    );
}
