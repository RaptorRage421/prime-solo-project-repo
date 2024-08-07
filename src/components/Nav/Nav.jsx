import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LogOutButton from '../LogOutButton/LogOutButton';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import './Nav.css';


function Nav() {
  const user = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = user.id ? [
    { page: 'Home', link: '/user' },
    { page: 'Booking', link: '/booking' },
    { page: 'Events', link: '/events' },
    { page: 'Create Event', link: '/create' },
    { page: 'DJs', link: '/djs' },
    { page: 'About', link: '/about' },
    { page: <LogOutButton className="navLink" />, link: '/login' },
  ] : [
    { page: 'Login / Register', link: '/login' },
  ];
  let role = "";
  if (user.role === 1) {
    role = "DJ";
  } else if (user.role === 2) {
    role = "Promoter";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#1d3966',
          boxShadow: '0px 2px 10px black',
          borderBottom: '2px ridge gray'
        }}>
        <Toolbar
          sx={{
            backgroundColor: '#1d3966',
            color: 'white'
          }}>
           
          <Link
            to="/home"
            className="nav-title"
            style={{
              textDecoration: 'none',
              color: 'white'
            }}>
              <Box sx={{display: 'flex', alignItems: 'center', paddingTop: 2, paddingBottom: 2}}> 
            <img src='./images/promodexlogo.png' alt="PromoDex Logo" style={{ height: 'auto'}} />

            {user.id && (
              <Typography
                sx={{
                  fontSize: '40px',
                  fontWeight: '900',
                  textShadow: '-4px 4px 10px black',
                  color: 'white',
                  marginLeft: 10
                }}>
                {role}  :  {user.stage_name}
              </Typography>)}
              </Box>
          </Link>
         
          <Box sx={{ flexGrow: 1 }} />
          <Hidden lgDown>
            {menuItems.map((item, index) => (
              item.link ? (
                <Button
                  key={index}
                  component={Link}
                  to={item.link}
                  color="inherit"
                  sx={{
                    textTransform: 'uppercase',
                    backgroundColor: '#1d3966',
                    fontSize: '20px',
                    marginLeft: 1
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      textShadow: '-4px 4px 10px black'
                    }}>
                    {item.page}
                  </Typography>
                </Button>
              ) : (
                <span key={index}>{item.page}</span>
              )
            ))}
          </Hidden>
          <Hidden lgUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#1d3966',
                  color: 'white',
                  width: 'auto',
                }
              }}
            >
              {menuItems.map((item, index) => (
                
                  <MenuItem
                    key={index}
                    component={Link}
                    to={item.link}
                    onClick={handleMenuClose}
                    sx={{
                      textTransform: 'uppercase',
                      backgroundColor: '#1d3966',
                      fontSize: '20px',
                      marginLeft: 1,
                      borderRadius: '1em',
                      textShadow: '-2px 3px 5px black',
                    }}
                  >
                    {item.page}
                  </MenuItem>
                
              ))}
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default Nav;
