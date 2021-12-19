import { Button, Grid } from "@mui/material";
import React from "react";
import { IconContext } from "react-icons";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
// import image from "../Header/DJACMLOGO.png";
import "./header.css";
const Footer = () => {
  return (
    <center>
      <h2>@Follow us on instagram</h2>
      <Grid container spacing={0}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={0}>
            <Grid item md={3} sm={6} xs={6}>
              <img
                width="190"
                height="250"
                src="https://images.pexels.com/photos/5085407/pexels-photo-5085407.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                width="190"
                height="250"
                src="https://images.pexels.com/photos/2683373/pexels-photo-2683373.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                width="190"
                height="250"
                src="https://images.pexels.com/photos/7556322/pexels-photo-7556322.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                width="190"
                height="250"
                src="https://images.pexels.com/photos/8181523/pexels-photo-8181523.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={0}>
            <Grid container spacing={0}>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  width="190"
                  height="250"
                  src="https://images.pexels.com/photos/3872434/pexels-photo-3872434.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  width="190"
                  height="250"
                  src="https://images.pexels.com/photos/5129931/pexels-photo-5129931.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  width="190"
                  height="250"
                  src="https://images.pexels.com/photos/1590583/pexels-photo-1590583.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  width="190"
                  height="250"
                  src="https://images.pexels.com/photos/4113820/pexels-photo-4113820.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} className="assurance">
        <Grid item sm={4} xs={12}>
          <h3 className="assurance_head">FREE SHIPPING</h3>
          <p>On all orders above &#8377;500</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h3 className="assurance_head">7 DAYS RETURN</h3>
          <p>Simple return in within 24h for an exchange<br/> T&C Applied</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h3 className="assurance_head">SUPPORT 24/7</h3>
          <p>contact us 24hours a day, 7 days a week</p>
        </Grid>
      </Grid>
    </center>
  );
};

export default Footer;
