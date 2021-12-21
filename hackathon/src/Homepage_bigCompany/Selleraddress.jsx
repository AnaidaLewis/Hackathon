import { Grid } from '@mui/material'
import React,{useState,useEffect} from 'react'
import BillingAddress from '../Cart/BillingAddress'
import Total from '../Cart/Total'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import axios from "axios";

import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import {motion} from 'framer-motion';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import carroticon from '../Images/carroticon.png';
import corn from "../Images/corn.png";
import fruits from "../Images/fruits.png";
import papaya from "../Images/papayaicon.png";
import lemon from "../Images/lemon.png";
import watermelon from "../Images/watermelon.png";
import wheaticon from "../Images/wheaticon.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import shoppingcart from '../Images/shoppingcart.gif';
const useStyles = makeStyles((theme) => ({
  root:{
      "& .MuiFormControl-root":{
          width:"28rem",
          padding:"7px",
          margin:"2vh",
          height:"6vh",

      },
  },
  inputbox:{
      width:"25rem",
      paddingBottom:"5vh",
      margin:"5vh",
  },
  card:{
    "& .MuiCard-root":{
      height:"28vh",
      boxShadow:"none"
    }
  },
  button:{
    "& .MuiButtonBase-root":{
        width:"25rem",
        fontSize:"2rem",
    }
  },
  image:{
    "& .MuiCardMedia-root":{
      objectFit:"contain",
    }
  },
  
}))

const Cart = () => {
  const classes = useStyles();
  const [load,setLoadImage] = useState([]);
  const [cart,setcart] = useState([]);
  var cartimage;
  var addd;
  var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  var newadd=[];
  useEffect(() => {

    loadList();
  },[]);
  var id = localStorage.getItem('prodid');
 
  const loadList = async () => {
    console.log(id);
    await fetch(
      `http://communitybuyingbackend.pythonanywhere.com/main/seller-view-order/${id}/`,{
        method:"Get",
        headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`},
    }
    ).then ((result)=>{
      //setLoadImage(result);
      return result.json();
    })
    .then((data)=>{
      
      cartimage = data.Product.image;
      setLoadImage(data.Buyer);
      console.log(data.Buyer[0].Address);
      var add = data.Buyer[0].Address;
      newadd = add.split(" ");
      console.log(newadd);
      newadd[3] = newadd[3].replace('"', "")
      localStorage.setItem('addnew',newadd[3].replace(regex, ''))
    }).catch((err)=>{
      alert(err);
    })
   console.log(cartimage);
   addd= localStorage.getItem('addnew');
  }

    return (
        <div>
        <Grid container spacing={3}>
            <Grid item md={6}><BillingAddress></BillingAddress></Grid>
            
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
                padding="2vh"
                height="150"
                width="50">
                  <img src={shoppingcart} alt="cart" style={{objectFit:"contain" ,padding:"2vh"}}/>
                 
                  </CardMedia>
                </div>
                <div className='card-cont'>
                <div className="content">
                <div className='cont-right'>
                <div className="cont-block">
                <div className='head-1'>
                <Typography gutterBottom variant="h5" component="div">
                Quantity: {index.Quantity}
                {cartimage}
                </Typography>
                </div>
                <div className='sub-1'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                
                </Typography>
                </div>
                </div>
                </div>
                <div className='cont-left'>
                <div className="cont-block1" style={{display:"grid" , gridTemplateRows:"30% 30% 30%" }}>
               
                <Typography gutterBottom >
                505 , 
                Raheja Township 
                </Typography>
                <Typography gutterBottom >
                Andheri - 400097
                </Typography>
                <Typography gutterBottom >
                Mumbai
                </Typography>
                </div>
                <div className='cont-block' style={{paddingLeft:"3vh"}}>
                <div className='head-4'>
                <Typography gutterBottom style={{fontSize:"0.9rem"}}>
                Total Price
                </Typography>
                </div>
                <div className='sub-4'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                 {index.finalPrice}
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
                
    )}
  
export default Cart
