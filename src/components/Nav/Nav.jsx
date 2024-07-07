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
    { page: <LogOutButton className="navLink" />, link: null },
  ] : [
    { page: 'Login / Register', link: '/login' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#1d3966', boxShadow: '0px 2px 10px black', borderBottom: '2px ridge gray' }}>
        <Toolbar sx={{ backgroundColor: '#1d3966', color: 'white' }}>
          <Link to="/home" className="nav-title" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>PromoDex</h1>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Hidden mdDown>
            {menuItems.map((item, index) => (
              item.link ? (
                <Button
                  key={index}
                  component={Link}
                  to={item.link}
                  color="inherit"
                  sx={{ textTransform: 'uppercase', backgroundColor: '#1d3966', fontSize: '20px',
                    marginLeft: 1
                  }}
                >
                  {item.page}
                </Button>
              ) : (
                <span key={index}>{item.page}</span>
              )
            ))}
          </Hidden>
          <Hidden mdUp>
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
                item.link ? (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={item.link}
                    onClick={handleMenuClose}
                    sx={{ 
                      textTransform: 'uppercase', 
                      backgroundColor: '#1d3966', 
                      fontSize: '20px',
                      marginLeft: 3,
                      borderRadius: '1em'
                      
                    }}
                  >
                    {item.page}
                  </MenuItem>
                ) : (
                  <Box key={index} sx={{ px: 1 }}>{item.page}</Box>
                )
              ))}
            </Menu>
            </Hidden>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This Toolbar is used to give space below the fixed AppBar */}
    </Box>
  );
}

export default Nav;
