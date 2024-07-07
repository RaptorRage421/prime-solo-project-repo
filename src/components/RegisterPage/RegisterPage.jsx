import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';
import { Button } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <Header />
      <RegisterForm />

      <center>
        <Button
          type="button"
          sx={{
            border: '2px outset black',
            borderRadius: '.9em',
            color: 'white',
            '&:hover': {
              backgroundColor: '#274d9eeb',
              color: 'white'
            }
          }}
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
