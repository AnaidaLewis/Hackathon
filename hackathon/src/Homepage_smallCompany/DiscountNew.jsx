import React from "react";
import "./home.css";
import Clock from "react-digital-clock";
import { Paper, Grid } from "@mui/material";
import cucumber from "../Images/cucumber.jpg";
import capsicum from "../Images/capsicum.jpeg";
import brinjal from "../Images/brinjal.jpg";
import beetroot from "../Images/beetroot.jpg";
const DiscountNew = () => {
  return (
    <div className="discountNew">
      <center>
        <p className="heading">HURRY UP!!!</p>
        <br/>
        <h1>DEAL OF THE WEEK</h1>
        <br/>
        <p style={{fontSize:'.8rem'}}>Organic Fresh vegetables 10% Off</p>
        <Paper
          elevation={3}
          style={{ borderRadius: "30px", opacity: 1 }}
          className="discount_paper"
        >
          <Grid container spacing={2} className="mainGrid">
            <Grid item className="discountCards" md={3} sm={6}>
              <img  className="dis" src={beetroot} alt="##"></img>
              <br />
              <span>Beetroot</span>
              <p className="price"> &#8377; 40</p>
            </Grid>
            <Grid item className="discountCards"  md={3} sm={6}>
              <img className="dis" src={cucumber} alt="##"></img>
              <br />
              <span>cucumber</span>
              <p className="price"> &#8377; 40</p>
            </Grid>
            <Grid item className="discountCards" md={3} sm={6}>
              <img className="dis" src={capsicum} alt="##"></img>
              <br />
              <span>capsicum</span>
              <p className="price"> &#8377; 40</p>
            </Grid>
            <Grid item className="discountCards"  md={3} sm={6}>
              <img className="dis" src={brinjal} alt="##"></img>
              <br />
              <span>brinjal</span>
              <p className="price"> &#8377; 40</p>
            </Grid>
          </Grid>
        </Paper>
      </center>
      
    </div>
  );
};

export default DiscountNew;
