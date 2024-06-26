import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import './Events.css'


const Events = () => {
const dispatch = useDispatch()
useEffect(() => {
    dispatch({type:'FETCH_EVENTS'})
}, [dispatch])
const eventList = useSelector(store => store.eventReducer)
    return(
        <div>
        <table>
            <thead>
                <tr>
                    <td>
                        <strong>Event Name</strong>
                    </td>
                    <td>
                        <strong>Location</strong>
                    </td>
                    <td>
                        <strong>Date</strong>
                    </td>
                    <td>
                        <strong>Start Time</strong>
                    </td>
                    <td>
                        <strong>End Time</strong>
                    </td>
                    <td>
                        <strong>DJ</strong>
                    </td>
                    <td>
                        <strong>Promoter</strong>
                    </td>
                    <td>
                        <strong>Genres</strong>
                    </td>
                    <td>
                        <strong>Booking Status</strong>
                    </td>
                </tr>
            </thead>
            <tbody>
        {eventList.map((event,i) => (
        <tr key={`${event.id}-${i}`}>
        <td>{event.event_name}</td>
        <td>{event.location}</td>
        <td>{event.date}</td>
        <td>{event.start_time}</td>
        <td>{event.end_time}</td>
        <td>{event.dj_stage_name}</td>
        <td>{event.promoter_username}</td>
        <td>
        {Array.isArray(event.event_genres) && event.event_genres.map((genre, index) => (
                                    <span key={index}>{genre}{index !== event.event_genres.length - 1 ? ', ' : ''}</span>
                                ))}
        </td>
        <td>{event.booking_status}</td>
    </tr>   
        ))}
        </tbody>
        </table>
        </div>
    )

}

export default Events