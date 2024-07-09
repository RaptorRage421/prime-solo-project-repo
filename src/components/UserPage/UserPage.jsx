import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LogOutButton from "../LogOutButton/LogOutButton";
import EditProfile from "./EditProfile";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Avatar, Grid, Divider } from "@mui/material";

import "./UserPage.css";

function UserPage() {
  const [editUserInfo, setEditUserInfo] = useState(false);
  const user = useSelector((store) => store.user);
  const history = useHistory()

  let role = "";
  if (user.role === 1) {
    role = "DJ";
  } else if (user.role === 2) {
    role = "Promoter";
  }

  const addExtraUserInfo = () => {
    setEditUserInfo(true);
  };

  const handleCloseEditProfile = () => {
    setEditUserInfo(false);
  };

  return (
    <div className="container">
      <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
        <Card sx={{
          backgroundColor: "#1b2961",
          color: "white",
          boxShadow: "6px 6px 25px black",
          borderRadius: "1em",
          border: "4px outset black",
          '@media (max-width: 300px)': {
            width: "100%",
            borderRadius: "1"
          }
        }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item sx={{ display: 'flex ', flexDirection: 'column' }}>
                <Avatar
                
                  variant="square"
                  alt={user.username}
                  src={user.avatar_image}
                  sx={{
                    width: 250,
                    height: 250,
                    boxShadow: '1px 2px 3px black',
                    border: '3px outset black',
                    borderRadius: '.6em',
                    mb: '10px',
                  }}
                />
                <div>
                  <Divider
                    textAlign="left"
                    sx={{
                      '&::before, &::after': { borderColor: 'white' },
                      my: 0,
                      color: 'white'
                    }}>
                    Your Role
                  </Divider>
                  <Typography fontFamily="Roboto" fontSize='55px' fontWeight={800}>
                    {role}
                  </Typography>
                  <Button onClick={addExtraUserInfo}
                    sx={{
                      border: '3px outset black',
                      borderRadius: '.7em',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#274d9eeb',
                        color: 'white'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                  <div>
                    <Button
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
                        history.push('/upload')
                      }}
                    >
                      Upload Images
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs>
                <Typography
                  sx={{
                    m: 0,
                    fontSize: '80px'
                  }}>
                  Welcome, {user.username}!
                </Typography>
                <br />
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Name
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 1
                  }}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Stage Name
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 1
                  }}>
                  {user.stage_name}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Phone #
                </Divider>
                <Typography
                 
                  sx={{
                    fontSize: '20px',
                    mb: 1
                  }}>
                  {user.phone_num}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Email Address
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 1
                  }}>
                  {user.email}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Years Active
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 2
                  }}>
                  {user.years_active}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Bio
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 2
                  }}>
                  {user.bio}
                </Typography>
                <Divider
                  textAlign="left"
                  variant="left"
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'white'
                    },
                    my: 0,
                    color: 'white'
                  }}>
                  Website
                </Divider>
                <Typography
                  
                  sx={{
                    fontSize: '25px',
                    mb: 10
                  }}>
                  <a className="link" href={`http://${user.website}`}>
                    {user.website}
                  </a>
                </Typography>


              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <EditProfile
        sx={{
          borderRadius: '1em'
        }}
        user={user}
        isOpen={editUserInfo}
        onClose={handleCloseEditProfile}
      />
    </div>
  );
}

export default UserPage;
