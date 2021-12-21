
import React,{useEffect,useState} from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
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


import shoppingcart from "../Images/shoppingcart.gif";

import notplaced from "../Images/notplaced.gif";
var datacart=[];
var photoadd;
var count = 0;
const Total = () => {

  const [load,setLoadImage] = useState([]);
  const [blogs,setBlogs]=useState([]);
  useEffect(() => {
    loadList();

  },[]);
  const loadList = async () => {

    await fetch(
      `http://communitybuyingbackend.pythonanywhere.com/main/place-order/`,{
        method:"get",
        headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`},
    }
    ).then ((result)=>{
      return result.json();
    })
    .then((data)=>{
      
      
      var cartstatus = data;
      if(data.detail === 'No new items Added to cart')
      {
      Swal.fire(
        {
          icon: "error",
             title: "Entered value should be more than total stock value",
             showClass: {
               popup: "animate__animated animate__fadeInDown",
             },
             hideClass: {
               popup: "animate__animated animate__fadeOutUp",
             },
          title:cartstatus.detail
        } 
      )
      }
      else{
      setLoadImage(data.cartItems);
      console.log(data);
      }
    }).catch(()=>{
      alert("error");
    })
    
}


const editStock =(id) =>{
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
       if(num!=0) {
         const formData = new FormData();
         formData.append("qty", num);
         var config = {
           method: "put",
           url: `https://communitybuyingbackend.pythonanywhere.com/main/cart/${id}/`,
           headers: {
             "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`
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
                 popup: "animate__animated animate__fadeInDown",
               },
               hideClass: {
                 popup: "animate__animated animate__fadeOutUp",
               },
             });
           })
           .catch(function (error) {
             console.log(error);
           });
       }
       else{
         Swal.fire({
           icon: "error",
           title: "Entered value should be more than total stock value",
           showClass: {
             popup: "animate__animated animate__fadeInDown",
           },
           hideClass: {
             popup: "animate__animated animate__fadeOutUp",
           },
         });
       }
     },
   });
 }

const placeorder=async()=>{
 
  await fetch(
    `http://communitybuyingbackend.pythonanywhere.com/main/place-order/`,{
      method:"post",
      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`},
  }
  ).then ((result)=>{
    return result.json();
  })
  .then((data)=>{
    
    var cartstatus = data;
    if(data.detail === 'No new items Added to cart')
    {
    Swal.fire(
      {
        icon: "error",
           title: "Entered value should be more than total stock value",
           showClass: {
             popup: "animate__animated animate__fadeInDown",
           },
           hideClass: {
             popup: "animate__animated animate__fadeOutUp",
           },
        title:cartstatus.detail
      } 
    )
    }
    else{
      Swal.fire(
        {
          icon: "success",
               title: "Successfully Updated",
               showClass: {
                 popup: "animate__animated animate__fadeInDown",
               },
               hideClass: {
                 popup: "animate__animated animate__fadeOutUp",
          },
          title: 'order successfylly placed',
          text: 'Total price : '+ data['total Price'] +' / '+ data.cartItems.length + ' items ordered',
          


        } 
      )
    }
    console.log(data);
    //console.log(data.Product.image)
   // console.log(cartimage)
  }).catch(()=>{
    alert("error");
  })
}

  return (
    <div>
      <h2 style={{alignItems:"center" ,marginBottom:"5vh" ,marginLeft:"5vh"}}>SUMARRY OF YOUR SHOPPING</h2>
      <Button onClick={()=>placeorder()} variant="contained" style={{marginLeft:"5vh"}}>Place the Order</Button>

     {load?.map((index,key) => (
      <Card sx={{ maxWidth: 630}} className="card" 
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
              style={{marginLeft:"3vh", marginBottom:"5vh",boxShadow:"none"}}
              >
              <div>
             
                
              <CardMedia
                padding="2vh"
                height="150"
                width="50"
              
                >
                    <img src={notplaced} alt="cart" style={{objectFit:"contain" ,padding:"3vh"}}/>
                 
                  </CardMedia>
             
                </div>
                <div className='card-cont'>
                <div className="content">
                <div className='cont-right'>
                <div className="cont-block">
                <div className='head-1'>
                <Typography gutterBottom variant="h5" component="div" color="secondary">
                Total Price : {index.qty * index.price}
                </Typography>
                </div>
                <div className='sub-1'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                Your Cart-id : {index.cart}
                </Typography>
                </div>
                </div>
                </div>
                <div className='cont-left'>
                <div className="cont-block1">
                <div className='head-3' >
                <Typography gutterBottom  style={{paddingLeft:"5px" ,fontSize:"1.1rem" ,paddingTop:"1vh"}} className='sub-head-3'>
                <AddShoppingCartIcon onClick={()=>editStock(index.item,index.qty)}/>
                
                </Typography>
                </div>
                </div>
                <div className='cont-block' style={{paddingLeft:"3vh"}}>
                <div className='head-4'>
                <Typography gutterBottom style={{fontSize:"0.9rem"}}>
                Quantity 
                </Typography>
                </div>
                <div className='sub-4'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                {index.qty}
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

      ))}
    </div>
  );
};

export default Total;
