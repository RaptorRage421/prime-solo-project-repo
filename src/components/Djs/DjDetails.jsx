import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Avatar, Grid, Chip, Accordion, AccordionSummary, AccordionDetails, Divider, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DjPhotos from "./DjPhotos";

const DjDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openGallery, setOpenGallery] = useState(false)

  useEffect(() => {
    dispatch({ type: 'FETCH_DJ_DETAIL', payload: id })
  }, [dispatch, id]);
  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS', payload: id })
  }, [dispatch, id]);

  const djDetails = useSelector(store => store.djDetails)
  const photos = useSelector(state => state.galleryReducer)

  if (!djDetails) {
    return <Typography>Loading...</Typography>;
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const formattedHours = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${ampm}`;
  }
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()

  const handleOpenGallery = () => {
    setOpenGallery(true);
  };

  const closeGallery = () => {
    setOpenGallery(false);
  };


  return (
    <div className="container">
      <Box sx={{ width: '65%', margin: '0 auto' }}>
        <Card
          sx={{
            backgroundColor: '#1b2961',
            color: 'white',
            boxShadow: '6px 6px 25px black',
            borderRadius: '1em',
            border: '4px outset black'
          }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar
                  variant="square"
                  alt={djDetails.dj_stage_name}
                  src={djDetails.dj_avatar_image}
                  sx={{
                    width: 250,
                    height: 250,
                    boxShadow: '1px 2px 3px black',
                    border: '3px outset black',
                    borderRadius: '.6em'
                  }}
                />
                <Button sx={{
                  border: '3px outset black',
                  borderRadius: '.7em',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#274d9eeb',
                    color: 'white'
                  }
                }}
                  onClick={handleOpenGallery}>
                  {djDetails.dj_stage_name}'s Photo Gallery
                </Button>
                <DjPhotos isOpen={openGallery} handleClose={closeGallery} />
              </Grid>
              <Grid item xs>
                <Typography
                  sx={{
                    fontSize: '80px',
                    fontWeight: '500',
                    textShadow: '-5px 5px 20px black',
                    textTransform: 'uppercase',
                    my: -3,
                    mb: 1
                  }}>
                  {djDetails.dj_stage_name}
                </Typography>

                {djDetails.dj_link && (
                  <Typography
                    className="dj_link"
                    sx={{
                      fontSize: '20px'
                    }}
                    component="a"
                    href={`http://${djDetails.dj_link}`}>
                    &nbsp;{djDetails.dj_link}
                  </Typography>
                )}
                <br />
                <Typography variant="h6">
                  <Divider
                    textAlign="left"
                    variant="middle"
                    sx={{
                      '&::before, &::after': { borderColor: 'white' },
                      my: 2,
                      color: 'white'
                    }}>
                    Years Active
                  </Divider>
                  {currentYear - djDetails.dj_years_active} - {currentYear}
                </Typography>
                <br />
                {djDetails.dj_bio && (
                  <Typography variant="h6">
                    <Divider
                      textAlign="left"
                      variant="middle"
                      sx={{
                        '&::before, &::after': { borderColor: 'white' },
                        my: 2,
                        color: 'white'
                      }}>
                      Bio
                    </Divider>
                    {djDetails.dj_bio}
                  </Typography>
                )}

                <Typography variant="h6" sx={{ mt: 2 }}>
                  <Divider
                    textAlign="left"
                    variant="middle"
                    sx={{
                      '&::before, &::after': { borderColor: 'white' },
                      my: 2,
                      color: 'white'
                    }}>
                    Genres
                  </Divider>
                </Typography>
                <Grid container spacing={1}>
                  {djDetails.dj_genres && djDetails.dj_genres.map((genre) => (
                    <Grid item key={genre.id}>
                      <Chip
                        sx={{
                          fontSize: '20px',
                          color: 'white',
                          padding: '2px',
                          border: '2px outset #6a7cb4cb',
                          boxShadow: '2px 2px 2px black'
                        }}
                        size="large"
                        variant="outlined"
                        label={genre.genre_name}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  <Divider
                    textAlign="left"
                    variant="middle"
                    sx={{
                      '&::before, &::after': { borderColor: 'white' },
                      my: 2,
                      color: 'white'
                    }}>
                    Confirmed Events
                  </Divider>
                </Typography>
                {djDetails.confirmed_events && djDetails.confirmed_events.map((event, index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: '#1b2961',
                      color: 'white',
                      borderRadius: '.7em',
                      borderTop: '3px outset lightgray',
                      borderLeft: '3px outset white',
                      borderRight: '3px outset black',
                      borderBottom: '3px outset black',
                      boxShadow: '3px 3px 3px black',
                      my: .5
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                      sx={{
                        display: 'flex',

                        borderRadius: '2em'
                      }}
                    >
                      <div className="flex">
                        <Typography>
                          {event.event_name}
                        </Typography>
                        <Typography>
                          {formatDate(event.event_date)}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderRadius: '1em' }}>
                      <Typography>
                        Date: {new Date(event.event_date).toLocaleDateString()}
                      </Typography>
                      <Typography>
                        Location: {event.event_location}
                      </Typography>
                      <Typography>
                        Start Time: {formatTime(event.event_start_time)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid >
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default DjDetails;
