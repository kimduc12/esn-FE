import { List } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import SidebarItem from './SidebarItem';

function SidebarListItem({ list }) {
    return (
        <List component="nav">
            {list.map((item, idx) => (
                <SidebarItem {...item} key={idx} />
            ))}
        </List>
    );
}

SidebarListItem.propTypes = {
    list: PropTypes.array,
};

export default SidebarListItem;
