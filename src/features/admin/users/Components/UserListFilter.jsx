import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from 'components/FormFields/SelectField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
    },
    formControl: {
        marginRight: theme.spacing(1),
    },
    searchButton: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        '& > button': {
            padding: '8px',
            minWidth: 'auto',
        },
    },
}));

function UserListFilter({ loading, filter, onSubmit }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        keyword: yup.string(),
    });
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            keyword: filter.keyword || '',
            gender: filter.gender || '',
            status: filter.status || '',
            role_id: filter.role_id || '',
        },
        resolver: yupResolver(schema),
    });

    React.useEffect(() => {
        reset({
            keyword: filter.keyword || '',
            gender: filter.gender ?? '',
            status: filter.status ?? '',
            role_id: filter.role_id ?? '',
        });
    }, [filter, reset]);

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
    };
    const handleClearFilter = async () => {
        if (!onSubmit) return;
        await onSubmit({
            page: 1,
            keyword: '',
            gender: '',
            status: '',
            role_id: '',
        });
        reset({
            keyword: '',
            gender: '',
            status: '',
            role_id: '',
        });
    };
    return (
        <Box
            className={classes.root}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <Box className={classes.formControl}>
                <InputField name="keyword" label="Keyword" control={control} />
            </Box>
            <Box className={classes.formControl}>
                <SelectField
                    name="gender"
                    label="Gender"
                    control={control}
                    options={[
                        {
                            label: 'Male',
                            value: 0,
                        },
                        {
                            label: 'Female',
                            value: 1,
                        },
                    ]}
                />
            </Box>
            <Box className={classes.formControl}>
                <SelectField
                    name="status"
                    label="Status"
                    control={control}
                    options={[
                        {
                            label: 'Unactive',
                            value: 0,
                        },
                        {
                            label: 'Active',
                            value: 1,
                        },
                    ]}
                />
            </Box>
            <Box className={classes.formControl}>
                <SelectField
                    name="role_id"
                    label="Role"
                    control={control}
                    options={[
                        {
                            label: 'Customer',
                            value: 0,
                        },
                        {
                            label: 'Collaborator',
                            value: 1,
                        },
                    ]}
                />
            </Box>
            <Box className={classes.searchButton}>
                <LoadingButton type="submit" color="primary" loading={loading} variant="contained">
                    <SearchIcon />
                </LoadingButton>
            </Box>
            <Box className={classes.searchButton}>
                <LoadingButton
                    onClick={handleClearFilter}
                    color="primary"
                    loading={loading}
                    variant="contained"
                >
                    <ClearAllIcon />
                </LoadingButton>
            </Box>
        </Box>
    );
}

UserListFilter.propTypes = {
    onSubmit: PropTypes.func,
    filter: PropTypes.object,
    loading: PropTypes.bool,
};

export default UserListFilter;
