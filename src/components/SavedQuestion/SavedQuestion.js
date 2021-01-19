import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SavedQuestion extends Component {
    state = { 
        trivia: {
            question: this.props.trivia.question,
            correct_answer: this.props.trivia.correct_answer, 
            incorrect1: this.props.trivia.incorrect1,
            incorrect2: this.props.trivia.incorrect2,
            incorrect3: this.props.trivia.incorrect3,
        }
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

    saveChanges = (event, trivia) => {
        event.preventDefault();
        let triviaToUpdate = {trivia: this.state.trivia, id: trivia.id};
        console.log(triviaToUpdate);
        this.props.dispatch({
            type: 'UPDATE_TRIVIA',
            payload: {trivia: this.state.trivia, id: trivia.id}
        });
    }
    render() { 
        console.log(this.state);
        return (
            <div key={this.props.trivia.id}>
            <form onSubmit={(event) => this.saveChanges(event, this.props.trivia)}>
                <textarea defaultValue={this.props.trivia.question} onChange={(event) => this.handleChangeFor(event, 'question')}></textarea>
                <input type="text" defaultValue={this.props.trivia.correct_answer} onChange={(event) => this.handleChangeFor(event, 'correct_answer')}></input>
                <input type="text" defaultValue={this.props.trivia.incorrect1} onChange={(event) => this.handleChangeFor(event, 'incorrect1')}></input>
                <input type="text" defaultValue={this.props.trivia.incorrect2} onChange={(event) => this.handleChangeFor(event, 'incorrect2')}></input>
                <input type="text" defaultValue={this.props.trivia.incorrect3} onChange={(event) => this.handleChangeFor(event, 'incorrect3')}></input>
                <button type="submit">Save Changes</button>
            </form>
            </div>
         );
    }
}
 
export default connect(mapStoreToProps)(SavedQuestion);