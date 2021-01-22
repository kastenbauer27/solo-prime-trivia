import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ReviewPage extends Component {
    state = {  }

    saveToStudy = (event, trivia) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_TO_STUDY',
            payload: trivia
        })
    }

    render() { 
        return (
            <div>
                <div> 
                    <p>Review Page</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                            <th>Your Answer</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.trivia.map(trivia => {
                            return (
                                <tr key={trivia.correct_answer}>
                                    <td>{trivia.category}</td>
                                    <td>{trivia.question}</td>
                                    <td>{trivia.correct_answer}</td>
                                    <td><button onClick={(event) => this.saveToStudy(event, trivia)}>Save to Study Set</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default connect(mapStoreToProps)(ReviewPage);