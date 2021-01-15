import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  addTrivia = () => {
    this.props.dispatch({ type: 'FETCH_HISTORY_TRIVIA'});
    this.props.history.push('/trivia');
  }

  viewSavedTrivia = () => {
    this.props.dispatch({ type: 'FETCH_TRIVIA' });
    this.props.history.push('/savedtrivia');
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <button onClick={this.addTrivia}>Add Trivia Questions</button>
        <button onClick={this.viewSavedTrivia}>Saved Trivia Questions</button>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
