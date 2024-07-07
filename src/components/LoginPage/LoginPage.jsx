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
        <Button
          type="button"
          sx={{
            border: '3px outset black',
            borderRadius: '.7em',
            color: 'white',
            '&:hover': {
              backgroundColor: '#274d9eeb',
              color: 'white'
            }
          }}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
