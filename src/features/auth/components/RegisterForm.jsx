import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CheckboxField from 'components/FormFields/CheckboxField';
import DatePickerField from 'components/FormFields/DatePickerField';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import dayjs from 'dayjs';
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
        name: yup.string().required('Please enter your name'),
        email: yup.string().email('Please enter valid email').required('Please enter email'),
        password: yup.string().required('Please enter password'),
        phone: yup.string().required('Please enter phone'),
        gender: yup.number().typeError('Please choose your gender'),
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
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        formValues.birthday = dayjs(formValues.birthday).format('YYYY-MM-DD');
        await onSubmit(formValues);
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <InputField name="name" label="Full name" control={control} />
            <InputField name="email" label="Email" control={control} />
            <InputField type="password" name="password" label="Password" control={control} />
            <InputField name="phone" label="Phone" control={control} />
            <RadioGroupField
                name="gender"
                label="Gender"
                control={control}
                options={[
                    { label: 'Male', value: '0' },
                    { label: 'Female', value: '1' },
                ]}
            />
            <DatePickerField name="birthday" label="Birthday" control={control} />
            <CheckboxField name="is_subscribe" label="Subscribe" control={control} />
            <Box className={classes.submitButton}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting && <CircularProgress size={20} color="info" />}
                    &nbsp; Register
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterForm;
