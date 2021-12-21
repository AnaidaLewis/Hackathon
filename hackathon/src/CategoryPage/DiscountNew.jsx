import React from "react";
import "../Homepage_smallCompany/home.css"
import Clock from "react-digital-clock";
import { Paper, Grid } from "@mui/material";
import apple from "../Images/apple.jpg";
import grapes from "../Images/black grapes.jpg";
import berrymix from "../Images/berry-mix.jpg";
import dragon from "../Images/dragon fruit.jpg";

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
        <p style={{fontSize:'.8rem'}}>Organic Fresh Fruits 10% Off</p>
        <Paper
          elevation={3}
          style={{ borderRadius: "30px", opacity: 1 }}
          className="discount_paper"
        >
          <Grid container spacing={2} className="mainGrid">
            <Grid item className="discountCards" md={3} sm={6}>
              <img  className="dis" src={apple} alt="##"></img>
              <br />
              <span>apple</span>
              <p className="price"> &#8377; 70</p>
            </Grid>
            <Grid item className="discountCards"  md={3} sm={6}>
              <img className="dis" src={berrymix} alt="##"></img>
              <br />
              <span>berrymix</span>
              <p className="price"> &#8377; 70</p>
            </Grid>
            <Grid item className="discountCards" md={3} sm={6}>
              <img className="dis" src={dragon} alt="##"></img>
              <br />
              <span>dragon</span>
              <p className="price"> &#8377; 70</p>
            </Grid>
            <Grid item className="discountCards"  md={3} sm={6}>
              <img className="dis" src={grapes} alt="##"></img>
              <br />
              <span>grapes</span>
              <p className="price"> &#8377; 70</p>
            </Grid>
          </Grid>
        </Paper>
      </center>
      
    </div>
  );
};

export default DiscountNew;
