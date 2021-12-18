import { Button, Grid } from "@mui/material";
import React from "react";
import { IconContext } from "react-icons";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
// import image from "../Header/DJACMLOGO.png";
import './header.css'
const Footer = () => {
  return (
    <div className="footerSection">
      {/* first part */}
      <div
        style={{
          height:'220px',
          backgroundColor: "#000324",
          color: "#dbdbdb",
        }}
      >
        <center>
          <Grid container spacing={1}>
            <Grid style={{ backgroundColor: "#000324" }} item sm={4} xs={12}>
              {/* <img className="footerAcmIcon" src={image} alt="acmIcon" /> */}
            </Grid>
            <Grid style={{ backgroundColor: "#000324" }} item sm={4} xs={12}>
              <p>Get involved</p>
              <li>PPT</li>
              <li>BLOGS</li>
              <li>EVENTS</li>
              <li>CONTACT US</li>
            </Grid>
            <Grid style={{ backgroundColor: "#000324" }} item sm={4} xs={12}>
              <p>Get in touch</p>
              <IconContext.Provider
                value={{ size: "1.7rem", className: "iconsFooter" }}
              >
                <li className="footerSocial">
                  <a href="https://www.instagram.com/djsanghvi_acm/?hl=en">
                    <BsInstagram />
                  </a>
                  {/* </li>
                <li> */}
                  <a href="https://www.facebook.com/djscoe.acm.5">
                    <BsFacebook />
                  </a>
                  {/* </li>
                <li> */}
                  <a href="https://in.linkedin.com/company/dj-sanghvi-acm">
                    <BsLinkedin />
                  </a>
                </li>
              </IconContext.Provider>
            </Grid>
          </Grid>
          {/* copyright */}
          <h6
            style={{ color: " #dbdbdb91", padding: "5px", fontSize: ".8rem" }}
          >
            &copy;
            {new Date().getFullYear()} Food Mart -- All Rights Reserved
          </h6>
        </center>
      </div>
    </div>
  );
};

export default Footer;



