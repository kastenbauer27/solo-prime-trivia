import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchTrivia() {
    try {
        const response = yield axios.get('/api/trivia');
        yield put({ type: 'SET_TRIVIA', payload: response.data });
    } catch (err) {
        console.log('Trivia GET request failed');
    }
}

function* triviaSaga() {
    yield takeEvery('FETCH_TRIVIA', fetchTrivia);
}

export default triviaSaga;