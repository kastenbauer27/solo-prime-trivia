import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter, Router, Route } from 'react-router-dom';
import PlayView from '../PlayView/PlayView';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


class GameCriteria extends Component {
    state = { 
        searchCriteria: {
            amount: '',
            category: '',
            difficulty: ''
        }
    }

    handleChangeFor = (event, propertyName) => {
        event.preventDefault();
        this.setState({
            searchCriteria: {
                ...this.state.searchCriteria,
                [propertyName]: event.target.value
            }
        })
    }

    submitGameCriteria = () => {
        console.log('Testing search criteria', this.state.searchCriteria);
        this.props.dispatch({
            type: 'FETCH_QUESTIONS',
            payload: this.state.searchCriteria
        })
        this.props.history.push('/play'); 
    }

    render() { 
        return (<div> 
            <form onSubmit={this.submitGameCriteria}>
                <label>Number of Questions</label>
                <input type="number" max="50" onChange={(event) => this.handleChangeFor(event, 'amount')} />
                <label>Category</label>
                <select onChange={(event) => this.handleChangeFor(event, 'category')}>
                <option value="9">General Knowledge</option>
                <option value="17">Science and Nature</option>
                <option value="21">Sports</option>
                <option value="20">Mythology</option>
                <option value="23">History</option>
                <option value="26">Celebrities</option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                </select>          
                <label>Difficulty</label>
                <select onChange={(event) => this.handleChangeFor(event, 'difficulty')}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                </select>          
                <button type="submit">Play Trivia</button>
            </form>
            
                {/* <PlayView criteria={this.state.searchCriteria} /> */}
            
            </div>
         );
    }
}
 
export default withRouter(connect(mapStoreToProps)(GameCriteria));