import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SavedTrivia extends Component {
    
    deleteQuestion = (event, questionToDelete) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'DELETE_TRIVIA',
            payload: questionToDelete.id
        })
    }

    render() { 
        return (
            <div>
            {this.props.store.trivia.map(trivia => {
                return(
                  <div key={trivia.id}>
                      <p>{trivia.question}</p>
                  <button onClick={(event) => this.deleteQuestion(event, trivia)}>Delete Question</button>
                  <ul >
                    <li>{trivia.correct_answer}</li>
                    <li>{trivia.incorrect1}</li>
                    <li>{trivia.incorrect2}</li>
                    <li>{trivia.incorrect3}</li>
                  </ul>
                  </div>
                )
              })}
            </div> 
         );
    }
}
 
export default connect(mapStoreToProps)(SavedTrivia);