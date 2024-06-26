import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* djSaga() {
    yield takeLatest('FETCH_DJS', fetchDjList)
    yield takeLatest('FETCH_DJ_DETAIL', fetchDjDetails)
}

function* fetchDjList() {
    try{
        const djResponse = yield axios.get('/api/dj')
        yield put({type: 'SET_DJS', payload: djResponse.data})
    }catch(error) {
        console.error("error fetching Events-saga", error)
    }
}

function* fetchDjDetails() {
    try {
        const djDetail = yield axios.get(`api/dj/${id}`)
        yield put({type: 'SET_DJ_DETAILS', payload: djDetail.data})
    }catch(error) {
        console.error("Error in DJ Detail Saga", error)
    }
}

export default djSaga