import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorder from '@mui/icons-material/StarBorder';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open}>
                    <List component="div" disablePadding>
                        <NavLink to="/admin/dashboard" className={classes.link}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}
