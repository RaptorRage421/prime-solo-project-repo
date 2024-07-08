import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <Header />
      <LoginForm />

      <center>
        
      </center>
    </div>
  );
}

export default LoginPage;
