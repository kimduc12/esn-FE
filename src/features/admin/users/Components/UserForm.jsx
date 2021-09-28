import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import DatePickerField from 'components/FormFields/DatePickerField';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UserForm.propTypes = {
    initialValue: PropTypes.object,
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

function UserForm({ initialValue, onSubmit }) {
    const classes = useStyles();
    const validationRules = {
        name: yup.string().required('Please enter your name'),
        password: yup
            .string()
            .typeError('Please enter your password')
            .required('Please enter your password')
            .matches(/^.{6,10}$/g, { excludeEmptyString: false, message: 'Invalid password' }),
        email: yup.string().email('Please enter valid email').required('Please enter email'),
        phone: yup.string().required('Please enter phone'),
        gender: yup.number().typeError('Please choose your gender'),
        birthday: yup
            .date()
            .typeError('Please choose your birthday')
            .required('Please choose your birthday'),
    };
    if (initialValue.email !== '') {
        validationRules.password = yup
            .string()
            .matches(/^.{6,10}$/g, { excludeEmptyString: true, message: 'Invalid password' });
    }
    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        formValues.birthday = dayjs(formValues.birthday).format('YYYY-MM-DD');
        if (formValues.password === '') {
            delete formValues.password;
        }
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
                <Grid item xs={12} md={6}>
                    <InputField name="name" label="Full name" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name="username" label="Username" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectField
                        name="role_id"
                        label="Role"
                        control={control}
                        options={[
                            { label: 'Admin', value: 1 },
                            { label: 'Vendor', value: 2 },
                            { label: 'Buyer', value: 3 },
                        ]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name="phone" label="Phone" control={control} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <RadioGroupField
                        name="gender"
                        label="Gender"
                        control={control}
                        options={[
                            { label: 'Male', value: '0' },
                            { label: 'Female', value: '1' },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <DatePickerField name="birthday" label="Birthday" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
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

export default UserForm;
