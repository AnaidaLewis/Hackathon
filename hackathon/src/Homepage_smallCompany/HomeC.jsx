import { Grid, Paper } from "@mui/material";
import React from "react";
import FruitsVegetable from "./Fruits_vegetable";
import DailyStaples from "./DailyStaples";
const home = () => {
  return (
    <div>
      <FruitsVegetable></FruitsVegetable>
      <DailyStaples/>
    </div>
  );
};

export default home;
