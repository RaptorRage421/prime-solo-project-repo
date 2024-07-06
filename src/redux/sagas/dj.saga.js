import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* djSaga() {
    yield takeLatest('FETCH_DJS', fetchDjList)
    yield takeLatest('FETCH_DJ_DETAIL', fetchDjDetails)
    yield takeLatest('FETCH_DJS_BY_GENRES', fetchDJsByGenres)
}

function* fetchDjList(action) {
    try{
        const djResponse = yield axios.get('/api/dj')
        yield put({type: 'SET_DJS', payload: djResponse.data})
    }catch(error) {
        console.error("error fetching Events-saga", error)
    }
}

function* fetchDjDetails(action) {
    try {
        const djDetail = yield axios.get(`api/dj/${action.payload}`)
        yield put({type: 'SET_DJ_DETAILS', payload: djDetail.data})
    }catch(error) {
        console.error("Error in DJ Detail Saga", error)
    }
}

function* fetchDJsByGenres(action) {
    try {
      const response = yield axios.post('/api/dj/by-genres', { genres: action.payload });
      yield put({ type: 'SET_DJS_BY_GENRES', payload: response.data });
    } catch (error) {
      console.error('Error fetching DJs by genres:', error);
    }
  }


export default djSaga