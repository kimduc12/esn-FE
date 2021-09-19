import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

InputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

function InputField({ name, label, control, ...inputProps }) {
    const {
        field: { ref, onChange, onBlur, value },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    return (
        <TextField
            error={error ? true : false}
            name={name}
            fullWidth
            label={label}
            value={value}
            margin="normal"
            size="small"
            variant="outlined"
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            inputProps={inputProps}
            helperText={error?.message}
        />
    );
}

export default InputField;
