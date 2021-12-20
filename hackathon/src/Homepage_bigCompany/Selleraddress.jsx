/*import React,{useState,useEffect ,useMemo} from 'react'
import {
    Grid,
    TextField,
    Button,
    Card,
    Typography,
    CardContent,
    CardActionArea,
    CardActions

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Swal from 'sweetalert2';
import './Selleraddress.css'
import HomeIcon from '@mui/icons-material/Home';
import { motion } from "framer-motion";

import countryList from "react-select-country-list";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
    root:{
        "& .MuiFormControl-root":{
            width:"28rem",
            padding:"7px",
            margin:"2vh",
            height:"6vh"
        },
        " &.MuiGrid-root":{
          height:"100vh"
        }
        
    },
    inputbox:{
        width:"25rem",
        paddingBottom:"5vh",
        margin:"5vh",
    },
    button:{
        "& .MuiButtonBase-root":{
            width:"18rem",
            fontSize:"2rem",
        },
        "& .MuiSvgIcon-root":{
            width:"15vh",
            height:"15vh"
        }
    },
    
}))
const Selleraddress = () => {
    const classes = useStyles();
    const [address,setAdd] = useState("");
    const [city,setCity] = useState("");
    const [pincode,setPincode] = useState("");
    const [country,setCountry] = useState("")
    const [state, setState] = useState("");
    const [load, setLoadImage] = useState([]);
    var id ;
    
    useEffect(() => {
        loadList();
      },[load]);
     
const options = useMemo(() => countryList().getData(), []);
      const loadList = async () => {
        const result = await axios.get("http://communitybuyingbackend.pythonanywhere.com/main/address/",{
          headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`},
        });
        setLoadImage(result);
        //console.log(result);
        localStorage.setItem("address",result.data.address);
                  localStorage.setItem("city",result.data.city);
                  localStorage.setItem("pincode",result.data.pinCode);
                  localStorage.setItem("state",result.data.state);
                  localStorage.setItem("country",result.data.country);
                  localStorage.setItem("id",result.data.id);
                  localStorage.setItem("user",result.data.user);
        
      };

    const handleSubmission = async (e) => {
      console.log(country.label);
        const formData = new FormData();
        formData.append("address", address);
        formData.append("city", city);
        formData.append("pinCode", pincode);
        formData.append("state", state);
        formData.append("country", country.label);
        const result = await axios.post("http://communitybuyingbackend.pythonanywhere.com/main/address/", {
          headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc` },
          body: formData,
        })
        console.log(result);
  };


    const deleteImage = () => {
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
                    
                    axios.delete("http://communitybuyingbackend.pythonanywhere.com/main/address/" , {
                      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`},
                    })
                        Swal.fire(
                            'Deleted !',
                            'The Post has been deleted',
                            'success'
                        )
                        //loadList();
                        //window.reload();
                        window.localStorage.removeItem('city');
                        window.localStorage.removeItem('address');
                        window.localStorage.removeItem('country');
                        window.localStorage.removeItem('pincode');
                        window.localStorage.removeItem('state');
                       
                        window.location.reload();
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
    return (
      <Grid container spacing={3}>
      <Grid component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
         //transition={ {duration:10 , yoyo:"5"}}
          item md={6} className = {classes.root} justify="center">
          <TextField 
                            
                            autoFocus="1"
                            label="Address"
                            name="address"
                            variant="outlined" 
                            placeholder="Address"
                            value={address}
                            onChange={(e)=>setAdd(e.target.value)}
                            required
                         />
                         <TextField 
                            className = {classes.roots}
                            label="City"
                            name="city"
                            variant="outlined" 
                            placeholder="City"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            
                         />

                         <TextField 
                            className = {classes.root}
                            autoFocus="1"
                            label="Pincode"
                            variant="outlined" 
                            placeholder="Pincode"
                            value={pincode}
                            onChange={(e)=>setPincode(e.target.value)}
                            required
                         />
                          <TextField 
                            className = {classes.inputbox}
                            autoFocus="1"
                            label="State"
                            name="state"
                            variant="outlined" 
                            placeholder="State"
                            value={state}
                            onChange={(e)=>setState(e.target.value)}
                            required
                         />
                        <Select
                        placeholder="Country"
                        value={country}
                        onChange={(e)=>setCountry(e)}
                        options={options}
                        />
                        
             <Button onClick={handleSubmission} variant="contained">Add Address</Button>
        </Grid>
       {/* </div>
            <div className='box-left-detail'>
           
  <Grid item md={6}>
                <Card  component={motion.div}
                transition={{ type: "spring", stiffness: 40 }}
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                sx={{ width: 470 , backgroundColor:"#e8e8cc" , color:"#116530"}}>
                <Typography gutterBottom variant="h5" component="div" style={{marginLeft:"20px"}} className={classes.icons}> Address </Typography>
                
                <CardContent>
               
                  <Typography gutterBottom variant="h5" component="div" >
                  {localStorage.getItem('address')}
                  </Typography>
                  <Typography variant="h5"  color="#116530">
                  {localStorage.getItem('city')} - {localStorage.getItem('pincode')}

                    </Typography>
                    <Typography variant="h5" color="#116530">
                  {localStorage.getItem('country')}
                  
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button  onClick={() => deleteImage()}  style={{color:"red" , borderColor:"red" , fontSize:"1.1rem"}}> Delete</Button>
                  <Button size="small"  style={{textDecoration:"none" , color:"#084619", fontSize:"1.1rem"}}>Edit</Button>
                </CardActions>
                </Card>
                </Grid>
                
            </Grid> 
    )
}

export default Selleraddress
*/

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
const useStyles = makeStyles((theme) => ({
  root:{
      "& .MuiFormControl-root":{
          width:"28rem",
          padding:"7px",
          margin:"2vh",
          height:"6vh"
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
  useEffect(() => {
    loadList();
   //detaillist();
  },[]);
  var id = localStorage.getItem('prodid');
  const loadList = async () => {
    console.log(id);
    const result = await axios.get(`http://communitybuyingbackend.pythonanywhere.com/main/seller-view-order/${id}/`,{
      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjczNjYzLCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6ImFlMDRjYTc3N2Y1YjQyZDZhN2Q5NTA5NWJlMzJkYTZlIiwidXNlcl9pZCI6Mn0.Kk6CCX4aFsYzvSr6YVCTLbCwGypGTk46nFIHT5b4prE`},
    });
    setLoadImage(result);
    console.log(result);
  }
    return (
        <div>
        <Grid container spacing={3}>
            <Grid item md={6}><BillingAddress></BillingAddress></Grid>
            
        </Grid>
          <Grid container spacing={{ xs: 2, md: 9 }} columns={{ xs: 1, sm: 4, md: 9 }}>
                {/*{load.map((index) => (
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
                
                src={"http://communitybuyingbackend.pythonanywhere.com/" + index.image}
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
                ))}*/}
        </Grid>
                </div>
                
    )}
  
export default Cart
