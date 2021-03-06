import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    submitButton: {
        marginTop: theme.spacing(1),
    },
}));

function LoginForm({ onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        email: yup.string().email('Please enter valid email').required('Please enter email'),
        password: yup.string().required('Please enter password'),
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
            <InputField name="email" label="Email" control={control} />
            <InputField type="password" name="password" label="Password" control={control} />
            <Box className={classes.submitButton}>
                <LoadingButton
                    fullWidth
                    type="submit"
                    color="primary"
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                    variant="contained"
                >
                    Login
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default LoginForm;
