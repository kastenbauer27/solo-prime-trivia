import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import StudyCard from '../StudyCard/StudyCard';

class StudyPage extends Component {
    state = { 
        category: '',
    }

    handleChangeFor = (event) => {
        event.preventDefault();
        // this.setState({
        //     category: event.target.value,
        // })
        this.props.dispatch({
            type: 'FETCH_STUDY_CATEGORY',
            payload: event.target.value
        })
    }

    render() { 
        return (
            <div>
            <div>
                <h1>Study Page</h1>
                <h2>Select a category to study</h2>
                <select onChange={(event) => this.handleChangeFor(event)}>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science & Nature">Science and Nature</option>
                <option value="Sports">Sports</option>
                <option value="Mythology">Mythology</option>
                <option value="History">History</option>
                <option value="Celebrities">Celebrities</option>
                <option value="Entertainment: Books">Books</option>
                <option value="Entertainment: Film">Film</option>
                </select>
                </div>
                <StudyCard />
            </div> 
         );
    }
}
 
export default connect(mapStoreToProps)(StudyPage);;