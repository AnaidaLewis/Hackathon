
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
    const result = await axios.get(`http://communitybuyingbackend.pythonanywhere.com/main/place-order/`,{
      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`},
    })
    Swal.fire
    ({
      title:'Cart is Empty',

    })
    .then((response) => {
      setLoadImage(result.data.cartItems);
      console.log(load);

    })
  .catch((error) => {
    console.log(error); //Logs a string: Error: Request failed with status code 404
  });

  
   
   //setLoadImage(result.data.Products);
  
    /*console.log(result.data.Products);
    for(var i=0;i<=result.data.Products.length;i++)
    {
      localStorage.setItem('obj',JSON.parse(Object.values(result.data.Products[i])));
      var temp = localStorage.getItem('obj');
      console.log(temp);
      datacart[i]=temp;
      console.log(datacart);

    }*/
    //data = Object.values(result.data.Products);
    //console.log(data);
    //localStorage.setItem('obj',Object.values(result.data.Products[0]));
    
    
    {/*var value={};
    result.data.cartItems.map(async(item,index)=>{
        value[item.item]= await detaillist(item.item)
    })
  Setcartdetail(value);*/}
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
         alert(id + num);
         const formData = new FormData();
         formData.append("qty", num);
         var config = {
           method: "put",
           url: `https://communitybuying.pythonanywhere.com/main/cart/${id}/`,
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
  const resp = await axios.post(`http://communitybuyingbackend.pythonanywhere.com/main/place-order/`,{
    headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`},
  });
  console.log(resp);
  Swal.fire(
    {
      title: "order detail",
      inputLabel: resp.data,
    }
  )
}

  return (
    <div>
      <h2 style={{alignItems:"center" ,marginBottom:"5vh"}}>SUMARRY OF YOUR SHOPPING</h2>
      <Button onClick={()=>placeorder()}>Place the Order</Button>
     {load?.map((index,key) => (
      <Card sx={{ maxWidth: 630}} className="card" 
              whileHover={{ scale: 1.1 }}
              component={motion.div}
              elevation={3}
              style={{marginLeft:"3vh", marginBottom:"5vh",boxShadow:"none"}}
              >
              <div>
             
                
                <CardMedia
                component="img"
                paddingTop="1.2vh"
                height="140"
                width="50"


                src={"http://communitybuyingbackend.pythonanywhere.com/"}

                />
             
                </div>
                <div className='card-cont'>
                <div className="content">
                <div className='cont-right'>
                <div className="cont-block">
                <div className='head-1'>
                <Typography gutterBottom variant="h5" component="div">
                {key.name}
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
                {index.item}
                <AddShoppingCartIcon onClick={()=>editStock(index.item,index.qty)}/>
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
                {/*<Button size="large" onClick={() => deleteImage(index.id)}>Delete</Button>
                <Button size="large" onClick={() => editImage(index.id)}>Edit</Button>*/}
                </CardActions>
                </div>
                
                </div>
              </Card>

      ))}
    </div>
  );
};

export default Total;
{/*{dummy.map((x) => {
  onClick={()=>editStock(index.id,index.total_stock)}
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



      })}*/}