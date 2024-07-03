import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents)
    yield takeLatest('CREATE_EVENT', createEvent)
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails)
    yield takeLatest('DELETE_EVENT', deleteEvent)
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
        yield axios.post('/api/events', action.payload);
        // yield put({ type: 'CREATE_EVENT_SUCCESS', payload: response.data });
        yield put({ type: 'CLEAR_STORE'})
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        console.error('Error creating event:', error);
    }
}

function* fetchEventDetails(action) {
    try{
        const eventDetails = yield axios.get(`/api/events/${action.payload}`)
        yield put({type: 'SET_EVENT_DETAILS', payload: eventDetails.data})

    } catch(err) {
        console.error("error in event detail saga", err)
    }
}

function* deleteEvent(action) {
    try {
        const { eventId } = action.payload
        yield axios.delete(`/api/events/${eventId}`)
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        console.error('Error deleting event:', error)
    }
}


export default eventSaga