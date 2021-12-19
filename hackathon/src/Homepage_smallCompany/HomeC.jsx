import { Grid, Paper } from "@mui/material";
import React from "react";
import FruitsVegetable from "./Fruits_vegetable";
import DailyStaples from "./DailyStaples";
import DiscountNew from "./DiscountNew";
import "./home.css";
import MainHomeScreen from "./MainHomeScreen";
import { Navbar } from "../Pages/Navbar";
import CategoryC from "./Category";
import CategoryHome from "./CategoryHome";
import Footer from "../HeaderFooter/Footer";
import HeaderN from "../HeaderFooter/HeaderN";
const home = () => {
  return (
    <div className="home">
      <div className="home_image">
        <HeaderN/>
        <MainHomeScreen />
      </div>
      <CategoryHome/>
      {/* <center>
        <CategoryC />
      </center> */}
      <FruitsVegetable />
      <DiscountNew />
      <DailyStaples />
      <Footer/>
    </div>
  );
};

export default home;
