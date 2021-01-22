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

function* fetchQuestions(action) {
    try {
        let criteria = action.payload;
        //const response = yield axios.get(`/api/trivia/${criteria}`);
        const response = yield axios.get(`https://opentdb.com/api.php?amount=${criteria.amount}&category=${criteria.category}&difficulty=${criteria.difficulty}&type=multiple`);
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

function* deleteTrivia(action) {
    try {
        console.log(`deleting trivia with id of: ${action.payload}`);
        yield axios.delete(`/api/trivia/${action.payload}`);
        yield put({ type: 'FETCH_TRIVIA' });
    } catch (err) {
        console.log('error in deleting trivia', err);
    }
}

function* updateTrivia(action) {
    try {
        yield axios.put(`/api/trivia/${action.payload.id}`, action.payload.trivia);
        yield put({ type: 'FETCH_TRIVIA' });
    } catch (err) {
        console.log('error in updating trivia question.');
    }
}

function* triviaSaga() {
    yield takeEvery('FETCH_TRIVIA', fetchTrivia);
    yield takeEvery('FETCH_HISTORY_TRIVIA', fetchHistoryTrivia);
    yield takeEvery('ADD_TRIVIA', addTrivia);
    yield takeEvery('DELETE_TRIVIA', deleteTrivia);
    yield takeEvery('UPDATE_TRIVIA', updateTrivia);
    yield takeEvery('FETCH_QUESTIONS', fetchQuestions);
}

export default triviaSaga;