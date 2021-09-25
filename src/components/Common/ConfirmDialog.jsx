import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function ConfirmDialog({ title, message, open, onClose, onConfirm }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        if (!onClose) return;
        onClose();
    };

    const handleConfirm = () => {
        if (!onConfirm) return;
        onConfirm();
    };

    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    dangerouslySetInnerHTML={{ __html: message }}
                ></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    open: PropTypes.bool,
    onClost: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmDialog;
