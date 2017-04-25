import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import '../../style/HeaderMenu.css';

/**
 * Displays the menu rendered in the App bar 
 */
const HeaderMenu = (props) => {
    const { push } = props;
    const inkBarStyle = {
        background: 'none',
        color: 'red',
    };

    const handleActive = (tab) => {
        const route = tab.props['data-route'];
        if (typeof route !== 'undefined') {
            push(route);
        }
    }   

    return (
        <div className="header-menu">
            <Tabs inkBarStyle={inkBarStyle}>
                <Tab 
                    onActive={handleActive}
                    data-route="/matches" 
                    label="Matches results" />
                <Tab 
                    onActive={handleActive}
                    data-route="/participants" 
                    label="Participants" />
            </Tabs>
        </div>
    )
}

export default HeaderMenu;

