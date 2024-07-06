import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import { Card, CardContent, Typography, Box } from '@mui/material';

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

  return (
    <Box className="container">
      <Card sx={{ width: '60%', backgroundColor: '#1b2961', color: 'white', boxShadow: '6px 6px 25px black', borderRadius: '1em', border: '4px outset #0d1c35cb' }}>
        <CardContent>
          <Typography variant='h4'>{eventDetails.event_name}</Typography>
          <Typography variant='h6'>{formatDate(eventDetails.date)}</Typography>
          <Typography variant="body1">
            Time: {formatTime(eventDetails.start_time)} - {formatTime(eventDetails.end_time)}
          </Typography>
          <Typography variant="body1">
            Genres: {eventDetails.event_genres && eventDetails.event_genres.join(', ')}
          </Typography>
          <Typography variant="body1">
            Location: {eventDetails.location}
          </Typography>
          <GoogleMaps lat={coordinates.lat} lng={coordinates.lng} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetails;
