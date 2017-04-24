import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingMenu from './FloatingMenu';

import '../style/Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showFloatingMenu: false,
        }

        this.toggleFloatingMenu = this.toggleFloatingMenu.bind(this);
    }

    toggleFloatingMenu() {
        this.setState((prevState, props) => {
            return {
                showFloatingMenu: !prevState.showFloatingMenu,
            }   
        });
    }

    render() {
        return (
            <footer>
                {
                    this.state.showFloatingMenu && <FloatingMenu {...this.props}/>  
                }
                <FloatingActionButton className="fab" onClick={this.toggleFloatingMenu}>
                    <ContentAdd />
                </FloatingActionButton>
            </footer>
        )   
    }
}

export default Footer;