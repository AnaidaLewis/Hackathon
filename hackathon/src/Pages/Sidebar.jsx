
import React, { useState } from "react";

//All the svg files
import Home from "../assets/home-solid.svg";
import Team from "../assets/social.svg";
import Calender from "../assets/sceduled.svg";
import Documents from "../assets/feedback.svg";
import PowerOff from "../assets/settings.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>({
  root:{
  "& .MuiTooltip-tooltip":{
    backgroundColor:"black",
    color:"white",
    fontSize:"1.2rem",
    fontWeight:"300",
    width:"15vh",
  },
  "& .MuiTooltip-popper":{
    width:"20vh",
    backgroundColor:"black",
    height:"8vh"
  }
}
}))

const SidebarContainer = styled.div`
  position:fixed;
  background-color: var(--black);
  width: 3.5rem;
  height: 80vh;
  margin-top: 9vh;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 5px solid var(--white);
    img {
      filter: invert(10%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  img {
    width: 1.2rem;
    height: 1.5rem;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;


;

const Sidebar = () => {
  const classes = useStyles();
  

  return (
     
     <SidebarContainer>

      <Logo>
          {/*<img src={logo} alt="logo" />*/}
        </Logo>
        <SlickBar className={classes.root}>
          <Item to="#2">
            <img src={Home} alt="Home" />
          </Item>
         
          <Item to="#7">
            <img src={Team} alt="Team" />
          </Item>
          <Item to="#8">
            <img src={Calender} alt="Calender" />
          </Item>
          <Item to="#">
            <img src={Documents} alt="Documents" />
          </Item>
        </SlickBar>
       
        
        
      </SidebarContainer>
  );
};

export default Sidebar;