import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { authActions } from 'features/auth/authSlice';
import { removeLSItem } from 'utils';

function DesktopMenu({ anchorEl, onClose }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        if (!onClose) return;
        onClose();
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
        removeLSItem('access_token');
        history.push('/login');
    };

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => history.push('/admin/account')}>Account Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
    );
}

DesktopMenu.propTypes = {
    anchorEl: PropTypes.string,
    isMenuOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

export default DesktopMenu;
