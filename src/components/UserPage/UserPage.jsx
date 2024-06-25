import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  let role = ""
  const user = useSelector((store) => store.user);
  console.log(user)
  if (user.role === 1) {
     role = "DJ"
  }
  if (user.role === 2) {
    role = "Promoter"
  }
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p> Your Role is : {role}</p>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.stage_name}</p>
      <p>{user.phone_num}</p>
      <p>{user.years_active}</p>
      
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
