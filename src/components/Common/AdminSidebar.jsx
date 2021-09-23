import { makeStyles } from '@mui/styles';
import React from 'react';
import SidebarListItem from './Sidebar/SidebarListItem';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarList } from './Sidebar/SidebarSlice';
import { sidebarActions } from './Sidebar/SidebarSlice';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InboxIcon from '@mui/icons-material/Inbox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function AdminSidebar() {
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const sidebarList = useSelector(selectSidebarList);
    const [list, setList] = React.useState([
        {
            title: 'Dashboard',
            url: '/',
            icon: <InboxIcon />,
            isActive: true,
        },
        {
            title: 'Users',
            icon: <PeopleIcon />,
            isActive: false,
            isCollapse: false,
            child: [
                {
                    title: 'User List',
                    url: '/admin/users',
                    icon: <ManageAccountsIcon />,
                    isActive: false,
                },
            ],
        },
    ]);

    const handleClickItemRedux = (item, idx) => {
        // Set isActive all item to false
        const newList = sidebarList.map((row, i) => {
            const tmp = { ...row };
            tmp.isActive = false;
            if (i === idx) {
                // Set isActive of clicked item to true
                tmp.isActive = true;
                if (tmp.hasOwnProperty('isCollapse')) {
                    tmp.isCollapse = !tmp.isCollapse;
                }
            }
            return tmp;
        });

        console.log('newList', newList);

        dispatch(sidebarActions.updateList(newList));
        if (item.hasOwnProperty('url')) {
            history.push(item.url);
        }
    };

    const handleClickItem = (item, idx) => {
        // Set isActive all item to false
        const newList = list.map((row, i) => {
            const tmp = { ...row };
            tmp.isActive = false;
            if (i === idx) {
                // Set isActive of clicked item to true
                tmp.isActive = true;
                if (tmp.hasOwnProperty('isCollapse')) {
                    tmp.isCollapse = !tmp.isCollapse;
                }
            }
            return tmp;
        });
        setList(newList);

        if (item.hasOwnProperty('url')) {
            history.push(item.url);
        }
    };

    return (
        <div className={classes.root}>
            <SidebarListItem list={list} onClickItem={handleClickItem} />
        </div>
    );
}
