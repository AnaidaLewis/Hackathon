import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(()=>({
    link:{
        justifyContent:"cenetr",
        alignContent:"center",
        alignItems:"center",
        textDecoration:"none",
        color: "#000",
        paddingLeft:"15vh",
        paddingRight:"15vh",
        fontSize: "20px",
        fontWeight:"400",
        "&:hover": {
          color: "black",
        },
    },
    icon:{
        color: "black"
    },
    lightbg:{
      backgroundColor:"#F5F5F5" , 
      height:"100%"
    }
}));

 const DrawerComponent = () => {
    const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List className={classes.lightbg}>
        <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/HomePage" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/Page1" className={classes.link}>Events</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/Page2" className={classes.link}>Team</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/Feedback" className={classes.link}>Contact</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;