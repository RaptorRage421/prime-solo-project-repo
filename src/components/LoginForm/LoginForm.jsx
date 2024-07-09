import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory()


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
       
      </div>
      <div>
      <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              fullWidth
             
              sx={{
                marginBottom: 1,
                color: 'white',
                borderRadius: '1em',
                width: '100%',
                '& .MuiInputBase-input': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset black',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset white',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                },
                '& .MuiInputLabel-root': {
                  color: 'white'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset white',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                }
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
              
              sx={{
                marginBottom: 1,
                color: 'white',
                borderRadius: '1em',
                width: '100%',
                '& .MuiInputBase-input': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset black',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset white',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                },
                '& .MuiInputLabel-root': {
                  color: 'white'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '2px outset white',
                  boxShadow: '1px 1px 1px black',
                  borderRadius: '1em'
                }
              }}
            />
       
      </div>
      <div className='register-container'>
        <Button
        type='submit'
        name='submit'
        sx={{
          border: '3px outset black',
          borderRadius: '.7em',
          color: 'white',
          '&:hover': {
            backgroundColor: '#274d9eeb',
            color: 'white'
          },
          marginTop: 0
        }}
        >Log In</Button>
        <span className='container'>
        <h4>Not a member?</h4>
       <Button
          type="button"
          sx={{
            border: '3px outset black',
            borderRadius: '.7em',
            color: 'white',
            '&:hover': {
              backgroundColor: '#274d9eeb',
              color: 'white'
            },
            marginLeft: 1
          }}
          onClick={() => {
            history.push('/registration')
          }}
        >
          Register
        </Button>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
