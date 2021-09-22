import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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

function ResetPasswordPage() {
    const [isSubmited, setIsSubmited] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const params = queryString.parse(location.search);
    if (params && Object.keys(params).length === 0) {
        history.push('/login');
    }
    const handleResetPasswordSubmit = async (formValues) => {
        const res = await userApi.resetPassword({
            ...params,
            ...formValues,
        });
        if (res.status) {
            setIsSubmited(true);
        } else {
            toast.error(res.message);
        }
    };
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                {!isSubmited && (
                    <>
                        <Typography component="h2" variant="h4" className={classes.heading}>
                            Reset password
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle1"
                            className={classes.subTitle}
                        >
                            Please enter your new password
                        </Typography>
                        <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />
                    </>
                )}
                {isSubmited && (
                    <>
                        <Typography component="h3" variant="h3" className={classes.heading}>
                            Password Changed!
                        </Typography>
                        <Typography component="body1" variant="body1" className={classes.subTitle}>
                            Your password has been changed successfully.
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

export default ResetPasswordPage;
