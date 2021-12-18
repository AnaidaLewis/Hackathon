import { Paper, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CategoryHome = () => {
  const Category = [
    {
      label: "Exotic vegetables",
    },
    {
      label: "Meat/Seafood",
    },
    {
      label: "Daily essentials",
    },
    {
      label: "Dairy Products",
    },
    {
      label: "Healthy Food",
    },
    {
      label: "Indian Grocery",
    },
    {
      label: "Fruits",
    },
    {
      label: "Bakery Items",
    },
  ];
  return (
    <div>
      <Grid container spacing={3} style={{ padding: "30px 0 30px 30px" }}>
        {Category.map((x) => {
          return (
            <Grid item>
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: 700,
                }}
                to={`category/${x.label}`}
              >
                <Paper
                  
                  elevation={2}
                  style={{
                    color: "#3B185F",
                    padding: "8px",
                  }}
                >
                  <p>{x.label}</p>
                </Paper>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CategoryHome;
