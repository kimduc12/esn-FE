import { Button, Divider, LinearProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import UserListFilter from '../Components/UserListFilter';
import UserListTable from '../Components/UserListTable';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        top: '-10px',
        width: '100%',
    },
    heading: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filter: {
        padding: theme.spacing(0, 2, 1, 2),
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
    },
}));

function AdminUserListPage() {
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch();
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        users: [],
        pagination: {
            total: 0,
            current_page: 0,
        },
    });
    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 1,
    });

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await userApi.getList(filter);
            if (res.status) {
                setList(res.data);
            }
            setLoading(false);
        })();
    }, [filter]);

    const handleFilter = async (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };

    const handleDelete = async (id) => {
        setLoading(true);
        const res = await userApi.delete([id]);
        if (res.status) {
            setFilter({
                per_page: 10,
                page: 1,
            });
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    return (
        <Box className={classes.root}>
            {loading && (
                <Box className={classes.loading}>
                    <LinearProgress />
                </Box>
            )}

            <Box className={classes.heading}>
                <Typography component="h1" variant="h5">
                    User List
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`${match.url}/add`)}
                    >
                        Add
                    </Button>
                </Box>
            </Box>

            <Paper elevation={3}>
                <Box className={classes.filter}>
                    <UserListFilter loading={loading} filter={filter} onSubmit={handleFilter} />
                </Box>
                <Divider />

                <UserListTable
                    list={list.users}
                    pagination={list.pagination}
                    loading={loading}
                    filter={filter}
                    onFilter={handleFilter}
                    onDelete={handleDelete}
                />
            </Paper>
        </Box>
    );
}

export default AdminUserListPage;
