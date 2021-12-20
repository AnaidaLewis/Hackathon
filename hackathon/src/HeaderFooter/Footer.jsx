import { Button, Grid } from "@mui/material";
import React from "react";
import { IconContext } from "react-icons";
import { FaShippingFast } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { GiHamburgerMenu, GiFruitBowl } from "react-icons/gi";
import "./header.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <center>
        <h1 className="footerI">@Follow us on instagram</h1>
      <Grid  className="footerI" container spacing={0} style={{ width: "97%" }}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={0}>
            <Grid item md={3} sm={6} xs={6}>
              <img
                // width="190"
                className="footerImgs"
                // height="250"
                src="https://images.pexels.com/photos/5085407/pexels-photo-5085407.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                // width="190"
                className="footerImgs"
                // height="250"
                src="https://images.pexels.com/photos/2683373/pexels-photo-2683373.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                // width="190"
                className="footerImgs"
                // height="250"
                src="https://images.pexels.com/photos/7556322/pexels-photo-7556322.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="##"
              ></img>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <img
                // width="190"
                className="footerImgs"
                // height="250"
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
                  // width="190"
                  className="footerImgs"
                  // height="250"
                  src="https://images.pexels.com/photos/3872434/pexels-photo-3872434.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  // width="190"
                  className="footerImgs"
                  // height="250"
                  src="https://images.pexels.com/photos/5129931/pexels-photo-5129931.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  // width="190"
                  className="footerImgs"
                  // height="250"
                  src="https://images.pexels.com/photos/1590583/pexels-photo-1590583.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <img
                  // width="190"
                  className="footerImgs"
                  // height="250"
                  src="https://images.pexels.com/photos/4113820/pexels-photo-4113820.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="##"
                ></img>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </center>

      <center>
        <Grid container spacing={3} className="assurance">
          <Grid item sm={4} xs={12}>
            <FaShippingFast style={{ fontSize: "5rem" }} />
            {/* <img width='100' src='https://cdn-icons.flaticon.com/png/512/2203/premium/2203124.png?token=exp=1639938938~hmac=7907209bd8c87b1b821ea0a2ead41f14' alt="##"></img> */}
            <h3 className="assurance_head">FREE SHIPPING</h3>
            <p>On all orders above &#8377;500</p>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FiPackage style={{ fontSize: "5rem" }} />

            <h3 className="assurance_head">7 DAYS RETURN</h3>
            <p>
              Simple return in within 24h for an exchange
              <br /> T&C Applied
            </p>
          </Grid>
          <Grid item sm={4} xs={12}>
            <RiCustomerService2Fill style={{ fontSize: "5rem" }} />

            <h3 className="assurance_head">SUPPORT 24/7</h3>
            <p>contact us 24hours a day, 7 days a week</p>
          </Grid>
        </Grid>
        <div className="footerSection">
          <Grid container spacing={1}>
            <Grid style={{ backgroundColor: "#116530" }} item sm={4} xs={12}>
              <GiFruitBowl style={{ fontSize: "9rem", color: "white" }} />
            </Grid>
            <Grid style={{ backgroundColor: "#116530" }} item sm={4} xs={12}>
              <p>Get involved</p>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/homePage"
              >
                <li>Home</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/category"
              >
                <li>Category</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/feedback"
              >
                <li>Feedback</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/cart"
              >
                <li>Cart</li>
              </Link>
            </Grid>
            <Grid style={{ backgroundColor: "#116530" }} item sm={4} xs={12}>
              <p>Get in touch</p>
              <IconContext.Provider
                value={{ size: "1.7rem", className: "iconsFooter" }}
              >
                <li className="footerSocial">
                  <a href="##">
                    <BsInstagram />
                  </a>

                  <a href="##">
                    <BsFacebook />
                  </a>
                  <a href="##">
                    <BsLinkedin />
                  </a>
                </li>
              </IconContext.Provider>
            </Grid>
          </Grid>
        </div>

        {/* copyright */}
        <h6 style={{ padding: "5px", fontSize: ".8rem" }}>
          &copy;
          {new Date().getFullYear()} FOOD Mart -- All Rights Reserved
        </h6>
      </center>
    </div>
  );
};

export default Footer;
