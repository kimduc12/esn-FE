import InboxIcon from '@mui/icons-material/Inbox';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
        '&.active > div': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}));

export function AdminSidebar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to="/admin/dashboard" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}