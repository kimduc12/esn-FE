import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    submitButton: {
        marginTop: theme.spacing(1),
    },
}));

function ResetPasswordForm({ onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        password: yup
            .string()
            .min(6, 'Min is 6')
            .max(10, 'Max is 10')
            .required('Please enter your password'),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
    };
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <InputField type="password" name="password" label="New password" control={control} />
            <InputField
                type="password"
                name="password_confirmation"
                label="Confirm password"
                control={control}
            />
            <Box className={classes.submitButton}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting && <CircularProgress size={20} color="info" />}
                    &nbsp; Send password reset email
                </Button>
            </Box>
        </Box>
    );
}

export default ResetPasswordForm;
