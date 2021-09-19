import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { AdminHeader } from 'components/Common/AdminHeader';
import { AdminSidebar } from 'components/Common/AdminSidebar';
import React from 'react';
import { Switch } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
    },
    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    main: {
        gridArea: 'main',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2, 3),
    },
}));

export function AdminLayout() {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.header}>
                <AdminHeader />
            </Box>
            <Box className={classes.sidebar}>
                <AdminSidebar />
            </Box>
            <Box className={classes.main}>
                <Switch></Switch>
            </Box>
        </Box>
    );
}
