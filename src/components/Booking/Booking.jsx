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


    return (
        <>
        <table>
            <thead>
                <tr>
                    <td>Event</td>
                    <td>Promoter</td>
                    <td>DJ</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {bookingInfo.map((bookings, i) => (
                    <tr key={`${bookings.id}-${i}`}>
                        <td>{bookings.event_id}</td>
                        <td> {bookings.user_id}</td>
                        <td> {bookings.user_id}</td>
                        <td> {bookings.status}</td>
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