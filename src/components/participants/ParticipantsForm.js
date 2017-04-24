import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import shortid from 'shortid';

const initialState = {
  name: '',
  participantAdded: false,
}

class ParticipantsForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;
    
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleChange(e, newValue) {
    this.setState({name: newValue});
  }

  handleTouchTap() {
    if (this.state.name !== '') {
      // Adds new participant
      const { name } = this.state;
      this.props.foosballStore.addParticipant({
        _id: shortid.generate(),
        name,
      });

      this.setState({name: '', participantAdded: true});
    }
  }

  handleRequestClose() {
    this.setState({name: '', participantAdded: false});
  }

  render() {
    const buttonStyle = {
      marginTop: '10px'
    };

    let options = {
      hintText: 'Participant name',
      value: this.state.name, 
    }
    
    if (this.state.name === '') {
      options = {...options, ...{ errorText: 'This field is required' }};
    }

    return (
      <div className="participants-form fs-form container column">
        <form>
          <TextField
            {...options}
            onChange={this.handleChange}
          /><br />
        </form>
        <RaisedButton label="add participant" primary={true} onTouchTap={this.handleTouchTap} style={buttonStyle}/>
        <Snackbar
          open={this.state.participantAdded}
          message="Participant added"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default inject('foosballStore')(observer(ParticipantsForm));
