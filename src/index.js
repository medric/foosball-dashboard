import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react';
import Routes from './components/Routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FoosballStore from './stores/FoosballStore';
import muiTheme from './theme';

const foosballStore = new FoosballStore();

// Import styles
import 'react-select/dist/react-select.css';
import './style/index.css';

const stores = { foosballStore };

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>  
    <Provider {...stores}>
        <Router>
          <Routes />
        </Router>
    </Provider> 
  </MuiThemeProvider>,
  document.getElementById('root')
);
