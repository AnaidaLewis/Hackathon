import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  box:{
    display:"grid",
    gridTemplateColumns:"70% 30%",
    height:"40px",
    width:"100%",
    padding:"1vh",
  },
  mobile:{
    display:"grid",
    gridTemplateColumns:"55% 45%",
    height:"8vh",
    width:"100%",
    padding:"1vh",
  },
  company:{
    fontSize:"1.3rem",
    padding:"2vh",
    marginLeft:"-70vh",
    color:"black"
  },
  companyMobile:{
    fontSize:"1.1rem",
    padding:"2vh",
    marginLeft:"-5vh",
    color:"black"
  },
  roots:{
    "&.MuiAppBar-root":{
      backgroundColor:"white",
      boxShadow:"none",
    }

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

export const  Header = () =>{

  const classes = useStyles();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  

  return (

    <div >
      <AppBar className={classes.roots} style={{position:"relative"}}>
      <Toolbar>
        {isMobile ? (
          <div className={classes.mobile}>
            <div className={classes.companyMobile}>
            Company Name
            </div>
            <div style={{padding:"2vh"}} className={classes.buttonsmobile}>
            <Button><Link to="Login" style={{textDecoration:"none" , color:"white" , fontSize:"12px"}}>
              Sign Up 
            </Link></Button>
            
            </div>
          </div>
        ):(
        <div className={classes.box}>
          <div className={classes.company}>
            Company Name
          </div>
          <div style={{padding:"2vh"}} className={classes.button}>
          <Button>
            <Link to="Login" style={{textDecoration:"none" , color:"white" , fontSize:"18px"}}>
            Sign Up 
            </Link>
          </Button>
          </div>
        </div>
        )}
      </Toolbar>
      </AppBar>

    </div>
     
  );
}

