import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

const triviaArray = [];

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
        // Do your axios call and set the questions state.
        // For the sake of simplicity,I'll be using my array.
        this.props.dispatch({ type: 'FETCH_TRIVIA' });
        let trivia = this.props.store.trivia;
        for(let i = 0; i < trivia.length; i++){
            triviaArray.push(trivia[i]);
        }
        this.setState({questions: triviaArray});
        
      }


      
      handleNext () {
         let incrementCurrentQuestionIndex = this.state.currentQuestionIndex + 1
         this.setState({currentQuestionIndex: incrementCurrentQuestionIndex})
      }
      
      onChangeOption (value) {
        const { currentQuestionIndex } = this.state
        let answers = [...this.state.answers]
        answers[currentQuestionIndex] = value
        
        this.setState({answers}) 
      }
      
      render() {
         console.log(this.state);
        console.log(this.state.questions);       
        const { questions, currentQuestionIndex, answers } = this.state
        if (!questions.length) {
          return <div> Loading questions...</div>
        }

    if (currentQuestionIndex >= questions.length) {
      return (
        <div>
          <h3>End of the Quiz!</h3>
        </div>
      )
    }
        
        const { question, correct_answer, incorrect1, incorrect2, incorrect3 } = questions[currentQuestionIndex]
      
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
 
export default connect(mapStoreToProps)(QuestionView);;