import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchTrivia() {
    try {
        const response = yield axios.get('/api/trivia/history');
        yield put({ type: 'SET_TRIVIA', payload: response.data });
    } catch (err) {
        console.log('Trivia GET request failed', err);
    }
}

function* addTrivia(action) {
    try {
        //yield axios.put('/api/trivia', action.payload);
        console.log(action.payload);
    } catch (err) {
        console.log('error in POSTing trivia', err);
    }
}

function* triviaSaga() {
    yield takeEvery('FETCH_TRIVIA', fetchTrivia);
    yield takeEvery('ADD_TRIVIA', addTrivia);
}

export default triviaSaga;