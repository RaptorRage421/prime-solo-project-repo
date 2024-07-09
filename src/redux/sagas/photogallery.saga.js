import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadImages(action) {
  const formData = new FormData()
  
  // Convert FileList to array
  const filesArray = Array.from(action.payload);

  filesArray.forEach((file) => {
    formData.append('files', file)
  });

  try {
    const response = yield axios.post('/api/upload/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

  } catch (error) {
    console.error('Error uploading files', error)
  }
}

function* fetchPhotos(action) {
  try {
    const response = yield axios.get(`/api/upload/photos/${action.payload}`)
    yield put({ type: 'SET_PHOTOS', payload: response.data })
  } catch (error) {
    console.error('Error fetching user photos', error)
  }
}

function* photoGallerySaga() {
  yield takeLatest('UPLOAD_IMAGES', uploadImages)
  yield takeLatest('FETCH_PHOTOS', fetchPhotos)
}

export default photoGallerySaga
