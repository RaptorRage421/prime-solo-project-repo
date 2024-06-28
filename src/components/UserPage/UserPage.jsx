import React from 'react';
import { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import Genres from '../Genres/Genres';
import Events from '../Events/Events';
import DjsList from '../../Djs/DjsList';
import SelectGenres from '../SelectGenres/SelectGenres';
import EditProfile from './EditProfile';


import './UserPage.css'

function UserPage() {
 const [editUserInfo, setEditUserInfo ] = useState(false)
 

  const dispatch = useDispatch()
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  let role = ""
  const user = useSelector((store) => store.user);
  // console.log(user)
  if (user.role === 1) {
     role = "DJ"
  }
  if (user.role === 2) {
    role = "Promoter"
  }

  
  const addExtraUserInfo = () => {
    setEditUserInfo(!editUserInfo)
  }
  return (
    <div className="container">
      <DjsList />
      <Events />
      
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p> Your Role is : {role}</p>
      <img src={user.avatar_image}/>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.stage_name}</p>
      <p>{user.phone_num}</p>
      <p>{user.years_active}</p>
      {editUserInfo  && 
      <EditProfile 
      user={user} 
      addExtraUserInfo={addExtraUserInfo}
      />
      }
    
      <button onClick={addExtraUserInfo}>Update Info</button>
      
      <LogOutButton className="btn" />
    
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
