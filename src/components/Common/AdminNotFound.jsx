import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},
    wrapper: {
        padding: theme.spacing(4),
    },
    center: {
        textAlign: 'center',
    },
}));

export function AdminNotFound() {
    const classes = useStyles();
    return (
        <Box>
            <Paper elevation={2} className={classes.wrapper}>
                <Box align="center" mb={2} className={classes.center}>
                    <Typography component="h2" variant="h2">
                        404: The page you are looking for isn’t here
                    </Typography>
                </Box>
                <Box align="center" mb={4} className={classes.center}>
                    <Typography component="h3" variant="subtitle1">
                        You either tried some shady route or you came here by mistake. Whichever it
                        is, try using the navigation.
                    </Typography>
                </Box>
                <Box align="center" mb={2} className={classes.center}>
                    <img
                        src="https://material-kit-pro-react.devias.io/static/error/error404_light.svg"
                        alt=""
                    />
                </Box>
            </Paper>
        </Box>
    );
}
