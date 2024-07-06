import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import './Events.css'


const Events = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' })
    }, [dispatch])
    const user = useSelector(store => store.user)
    const eventList = useSelector(store => store.eventReducer)
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'  };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const formattedHours = parseInt(hours) % 12 || 12;
        const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
        return `${formattedHours}:${minutes} ${ampm}`;
    }

    const handleDeleteEvent = (eventId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color: 'white',
            background: '#1b2961',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_EVENT', payload: { eventId } });
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your event has been deleted.',
                    icon: 'success',
                    color: 'white',
                    background: '#1b2961'
                })
            }
        })
    }

    return (
        <div className="table-container">
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
                    </tr>
                </thead>

                <tbody>
                    {eventList.map((event, i) => (
                        <tr key={`${event.id}-${i}`}>
                            <td className="bold">
                                <Link
                                    to={`/events/${event.event_id}`}
                                    className='dj_link'
                                    onClick={() => dispatch({ type: 'CLEAR_EVENT_DETAILS' })}
                                >
                                    {event.event_name}
                                </Link>
                            </td>
                            <td>{event.location}</td>
                            <td>{formatDate(event.date)}</td>
                            <td className="event_time">{formatTime(event.start_time)}</td>
                            <td className="event_time">{formatTime(event.end_time)}</td>
                            <td>{Array.isArray(event.djs) && event.djs.map((dj, index) => (
                                <Stack
                                    direction="row"
                                    spacing={5}
                                    key={index}
                                    sx={{ margin: '1px' }}

                                >
                                    <Chip
                                        label={dj.stage_name}
                                        component="a"
                                        href={`#/dj/${dj.id}`}
                                        key={index}
                                        size="large"
                                        sx={{
                                            color: 'white',
                                            backgroundColor: '#1b2961',
                                            height: '30px',
                                            fontSize: '18px'
                                        }}
                                        variant="outlined"
                                        clickable
                                    />
                                </Stack>
                            ))}

                            </td>
                            <td><strong>{event.promoter_name}</strong></td>
                            <td className="genres-td">
                                {Array.isArray(event.event_genres) && event.event_genres.map((genre, index) => (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        key={index}
                                        sx={{ display: 'inline', margin: '1px' }}
                                    >
                                        <Chip
                                            label={genre}
                                            key={index}
                                            size="small"
                                            sx={{ color: 'white', backgroundColor: '#1b2961', height: '30px', fontSize: '18px' }}
                                            variant="outlined"
                                        />
                                    </Stack>
                                ))}
                            </td>
                            {event.user_id === user.id && (<td>

                                <Button 
                                    sx={{
                                        backgroundColor: '#fb8787',
                                        borderRadius: '.5em',
                                        height: '30px',
                                        color: 'white',
                                        border: '2px outset black',
                                        padding: '2px',
                                        '&:hover': {
                                            backgroundColor: '#ff4d4d',
                                            color: 'black'
                                        },
                                    }}
                                    onClick={() => handleDeleteEvent(event.event_id)}>
                                        Delete
                                        </Button>

                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Events