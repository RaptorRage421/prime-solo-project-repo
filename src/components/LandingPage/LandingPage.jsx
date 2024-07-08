import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { Button } from '@mui/material';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
    <Header />
    <Header />

      
        
          <RegisterForm />

          
        
          </>
  );
}

export default LandingPage;
