import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

DatePickerField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

function DatePickerField({ name, label, control, ...inputProps }) {
    const {
        field: { ref, onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    return (
        <DatePicker
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
            inputFormat="yyyy-MM-dd"
            mask="____-__-__"
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={invalid}
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
