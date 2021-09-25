import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {},
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&.active': {
            background: 'rgba(0, 0, 0, 0.08)',
        },
    },
}));

function SidebarItem(props) {
    const classes = useStyles();
    const { title, route, Icon, items = [] } = props;
    const isCollapse = items && items.length > 0;
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open);
    }

    const SidebarItemComponent = (props) => {
        const { onHandleClick, route, children } = props;

        if (!route || typeof route !== 'string') {
            return <ListItemButton onClick={onHandleClick}>{children}</ListItemButton>;
        }

        // Return a LitItem with a link component
        return (
            <ListItemButton component={NavLink} exact to={route} className={classes.link}>
                {children}
            </ListItemButton>
        );
    };
    return (
        <>
            <SidebarItemComponent route={route} onHandleClick={handleClick}>
                {!!Icon && (
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                )}
                <ListItemText primary={title} inset={!Icon} />
                {isCollapse && !open && <ExpandMore />}
                {isCollapse && open && <ExpandLess />}
            </SidebarItemComponent>
            {isCollapse && (
                <Collapse in={open}>
                    <List component="div" disablePadding>
                        {items.map((item, idx) => (
                            <SidebarItem {...item} key={idx} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

SidebarItem.propTypes = {
    list: PropTypes.array,
    onClickItem: PropTypes.func,
};

export default SidebarItem;
