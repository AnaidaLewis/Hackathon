import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import HeaderFrontPage from "../HeaderFooter/HeaderFrontPage";
const NotFound = () => {
  return (
    <div>
      <HeaderFrontPage />
      <div style={{ transform: "translateY(-44px)" }}>
        <img
          width="390"
          src="https://i.pinimg.com/originals/1b/60/b4/1b60b4ca9020f5005a293bdc30cbc4c0.gif"
          alt="space"
        ></img>
        <h1 style={{fontWeight:800}}>Oh no 404!</h1>
        <br/>
        <h4 style={{color:'rgb(0,0,0,0.8)'}}>We're usually a treasure chest of knowledge, but we couldn't find what you're looking for. </h4>
        <br/>
        <Link style={{textDecoration:'none'}} to='/'><Button size="small" variant="contained">Try Again!</Button></Link>

      </div>
    </div>
  );
};

export default NotFound;
