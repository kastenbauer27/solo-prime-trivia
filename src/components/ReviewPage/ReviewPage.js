import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './ReviewPage.css';
import Button from '@material-ui/core/Button';


const StyledTableCell = withStyles((theme) => ({
    head: {
      
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

//   const styles = () => ({
//     table: {
//       minWidth: 700,
//     },
//   });

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
        //const { classes } = this.props; 
        return (
            <div>
                <div> 
                    <h1>Review Page</h1>
                </div>
                <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead >
                        <TableRow id="review-head">
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Question</StyledTableCell>
                            <StyledTableCell>Correct Answer</StyledTableCell>
                            <StyledTableCell>Save Question</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.store.trivia.map(trivia => {
                            return (
                                <StyledTableRow key={trivia.correct_answer}>
                                    <StyledTableCell>{trivia.category}</StyledTableCell>
                                    <StyledTableCell>{trivia.question}</StyledTableCell>
                                    <StyledTableCell>{trivia.correct_answer}</StyledTableCell>
                                    <StyledTableCell><Button variant="contained" id="save-to-study" onClick={(event) => this.saveToStudy(event, trivia)}>Save to Study Set</Button></StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
         );
    }
}
 
export default connect(mapStoreToProps)(ReviewPage);