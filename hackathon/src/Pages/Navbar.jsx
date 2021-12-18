import React, {useContext} from "react";
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
              <img src={logo} alt="logo" style={{width:"50px" , height:"35px" , paddingTop:"1vh" , marginLeft:"35%"}}/>*/}
              
              <Typography className={classes.logo} style={{fontSize:"1rem" , margin:"20px"}}>
              Company Name
              </Typography>
            
              
          </div>
          <div>
              {/*<img src={lighttheme} alt="logo" style={{width:"45px" , height:"50px" , paddingTop:"1.5vh" ,alignItems:"flex-end" }}/>*/}
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