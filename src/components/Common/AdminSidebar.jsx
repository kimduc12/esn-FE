import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import { makeStyles } from '@mui/styles';
import React from 'react';
import SidebarListItem from './Sidebar/SidebarListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function AdminSidebar() {
    const classes = useStyles();
    const list = [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    route: '/admin',
                    Icon: InboxIcon,
                },
            ],
        },
        {
            title: 'Management',
            items: [
                {
                    title: 'Admin',
                    Icon: PeopleIcon,
                    items: [
                        {
                            title: 'Add new admin',
                            route: '/admin/users/add',
                        },
                        {
                            title: 'Admin List',
                            route: '/admin/users',
                        },
                    ],
                },
                {
                    title: 'Users',
                    Icon: PeopleIcon,
                    items: [
                        {
                            title: 'Add new user',
                            route: '/admin/users/add',
                        },
                        {
                            title: 'User List',
                            route: '/admin/users',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className={classes.root}>
            <SidebarListItem list={list} />
        </div>
    );
}
