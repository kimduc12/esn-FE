import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

DatePickerField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

function DatePickerField({ name, label, control, ...inputProps }) {
    const {
        field: { ref, onChange, value },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    console.log('error', error);
    console.log('value', value);
    return (
        <MobileDatePicker
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error ? true : false}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    helperText={error?.message}
                />
            )}
        />
    );
}

export default DatePickerField;
