import React from "react";
import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiPlantFill } from "react-icons/ri";
import { MdOutlineEmojiNature } from "react-icons/md";
import { GiSlicedBread } from "react-icons/gi";
import "./home.css";
import peas from "../Images/white peas.png";
import dates from "../Images/dates.jpg";
import wheat from "../Images/wheat flour.jpg";
import spice from "../Images/turmeric powder.jpg";
import sugar from "../Images/sugar.jpg";
import oil from "../Images/sunflower oil.jpg";
const DailyStaples = () => {
  return (
    <div style={{ padding: "300px 0px 20px" }}>
      <center>
        <h2>Your Daily Staples</h2>
        <br />
      </center>
      <Grid container spacing={2}>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Daily essentials`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={wheat} alt="wheat"></img>
              </center>
              <p> &nbsp; Atta & Flour</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Daily essentials`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={oil} alt="oil"></img>
              </center>
              <p>Cooking oils & Ghee</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Daily essentials`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={peas} alt="wheat"></img>
              </center>
              <p> &nbsp; Dals and Pulses</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Healthy Food`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={dates} alt="wheat"></img>
              </center>
              <p> &nbsp; Dry Fruits</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Indian Grocery`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={spice} alt="wheat"></img>
              </center>
              <p> &nbsp; Indian Spices</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={6}>
          <Link to={`category/Daily essentials`} className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={sugar} alt="wheat"></img>
              </center>
              <p> &nbsp; Essentials</p>
            </Paper>
          </Link>
        </Grid>
      </Grid>

      <div className="about_quality">
        <center>
          <Grid container spacing={3}>
            <Grid
              component={motion.div}
              initial={{ x: "-100vh" }}
              animate={{ x: 0 }}
              item
              xs={4}
            >
              <p>
                <RiPlantFill />
              </p>
              <motion.h3
                whileHover={{ textDecoration: "underline", scale: 1.2 }}
              >
                100% ORGANIC
              </motion.h3>
              <span style={{ padding: "5px" }}>
                The more natural or eco-based products you can introduce into
                your beauty regimen, the more beneficial it is for your skin.
              </span>
            </Grid>
            <Grid
              component={motion.div}
              initial={{ x: "-100vh" }}
              animate={{ x: 0 }}
              item
              xs={4}
            >
              <p>
                <MdOutlineEmojiNature />
              </p>
              <motion.h3
                whileHover={{ textDecoration: "underline", scale: 1.2 }}
              >
                NATURAL PROCESS
              </motion.h3>
              <span>
                You are what you eat, so don’t be fast, cheap, easy, or fake.
              </span>
            </Grid>
            <Grid
              component={motion.div}
              initial={{ x: "-100vh" }}
              animate={{ x: 0 }}
              item
              xs={4}
            >
              <p>
                <GiSlicedBread />
              </p>
              <motion.h3
                whileHover={{ textDecoration: "underline", scale: 1.2 }}
              >
                HOMEGROWN GOODNESS
              </motion.h3>
              <span>
                A society grows great when old men plant trees whose shade they
                know they shall never sit in.
              </span>
            </Grid>
          </Grid>
        </center>
      </div>
    </div>
  );
};

export default DailyStaples;
