import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Bookings = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch({type: 'FETCH_BOOKING_INFO'})
    }, [dispatch])
    const bookingInfo = useSelector(store => store.bookingReducer)
    const confirmBooking = (bookingId) => {
        dispatch({type: 'CONFIRM_BOOKING', payload: {bookingId}})

    }

    const declineBooking = (bookingId) => {
        dispatch({type: 'DECLINE_BOOKING', payload: {bookingId}})
    }

    const getRowClass = (status) => {
        if (status === 'declined') return 'declined'
        if (status === 'confirmed') return 'confirmed'
        return ''
    }
    return (
        <>
        <table>
            <thead>
                <tr>
                    <td>Event</td>
                    <td>Date</td>
                    <td>Promoter</td>
                    <td>DJ</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {bookingInfo.map((bookings, i) => (
                    <tr key={`${bookings.id}-${i}`} className={getRowClass(bookings.status)}>
                        <td>{bookings.event_name}</td>
                        <td>{bookings.date}</td>
                        <td> {bookings.promoter_name}</td>
                        <td> {bookings.dj_name}</td>
                        <td> {bookings.status} <button className="confirm-booking" onClick={() => confirmBooking(bookings.id)}>Confirm</button> <button className="decline-booking" onClick={() => declineBooking(bookings.id)}>Decline</button></td>
                    </tr>
                ))}
                <tr>

                </tr>
            </tbody>
        </table>
        </>
    )

}

export default Bookings