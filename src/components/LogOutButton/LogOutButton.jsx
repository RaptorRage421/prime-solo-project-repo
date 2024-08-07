import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
    sx={{
      color: 'white', 
      fontSize: '20px',
      marginLeft: -1,
      textShadow: '-4px 4px 10px black'
    }}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
