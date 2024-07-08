import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import { Card, CardContent, Typography, Box, Divider, Grid, Chip } from '@mui/material';

const EventDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [coordinates, setCoordinates] = useState({ lat: 44.9778, lng: -93.2650 });
    const eventDetails = useSelector((store) => store.eventDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: id });
    }, [dispatch, id]);

    useEffect(() => {
        if (eventDetails.location) {
            const fetchCoordinates = async () => {
                const { lat, lng } = await geocodeLocation(eventDetails.location);
                setCoordinates({ lat, lng });
            };
            fetchCoordinates();
        }
    }, [eventDetails.location]);


    const geocodeLocation = async (locationString) => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const encodedLocation = encodeURIComponent(locationString);
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                return { lat, lng };
            } else {
                throw new Error('No results found');
            }
        } catch (error) {
            console.error('Error geocoding location:', error);
            return { lat: 0, lng: 0 }; // Return default coordinates or handle error as needed
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            console.error('Invalid date:', date);
            return '';
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    };


    const formatTime = (time) => {
        if (!time) return ''; // Handle case where time is null or undefined
        try {
            const [hours, minutes] = time.split(':');
            const formattedHours = parseInt(hours) % 12 || 12;
            const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
            return `${formattedHours}:${minutes} ${ampm}`;
        } catch (error) {
            console.error('Error formatting time:', error);
            return ''; // Return empty string or handle error as needed
        }
    };

    const confirmedDJs = eventDetails.djs ? eventDetails.djs.filter(dj => dj.status === 'Confirmed') : [];
    const pendingDJs = eventDetails.djs ? eventDetails.djs.filter(dj => dj.status === 'pending') : [];

    return (
        <Box className="container">
            <Card
                sx={{
                    my: 13,
                    width: '100vh',
                    backgroundColor: '#1b2961',
                    color: 'white',
                    boxShadow: '6px 6px 25px black',
                    borderRadius: '1em',
                    border: '4px outset #0d1c35cb'
                }}>
                <CardContent>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            color: 'white',
                            padding: '2px',
                            border: '3px outset #6a7cb4cb',
                            boxShadow: '2px 2px 20px black',
                            height: 'auto',
                            paddingX: '10px',
                            my: 1,
                            textShadow: '-3px 4px 5px black',
                            backgroundColor: '#1b2961',
                            borderRadius: '1em',
                            '&:hover': {
                                border: '3px outset black',

                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontVariant: 'small-caps',
                                fontSize: '80px',
                                textShadow: '-5px 5px 10px black',
                                '&:hover': {
                                    textShadow: '-2px 1px 5px darkgray'
                                },

                            }}
                            fontWeight={500}
                        >
                            {eventDetails.event_name}

                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            color: 'white',
                            padding: '2px',
                            border: '3px outset #6a7cb4cb',
                            boxShadow: '2px 2px 20px black',
                            height: 'auto',
                            paddingX: '10px',
                            my: 3,
                            textShadow: '-3px 4px 5px black',
                            backgroundColor: '#1b2961',
                            borderRadius: '1em',
                            paddingTop: 2,
                            paddingBottom: 2,
                            '&:hover': {
                                border: '3px outset black',
                            }
                        }}
                    >

                        <Typography
                            sx={{
                                fontVariant: 'small-caps',
                                fontSize: '35px',
                                paddingLeft: '10px'
                            }}
                        >
                            {formatDate(eventDetails.date)}
                        </Typography>
                        <Box sx={{ width: '370px' }}>
                            <div className='spread'>
                                <Typography sx={{
                                    textTransform: 'uppercase',
                                    fontSize: '30px'
                                }}>

                                    <span>{formatTime(eventDetails.start_time)}</span>

                                </Typography>
                                <Typography sx={{
                                    textTransform: 'uppercase',
                                    fontSize: '30px'
                                }}>-</Typography>
                                <Typography sx={{

                                    textTransform: 'uppercase',
                                    fontSize: '30px'
                                }}>

                                    <span>{formatTime(eventDetails.end_time)}</span>


                                </Typography>
                            </div>
                        </Box>

                    </Card>

                    <Typography variant='h5'>
                        <Divider
                            textAlign="left"
                            variant="middle"
                            sx={{
                                '&::before, &::after': {
                                    borderColor: 'white',
                                    border: '2px outset white'
                                },
                                my: 2,
                                color: 'white',


                            }}>
                            Genres
                        </Divider>
                    </Typography>
                    <Card
                        sx={{

                            color: 'white',
                            padding: '2px',
                            border: '3px outset #6a7cb4cb',
                            boxShadow: '2px 2px 20px black',
                            height: 'auto',
                            paddingX: '10px',
                            my: 3,
                            textShadow: '-3px 4px 5px black',
                            backgroundColor: '#1b2961',
                            borderRadius: '1em',
                            '&:hover': { border: '3px outset black' }
                        }}
                    >
                        <Grid
                            container
                            spacing={1}
                            paddingTop={2}
                            paddingBottom={2}
                            display='flex'
                            justifyContent="left"
                            alignItems="center">
                            {eventDetails.event_genres && eventDetails.event_genres.map((genre, i) => (
                                <Grid
                                    sx={{

                                        display: 'flex',
                                        flexDirection: 'row',


                                    }} item key={i}>
                                    <Chip
                                        sx={{
                                            fontSize: '30px',
                                            color: 'white',
                                            border: '2px outset #6a7cb4cb',
                                            boxShadow: '2px 2px 2px black',
                                            height: 'auto'
                                        }}
                                        size="large"
                                        variant="outlined"
                                        label={genre}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Card>


                    <Typography variant='h5'>
                        <Divider
                            textAlign="left"
                            variant="middle"
                            sx={{
                                '&::before, &::after': {
                                    borderColor: 'white',
                                    border: '2px outset white'
                                },
                                my: 4,
                                color: 'white'
                            }}>
                            Confirmed DJs
                        </Divider>
                    </Typography>
                    {confirmedDJs.length > 0 ? (
                        <Card
                            sx={{

                                color: 'white',
                                padding: '2px',
                                border: '3px outset #6a7cb4cb',
                                boxShadow: '2px 2px 20px black',
                                height: 'auto',
                                paddingX: '10px',
                                my: 3,
                                textShadow: '-3px 4px 5px black',
                                backgroundColor: '#1b2961',
                                borderRadius: '1em',
                                '&:hover': { border: '3px outset black' }
                            }}
                        >
                            <Grid
                                container
                                spacing={.25}
                                paddingTop={2}
                                paddingBottom={2}
                                display='flex'
                                justifyContent="left"
                                alignItems="center">
                                {confirmedDJs.map((dj) => (
                                    <Grid
                                        sx={{

                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',

                                        }}
                                        item key={dj.id}>
                                        <Chip
                                            sx={{
                                                fontSize: '40px',
                                                color: 'white',
                                                padding: '5px',
                                                border: '3px outset #00710c',
                                                boxShadow: '0px 0px 9px green',
                                                height: 'auto',
                                            }}
                                            size="large"
                                            variant="outlined"
                                            label={dj.stage_name}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    ) : (
                        <Card
                            sx={{

                                color: 'white',
                                padding: '2px',
                                border: '3px outset #6a7cb4cb',
                                boxShadow: '2px 2px 20px black',
                                height: 'auto',
                                paddingX: '10px',
                                my: 3,
                                textShadow: '-3px 4px 5px black',
                                backgroundColor: '#1b2961',
                                borderRadius: '1em',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',

                            }}
                        >
                            <Typography
                                sx={{
                                    my: 2,
                                    fontSize: '60px',
                                    textTransform: 'uppercase',
                                    textAlign: 'center'

                                }}>
                                No confirmed DJs
                            </Typography>
                        </Card>
                    )}

                    {pendingDJs.length > 0 && (
                        <>
                            <Typography variant="h5">
                                <Divider
                                    textAlign="left"
                                    variant="middle"
                                    sx={{
                                        '&::before, &::after': {
                                            borderColor: 'white',
                                            border: '2px outset white'
                                        },
                                        my: 4,
                                        color: 'white'
                                    }}>
                                    Pending DJs
                                </Divider>
                            </Typography>
                            <Card
                                sx={{

                                    color: 'white',
                                    padding: '2px',
                                    border: '3px outset #6a7cb4cb',
                                    boxShadow: '2px 2px 20px black',
                                    height: 'auto',
                                    paddingX: '10px',
                                    my: 3,
                                    textShadow: '-3px 4px 5px black',
                                    backgroundColor: '#1b2961',
                                    borderRadius: '1em',
                                    '&:hover': { border: '3px outset black' }
                                }}
                            >
                                <Grid
                                    container
                                    spacing={.25}
                                    paddingTop={2}
                                    paddingBottom={2}
                                    display='flex'
                                    justifyContent="left"
                                    alignItems="center">
                                    {pendingDJs.map((dj) => (
                                        <Grid
                                            sx={{

                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',

                                            }}
                                            item key={dj.id}>
                                            <Chip
                                                sx={{
                                                    fontSize: '40px',
                                                    color: 'white',
                                                    padding: '2px',
                                                    border: '3px outset #8d6701',
                                                    boxShadow: '0px 0px 10px #8d6701',
                                                    height: 'auto',


                                                }}
                                                size="large"
                                                variant="outlined"
                                                label={dj.stage_name}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Card>
                        </>
                    )}

                    <Typography variant='h5'>
                        <Divider
                            textAlign="left"
                            variant="middle"
                            sx={{
                                '&::before, &::after': {
                                    borderColor: 'white',
                                    border: '2px outset white'
                                },
                                my: 4,
                                color: 'white'
                            }}>
                            Location
                        </Divider>
                    </Typography>
                    <Card
                        sx={{

                            color: 'white',
                            border: '3px outset #6a7cb4cb',
                            boxShadow: '2px 2px 20px black',
                            height: 'auto',
                            my: 3,
                            backgroundColor: '#1b2961',
                            borderRadius: '1em',
                            padding: 4,
                            '&:hover': { border: '3px outset black' }
                        }}
                    >
                        <Typography
                            sx={{
                                my: 2,
                                textShadow: '-3px 4px 5px black',
                            }}
                            variant="h5">
                            {eventDetails.location}
                        </Typography>
                        <GoogleMaps lat={coordinates.lat} lng={coordinates.lng} />
                    </Card>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventDetails;
