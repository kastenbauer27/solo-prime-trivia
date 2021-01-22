import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

class QuestionView extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
          currentQuestionIndex: 0,
          questions: [],
          answers: []
        }
      }

      componentDidMount() {
        const trivia = this.props.store.trivia;
        this.setState({questions: trivia});
      }

      componentDidUpdate(prevProps) {
        if (prevProps.store.trivia !== this.props.store.trivia) {
            const trivia = this.props.store.trivia;
            this.setState({questions: trivia});
        }
      }
      
      handleNext () {
         let incrementCurrentQuestionIndex = this.state.currentQuestionIndex + 1;
         this.setState({currentQuestionIndex: incrementCurrentQuestionIndex});
      }
      
      onChangeOption (value) {
        const { currentQuestionIndex } = this.state;
        let answers = [...this.state.answers];
        let correct_answer = this.state.questions[currentQuestionIndex].correct_answer;
        answers[currentQuestionIndex] = value;
        this.setState({answers})
        if ( value === correct_answer ){
            this.props.dispatch({
                type: 'INCREMENT_SCORE',
            });
        }
      }

      backToProfile = () => {
          this.props.history.push('/user');
          this.props.dispatch({
            type: 'RESET_SCORE'
        })
      }

      reviewQuestions = () => {
          this.props.history.push('/review');
          this.props.dispatch({
            type: 'SET_ANSWERS',
            payload: this.state.answers
        });
      }
      
      render() {
                
        const { questions, currentQuestionIndex, answers } = this.state
        console.log(this.state);
        if (!questions.length) {
          return <div> Loading questions...</div>
        }

    if (currentQuestionIndex >= questions.length) {
      return (
        <div>
          <h3>End of the Quiz!</h3>
          <h2>You got {this.props.store.score} questions correct out of {questions.length}</h2>
          <button onClick={this.reviewQuestions}>Review Questions</button>
          <button onClick={this.backToProfile}>Back to Profile</button>
        </div>
      )
    }
        
        //const { question, correct_answer, incorrect1, incorrect2, incorrect3 } = questions[currentQuestionIndex]
        const question = questions[currentQuestionIndex].question;
        const correct_answer = questions[currentQuestionIndex].correct_answer;
        const incorrect1 = questions[currentQuestionIndex].incorrect_answers[0];
        const incorrect2 = questions[currentQuestionIndex].incorrect_answers[1];
        const incorrect3 = questions[currentQuestionIndex].incorrect_answers[2];
      
        return (<div>
            <h1>Question {currentQuestionIndex + 1}</h1>
            <h4>{question}</h4>
            
              <label>
                <input type='radio'
                  checked={answers[currentQuestionIndex] === correct_answer}
                  value={correct_answer}
                  onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                {correct_answer}
              </label>
            <br/>
            
              <label>
                <input type='radio'
                  checked={answers[currentQuestionIndex] === incorrect1}
                  value={incorrect1}
                  onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                {incorrect1}
              </label>
              <br/>
              <label>
                <input type='radio'
                  checked={answers[currentQuestionIndex] === incorrect2}
                  value={incorrect2}
                  onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                {incorrect2}
              </label>
              <br/>
              <label>
                <input type='radio'
                  checked={answers[currentQuestionIndex] === incorrect3}
                  value={incorrect3}
                  onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                {incorrect3}
              </label>
            <hr/>
            <button onClick={() => this.handleNext()}>Next</button>
          </div>);
      }
}
 
export default withRouter(connect(mapStoreToProps)(QuestionView));