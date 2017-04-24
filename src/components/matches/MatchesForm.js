import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import '../../style/MatchesForm.css';

const initialState = {
  date: undefined,
  team0: [],
  team1: [],
  winner: '',
  matchAdded: false,
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

class MatchesForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = initialState;

    this.pickDate = this.pickDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  reset() {
    this.setState(initialState);
  }

  pickDate(e, date) {
    this.setState({
      // Converts to timestamp
      date: +date,
    });
  }

  handleSelectChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleTouchTap() {
    const { date, team0, team1, winner } = this.state;
    const match = {
      date,
      team0,
      team1,
      winner,
    };
    
    // Adds a match
    this.props.foosballStore.addMatch(match);
    this.reset();
  }

  handleRequestClose() {
    this.setState({name: '', participantAdded: false});
  }

  reset() {

  }

  render() {
    const store = this.props.foosballStore;
    const participants = store.participantsSelectOptions;

    const subheaderStyle = {
      fontWeight: '800'
    };

    const buttonStyle = {
      marginTop: '10px'
    };

    return (
      <div className="matches-form fs-form container column">
        <form>
          <Subheader style={subheaderStyle}>Match date</Subheader>
          <DatePicker hintText="Pick a date" onChange={this.pickDate}/>
          <Subheader style={subheaderStyle}>Team 1</Subheader>
          <Select
            name="team-0"
            multi
            value={this.state.team0}
            options={participants}
            onChange={(value) => this.handleSelectChange('team0', value)}
          />
          <Subheader style={subheaderStyle}>Team 2</Subheader>
          <Select
            name="team-1"
            multi
            value={this.state.team1}
            options={participants}
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
        <RaisedButton label="add result" primary={true} onTouchTap={this.handleTouchTap} style={buttonStyle}/>
      </div>
    );
  }
}

export default inject('foosballStore')(observer(MatchesForm));
