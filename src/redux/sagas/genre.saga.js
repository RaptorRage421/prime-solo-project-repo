import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* genreSaga() {
    yield takeLatest('FETCH_GENRES', fetchGenres)
    yield takeLatest('SEND_GENRES', sendGenres)
}

function* fetchGenres() {
    try{
        const genreResponse = yield axios.get('/api/genres')
        yield put({type: 'SET_GENRES', payload: genreResponse.data})
    }catch(error) {
        console.error("error fetching Genres-saga", error)
    }
}

function* sendGenres(action) {
try {
    const { userId, genres } = action.payload
    yield axios.post(`/api/genres/${userId}`, genres)
    yield put({type: 'FETCH_GENRES'})
}catch(err) {
    console.log("Error adding Genres to DJ_Genre junction table", err)
}
}

export default genreSaga