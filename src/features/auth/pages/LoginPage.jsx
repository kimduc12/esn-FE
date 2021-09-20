import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setLSItem } from 'utils';
import { authActions } from '../authSlice';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,
    },
    wrapper: {
        padding: theme.spacing(2),
    },
    heading: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    boxFooter: {
        marginTop: theme.spacing(2),
        '& a': {
            fontSize: '14px',
            color: theme.palette.grey[600],
            textDecoration: 'none',
        },
    },
}));

function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLoginSubmit = async (formValues) => {
        const res = await userApi.login({
            loginName: formValues.email,
            password: formValues.password,
        });
        if (res.status) {
            setLSItem('access_token', res.data.accessToken);
            delete res.data.accessToken;
            dispatch(authActions.setRoles(res.data.roles));
            delete res.data.roles;
            dispatch(authActions.setCurrentUser(res.data));
            history.push('/admin');
        }
    };
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                <Typography component="h1" variant="h4" className={classes.heading}>
                    Login
                </Typography>
                <LoginForm onSubmit={handleLoginSubmit} />
                <Grid container className={classes.boxFooter}>
                    <Grid item xs>
                        <Link to="/forgot-password" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default LoginPage;
