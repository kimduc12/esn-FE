import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';

import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import TemporaryDrawer from './Drawer/TemporaryDrawer';
import DesktopMenu from './Menu/DesktopMenu';
import MobileMenu from './Menu/MobileMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function AdminHeader() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    return (
        <Box className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <TemporaryDrawer anchor="left">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </TemporaryDrawer>
                    <Typography variant="h6" className={classes.title}>
                        ESN Management
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <MobileMenu anchorEl={mobileMoreAnchorEl} onClose={handleMobileMenuClose} />
            <DesktopMenu anchorEl={anchorEl} onClose={handleMenuClose} />
        </Box>
    );
}
