import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents)
}

function* fetchEvents() {
    try{
        const eventsResponse = yield axios.get('/api/events')
        yield put({type: 'SET_EVENTS', payload: eventsResponse.data})
    }catch(error) {
        console.error("error fetching Events-saga", error)
    }
}

export default eventSaga