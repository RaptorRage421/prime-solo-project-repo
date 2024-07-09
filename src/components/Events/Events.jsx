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
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const formattedHours = parseInt(hours) % 12 || 12;
        const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
        return `${formattedHours}:${minutes} ${ampm}`;
    }

    const handleDeleteEvent = (eventId, eventName) => {
        Swal.fire({
            title: 'Delete your Event',
            html: `
                    <strong 
                        style="font-size: 50; 
                        font-weight: 900;
                        ">
                            ${eventName}?
                    </strong>
                    <br/>
                    <br/>
                    You won't be able to revert this!`,
            icon: 'warning',
            color: 'white',
            background: '#1b2961',
            showCancelButton: true,
            cancelButtonText: 'CANCEL',
            confirmButtonText: 'DELETE!',

            customClass: {
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',

                popup: 'custom-popup',

            }


        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_EVENT', payload: { eventId } });
                Swal.fire({
                    title: `${eventName}`,
                    text: `has been Deleted`,
                    icon: 'success',
                    color: 'white',
                    background: '#1b2961',

                    customClass: {
                        confirmButton: 'custom-confirm-button',
                        popup: 'custom-popup'

                    }

                })
            }
        })
    }

    return (
        <>
            <h1 className="center">Events</h1>
            <div className="table-container">
                <table className="table-width">
                    <thead>
                        <tr className="tablehead">
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
                                <td >
                                    <Link
                                        to={`/events/${event.event_id}`}
                                        className='dj_link'
                                        onClick={() => dispatch({ type: 'CLEAR_EVENT_DETAILS' })}
                                    ><Chip
                                            label={event.event_name}
                                            size="small"
                                            clickable
                                            sx={{
                                                width: '100%',
                                                border: '2px outset #6a7cb4cb',
                                                color: 'white',
                                                backgroundColor: '#1b2961',
                                                height: '100%',
                                                fontSize: '25px',
                                                fontWeight: '500',
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                '&:hover': {
                                                    border: '2px outset white'
                                                },
                                                wordWrap: 'break-word'
                                            }}
                                        />

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

                                            sx={{
                                                border: '2px outset #6a7cb4cb',
                                                color: 'white',
                                                backgroundColor: '#1b2961',
                                                height: 'auto',
                                                fontSize: '30px',
                                                margin: '1px',
                                                '&:hover': {
                                                    border: '2px outset white'
                                                }
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
                                            sx={{
                                                display: 'flex',
                                                margin: '1px'
                                            }}
                                        >
                                            <Chip
                                                label={genre}
                                                key={index}

                                                sx={{
                                                    border: '2px outset #6a7cb4cb',
                                                    color: 'white',
                                                    backgroundColor: '#1b2961',
                                                    height: 'auto',
                                                    fontSize: '30px',
                                                    margin: '1px'
                                                }}

                                            />
                                        </Stack>
                                    ))}
                                </td>
                                
                                    {event.user_id === user.id && (
                                        <td>
                                        <Button
                                            sx={{
                                                backgroundColor: '#fb8787',
                                                borderRadius: '.5em',
                                                height: 'auto',
                                                color: 'white',
                                                border: '3px outset black',
                                                padding: 1,
                                                '&:hover': {
                                                    backgroundColor: '#ff4d4d',
                                                    color: 'black'
                                                },
                                                fontSize: '25px'
                                            }}
                                            onClick={() => handleDeleteEvent(event.event_id, event.event_name)}>
                                            Delete
                                        </Button>
                                        </td>
                                    )}
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default Events