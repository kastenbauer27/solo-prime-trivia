import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SavedTrivia extends Component {

    state = {
        editMode: false,
        trivia: {
            question: '',
            correct_answer: '', 
            incorrect1: '',
            incorrect2: '',
            incorrect3: '',
        }
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

    handleChangeFor = (event, propertyName) => {
        event.preventDefault();
        this.setState({
            trivia: {
                ...this.state.trivia,
                [propertyName]: event.target.value
            }
        })
    }

    render() {
        console.log(this.state.trivia); 
        return (
            <div>
            {this.props.store.trivia.map(trivia => {
                if (this.state.editMode === true) {
                    return (
                        <div key={trivia.id}>
                            <form onSubmit={(event) => this.saveChanges(event, trivia)}>
                                <textarea defaultValue={trivia.question} onChange={(event) => this.handleChangeFor(event, 'question')}></textarea>
                                <input type="text" defaultValue={trivia.correct_answer} onChange={(event) => this.handleChangeFor(event, 'correct_answer')}></input>
                                <input type="text" defaultValue={trivia.incorrect1} onChange={(event) => this.handleChangeFor(event, 'incorrect1')}></input>
                                <input type="text" defaultValue={trivia.incorrect2} onChange={(event) => this.handleChangeFor(event, 'incorrect2')}></input>
                                <input type="text" defaultValue={trivia.incorrect3} onChange={(event) => this.handleChangeFor(event, 'incorrect3')}></input>
                                <button type="submit">Save Changes</button>
                            </form>
                        </div>
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