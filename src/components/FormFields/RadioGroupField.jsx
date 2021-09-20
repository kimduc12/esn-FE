import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

RadioGroupField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
};

RadioGroupField.defaultProps = {
    options: [],
};

function RadioGroupField({ name, label, options, control, ...inputProps }) {
    const {
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    return (
        <FormControl error={invalid} margin="normal" component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row name={name} value={value} onChange={onChange} onBlur={onBlur}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio size="small" />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
    );
}

export default RadioGroupField;
