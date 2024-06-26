import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* djSaga() {
    yield takeLatest('FETCH_DJS', fetchEvents)
}

function* fetchEvents() {
    try{
        const djResponse = yield axios.get('/api/dj')
        yield put({type: 'SET_DJS', payload: djResponse.data})
    }catch(error) {
        console.error("error fetching Events-saga", error)
    }
}

export default djSaga