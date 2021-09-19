import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';

ForgotPasswordForm.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},
    submitButton: {
        marginTop: theme.spacing(1),
    },
}));

function ForgotPasswordForm(props) {
    const classes = useStyles();
    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth label="Email" margin="normal" size="small" variant="outlined" />
            <Box className={classes.submitButton}>
                <Button type="submit" color="primary" variant="contained" fullWidth>
                    Forgot your password
                </Button>
            </Box>
        </Box>
    );
}

export default ForgotPasswordForm;
