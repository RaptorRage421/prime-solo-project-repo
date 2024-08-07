import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Button, Chip } from "@mui/material"
import { Link } from "react-router-dom/cjs/react-router-dom.min"



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
           
                <table className="table-width">
                   
                    <thead>
                        <tr className="tablehead">
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
                                    },
                                    fontSize: '20px'
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
                                <Link to={`/events/${bookings.event_id}`}
                                    className='dj_link'
                                    onClick={() => dispatch({ type: 'CLEAR_EVENT_DETAILS' })}>
                                    <Chip
                                    label={bookings.event_name}
                                    clickable
                                sx={{
                                    
                                    border: '2px outset #6a7cb4cb',
                                    color: 'white',
                                    backgroundColor: '#1b2961',
                                    
                                    fontSize: '25px',
                                    
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    '&:hover': { 
                                        border: '2px outset white'
                                    },
                                    wordWrap: 'break-word'
                                }}
                                    />
                                    </Link>
                                </td>
                                <td>
                                    {formatDate(bookings.date)}
                                </td>
                                <td>
                                    {bookings.promoter_name}
                                </td>
                                <td>
                                <Link to={`/dj/${bookings.dj_id}`} className='dj_link'>
                                    <Chip 
                                    label={bookings.dj_name}
                                    sx={{
                                        
                                        border: '2px outset #6a7cb4cb',
                                        color: 'white',
                                        backgroundColor: '#1b2961',
                                        
                                        fontSize: '25px',
                                        
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        '&:hover': { 
                                            border: '2px outset white'
                                        },
                                        wordWrap: 'break-word'
                                    }}
                                    />
                                    </Link>
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
                                                        height: 'auto',
                                                        fontSize: '20px',
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
                                                        height: 'auto',
                                                        fontSize: '20px',
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