import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "@mui/material"



const Bookings = () => {
    const [override, setOverride] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKING_INFO' })
    }, [dispatch])

    const bookingInfo = useSelector(store => store.bookingReducer)
    const user = useSelector(store => store.user)
    const confirmBooking = (bookingId) => {
        dispatch({ type: 'CONFIRM_BOOKING', payload: { bookingId } })

    }

    const declineBooking = (bookingId) => {
        dispatch({ type: 'DECLINE_BOOKING', payload: { bookingId } })
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

    const overRideSwitch = () => {
        setOverride(!override)
    }

    return (
        <>
            <h1 className="center">Booking Status</h1>
            <div className="container">

                <table>
                    <thead>
                        <tr>
                            <td>
                                Event
                            </td>
                            <td>
                                Date
                            </td>
                            <td>
                                Promoter
                            </td>
                            <td>
                                DJ
                            </td>
                            <td >
                                Status
                            </td>
                            <td><Button
                                onClick={overRideSwitch}

                                sx={{
                                    color: 'white',
                                    border: '3px outset black',
                                    borderRadius: '1em',
                                    '&:hover': {
                                        backgroundColor: '#ff4d4d',
                                        color: 'white'
                                    }
                                }}
                            >
                                Override
                            </Button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingInfo.map((bookings, i) => (
                            <tr key={`${bookings.id}-${i}`}>
                                <td>
                                    {bookings.event_name}
                                </td>
                                <td>
                                    {formatDate(bookings.date)}
                                </td>
                                <td>
                                    {bookings.promoter_name}
                                </td>
                                <td>
                                    {bookings.dj_name}
                                </td>
                                <td className={getRowClass(bookings.status)}>
                                    {bookings.status}

                                </td>
                                <td>
                                    {((user.role === 1 && user.stage_name === bookings.dj_name && bookings.status === 'pending') ||
                                        (user.role === 2 && user.stage_name === bookings.promoter_name && override === true) ||
                                        (user.role === 1 && user.stage_name === bookings.promoter_name && override === true)) && (
                                            <>
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#9df69d',
                                                        borderRadius: '.75em',
                                                        height: '30px',
                                                        color: 'black',
                                                        border: '2px outset #5fd25f',
                                                        padding: '2px',
                                                        '&:hover': {
                                                            backgroundColor: '#5fd25f',
                                                            color: 'white'
                                                        },
                                                        marginRight: .5
                                                    }}
                                                    onClick={() => confirmBooking(bookings.id)}
                                                >
                                                    Confirm
                                                </Button>
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#fb8787',
                                                        borderRadius: '.75em',
                                                        height: '30px',
                                                        color: 'black',
                                                        border: '3px outset #ff4d4d',
                                                        padding: '2px',
                                                        '&:hover': {
                                                            backgroundColor: '#ff4d4d',
                                                            color: 'white'
                                                        },
                                                    }}
                                                    onClick={() => declineBooking(bookings.id)}
                                                >
                                                    Decline
                                                </Button>
                                            </>
                                        )}
                                </td>
                            </tr>
                        ))}
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default Bookings