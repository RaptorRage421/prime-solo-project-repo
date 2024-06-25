import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* genreSaga() {
    yield takeLatest('FETCH_GENRES', fetchGenres)
}

function* fetchGenres() {
    try{
        const genreResponse = yield axios.get('/api/genres')
        yield put({type: 'SET_GENRES', payload: genreResponse.data})
    }catch(error) {
        console.error("error fetching Genres-saga", error)
    }
}

export default genreSaga