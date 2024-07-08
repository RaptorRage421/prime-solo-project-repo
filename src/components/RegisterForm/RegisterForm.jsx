import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [role, setRole] = useState('1') // Default role set to 'DJ'
  const errors = useSelector((store) => store.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        phone_num: phoneNum,
        role: role,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          required
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
      <div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          required
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
      <div>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          required
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
      <div>
        <TextField
          label="Phone #"
          variant="outlined"
          type="phone"
          value={phoneNum}
          onChange={(event) => setPhoneNum(event.target.value)}
          fullWidth
          required
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
      <div>
        <FormControl
          sx={{
            minWidth: '100%'
          }}
          required>
          <InputLabel
            sx={{ color: 'white' }}
            id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Role"
            required
            onChange={(event) => setRole(event.target.value)}
            sx={{
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
          >
            <MenuItem value={1}>DJ</MenuItem>
            <MenuItem value={2}>Promoter</MenuItem>
          </Select>
        </FormControl>

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
            marginTop: 1
          }}
        >Register</Button>
        <span>
          <div className='container'>
            <h4>Already a Member?</h4>
            <Button
              sx={{
                border: '3px outset black',
                borderRadius: '.7em',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#274d9eeb',
                  color: 'white'
                },
                marginTop: 1,
                marginLeft: 4
              }}
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </div>
        </span>
      </div>

    </form>
  );
}

export default RegisterForm;
