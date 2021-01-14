import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchTrivia() {
    try {
        const response = yield axios.get('/api/trivia');
        yield put({ type: 'SET_TRIVIA', payload: response.data });
    } catch (err) {
        console.log('Trivia GET request failed', err);
    }
}

function* fetchHistoryTrivia() {
    try {
        const response = yield axios.get('/api/trivia/history');
        yield put({ type: 'SET_TRIVIA', payload: response.data });
    } catch (err) {
        console.log('Trivia GET request failed', err);
    }
}

function* addTrivia(action) {
    try {
        yield axios.post('/api/trivia', action.payload);
        console.log('adding trivia question:', action.payload);
        yield put({ type: 'FETCH_HISTORY_TRIVIA' });
    } catch (err) {
        console.log('error in POSTing trivia', err);
    }
}

function* triviaSaga() {
    yield takeEvery('FETCH_TRIVIA', fetchTrivia);
    yield takeEvery('FETCH_HISTORY_TRIVIA', fetchHistoryTrivia);
    yield takeEvery('ADD_TRIVIA', addTrivia);
}

export default triviaSaga;