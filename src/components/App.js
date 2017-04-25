import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Switch, Route, Redirect } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import AppBar from 'material-ui/AppBar';
import Footer from './Footer';
import ParticipantsList from './participants/ParticipantsList';
import ParticipantsForm from './participants/ParticipantsForm';
import MatchesList from './matches/MatchesList';
import MatchForm from './matches/MatchesForm';
import HeaderMenu from './menus/HeaderMenu';

import '../style/App.css';

// Handles tap events
injectTapEventPlugin();

/**
 * Top level component 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
  }

  handleTitleTouchTap() {
    this.props.history.push('/');
  }

  render() {
    const { match } = this.props;
    const { push } = this.props.history;
    
    return (
      <div className="app">
        <AppBar
          title="Foosball"
          showMenuIconButton={false}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTitleTouchTap={this.handleTitleTouchTap}>
          <HeaderMenu push={push}/>
        </AppBar> 

        <div className="container">
          <Switch>
            <Route exact path={`${match.url}participants`}  component={ParticipantsList}/>
            <Route exact path={`${match.url}matches`}  component={MatchesList}/>

            <Route exact path={`${match.url}matches/add`}  component={MatchForm}/>
            <Route exact path={`${match.url}participants/add`}  component={ParticipantsForm}/>

            <Redirect to={"/matches"} />
          </Switch>
          <Footer push={push}/>
        </div>
      </div>
    );
  }   
}

export default inject('foosballStore')(observer(App));
