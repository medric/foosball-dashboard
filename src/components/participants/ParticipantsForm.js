import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import shortid from 'shortid';

const initialState = {
  name: '',
  showSnackbar: false,
  snackbarMessage: '',
  isValid: false,
}

/**
 * Displays a form to add a match result
 * 
 * @class ParticipantsForm
 * @extends {Component}
 */
class ParticipantsForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;
    
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.validate = this.validate.bind(this);
  }

  reset() {
    this.setState(initialState);
  }

  handleChange(e, newValue) {
    this.setState({name: newValue});
  }

  handleTouchTap() {
    if (this.validate()) {
      // Adds the new participant
      const { name } = this.state;
      try {
         this.props.foosballStore.addParticipant({
          _id: shortid.generate(),
          name,
        });
        this.setState({snackbarMessage: 'Participant added', showSnackbar: true, isValid: true});
      } catch (e) {
        this.setState({snackbarMessage: e.message, showSnackbar: true});
      }
    } else {
      this.setState({snackbarMessage: 'Please check the inputs', showSnackbar: true});
    }
  }

  handleRequestClose() {
    this.reset();
  }

  validate() {
    return this.state.name !== '';
  }

  render() {
    const buttonStyle = {
      marginTop: '30px'
    };
  
    return (
      <div className="participants-form fs-form container column">
        <h2>Add a participant</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
              hintText="Participant name"
              value={this.state.name}
              errorText={this.state.name === '' ? 'Please enter a name' : ''}
              onChange={this.handleChange}
          /><br />
        </form>
        <RaisedButton label="add participant" primary={true} onTouchTap={this.handleTouchTap} style={buttonStyle}/>
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

export default inject('foosballStore')(observer(ParticipantsForm));
