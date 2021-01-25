import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SavedQuestion from '../SavedQuestion/SavedQuestion';




class SavedTrivia extends Component {

    state = {
        editMode: false,
    }
    
    deleteQuestion = (event, questionToDelete) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'DELETE_TRIVIA',
            payload: questionToDelete.id
        })
    }

    editMode = () => {
        this.setState({
            editMode: true
        })
    }



    render() {
        console.log(this.state.trivia); 
        return (
            <div>
            {this.props.store.trivia.map(trivia => {
                if (this.state.editMode === true) {
                    return (
                        <SavedQuestion trivia={trivia} key={trivia.id}/>
                    )
                }
                else {
                return(
                  <div key={trivia.id}>
                      <p>{trivia.question}</p>
                  <button onClick={(event) => this.deleteQuestion(event, trivia)}>Delete Question</button>
                  <button onClick={this.editMode}>Edit Question</button>
                  <ul >
                    <li>{trivia.correct_answer}</li>
                    <li>{trivia.incorrect1}</li>
                    <li>{trivia.incorrect2}</li>
                    <li>{trivia.incorrect3}</li>
                  </ul>
            
                  </div>
                )
                }
              })}
            </div> 
         );
    }
}
 
export default connect(mapStoreToProps)(SavedTrivia);