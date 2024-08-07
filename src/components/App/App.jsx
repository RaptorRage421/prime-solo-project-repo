import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateEvent from '../Events/CreateEvent';
import SelectArtists from '../Events/SelectArtists';
import Events from '../Events/Events';
import DjsList from '../Djs/DjsList';
import Bookings from '../Booking/Booking';
import DjDetails from '../Djs/DjDetails';
import EventDetails from '../Events/EventDetails';
import Genres from '../Genres/Genres';
import Header from '../Header/Header';
import UploadForm from '../Uploads/UploadForm';


import './App.css';
import { Upload } from '@mui/icons-material';
const theme = createTheme();


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:5173/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <Header />
              
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <>
                <Header />
                <LoginPage />
                </>
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <>
                <Header />
                <RegisterPage />
                </>
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <Route exact path="/create">
              <Header />
              <Header />
              <CreateEvent />

            </Route>
            <Route exact path="/dj-selection">
              <Header />
              <Header />
              <SelectArtists />
            </Route>
            <Route exact path="/events">
              <Header />
              <Header />
              <Events />
            </Route>
            <Route exact path="/djs" >
              <Header />
              <Header />
              <DjsList />
            </Route>
            <Route exact path="/booking">
              <Header />
              <Header />
              <Bookings />
            </Route>
            <Route exact path="/dj/:id">
              <Header />
              <Header />
              <DjDetails />
            </Route>
            <Route exact path="/events/:id">
              <Header />
              <Header />
              <EventDetails />
            </Route>
            <Route exact path="/genres">
              <Header />
              <Header />
              <Genres />
            </Route>
            <Route exact path="/upload">
            <UploadForm />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
