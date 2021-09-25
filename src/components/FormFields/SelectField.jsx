import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
};

function SelectField({ name, label, control, options = [], ...inputProps }) {
    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <FormControl
            sx={{ minWidth: 120, marginTop: '16px', marginBottom: '8px' }}
            error={invalid}
            fullWidth
            size="small"
        >
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <Select labelId={`select-${name}`} value={value} label={label} onChange={onChange}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((row, i) => (
                    <MenuItem key={i} value={row.value}>
                        {row.label}
                    </MenuItem>
                ))}
            </Select>
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
    );
}

export default SelectField;
