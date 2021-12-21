import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  TextField,
  InputAdornment,
  Grid,
  Box,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "28rem",
      padding: "7px",
      margin: "2vh",
      height: "6vh",
    },
  },
  /*inputbox: {
    width: "25rem",
    paddingBottom: "5vh",
    margin: "5vh",
  },*/
  card: {
    "& .MuiCard-root": {
      height: "28vh",
      boxShadow: "none",
    },
  },
  button: {
    "& .MuiButtonBase-root": {
      width: "25rem",
      fontSize: "2rem",
    },
  },
  image: {
    "& .MuiCardMedia-root": {
      objectFit: "contain",
    },
  },
}));
const Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(18),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [companyname, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [wholesale_price, setWholePrice] = useState("");
  const [min_order, setMinOrder] = useState("");
  const [total_stock, setTotalStock] = useState(" ");
  const [units, setUnits] = useState(" ");
  const [load, setLoadImage] = useState([]);
  var field = "";
  useEffect(() => {
    loadList();
  }, []);

  const userid = localStorage.getItem("user");
  console.log(userid);
  const loadList = async () => {
    const result = await axios.get(
      `http://communitybuyingbackend.pythonanywhere.com//main/product/0/`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`,
        },
      }
    );
    setLoadImage(result.data);
  };
  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("company", companyname);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("wholesale_price", wholesale_price);
    formData.append("min_order", min_order);
    formData.append("total_stock", total_stock);
    formData.append("units", units);

    await fetch(
      `http://communitybuyingbackend.pythonanywhere.com//main/product/${userid}/`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`,
        },
      }
    )
      .then((result) => {
        loadList();
        console.log(result);
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  /* const deleteImage = (id) => {
      Swal.fire({
          title: 'Are you Sure ?',
          text: "You won't be able to revert it !!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel'
      }).then(async (result) => {
          if (result.value) {
           
              try {
                  
                  axios.delete(`http://communitybuyingbackend.pythonanywhere.com//main/product/${id}` , {
                    headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw`},
                    
                  })
                      Swal.fire(
                          'Deleted !',
                          'The Post has been deleted',
                          'success'
                      )
                      loadList();
              }
              catch (error) {
                  console.log(error);
                  Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: 'Hubo un error, vuelve a intentarlo'
                  })
              }
          }
      })
    }
*/
  const editStock = (id, qnty) => {
    // alert("hii"+qnty+id);
    Swal.fire({
      title: "Enter the quantity to be added",
      input: "text",
      inputLabel: "Re-Stock Quantity",
      inputValidator: async (num) => {
        console.log(num);
        if (!num) {
          return "You need to write something!";
        }
        if (num >= qnty) {
          const formData = new FormData();
          formData.append("total_stock", num);
          var config = {
            method: "put",
            url: `http://communitybuyingbackend.pythonanywhere.com//main/product/${id}/`,
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`,
            },
            data: formData,
          };
          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              Swal.fire({
                icon: "success",
                title: "Successfully Updated",
                showClass: {
                  popup: "animate_animated animate_fadeInDown",
                },
                hideClass: {
                  popup: "animate_animated animate_fadeOutUp",
                },
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Entered value should be more than total stock value",
            showClass: {
              popup: "animate_animated animate_fadeInDown",
            },
            hideClass: {
              popup: "animate_animated animate_fadeOutUp",
            },
          });
        }
      },
    });
  };

  return (
    <div className="Dashboard">
      <div className="Box">
        <div className="Form">
          <Grid
            container
            spacing={{ xs: 2, md: 8 }}
            columns={{ xs: 1, sm: 4, md: 8 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.root}
              justify="center"
            >
              <TextField
                autoFocus="1"
                label="Item Name"
                name="name"
                variant="outlined"
                placeholder="name"
                value={name}
                color="secondary"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.roots}
                label="Company Name"
                name="companyname"
                variant="outlined"
                placeholder="Company Name"
                value={companyname}
                
                color="secondary"
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl className={classes.dropdown}>
                <Select
                  placeholder="Category"
                  name="category"
                  value={category}
                  
                color="secondary"
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ marginTop: "-5px" }}
                >
                  <MenuItem key="Exotic vegetable" value="Exotic vegetable">
                    Exotic vegetable
                  </MenuItem>
                  <MenuItem key="Meat/Seafood" value="Meat/Seafood">
                    Meat/Seafood
                  </MenuItem>
                  <MenuItem key="Daily essentials" value="Daily essentials">
                    Daily essentials
                  </MenuItem>
                  <MenuItem key="Dairy Products" value="Dairy Products">
                    Dairy Products
                  </MenuItem>
                  <MenuItem key="Healthy Food" value="Healthy Food">
                    Healthy Food
                  </MenuItem>
                  <MenuItem key="fruits" value="fruits">
                    Fruits
                  </MenuItem>
                  <MenuItem key="Indian Grocery" value="Indian Grocery">
                    Indian Grocery
                  </MenuItem>
                  <MenuItem key="Bakery Items" value="Bakery Items">
                    Bakery Items
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                className={classes.inputbox}
                label="Price"
                name="price"
                variant="outlined"
                placeholder="Price"
                value={price}
                
                color="secondary"
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.inputbox}
                type="file"
                required
                variant="outlined"
                name="Image"
                
                color="secondary"
                onChange={(e) => setImage(e.target.files[0])}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FileUploadIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.root}
              justify="center"
            >
                <TextField
                className={classes.inputbox}
                label="Total Quantity"
                name="total_stock"
                variant="outlined"

                
                color="secondary"
                placeholder="WholeSale Price"
                value={wholesale_price}
                onChange={(e) => setWholePrice(e.target.value)}
       
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddShoppingCartIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.inputbox}
                label="WholeSale Price"
                name="wholesale_price"
                variant="outlined"

                placeholder="Total Quantity"
                value={total_stock}
                
                color="secondary"
                onChange={(e) => setTotalStock(e.target.value)}
               autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ShoppingCartIcon />
                    </InputAdornment>
                  ),
                }}
              />
          

              <TextField
                className={classes.inputbox}
                label="Minimum order"
                name="min_order"
                variant="outlined"
                placeholder="Minimum Order"
                value={min_order}
                onChange={(e) => setMinOrder(e.target.value)}
                
                color="secondary"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalOfferIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl className={classes.dropdown}>
                <Select
                  name="units"
                  label="units"
                  value={units}
                  
                color="secondary"
                  onChange={(e) => setUnits(e.target.value)}
                  style={{ marginTop: "-5px" }}
                >
                  <MenuItem key="kg" value="kg">
                    Kilogram
                  </MenuItem>
                  <MenuItem key="g" value="g">
                    Gram
                  </MenuItem>
                  <MenuItem key="l" value="l">
                    litre
                  </MenuItem>
                  <MenuItem key="ml" value="ml">
                    Milli-Litre
                  </MenuItem>
                  <MenuItem key="unit" value="unit">
                    Unit
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={handleSubmission}
                className={(classes.button, classes.inputbox)}
                variant="contained"
                
                color="secondary"
                style={{
                  marginTop: "5vh",
                  marginLeft: "20vh",
                  marginBottom: "5vh",
                }}
              >
                Add Items in stock{" "}
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="List">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 9 }}
            columns={{ xs: 1, sm: 4, md: 9 }}
          >
            {load.map((index) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={index}
                className={classes.card}
              >
                <Card
                  sx={{ maxWidth: 630 }}
                  className="card"
                  whileHover={{ scale: 1.1 }}
                  component={motion.div}
                  elevation={3}
                >
                  <div className={classes.image}>
                    <CardMedia
                      component="img"
                      padding="1.2vh"
                      height="150"
                      width="50"
                      src={
                        "https://communitybuyingbackend.pythonanywhere.com" +
                        index.image
                      }
                    />
                  </div>
                  <div className="card-cont">
                    <div className="content">
                      <div className="cont-right">
                        <div className="cont-block">
                          <div className="head-1">
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {index.name}
                            </Typography>
                          </div>
                          <div className="sub-1">
                            <Typography
                              gutterBottom
                              style={{ fontSize: "1.1rem" }}
                            >
                              
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="cont-left">
                        <div className="cont-block1">
                          <div className="head-3">
                            <Typography
                              gutterBottom
                              style={{
                                paddingLeft: "5px",
                                fontSize: "1.1rem",
                                paddingTop: "1vh",
                              }}
                              className="sub-head-3"
                            >
                              <AddShoppingCartIcon
                                onClick={() =>
                                  editStock(index.id, index.total_stock)
                                }
                              />
                              <VisibilityIcon onClick={()=>{history.push("/Address");localStorage.setItem('prodid',index.id)}}/>
                              </Typography>
                          </div>
                        </div>
                        <div
                          className="cont-block"
                          style={{ paddingLeft: "3vh" }}
                        >
                          <div className="head-4">
                            <Typography
                              gutterBottom
                              style={{ fontSize: "0.9rem" }}
                            >
                              Rs.{index.price} per {index.units}
                            </Typography>
                          </div>
                          <div className="sub-4">
                            <Typography
                              gutterBottom
                              style={{ fontSize: "1.1rem" }}
                            >
                              In Stock : {index.total_stock}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="button">
                      <CardActions></CardActions>
                    </div>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>

    /*<div>
        <Grid container spacing={3}>
            <Grid item md={6}> 
            <div style={{ padding: "60px"}}>
            <TextField 
             autoFocus="1"
             label="Item Name"
                            name="name"
                            variant="outlined" 
                            placeholder="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            autoComplete="off"
                            InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                }}
                         />
                         <TextField 
                            className = {classes.roots}
                            label="Company Name"
                            name="companyname"
                            variant="outlined" 
                            placeholder="Company Name"
                            value={companyname}
                            onChange={(e)=>setCompany(e.target.value)}
                            autoComplete="off"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                }}
                         />

                         
            <FormControl className={classes.dropdown}>
            <FormLabel style={{color:"black" , justifyContent:"center" , alignItems:"center" ,marginTop:"-15px" , marginLeft:"10px" ,fontSize:"1.1rem"}} >Units</FormLabel>
            <Select
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              style={{marginTop:"-5px"}}>
              <MenuItem key="Exotic vegetable" value="Exotic vegetable">
              Exotic vegetable
              </MenuItem>
              <MenuItem key="Meat/Seafood" value="Meat/Seafood">
              Meat/Seafood
              </MenuItem>
              <MenuItem key="Daily essentials" value="Daily essentials">
              Daily essentials
              </MenuItem>
              <MenuItem key="Dairy Products" value="Dairy Products">
              Dairy Products
              </MenuItem>
              <MenuItem key="Healthy Food" value="Healthy Food">
              Healthy Food
              </MenuItem>
              <MenuItem key="fruits" value="fruits">
              Fruits
              </MenuItem>
              <MenuItem key="Indian Grocery" value="Indian Grocery">
              Indian Grocery
              </MenuItem>
              <MenuItem key="Bakery Items" value="Bakery Items">
              Bakery Items
              </MenuItem>
              </Select>
            </FormControl>
            
                         
                          <TextField 
                            className = {classes.inputbox}
                            label="Price"
                            name="price"
                            variant="outlined" 
                            placeholder="Price"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <AttachMoneyIcon/>
                                  </InputAdornment>
                                ),
                            }}
                         />
                         <TextField 
                        className = {classes.inputbox}
                        type="file"
                        required
                         variant="outlined" 
                        name="Image"
                        onChange={(e)=>setImage(e.target.files[0])}
                        autoComplete="off"
                        InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                        <FileUploadIcon/>
                        </InputAdornment>
                        ),
               }}
             />
             </div>
          </Grid>
            <Grid item md={6}></Grid>
            
        </Grid>
        <Grid container spacing={{ xs: 2, md: 9 }} columns={{ xs: 1, sm: 4, md: 9 }}>
                {load.map((index) => (
                 <Grid item xs={2} sm={4} md={4} key={index} className={classes.card}>
                
                <Card sx={{ maxWidth: 630  }} className="card" 
                whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}>
                <div className={classes.image}>
                
                
                <CardMedia
                component="img"
                padding="1.2vh"
                height="150"
                width="50"
                
                src={"https://communitybuying.pythonanywhere.com" + index.image}
                />
                </div>
                <div className='card-cont'>
                <div className="content">
                <div className='cont-right'>
                <div className="cont-block">
                <div className='head-1'>
                <Typography gutterBottom variant="h5" component="div">
                {index.name}
                </Typography>
                </div>
                <div className='sub-1'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                {index.category}
                </Typography>
                </div>
                </div>
                </div>
                <div className='cont-left'>
                <div className="cont-block1">
                <div className='head-3' >
                <Typography gutterBottom  style={{paddingLeft:"5px" ,fontSize:"1.1rem" ,paddingTop:"1vh"}} className='sub-head-3'>
                <AddShoppingCartIcon onClick={()=>editStock(index.id,index.total_stock)}/>
                </Typography>
                </div>
                </div>
                <div className='cont-block' style={{paddingLeft:"3vh"}}>
                <div className='head-4'>
                <Typography gutterBottom style={{fontSize:"0.9rem"}}>
                Rs.{index.price} per {index.units}
                </Typography>
                </div>
                <div className='sub-4'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                In Stock : {index.total_stock}
                </Typography>
                </div>
                
                </div>

                </div>
                </div>
                
                <div className="button">
                <CardActions>
                
                </CardActions>
                </div>
                </div>
                </Card>
                </Grid>
        ))}
      </Grid>
        </div>
                 */
  );
};

export default Dashboard;