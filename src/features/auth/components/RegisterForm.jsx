import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import DatePickerField from 'components/FormFields/DatePickerField';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    submitButton: {
        marginTop: theme.spacing(1),
    },
}));

function RegisterForm({ onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        email: yup.string().email('Please enter valid email').required('Please enter email'),
        password: yup.string().required('Please enter password'),
        phone: yup.string().required('Please enter phone'),
        gender: yup.number(),
        birthday: yup
            .date()
            .typeError('Please choose your birthday')
            .required('Please choose your birthday'),
    });
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = (formValues) => {
        if (!onSubmit) return;
        onSubmit(formValues);
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
            <InputField name="phone" label="Phone" control={control} />
            <InputField name="gender" label="Gender" control={control} />
            <DatePickerField name="birthday" label="Birthday" control={control} />
            <InputField name="is_subscribe" label="Subscribe" control={control} />
            <Box className={classes.submitButton}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterForm;
