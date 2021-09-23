import { createSlice } from '@reduxjs/toolkit';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InboxIcon from '@mui/icons-material/Inbox';

const defaultSidebarList = [
    {
        title: 'Dashboard',
        url: '/',
        // icon: InboxIcon,
        isActive: true,
    },
    {
        title: 'Users',
        // icon: PeopleIcon,
        isActive: false,
        isCollapse: false,
        child: [
            {
                title: 'User List',
                url: '/admin/users',
                // icon: ManageAccountsIcon,
                isActive: false,
            },
        ],
    },
];

const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        list: defaultSidebarList,
    },
    reducers: {
        updateListItemByClick(state, action) {
            state.list = action.payload;
        },
        updateList(state, action) {
            state.list = action.payload;
        },
    },
});

export const sidebarActions = SidebarSlice.actions;

export const selectSidebarList = (state) => state.sidebar.list;

const sidebarReducer = SidebarSlice.reducer;
export default sidebarReducer;
