import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* genreSaga() {
    yield takeLatest('FETCH_GENRES', fetchGenres)
    yield takeLatest('SEND_GENRES', sendGenres)
    yield takeLatest('DELETE_GENRE', deleteGenre)
    yield takeLatest('ADD_NEW_GENRE', addGenre)
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

function* deleteGenre(action) {
    try {
        console.log(action.payload)
      const { userId, genreId } = action.payload;
      yield axios.delete(`/api/genres/${userId}/${genreId}`)
      yield put({ type: 'FETCH_DJS' })
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  }

function* addGenre(action) {
    try{
        console.log("action.payload", action.payload)
       
        yield axios.post('/api/genres', action.payload)
        yield put({type: 'FETCH_GENRES'})
    }catch (error) {
        console.error('Error adding new Genre:', error)
    }
}
  

export default genreSaga