import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* bookingSaga() {
    yield takeLatest('FETCH_BOOKING_INFO', fetchBookings)
}

function* fetchBookings() {
try{
    const bookingResponse = yield axios.get('/api/booking')
    console.log("bookingResponse", bookingResponse)
    yield put({type: 'SET_BOOKINGS', payload: bookingResponse.data})
}catch(err) {
    console.error("Error in GET Bookings", err)
}

}

export default bookingSaga