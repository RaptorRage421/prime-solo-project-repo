import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card } from "@mui/material";

const EditProfile = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [stageName, setStageName] = useState("")
  const [avatarImage, setAvatarImage] = useState("")
  const [yearsActive, setYearsActive] = useState("")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")

  useEffect(() => {
    if (isOpen) {
      setFirstName(user.first_name || "")
      setLastName(user.last_name || "")
      setStageName(user.stage_name || "")
      setAvatarImage(user.avatar_image || "")
      setYearsActive(user.years_active || "")
      setBio(user.bio || "")
      setWebsite(user.website || "")
    }
  }, [isOpen, user])

  const updateUserInfo = (event) => {
    event.preventDefault()
    let payload = { id: user.id }

    if (firstName) payload.first_name = firstName
    if (lastName) payload.last_name = lastName
    if (stageName) payload.stage_name = stageName
    if (avatarImage) payload.avatar_image = avatarImage
    if (yearsActive) payload.years_active = yearsActive
    if (bio) payload.bio = bio
    if (website) payload.website = website

    dispatch({ type: "UPDATE_USER_INFO", payload })
    onClose()
  }

  return (
    <Box>
    <Dialog 
    open={isOpen} 
    onClose={onClose} 
    sx={{
      '& .MuiPaper-root': {
        borderRadius: '1em',
        boxShadow: '0px 0px 10px white;'
      }
    }}
    >
      <Card sx={{ borderRadius: '1em', border: '4px outset black', boxShadow: '4px 4px 40px black'}}>
      <DialogTitle sx={{ backgroundColor: '#1b2961', color: 'white'}}>
        Edit Profile
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#1b2961', color: 'white', boxShadow: '3px 3px 20px black' }}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Stage Name"
          variant="outlined"
          value={stageName}
          onChange={(event) => setStageName(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Avatar Image URL"
          variant="outlined"
          value={avatarImage}
          onChange={(event) => setAvatarImage(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Years Active"
          variant="outlined"
          type="number"
          value={yearsActive}
          onChange={(event) => setYearsActive(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Bio"
          variant="outlined"
          multiline
          rows={4}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
        <TextField
          label="Website"
          variant="outlined"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          fullWidth
          margin="normal"
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': { color: 'white'},
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white', boxShadow: '1px 1px 1px black', borderRadius: '1em' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px outset white', boxShadow: '1px 1px 1px black', borderRadius: '1em'  }
        }}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#1b2961' }}>
        <Button onClick={onClose} sx={{
                      border: '2px outset black',
                      borderRadius: '1em',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#ff4d4d',
                        color: 'white'
                      }
                    }}>Cancel</Button>
        <Button onClick={updateUserInfo} sx={{
                      border: '2px outset black',
                      borderRadius: '1em',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#274d9eeb',
                        color: 'white'
                      }
                    }}>
          Save Changes
        </Button>
      </DialogActions>
      </Card>
    </Dialog>
    </Box>
  )
}

export default EditProfile;
