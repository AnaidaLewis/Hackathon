import {
  Grid,
  TableCell,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";

import { MdOutlineAddCircle } from "react-icons/md";
import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryTable from "./CategoryTable";
import axios from "axios";
import Swal from "sweetalert2";

const AllItems = () => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const all_items = async () => {
      const res = await axios.get(
        "http://communitybuying.pythonanywhere.com/main/all-product/"
      );
      console.log(res.data);
      setArr(res.data);
    };
    all_items();
  }, []);
  //   const [itemCount, setItemCount] = React.useState(0);
  const history = useHistory();
  var FormData = require("form-data");
  var data = new FormData();
  //   data.append("qty", itemCount);
  const Access=localStorage.getItem('Access')
  const addToCart = async (id, ordered, total) => {
    Swal.fire({
      title: "Update the Quantity",
      input: "number",
      inputValidator: async (num) => {
        console.log(num);
        if (!num) {
          return "You need to write something!";
        } else if (num) {
          //   setItemCount(num);
          console.log(num);
          if (total < num) {
            Swal.fire("Enter Valid Data");
          } else {
            data.append("qty", num);
            console.log(data);
            //   console.log(itemCount);
            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                Swal.fire({
                  icon: "success",
                  title: "Added to Cart",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              })
              .catch(function (error) {
                console.log(error);
                Swal.fire({
                  text: "Item already exist in cart",
                  title: "Oopsss !",
                  icon: "error'",
                  showCancelButton: true,
                  confirmButtonColor: "#116530 ",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Cart",
                }).then((result) => {
                  if (result.isConfirmed) {
                    history.push("/cart");
                  }
                });
              });
          }
        }
      },
    });
    var config = {
      method: "POST",
      url: `http://communitybuying.pythonanywhere.com/main/cart/${id}/`,
      headers: {
        // Authorization:
        //   `Bearer ${Access}`
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjQzMDQyLCJpYXQiOjE2Mzk5ODM4NDIsImp0aSI6ImNhNGUxOGQyZGYzNDRjZmRiZDgyZDcyNzkwMmM4ZjFiIiwidXNlcl9pZCI6MjR9.owtBfRV03qlmXfBDcB2XAg2AFHJO9nLvgHlEMSDnEJ4",
      },
      data: data,
    };
  };

  return (
    <div>
      <CategoryTable />
      <Grid style={{ padding: "20px" }} container spacing={2}>
        {arr.map((x, index) => {
          return (
            <Grid item sm={6} md={3}>
              <Paper
                style={{ paddingBottom: "60px" }}
                whileHover={{
                  scale: 1.05,
                }}
                component={motion.div}
                elevation={3}
              >
                <center>
                  <img
                    width="150"
                    height="150"
                    src={"http://communitybuying.pythonanywhere.com" + x.image}
                    alt="veggies"
                  ></img>
                </center>
                <span> &nbsp;{x.name} </span>
                <span
                  style={{
                    color: "red",
                    float: "right",
                    textDecoration: "line-through",
                  }}
                >
                  &#8377;{x.price}&nbsp;
                </span>
                <br />
                <span style={{ color: "rgba(0,0,0,.6)", fontSize: ".8rem" }}>
                  &nbsp;Stock Left: {x.total_stock}
                </span>
                <span style={{ color: "green", float: "right" }}>
                  &#8377;{x.wholesale_price}&nbsp;
                </span>
                <br />
                {/* <Badge color="primary" badgeContent={4}>
          <ShoppingCart />{" "}
        </Badge>
        <Badge color="primary" badgeContent={4}> */}
                <span>Already in cart:{x.products_ordered}</span>
                <IconButton
                  style={{
                    float: "right",
                    fontSize: "3rem",
                    color: " #116530",
                  }}
                  onClick={() =>
                    addToCart(x.id, x.products_ordered, x.total_stock)
                  }
                >
                  <MdOutlineAddCircle />
                </IconButton>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default AllItems;
