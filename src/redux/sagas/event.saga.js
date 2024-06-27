import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents)
    yield takeLatest('CREATE_EVENT', createEvent)
}

function* fetchEvents() {
    try{
        const eventsResponse = yield axios.get('/api/events')
        yield put({type: 'SET_EVENTS', payload: eventsResponse.data})
    }catch(error) {
        console.error("error fetching Events-saga", error)
    }
}

function* createEvent(action) {
    try {
        const response = yield axios.post('/api/events', action.payload);
        yield put({ type: 'CREATE_EVENT_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error creating event:', error);
    }
}

export default eventSaga