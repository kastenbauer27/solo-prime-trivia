import React, { Component } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {connect} from 'react-redux';


class TriviaQuestion extends Component {
    state = {  }
    render() { 
        return (
            <div>
            {this.props.store.trivia.map(trivia => {
                return(
                  <div key={trivia.question}>
                  <p>{trivia.question}</p>
                  <button onClick={(event) => this.props.saveQuestion(event, trivia)}>Save Question</button>
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
         );
    }
}
 
export default connect(mapStoreToProps)(TriviaQuestion);