import React from 'react';
import PropTypes from 'prop-types';
import { Button, Chip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TablePaginationActions } from 'components/Common/TablePaginationActions';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from 'components/Common/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
    root: {},
    actions: {
        '& > button': {
            marginLeft: theme.spacing(1),
            padding: '8px',
            minWidth: 'auto',
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
}));

function UserListTable({ list, pagination, filter, onFilter, onDelete }) {
    const classes = useStyles();
    const match = useRouteMatch();
    const history = useHistory();
    const [confirmDeleteDialogData, setConfirmDeleteDialogData] = React.useState({
        title: '',
        message: '',
        open: false,
        deleteItem: null,
    });

    const handleChangePage = (event, newPage) => {
        onFilter({
            page: newPage,
        });
    };

    const handleChangeRowsPerPage = (event) => {
        onFilter({
            page: 1,
            per_page: parseInt(event.target.value, 10),
        });
    };

    const handleOpenConfirmDeleteDialog = (row) => {
        setConfirmDeleteDialogData({
            title: 'Notification',
            message: `Are you sure to delete this user <strong>${row.name}</strong>!`,
            open: true,
            deleteItem: row,
        });
    };

    const handleCloseConfirmDeleteDialog = () => {
        setConfirmDeleteDialogData({
            title: '',
            message: '',
            open: false,
            deleteItem: null,
        });
    };

    const handleAcceptConfirmDeleteDialog = () => {
        handleCloseConfirmDeleteDialog();
        if (!onDelete) return;
        onDelete(confirmDeleteDialogData.deleteItem);
    };

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.length > 0 &&
                        list.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell component="th">
                                    <Link className={classes.link} to={`${match.url}/edit`}>
                                        {row.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.gender ? 'Female' : 'Male'}
                                        color={!row.status ? 'secondary' : 'primary'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip label={row?.roles[0]?.name} color={'info'} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={!row.status ? 'Unactive' : 'Active'}
                                        color={!row.status ? 'error' : 'primary'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right" className={classes.actions}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => history.push(`${match.url}/edit`)}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOpenConfirmDeleteDialog(row)}
                                    >
                                        <DeleteOutlineIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={8}
                            count={pagination.total}
                            rowsPerPage={filter.per_page}
                            page={pagination.current_page ? pagination.current_page : 0}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <ConfirmDialog
                title={confirmDeleteDialogData.title}
                message={confirmDeleteDialogData.message}
                open={confirmDeleteDialogData.open}
                onClose={handleCloseConfirmDeleteDialog}
                onConfirm={handleAcceptConfirmDeleteDialog}
            />
        </TableContainer>
    );
}

UserListTable.propTypes = {
    onFilter: PropTypes.func,
    list: PropTypes.array,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    filter: PropTypes.object,
};

export default UserListTable;
