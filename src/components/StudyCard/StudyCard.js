import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SavedQuestion from '../SavedQuestion/SavedQuestion';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './StudyCard.css';

const styles = () => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
class StudyCard extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
          currentQuestionIndex: 0,
          questions: [],
          answerShown: 0,
          editMode: false
        }
      }

      componentDidMount() {
        const trivia = this.props.store.study;
        this.setState({questions: trivia});
      }

      componentDidUpdate(prevProps) {
        if (prevProps.store.study !== this.props.store.study) {
            const trivia = this.props.store.study;
            this.setState({questions: trivia});
        }
      }
      
      handleNext () {
         let incrementCurrentQuestionIndex = this.state.currentQuestionIndex + 1;
         this.setState({currentQuestionIndex: incrementCurrentQuestionIndex});
      }

    toggleAnswer = (studyCard) => {
        this.setState({ answerShown: studyCard.id });
    }

    toggleQuestion = () => {
        this.setState({ answerShown: 0 });
    }

    editMode = () => {
        this.setState({
            editMode: true
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
        this.setState({
            editMode: false,
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
        const { questions, currentQuestionIndex, answerShown, editMode } = this.state
        
        if (!questions.length) {
            return <h4>Select a Category to Study</h4>
        }
        if (currentQuestionIndex >= questions.length) {
            return (
              <div>
                <h1>End of the Study Set!</h1>
              </div>
            )
          }

        const question = questions[currentQuestionIndex].question;
        const correct_answer = questions[currentQuestionIndex].correct_answer;
        const questionId = questions[currentQuestionIndex].id;
        if (editMode === true) {
            return (
                <SavedQuestion saveChanges={this.saveChanges} trivia={questions[currentQuestionIndex]} key={questionId}/>
            )
        }
        if (answerShown === 0) {
            return (
                <div className="studyCard">
                    <Card className="studyCard" key={questionId} onClick={() => this.toggleAnswer(questions[currentQuestionIndex])}><Typography variant="h3">{question}</Typography></Card>
                    <Button variant="contained" id="study-btn" onClick={this.editMode}>Edit Question</Button>
                    <Button variant="contained" id="study-btn" onClick={(event) => this.deleteQuestion(event, questions[currentQuestionIndex])}>Delete Question</Button>
                    <Button variant="contained" id="study-btn" onClick={() => this.handleNext()}>Next Question</Button>
                </div>
            )
        }
        else if (answerShown === questionId) {
            return (
                <div className="studyCardDiv">
                    <Card className="studyCard" key={questionId} onClick={this.toggleQuestion}><Typography variant="h3">{correct_answer}</Typography></Card>
                    <Button variant="contained" id="study-btn" onClick={this.editMode}>Edit Question</Button>
                    <Button variant="contained" id="study-btn" onClick={(event) => this.deleteQuestion(event, questions[currentQuestionIndex])}>Delete Question</Button>
                    <Button variant="contained" id="study-btn" onClick={() => this.handleNext()}>Next Question</Button>
                </div>
            )
        }
    
            // <div>
            //     <button>Add Your Own Study Cards</button>  
            //     {this.props.store.study.map(studyCard => { 

            //         // return (
            //         //     <div>  
            //         //         <div className="studyCard" key={studyCard.id}><p>{studyCard.question}</p><button onClick={() => this.toggleAnswer(studyCard.id)}>Show Answer</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div> 
            //         //         <div show={this.state.answerShown === studyCard.id} className="studyCard" key={studyCard.id}><p>{studyCard.correct_answer}</p><button onClick={this.toggleAnswer}>Show Question</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></div>
            //         //     </div> 
            //         //  )
            //         if (this.state.answerShown === 0) {
            //             return (
            //                 <Card className="studyCard" key={studyCard.id}><Typography variant="h5">{studyCard.question}</Typography><button onClick={() => this.toggleAnswer(studyCard)}>Show Answer</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></Card>
            //             )
            //         }
            //         else if (this.state.answerShown === studyCard.id) {
            //             return (
            //                 <Card className="studyCard" key={studyCard.id}><Typography variant="h5">{studyCard.correct_answer}</Typography><button onClick={this.toggleAnswer}>Show Question</button><button onClick={this.editMode}>Edit Question</button><button onClick={(event) => this.deleteQuestion(event, studyCard)}>Delete Question</button></Card>
            //             )
            //         }
            //     // })}
            // </div>
    }
}
 
export default connect(mapStoreToProps)(StudyCard);;