import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import EditProfile from "./EditProfile";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Avatar, Grid, Chip, Divider } from "@mui/material";

import "./UserPage.css";

function UserPage() {
  const [editUserInfo, setEditUserInfo] = useState(false);
  const user = useSelector((store) => store.user);

  let role = "";
  if (user.role === 1) {
    role = "DJ";
  } else if (user.role === 2) {
    role = "Promoter";
  }

  const addExtraUserInfo = () => {
    setEditUserInfo(!editUserInfo);
  };

  const handleCloseEditProfile = () => {
    setEditUserInfo(false);
  };

  return (
    <div className="container">
      <Box sx={{ width: "60%", margin: "0 auto" }}>
        <Card sx={{ backgroundColor: "#1b2961", color: "white", boxShadow: "6px 6px 25px black", borderRadius: "1em", border: "4px outset #0d1c35cb" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item sx={{ display: 'flex ', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Avatar variant="square" alt={user.username} src={user.avatar_image} sx={{ width: 250, height: 250, boxShadow: '1px 2px 3px black', border: '3px outset black', borderRadius: '.6em' }} />
<div>
                <Divider textAlign="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Your Role
                </Divider>
                <Typography fontFamily="Roboto" fontSize='55px' fontWeight={800}>
                  {role}
                </Typography>
                </div>
              </Grid>
              <Grid item xs>
                <Typography variant="h3">Welcome, {user.username}!</Typography>
                <br />
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Name
                </Divider>
                <Typography variant="h6" sx={{mb: 2}}>{user.first_name} {user.last_name}</Typography>
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Stage Name
                </Divider>
                <Typography variant="h5" sx={{mb: 2}}>{user.stage_name}</Typography>
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Phone #
                </Divider>
                <Typography variant="body1" sx={{mb: 2}}>{user.phone_num}</Typography>
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Years Active
                </Divider>
                <Typography variant="body1" sx={{mb: 2}}>{user.years_active}</Typography>
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Bio
                </Divider>
                <Typography variant="body1" sx={{mb: 2}}>{user.bio}</Typography>
                <Divider textAlign="left" variant="left" sx={{ '&::before, &::after': { borderColor: 'white' }, my: 0, color: 'white' }}>
                  Website
                </Divider>
                <Typography variant="body1" sx={{mb: 10}}>
                  <a className="link" href={`http://${user.website}`}>
                    {user.website}
                  </a>
                </Typography>
                <Button onClick={addExtraUserInfo} variant="contained" color="primary">
                  Update Info
                </Button>
                <LogOutButton className="btn" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <EditProfile user={user} isOpen={editUserInfo} onClose={handleCloseEditProfile} />
    </div>
  );
}

export default UserPage;
