import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TriviaPlay extends Component {

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
        <p>Playing a new game of trivia</p>
        {this.props.store.trivia.map(trivia => {
          return(
            <div key={trivia.question}>
            <p>{trivia.question}</p>
            <button onClick={(event) => this.saveQuestion(event, trivia)}>Save Question</button>
            <ul>
              <li>{trivia.correct_answer}</li>
              <li>{trivia.incorrect_answers[0]}</li>
              <li>{trivia.incorrect_answers[1]}</li>
              <li>{trivia.incorrect_answers[2]}</li>
            </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStoreToProps)(TriviaPlay);
