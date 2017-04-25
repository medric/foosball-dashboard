import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';
import { yellow500 } from 'material-ui/styles/colors';

import '../../style/MatchesForm.css';

const initialState = {
  date: undefined,
  team0: [],
  team1: [],
  winner: '',
  showSnackbar: false,
  snackbarMessage: '',
  isValid: false,
}

const winnerOptions = [
  {
    value: 'team0', 
    label: 'team 1',
  },
  {
    value: 'team1', 
    label: 'team 2',
  }
];

/**
 * Displays a form to add a match result
 * @class MatchesForm
 * @extends {Component}
 */
class MatchesForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = initialState;

    this.pickDate = this.pickDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    const store = this.props.foosballStore;

    // Reactive options
    this.setState({
      participantsOptions: store.participantsSelectOptions,
    });
  }

  reset() {
    this.setState(initialState);
  }

  pickDate(e, date) {
    this.setState({
      // Converts to timestamp
      date,
    });
  }

  handleSelectChange(key, value) {
    const newValue = Array.isArray(value) ? 
      value.reduce((acc, v) => acc.concat(v.value), []) : value;

    this.setState({
      [key]: newValue
    });
  }

  handleTouchTap() {
    if (this.validate()) {
      const { date, team0, team1, winner } = this.state;
      const match = {
        date: +date,
        team0,
        team1,
        winner,
      };
      
      // Adds a match
      try {
        this.props.foosballStore.addMatch(match);
        this.setState({snackbarMessage: 'Match result added', showSnackbar: true, isValid: true});
      } catch (e) {
        this.setState({snackbarMessage: e.message, showSnackbar: true});
      }
    } else {
      this.setState({snackbarMessage: 'Please check the inputs', showSnackbar: true});
    }
  }

  handleRequestClose() {
    if (this.state.isValid) {
      this.reset();
    }
  }

  reset() {
    this.setState(initialState);
  }

  redirect() {
    this.props.history.push('/matches');
  }

  validate() {
    return this.state.date && 
            this.state.team0.length > 0 &&
            this.state.team1.length > 0 &&
            this.state.winner !== '';
  }

  render() {
    const store = this.props.foosballStore;

    const subheaderStyle = {
      fontWeight: '800',
    };

    const button1Style = {
      marginTop: '60px',
    };

    const button2Style = {
      marginTop: '10px',
    };

    return (
      <div className="matches-form fs-form container column">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Add a match result</h2>
          <Subheader style={subheaderStyle}>Match date</Subheader>
          <DatePicker 
            hintText="Pick a date" 
            value={this.state.date} 
            onChange={this.pickDate} />
          <Subheader style={subheaderStyle}>Team 1</Subheader>
          <Select
            name="team-0"
            multi
            value={this.state.team0}
            options={this.state.participantsOptions}
            onChange={(value) => this.handleSelectChange('team0', value)}
          />
          <Subheader style={subheaderStyle}>Team 2</Subheader>
          <Select
            name="team-1"
            multi
            value={this.state.team1}
            options={this.state.participantsOptions}
            onChange={(value) => this.handleSelectChange('team1', value)}
          />
          <Subheader style={subheaderStyle}>Winner</Subheader>
          <Select
            name="winner"
            value={this.state.winner}
            options={winnerOptions}
            onChange={(value) => this.handleSelectChange('winner', value)}
          />  
        </form>
        <RaisedButton 
          label="add result" 
          primary={true}
          labelColor="#FFF"
          onTouchTap={this.handleTouchTap} 
          style={button1Style}/>
        <RaisedButton 
          label="see matches lists" 
          backgroundColor={yellow500}
          labelColor="#FFF"
          onTouchTap={this.redirect} 
          style={button2Style}/>
        <Snackbar
          open={this.state.showSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={1000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default inject('foosballStore')(observer(MatchesForm));
