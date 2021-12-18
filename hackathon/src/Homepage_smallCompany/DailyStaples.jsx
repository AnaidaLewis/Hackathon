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
    <div style={{ padding: "20px" }}>
      <center>
        <h2 >Your Daily Staples</h2>
        <br />
      </center>
      <Grid container spacing={2}>
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
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
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
            <Paper
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
            >
              <center>
                <img width="150" height="150" src={oil} alt="oil"></img>
              </center>
              <p> &nbsp; Cooking oils & Ghee</p>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
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
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
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
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
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
        <Grid item md={2} sm={6} xs={12}>
          <Link to="ca" className="cat_link">
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
            <Grid item xs={4}>
              <p>
                <RiPlantFill />
              </p>
              <h3>100% ORGANIC</h3>
            </Grid>
            <Grid item xs={4}>
              <p>
                <MdOutlineEmojiNature />
              </p>
              <h3>NATURAL PROCESS</h3>
            </Grid>
            <Grid item xs={4}>
              <p>
                <GiSlicedBread />
              </p>
              <h3>HOMEGROWN GOODNESS</h3>
            </Grid>
          </Grid>
        </center>
      </div>
    </div>
  );
};

export default DailyStaples;
