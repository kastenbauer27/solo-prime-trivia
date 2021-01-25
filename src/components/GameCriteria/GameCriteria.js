import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './GameCriteria.css';

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

    // submitGameCriteria = () => {
    //     console.log('Testing search criteria', this.state.searchCriteria);
    //     this.props.dispatch({
    //         type: 'FETCH_QUESTIONS',
    //         payload: this.state.searchCriteria
    //     })
    //     this.props.history.push('/play'); 
    // }

    render() { 
        const { classes } = this.props;
        return (<div> 
            <FormControl className={classes.formControl}>
                <InputLabel id="number-select-label">Number of Questions</InputLabel>
                <Select labelId="number-select-label" id="number-select" value={this.state.amount} onChange={(event) => this.handleChangeFor(event, 'amount')} >
                    <MenuItem value="" disabled> Number of Questions</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select labelId="category-select-label" id="category-select" value={this.state.category} onChange={(event) => this.handleChangeFor(event, 'category')}>
                    <MenuItem value="" disabled> Category</MenuItem>
                    <MenuItem value="9">General Knowledge</MenuItem>
                    <MenuItem value="17">Science and Nature</MenuItem>
                    <MenuItem value="21">Sports</MenuItem>
                    <MenuItem value="20">Mythology</MenuItem>
                    <MenuItem value="23">History</MenuItem>
                    <MenuItem value="26">Celebrities</MenuItem>
                    <MenuItem value="10">Books</MenuItem>
                    <MenuItem value="11">Film</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>          
                <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                <Select labelId="difficulty-select-label" id="difficulty-select" value={this.state.difficulty} onChange={(event) => this.handleChangeFor(event, 'difficulty')}>
                    <MenuItem value="" disabled>Difficulty</MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                </Select>             
            </FormControl>
            <Button variant="contained" id="play-trivia-btn" onClick={() => this.props.submitGameCriteria(this.state.searchCriteria)}>Play Trivia</Button>
                {/* <PlayView criteria={this.state.searchCriteria} /> */}
            
            </div>
         );
    }
}
 
export default withStyles(styles, {withTheme: true}, (withRouter(connect(mapStoreToProps))))(GameCriteria);