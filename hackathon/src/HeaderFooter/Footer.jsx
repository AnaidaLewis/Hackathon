import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box:{
    display:"grid",
    gridTemplateColumns:"70% 30%",
    height:"8vh",
    width:"100%",
    padding:"1vh",
  },
  mobile:{
    display:"grid",
    gridTemplateColumns:"50% 50%",
    height:"8vh",
    width:"100%",
    padding:"1vh",
  },
  company:{
    fontSize:"1.3rem",
    padding:"2vh",
    paddingRight:"50vh",
    color:"black"
  },
  companyMobile:{
    fontSize:"1.1rem",
    padding:"2vh",
    paddingRight:"10vh",
    color:"black"
  },
  roots:{
    "&.MuiAppBar-root":{
        backgroundColor:"white",
        boxShadow:"none",
    },

  },
  button:{
    "& .MuiButton-root":{
      color:"white",
      width:"120px" ,
      height:"35px" , 
      fontSize:"18px",
      backgroundImage: "linear-gradient(to right,#2871FA, #0214FC)", 
      padding:"2vh"
    },
  },
  buttonsmobile:{
    "& .MuiButton-root":{
      color:"white",
      width:"90px" ,
      height:"30px" , 
      fontSize:"15px",
      backgroundImage: "linear-gradient(to right,#2871FA, #0214FC)",
      padding:"2vh"
    },
  },
}));

export const  Footer = () =>{

  const classes = useStyles();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (

    <div >
      <AppBar className={classes.roots} style={{position:"relative"}}>
      <Toolbar>
        {isMobile ? (
          <div className={classes.mobile}>
            <div style={{padding:"2vh" , marginLeft:"-5vh" , fontSize:"0.9rem" ,color:"black"}}>
            Privacy Policy
            </div>
            <div style={{padding:"2vh" ,fontSize:"0.8rem" ,color:"black"}} >
            Copyright&copy;Tract 2021
            </div>
          </div>
        ):(
        <div className={classes.box}>
          <div style={{padding:"2vh" , marginLeft:"-70vh" ,color:"black"}}>
            Privacy Policy
          </div>
          <div style={{padding:"2vh" ,color:"black"}}>
            Copyright&copy;Tract 2021
          </div>
        </div>
        )}
      </Toolbar>
      </AppBar>

    </div>
     
  );
}


