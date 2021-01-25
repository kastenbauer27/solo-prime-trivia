import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import GameCriteria from '../GameCriteria/GameCriteria';
import './UserPage.css';


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

  startTriviaGame = () => {
    //this.props.dispatch({ type: 'FETCH_TRIVIA' });
    this.props.history.push('/play');
  }

  submitGameCriteria = (criteria) => {
    console.log('Testing search criteria', criteria);
    this.props.dispatch({
        type: 'FETCH_QUESTIONS',
        payload: criteria
    })
    this.props.history.push('/play'); 
}

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <h2 id="play-trivia">Choose Criteria and Click "Play Trivia" to Start A New Game</h2>
        {/* <p>Your ID is: {this.props.store.user.id}</p> */}
        {/* <button onClick={this.addTrivia}>Add Trivia Questions</button>
        <button onClick={this.viewSavedTrivia}>Saved Trivia Questions</button>
        <button onClick={this.startTriviaGame}>Start Trivia Game</button> */}
        <div className="game-criteria">
        <GameCriteria submitGameCriteria={this.submitGameCriteria}/>
        </div>
        <div className="log-out">
        {/* <LogOutButton className="log-in" /> */}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
