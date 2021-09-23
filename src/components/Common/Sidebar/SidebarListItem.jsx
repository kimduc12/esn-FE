import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import React from 'react';

function SidebarListItem({ list, onClickItem }) {
    const handleClickItem = (item, idx) => {
        if (!onClickItem) return;
        onClickItem(item, idx);
    };
    return (
        <List component="nav">
            {list.map((item, idx) => (
                <React.Fragment key={idx}>
                    <ListItemButton
                        selected={item.isActive}
                        onClick={() => handleClickItem(item, idx)}
                    >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.title} />
                        {item.hasOwnProperty('child') ? (
                            item.isCollapse ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )
                        ) : (
                            ''
                        )}
                    </ListItemButton>
                    {item.hasOwnProperty('child') && (
                        <Collapse in={item.isCollapse}>
                            <List component="div" disablePadding>
                                {item.child.map((childItem, childIdx) => (
                                    <React.Fragment key={`${idx}-${childIdx}`}>
                                        <ListItemButton
                                            selected={childItem.isActive}
                                            sx={{ pl: 4 }}
                                            onClick={() => handleClickItem(childItem, childIdx)}
                                        >
                                            {childItem.icon && (
                                                <ListItemIcon>{childItem.icon}</ListItemIcon>
                                            )}
                                            <ListItemText primary={childItem.title} />
                                        </ListItemButton>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
}

SidebarListItem.propTypes = {
    list: PropTypes.array,
    onClickItem: PropTypes.func,
};

export default SidebarListItem;
