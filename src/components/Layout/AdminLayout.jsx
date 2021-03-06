import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { AdminHeader, AdminSidebar } from 'components/Common/';
import AdminFeature from 'features/admin';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: 'auto 1fr',
            gridTemplateAreas: `"header header" "main main"`,
        },
    },
    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    main: {
        gridArea: 'main',
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(2, 3),
    },
}));

export function AdminLayout() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <AdminHeader />
            </Box>
            <Box className={classes.sidebar}>
                <AdminSidebar />
            </Box>
            <Box className={classes.main}>
                <AdminFeature />
            </Box>
        </Box>
    );
}
