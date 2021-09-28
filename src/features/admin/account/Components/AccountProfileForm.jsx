import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import DatePickerField from 'components/FormFields/DatePickerField';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AccountProfileForm.propTypes = {
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

function AccountProfileForm({ data, onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        email: yup.string().email('Please enter valid email').required('Please enter email'),
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
        defaultValues: data,
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
                    <InputField name="email" label="Email" control={control} />
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

export default AccountProfileForm;
