import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useScrollTrigger } from "@mui/material"


const Bookings = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch({type: 'FETCH_BOOKING_INFO'})
    }, [dispatch])
    const bookingInfo = useSelector(store => store.bookingReducer)
    const user = useSelector(store => store.user)
    const confirmBooking = (bookingId) => {
        dispatch({type: 'CONFIRM_BOOKING', payload: {bookingId}})

    }

    const declineBooking = (bookingId) => {
        dispatch({type: 'DECLINE_BOOKING', payload: {bookingId}})
    }

    const getRowClass = (status) => {
        if (status === 'Declined') return 'declined'
        if (status === 'Confirmed') return 'confirmed'
        return ''
    }
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    return (
        <>
        <h1 className="center">Booking Status</h1>
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
                    <tr key={`${bookings.id}-${i}`}>
                        <td>{bookings.event_name}</td>
                        <td>{formatDate(bookings.date)}</td>
                        <td> {bookings.promoter_name}</td>
                        <td> {bookings.dj_name}</td>
                        <td className={getRowClass(bookings.status)}> {bookings.status} {user.role === 1 && bookings.status === 'pending' && (
                                    <>
                                        <button
                                            className="confirm-booking"
                                            onClick={() => confirmBooking(bookings.id)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="decline-booking"
                                            onClick={() => declineBooking(bookings.id)}
                                        >
                                            Decline
                                        </button>
                                    </>
                                )}</td>
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