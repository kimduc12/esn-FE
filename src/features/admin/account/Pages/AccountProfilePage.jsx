import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import React from 'react';
import AccountChangePasswordTab from '../Components/AccountChangePasswordTab';
import AccountProfileTab from '../Components/AccountProfileTab';

const useStyles = makeStyles((theme) => ({
    root: {},
    heading: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabPanel: {
        padding: '24px 0 !important',
    },
}));

function AccountProfilePage() {
    const classes = useStyles();
    const [value, setValue] = React.useState('profile');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.heading}>
                <Typography component="h1" variant="h5">
                    Account
                </Typography>
            </Box>
            <TabContext value={value}>
                <Paper elevation={0}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Profile" value="profile" />
                            <Tab label="Billing" value="billing" />
                            <Tab label="Change Password" value="changePassword" />
                        </TabList>
                    </Box>
                </Paper>
                <TabPanel value="profile" className={classes.tabPanel}>
                    <AccountProfileTab />
                </TabPanel>
                <TabPanel value="billing" className={classes.tabPanel}>
                    Item Two
                </TabPanel>
                <TabPanel value="changePassword" className={classes.tabPanel}>
                    <AccountChangePasswordTab />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default AccountProfilePage;
