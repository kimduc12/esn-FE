import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {},
    wrapper: {
        padding: theme.spacing(4),
        width: '30vw',
    },
    heading: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subTitle: {
        textAlign: 'center',
        display: 'block',
    },
    back: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        '& > a': {
            color: theme.palette.grey[600],
            textDecoration: 'none',
            '& > svg': {
                verticalAlign: 'middle',
            },
        },
    },
}));

function ForgotPasswordPage() {
    const [isSubmited, setIsSubmited] = useState(false);
    const classes = useStyles();
    const handleForgotPasswordSubmit = async (formValues) => {
        const res = await userApi.forgetPassword(formValues);
        if (res.status) {
            setIsSubmited(true);
        }
    };
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                {!isSubmited && (
                    <>
                        <Typography component="h2" variant="h4" className={classes.heading}>
                            Forgot password
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle1"
                            className={classes.subTitle}
                        >
                            Enter your email address
                        </Typography>
                        <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />
                    </>
                )}
                {isSubmited && (
                    <>
                        <Typography component="h1" variant="h4" className={classes.heading}>
                            Please check your email
                        </Typography>
                    </>
                )}
                <Box className={classes.back}>
                    <Link to="/login">
                        <ArrowBackIcon size="small" /> Back to login
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default ForgotPasswordPage;
