import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import StudyCard from '../StudyCard/StudyCard';
import './StudyPage.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  });

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
        const { classes } = this.props; 
        return (
            <div>
            <div>
                <h1>Study Page</h1>
                <FormControl id="study-form">
                <Select id="study-select" onChange={(event) => this.handleChangeFor(event)}>
                <MenuItem value="General Knowledge">General Knowledge</MenuItem>
                <MenuItem value="Science & Nature">Science and Nature</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Mythology">Mythology</MenuItem>
                <MenuItem value="History">History</MenuItem>
                <MenuItem value="Celebrities">Celebrities</MenuItem>
                <MenuItem value="Entertainment: Books">Books</MenuItem>
                <MenuItem value="Entertainment: Film">Film</MenuItem>
                </Select>
                </FormControl>
                </div>
                <StudyCard />
            </div> 
         );
    }
}
 
export default connect(mapStoreToProps)(StudyPage);