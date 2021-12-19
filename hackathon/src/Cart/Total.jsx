import { Paper } from "@mui/material";
import React from "react";

const dummy = [
  {
    order: "dhvyucdfj",
    price: 234,
    quantity: "2",
  },
  {
    order: "dhvyucdfj",
    price: 234,
    quantity: "2",
  },
  {
    order: "dhvyucdfj",
    price: 234,
    quantity: "2",
  },
];
const Total = () => {
  return (
    <div>
      <h2>SUMARRY OF YOUR SHOPPING</h2>
      {dummy.map((x) => {
        return (
          <Paper style={{margin:'20px'}} elevation={3}>
            <p>{x.order}</p>
            <br />
            Actual price
            <span style={{ textDecoration: "line-through" }}>
              &#8377;{x.price}
            </span>
            <br />
            Discounted Price:<span>&#8377;{x.price - 20}</span>
            <br />
            <p>{x.quantity}Kg</p>
          </Paper>
        );
      })}
    </div>
  );
};

export default Total;
