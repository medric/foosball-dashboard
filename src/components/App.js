import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Switch, Route } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Footer from './Footer';
import ParticipantsList from './participants/ParticipantsList';
import ParticipantsForm from './participants/ParticipantsForm';
import MatchesList from './matches/MatchesList';
import MatchForm from './matches/MatchesForm';

import '../style/App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="app">
        <AppBar
          title="Foosball"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

        <div className="container">
          <Switch>
            <Route exact path={`${match.url}participants`}  component={ParticipantsList}/>
            <Route exact path={`${match.url}matches`}  component={MatchesList}/>

            <Route exact path={`${match.url}matches/add`}  component={MatchForm}/>
            <Route exact path={`${match.url}participants/add`}  component={ParticipantsForm}/>
          </Switch>
          <Footer push={this.props.history.push}/>
        </div>
      </div>
    );
  }   
}

export default inject('foosballStore')(observer(App));
