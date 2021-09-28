import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AccountChangePasswordForm.propTypes = {
    data: PropTypes.object,
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiGrid-item': {
            '& > div': {
                marginTop: 0,
                marginBottom: 0,
            },
            '& > fieldset': {
                marginTop: 0,
                marginBottom: 0,
            },
        },
    },
}));

function AccountChangePasswordForm({ data, onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        old_password: yup.string().required('Please enter your old password'),
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
        defaultValues: data,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        delete formValues.old_password;
        delete formValues.password_confirmation;
        await onSubmit(formValues);
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
            className={classes.root}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <InputField
                        type="password"
                        name="old_password"
                        label="Old password"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField
                        type="password"
                        name="password"
                        label="New password"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField
                        type="password"
                        name="password_confirmation"
                        label="Confirm password"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoadingButton
                        type="submit"
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Save Changes
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountChangePasswordForm;
