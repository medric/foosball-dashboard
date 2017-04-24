import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const FloatingMenu = (props) => {
    const { push } = props;
    const handleTouchTap = (path) => {
        push(path);
    }       

    return (
        <div className="floating-menu">
            <Paper>
                <Menu> 
                    <MenuItem 
                        primaryText="Add a participant" 
                        onTouchTap={(e) => handleTouchTap('/participants/add')} />
                    <MenuItem 
                        primaryText="Add a match result" 
                        onTouchTap={(e) => handleTouchTap('/matches/add')} />
                </Menu>
            </Paper> 
        </div>
    )
}

export default FloatingMenu;

