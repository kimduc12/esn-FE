import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

CheckboxField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

function CheckboxField({ name, label, control, ...inputProps }) {
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
        <>
            <FormControlLabel
                inputRef={ref}
                value={value}
                onChange={onChange}
                control={<Checkbox size="small" inputProps={inputProps} />}
                label={label}
            />
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </>
    );
}

export default CheckboxField;
