import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { Button } from '@mui/material';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
    <Header />
      <h2>{heading}</h2>

      
        
          <RegisterForm />

          
        
          </>
  );
}

export default LandingPage;
