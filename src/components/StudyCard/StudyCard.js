import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SavedQuestion from '../SavedQuestion/SavedQuestion';

class StudyCard extends Component {
    state = { 
        answerShown: 0,
        editMode: false
    }

    toggleAnswer = (studyCard) => {
        this.setState({ answerShown: studyCard.id });
    }

    editMode = () => {
        this.setState({
            editMode: true
        })
    }

    deleteQuestion = (event, questionToDelete) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'DELETE_TRIVIA',
            payload: questionToDelete.id
        })
    }

    render() {
        
        //const answerShown = this.state.answerShown
        return (
            <div>
                <button>Add Your Own Study Cards</button> 
                {this.props.store.study.map(studyCard => {
                    if (this.state.editMode === true) {
                        return (
                            <SavedQuestion trivia={studyCard} key={studyCard.id}/>
                        )
                    }
                    // return (
                    //     <div>  
                    //         <div className="studyCard" key={studyCard.id}><p>{studyCard.question}</p><button onClick={() => this.toggleAnswer(studyCard.id)}>Show Answer</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div> 
                    //         <div show={this.state.answerShown === studyCard.id} className="studyCard" key={studyCard.id}><p>{studyCard.correct_answer}</p><button onClick={this.toggleAnswer}>Show Question</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div>
                    //     </div> 
                    //  )
                    if (this.state.answerShown === 0) {
                        return (
                            <div className="studyCard" key={studyCard.id}><p>{studyCard.question}</p><button onClick={() => this.toggleAnswer(studyCard)}>Show Answer</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div>
                        )
                    }
                    else if (this.state.answerShown === studyCard.id) {
                        return (
                            <div className="studyCard" key={studyCard.id}><p>{studyCard.correct_answer}</p><button onClick={this.toggleAnswer}>Show Question</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div>
                        )
                    }
                })}
            </div>
         );
    }
}
 
export default connect(mapStoreToProps)(StudyCard);;