import React from 'react';
import { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import Genres from '../Genres/Genres';
import Events from '../Events/Events';
import DjsList from '../../Djs/DjsList';
import SelectGenres from '../SelectGenres/SelectGenres';
import './UserPage.css'

function UserPage() {
 const [editUserInfo, setEditUserInfo ] = useState(false)
 const [firstName, setFirstName] = useState("")
 const [lastName, setLastName] = useState("")
 const [stageName, setStageName] = useState("")
 const [avatarImage, setAvatarImage] = useState("")
 const [yearsActive, setYearsActive] = useState("")

  const dispatch = useDispatch()
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

  const updateUserInfo = (event) => {
    event.preventDefault()
    dispatch({type: 'UPDATE_USER_INFO', payload: {id: user.id, first_name: firstName, last_name: lastName, stage_name: stageName, avatar_image: avatarImage, years_active: yearsActive}})
    addExtraUserInfo()
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
      {editUserInfo && 
      <form onSubmit={updateUserInfo}>
        <input
        type="text"
        placeholder='First Name'
        value={firstName}    
        onChange={(event) => setFirstName(event.target.value)}
        />
        <input
        type='text'
        placeholder='Last Name' 
        value={lastName}    
        onChange={(event) => setLastName(event.target.value)}
        />
        <input 
        type='text'
        placeholder='Stage Name'
        value={stageName}    
        onChange={(event) => setStageName(event.target.value)}
        />
        <input
        type='text'
        placeholder='avatar'
        value={avatarImage}
        onChange={(event) => setAvatarImage(event.target.value)}
        />
        <input 
        type='number'
        placeholder='Years Active'
        value={yearsActive}
        onChange={(event) => setYearsActive(event.target.value)}
        />
        <SelectGenres />
        <button type='submit'>Submit User Info</button>
       
      </form>
      
      }
    
      <button onClick={addExtraUserInfo}>Update Info</button>
      
      <LogOutButton className="btn" />
    
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
