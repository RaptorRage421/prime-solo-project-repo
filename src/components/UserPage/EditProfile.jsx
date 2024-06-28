import { useState } from "react"
import { useDispatch } from "react-redux"



const EditProfile = ({user, addExtraUserInfo}) => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [stageName, setStageName] = useState("")
    const [avatarImage, setAvatarImage] = useState("")
    const [yearsActive, setYearsActive] = useState("")

    const updateUserInfo = (event) => {
        event.preventDefault()
        let payload = { id: user.id };

        if (firstName) payload.first_name = firstName;
        if (lastName) payload.last_name = lastName;
        if (stageName) payload.stage_name = stageName;
        if (avatarImage) payload.avatar_image = avatarImage;
        if (yearsActive) payload.years_active = yearsActive;

    dispatch({ type: 'UPDATE_USER_INFO', payload })
    addExtraUserInfo()
  };

return (
    <>
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
        
        <button type='submit'>Submit User Info</button>
       
      </form>
    </>
)

}

export default EditProfile