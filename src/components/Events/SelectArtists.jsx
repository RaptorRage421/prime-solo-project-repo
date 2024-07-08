import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardContent, CardMedia, Typography, Grid, Stack, CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";

const SelectArtists = () => {
    const history = useHistory();
    const newEvent = useSelector((store) => store.createReducer);
    const djList = useSelector((store) => store.djListReducer);
    const suggestedDJs = useSelector((store) => store.suggestionReducer);
    const dispatch = useDispatch();
    const [selectedDJs, setSelectedDJs] = useState([])


    useEffect(() => {
        dispatch({ type: 'FETCH_DJS' });
        if (newEvent.genres && newEvent.genres.length > 0) {
            dispatch({ type: 'FETCH_DJS_BY_GENRES', payload: newEvent.genres })
        }
    }, [dispatch, newEvent.genres]);

    const addToEvent = (dj) => {
        if (isDJSelected(dj.dj_id)) {
            setSelectedDJs((prevSelected) => prevSelected.filter((id) => id !== dj.dj_id));
            dispatch({ type: 'REMOVE_DJ_FROM_EVENT', payload: dj });
        } else {
            setSelectedDJs((prevSelected) => [...prevSelected, dj.dj_id]);
            dispatch({ type: 'ADD_DJ_TO_EVENT', payload: dj });
        }
    };

    const createEvent = () => {
        dispatch({ type: 'CREATE_EVENT', payload: newEvent });
        history.push('/events');
    };

    const isDJSelected = (dj_id) => selectedDJs.includes(dj_id);


    return (
        <div>
            <Typography variant="h3" align="center" gutterBottom>
                Select Artists for: {newEvent.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Suggested DJs:
            </Typography>
            <Grid container justifyContent="left" spacing={2}>
                {suggestedDJs.map((dj) => (
                    <Grid item xs={12} sm={6} md={3} lg={2} key={dj.dj_id}>
                        <Card sx={{
                            background: isDJSelected(dj.dj_id) ? 'linear-gradient(0deg, rgba(29,253,75,1) 20%, rgba(58,119,180,1) 50%, rgba(29,253,75,1) 80%)' : '#1b2961',
                            boxShadow: '10px 9px 25px',
                            borderRadius: '2em',
                            border: '2px outset black'
                        }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={dj.dj_avatar_image}
                                alt="DJ Avatar"
                                sx={{
                                    maxWidth: '100%',
                                    height: '250px',
                                    borderRadius: '0'
                                }}
                            />
                            <CardContent
                                className="center"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <Typography
                                    textAlign='left'
                                    sx={{
                                        color: 'white'
                                    }}
                                    variant="h5">
                                    {dj.dj_stage_name}
                                </Typography>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {dj.dj_genres.map((genre, index) => (
                                        <Chip
                                            justifyContent
                                            key={index}
                                            label={genre}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#1b2961',
                                                margin: '2px'
                                            }}
                                        />
                                    ))}
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToEvent(dj)}
                                    style={{ marginTop: '10px' }}
                                    sx={{
                                        backgroundColor: '#1b2961',
                                        border: '2px outset black',
                                        "&:hover": {
                                            border: '2px outset white'
                                        },
                                        borderRadius: '.7em'
                                    }}
                                >
                                    Add to Event
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                 <Stack direction="column" 
            padding={5}
                 justifyContent="center" spacing={2} style={{ marginTop: '30px' }}>
                 <Button
                    variant="contained"
                    size="large"
                    onClick={createEvent}
                    sx={{
                        height: 'auto',
                        backgroundColor: '#1b2961',
                        border: '2px outset black',
                        "&:hover": {
                            border: '2px outset white'
                        },
                        borderRadius: '.7em'
                    }}
                >
                    Create Event
                </Button>
                </Stack>
                
            </Grid>
           
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                All DJs:
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                {djList.map((dj) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} key={dj.dj_id}>
                        <Card sx={{
                            background: isDJSelected(dj.dj_id) ? 'rgba(29,253,75,.6)' : '#1b2961',
                            boxShadow: '10px 9px 25px',
                            borderRadius: '2em',
                            border: '2px outset black'
                        }}>
                            <CardContent>
                                <Typography
                                    sx={{
                                        color: 'white'
                                    }}
                                    variant="h4">
                                    {dj.dj_stage_name}
                                </Typography>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {Array.isArray(dj.dj_genres) && dj.dj_genres.map((genre, index) => (
                                        <Chip
                                            key={index}
                                            label={genre.genre_name}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#1b2961',
                                                margin: '2px'
                                            }}
                                        />
                                    ))}
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToEvent(dj)}
                                    style={{ marginTop: '10px' }}
                                    sx={{
                                        backgroundColor: '#1b2961',
                                        border: '2px outset black',
                                        "&:hover": {
                                            border: '2px outset white'
                                        },
                                        borderRadius: '.7em'
                                    }}
                                >
                                    Add to Event
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" justifyContent="center" spacing={2} style={{ marginTop: '30px' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={createEvent}
                    sx={{
                        backgroundColor: '#1b2961',
                        border: '2px outset black',
                        "&:hover": {
                            border: '2px outset white'
                        },
                        borderRadius: '.7em'
                    }}
                >
                    Create Event
                </Button>
            </Stack>
        </div>
    );
};

export default SelectArtists;
