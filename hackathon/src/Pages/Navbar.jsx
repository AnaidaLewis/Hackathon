/*import React, {useContext} from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

import { makeStyles } from "@mui/styles";
//import logo from "../assets/images/logo.png" ;
//import lighttheme from "../assets/images/lighttheme.png"
const useStyles = makeStyles((theme) => ({
  navlinks: {
    
    marginLeft:"120px",
    display: "flex",
    paddingTop:"2.5vh",
  },
  logo: {
    justifyContent:"center",
    alignItems:"cenetr",
    flexGrow: "1",
    cursor: "pointer",
    color:"#979797",
    fontSize:"2.5vh"
  },
  roots:{
  "&.MuiAppBar-colorPrimary":{
    backgroundColor:"inherit",
  },
  "&.MuiPaper-elevation4":{
    boxShadow:"none",
  },
  },
  link: {
    backgroundColor:"inherit",
    justifyContent:"center",
    alignItems:"center",
    textDecoration: "none",
    color: "#979797",
    fontSize: "20px",
    marginLeft: "20PX",
    marginRight:"25px",
    fontWeight:"450",
    "&:hover": {
      color: "black",
    },
  },
}));

export const Navbar = () =>{

  //const {darkMode, setDarkMode} = useContext(ThemeContext) ;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const HandleTheme = ()=> {
  //   setDarkMode(!darkMode);
  // }

  return (

    <div >
      <AppBar className={classes.roots} style={{position:"relative"}}>
      <Toolbar>
        
        {isMobile ? (
          <div style={{display:"grid" , gridTemplateColumns:"10% 80% 10%" , width:"100%"}}>
          <DrawerComponent style={{backgroundColor:"#E5E5E5"}}/>
          <div style={{justifyContent:"center" , alignItems:"center"}}>
              
              {/*<div style={{display:"grid" , gridTemplateColumns:"20% 80%" ,justifyContent:"center" , alignItems:"center" , }}>
              <img src={logo} alt="logo" style={{width:"50px" , height:"35px" , paddingTop:"1vh" , marginLeft:"35%"}}/>*}/
              
              <Typography className={classes.logo} style={{fontSize:"1rem" , margin:"20px"}}>
              Company Name
              </Typography>
            
              
          </div>
          <div>
              {/*<img src={lighttheme} alt="logo" style={{width:"45px" , height:"50px" , paddingTop:"1.5vh" ,alignItems:"flex-end" }}/>*}/}
              </div>
          
        </div>
        ) : (
          <div style={{display:"grid" , gridTemplateColumns:"25% 75%" , width:"100%" }}>
            <div style={{display:"grid" , gridTemplateColumns:"20% 80%" , paddingTop:"1.5vh" ,justifyContent:"center" ,alignItems:"center" , paddingBottom:"1.5vh"}}>
                <div >
                </div>
                <Typography className={classes.logo} style={{marginLeft:"10px"}}>
                Company Name
                </Typography>
                </div>
          <div className={classes.navlinks} style={{paddingLeft:"30vh" , justifyContent:"center" ,alignItems:"center" , paddingBottom:"1.5vh" , paddingTop:"1.5vh"}}>
            <Link to="/Homepage" className={classes.link}>
              Home
            </Link>
            <Link to="/Page1" className={classes.link}>
              Events
            </Link>
            <Link to="/Page2" className={classes.link}>
              Team
            </Link>
            <Link to="/Feedback" className={classes.link}>
              Contact
            </Link>
          </div>
          </div>
        )}
      </Toolbar>
      </AppBar>

    </div>
     
  );
}
*/

/*import React, {useState, useEffect} from 'react'
import './NavBar.css'

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])

  return (
    <nav>
      {(toggleMenu || screenWidth > 500) && (
      <ul className="list">
      <li className="items">Home</li>
      <li className="items">Services</li>
      <li className="items">Contact</li>
    </ul>
      )}

      <button onClick={toggleNav} className="btn">BTN</button>
    </nav>
  )
}
*/
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
