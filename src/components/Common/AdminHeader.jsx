import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { removeLSItem } from 'utils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function AdminHeader() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
        removeLSItem('access_token');
        history.push('/login');
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        ESN Management
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
