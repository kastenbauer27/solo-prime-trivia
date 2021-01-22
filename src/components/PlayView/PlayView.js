import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import QuestionView from '../QuestionView/QuestionView';



class PlayView extends Component {

 render() {
     return (
         <QuestionView />
     )
 }
    
}
 
export default connect(mapStoreToProps)(PlayView);