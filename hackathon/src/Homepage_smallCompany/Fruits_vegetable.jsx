import React from "react";
import { Grid, Paper,Button } from "@mui/material";
import apple from "../Images/apple.jpg";
import avacado from "../Images/avacado.jpg";
import carrot from "../Images/carrot.jpg";
import cranberry from "../Images/cranberry.jpg";
import FruitsVeg from "../Images/fruits-and-vegetables-hd.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./home.css";
const Fruits_vegetable = () => {
  return (
    <div style={{ padding: "10%" }}>
      <Grid container spacing={3} className="fruitsVeg">
        <Grid item md={6} sm={12} xs={12}>
          <Paper elevation={3}>
            <h2>Get 25% off on your First order</h2>
            <img width="100%" src={FruitsVeg} alt="exotic"></img>
            <img width='150' src="https://i.pinimg.com/originals/ed/fc/7a/edfc7a895125803dea238a73d3e63b44.gif"></img>
            <img width='150' src="https://i.pinimg.com/originals/ed/fc/7a/edfc7a895125803dea238a73d3e63b44.gif"></img>
            <img width='150' src="https://i.pinimg.com/originals/ed/fc/7a/edfc7a895125803dea238a73d3e63b44.gif"></img>
            {/* <Button
              variant="contained"
              color="warning"
            >
              Shop now
            </Button> */}
          </Paper>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} xs={12}>
              <Link to={`category/Healthy Food`} className="cat_link">
                <Paper
                  whileHover={{
                    scale: 1.1,
                  }}
                  component={motion.div}
                  elevation={3}
                >
                  <center>
                    <img
                      width="200"
                      height="200"
                      src={carrot}
                      alt="veggies"
                    ></img>
                  </center>
                  <p> &nbsp;Fresh Veggies</p>
                </Paper>
              </Link>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Link to={`category/Exotic vegetables`} className="cat_link">
                <Paper
                  whileHover={{ scale: 1.1 }}
                  component={motion.div}
                  elevation={3}
                >
                  <center>
                    <img
                      width="200"
                      height="200"
                      src={cranberry}
                      alt="exotic fruits"
                    ></img>
                  </center>
                  <p> &nbsp;Exotic Fruits</p>
                </Paper>
              </Link>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Link to={`category/Healthy Food`} className="cat_link">
                <Paper
                  whileHover={{ scale: 1.1 }}
                  component={motion.div}
                  elevation={3}
                >
                  <center>
                    <img
                      width="200"
                      height="200"
                      src={apple}
                      alt="fruits"
                    ></img>
                  </center>
                  <p> &nbsp;Fresh Fruits</p>
                </Paper>
              </Link>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Link to={`category/Exotic vegetables`} className="cat_link">
                <Paper
                  whileHover={{ scale: 1.1 }}
                  component={motion.div}
                  elevation={3}
                >
                  <center>
                    <img
                      width="200"
                      height="200"
                      src={avacado}
                      alt="exotic"
                    ></img>
                  </center>
                  <p> &nbsp;Exotic Corner</p>
                </Paper>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Fruits_vegetable;
