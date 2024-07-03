import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip } from "@mui/material";
import Stack from '@mui/material/Stack';

const CreateEvent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const genreList = useSelector(store => store.genreReducer);
    const [newEvent, setNewEvent] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('00:00:00');
    const [endTime, setEndTime] = useState('00:00:00');
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, [dispatch]);

    const handleGenreChange = (event) => {
        setSelectedGenres(event.target.value);
    };

    const selectYourArtists = (event) => {
        event.preventDefault();
        dispatch({ type: 'CREATE_NEW_EVENT', payload: { name: newEvent, location, date, start_time: startTime, end_time: endTime, genres: selectedGenres } });
        history.push('/dj-selection');
    };

    return (
        <>
        <div className="center">
            <form onSubmit={selectYourArtists}>
                <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
                <Stack spacing={2}>
                    <TextField
                        label="Event Name"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%',
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        value={newEvent}
                        onChange={(event) => setNewEvent(event.target.value)}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%',
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%',
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        label="Start Time"
                        type="time"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%',
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                    />
                    <TextField
                        label="End Time"
                        type="time"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%',
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                    />
                    <FormControl variant="outlined">
                        <InputLabel id="genres-label">Select Genres</InputLabel>
                        <Select
                            labelId="genres-label"
                            id="genres"
                            multiple
                            value={selectedGenres}
                            sx={{
                                color: 'white',
                                borderRadius: '1em',
                                width: '50%',
                                '& .MuiInputBase-root': {
                                    color: 'white'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '&:focus .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white'
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'white'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                }
                            }}
                            onChange={handleGenreChange}
                            input={<OutlinedInput label="Select Genres" />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <Chip sx={{ color: 'white', backgroundColor: '#1b2961', height: '30px', fontSize: '18px' }} key={value} label={genreList.find(genre => genre.id === value)?.genre_name} />
                                    ))}
                                </div>
                            )}
                        >
                            {genreList.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.genre_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                            border: '1px solid white',
                            color: 'white',
                            borderRadius: '1em',
                            width: '50%'
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Pick Your DJs
                    </Button>
                </Stack>
                </Box>
            </form>
            </div>
        </>
    );
};

export default CreateEvent;
