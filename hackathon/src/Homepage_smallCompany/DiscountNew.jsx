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
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img width="200" height="200" src={beetroot} alt="##"></img>
              <br />
              <span>Beetroot</span>
              <p className="price"> &#8377; 00</p>
            </Grid>
            <Grid item xs={3}>
              <img width="200" height="200" src={cucumber} alt="##"></img>
              <br />
              <span>cucumber</span>
              <p className="price"> &#8377; 00</p>
            </Grid>
            <Grid item xs={3}>
              <img width="200" height="200" src={capsicum} alt="##"></img>
              <br />
              <span>capsicum</span>
              <p className="price"> &#8377; 00</p>
            </Grid>
            <Grid item xs={3}>
              <img width="200" height="200" src={brinjal} alt="##"></img>
              <br />
              <span>brinjal</span>
              <p className="price"> &#8377; 00</p>
            </Grid>
          </Grid>
        </Paper>
      </center>
      
    </div>
  );
};

export default DiscountNew;
