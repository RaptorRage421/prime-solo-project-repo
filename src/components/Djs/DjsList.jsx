import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SelectGenres from "../SelectGenres/SelectGenres";
import "./DjsList.css";

const DjsList = () => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        dispatch({ type: "FETCH_DJS" });
    }, [dispatch, refresh]);

    const djList = useSelector((store) => store.djListReducer)
    const user = useSelector((store) => store.user)
    const isCurrentUser = (djId) => djId === user.id

    const handleDeleteGenre = (userId, genreId) => {
        console.log("Deleting genre:", genreId)
        dispatch({ type: "DELETE_GENRE", payload: { userId, genreId } })
    };
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };

    const handleSubmittedGenres = () => {
        setRefresh(!refresh)
    }
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>DJ Name</th>
                        <th>Genres</th>
                        <th>Confirmed Events</th>
                    </tr>
                </thead>
                <tbody>
                    {djList.map((dj, i) => (
                        <tr key={`${dj.dj_id}-${i}`}>
                            <td className="avatar-column">
                                <img
                                    
                                    src={dj.dj_avatar_image}
                                    alt={`${dj.dj_stage_name}'s avatar`}
                                    className="avatar-list"
                                />
                            </td>
                            <td className="name-column">
                                <Link to={`/dj/${dj.dj_id}`} className='dj_link'>
                                    <Chip
                                        label={dj.dj_stage_name}
                                        size="small"
                                        variant="outlined"
                                        clickable
                                        sx={{
                                            width: '100%',
                                            border: '2px outset #6a7cb4cb',
                                            color: 'white',
                                            backgroundColor: '#1b2961',
                                            height: '100%',
                                            fontSize: '20px',
                                            paddingTop: 3,
                                            paddingBottom: 3

                                        }}
                                    />
                                </Link>
                            </td>
                            <td className="genres-column" >
                                {isCurrentUser(dj.dj_id) && dj.dj_genres === null || user.role === 2 && dj.dj_genres === null ? (
                                    <SelectGenres handleSubmittedGenres={handleSubmittedGenres} djId={dj.dj_id} />
                                ) : (
                                    Array.isArray(dj.dj_genres) && dj.dj_genres.map((genre, index) => (
                                        <Stack
                                            direction="row"
                                            spacing={3}
                                            key={index}

                                            sx={{ display: 'inline', margin: '1px' }}
                                        >
                                            {isCurrentUser(dj.dj_id) || user.role === 2 ? (
                                                <Chip
                                                    label={genre.genre_name}
                                                    onDelete={() => handleDeleteGenre(dj.dj_id, genre.id)}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        border: '2px outset #6a7cb4cb',
                                                        color: 'white',
                                                        backgroundColor: '#1b2961',
                                                        height: '30px',
                                                        fontSize: '18px',
                                                        '& .MuiChip-deleteIcon': {
                                                            color: 'white',
                                                            '&:hover': {
                                                                color: 'red',
                                                            },
                                                        },
                                                    }}
                                                    clickable
                                                    deleteIcon={<RemoveCircleOutlineIcon />}
                                                />
                                            ) : (
                                                <Chip
                                                    label={genre.genre_name}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        border: '2px outset #6a7cb4cb',
                                                        color: 'white',
                                                        backgroundColor: '#1b2961',
                                                        height: '30px',
                                                        fontSize: '18px'
                                                    }}
                                                />
                                            )}
                                        </Stack>
                                    ))
                                )}
                            </td>
                            <td className="events-column">
                                {Array.isArray(dj.confirmed_events) &&
                                    dj.confirmed_events.map((confirmedevent, index) => (
                                        <div key={index} className="confirmed_events_dj">

                                            <Chip
                                                label={confirmedevent.event_name}
                                                component='a'
                                                href={`#/events/${confirmedevent.id}`}
                                                size="small"
                                                sx={{
                                                    border: '2px outset #6a7cb4cb',
                                                    color: 'white',
                                                    backgroundColor: '#1b2961',
                                                    height: '30px',
                                                    fontSize: '18px'
                                                }}
                                                variant="outlined"
                                                clickable
                                            />

                                            <Chip
                                                component='a'
                                                href={`#/events/${confirmedevent.id}`}
                                                label={formatDate(confirmedevent.event_date)}
                                                size="small"
                                                sx={{
                                                    border: '2px outset #6a7cb4cb',
                                                    color: 'white',
                                                    backgroundColor: '#1b2961',
                                                    height: '30px',
                                                    fontSize: '18px',
                                                    margin: '1px'
                                                }}
                                                variant="outlined"
                                                clickable
                                            />
                                        </div>
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DjsList;
