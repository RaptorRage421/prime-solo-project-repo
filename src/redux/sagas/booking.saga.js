import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* bookingSaga() {
    yield takeLatest('FETCH_BOOKING_INFO', fetchBookings)
    yield takeLatest('CONFIRM_BOOKING', confirmBooking)
    yield takeLatest('DECLINE_BOOKING', declineBooking)
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

function* confirmBooking(action) {
    try {
        console.log("action.payload", action.payload)
        const { bookingId } = action.payload
        yield axios.put(`/api/booking/${bookingId}`, { status: 'Confirmed' })
        yield put({ type: 'FETCH_BOOKING_INFO' })
    } catch (err) {
        console.error("Error in confirming booking", err)
    }
}

function* declineBooking(action) {
    try {
        const { bookingId } = action.payload
        yield axios.put(`/api/booking/${bookingId}`, { status: 'Declined' })
        yield put({ type: 'FETCH_BOOKING_INFO' })
    } catch (err) {
        console.error("Error in declining booking", err)
    }
}
export default bookingSaga