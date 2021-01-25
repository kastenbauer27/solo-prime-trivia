import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

class SavedQuestion extends Component {
    state = { 
        trivia: {
            question: this.props.trivia.question,
            correct_answer: this.props.trivia.correct_answer, 
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
        this.props.history.push('/study');
    }
    render() { 
        console.log(this.state);
        return (
            <div key={this.props.trivia.id}>
            <form onSubmit={(event) => this.saveChanges(event, this.props.trivia)}>
                <textarea defaultValue={this.props.trivia.question} onChange={(event) => this.handleChangeFor(event, 'question')}></textarea>
                <input type="text" defaultValue={this.props.trivia.correct_answer} onChange={(event) => this.handleChangeFor(event, 'correct_answer')}></input>
                <button type="submit">Save Changes</button>
            </form>
            </div>
         );
    }
}
 
export default withRouter(connect(mapStoreToProps)(SavedQuestion));