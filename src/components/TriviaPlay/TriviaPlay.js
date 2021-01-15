import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TriviaQuestion from '../TriviaQuestion/TriviaQuestion';

class TriviaPlay extends Component {

  state = {
    
  }

  saveQuestion = (event, trivia) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'ADD_TRIVIA',
      payload: trivia
    });
  }

  render() {
    return (
      <div>
        <p>Save a question</p>
        <TriviaQuestion saveQuestion={this.saveQuestion} />
      </div>
    )
  }
}

export default connect(mapStoreToProps)(TriviaPlay);
