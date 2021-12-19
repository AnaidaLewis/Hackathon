import React,{useState,useEffect} from 'react'
import './Dashboard.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import { TextField 
,InputAdornment,Grid,Box,FormLabel,Select,MenuItem,FormControl } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import axios from "axios";
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
        height:"25vh",
      }
    },
    button:{
      "& .MuiButtonBase-root":{
          width:"18rem",
          fontSize:"2rem",
      }
    }
    
}))
const Dashboard = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(18),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    const classes = useStyles();
    const [name,setName] = useState("");
    const [image,setImage] = useState(null);
    const [price,setPrice] = useState("");
    const [companyname,setCompany] = useState("")
    const [category, setCategory] = useState("");
    const [min_quantity,setMinqnty] = useState("");
    const [max_quantity,setMaxqnty] = useState("");
    const [below_min_discount, setMinDis] = useState(" ");
    const [above_min_discount, setMaxDis] = useState(" ");
    const [units,setUnits] = useState(" ");
    const [load,setLoadImage] = useState([]);

    useEffect(() => {
      loadList();
    },[load]);

   
    const loadList = async () => {
      const result = await axios.get(`http://communitybuying.pythonanywhere.com/main/product/0/`,{
        headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw`},
      });
      setLoadImage(result.data);
    }
    const handleSubmission = async (e) => {
      const formData = new FormData();
      formData.append("company", companyname);
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("min_quantity", min_quantity);
      formData.append("below_min_dis", below_min_discount);
      formData.append("total_stock", max_quantity);
      formData.append("above_min_dis", above_min_discount);
  
      
      await fetch(`http://communitybuying.pythonanywhere.com/main/product/1/`, {
        method: "POST",
        body: formData,
        headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw` },
      })
      .then((result)=>{
        loadList();
        console.log(result);
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };

    const deleteImage = (id) => {
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
                  
                  axios.delete(`http://communitybuying.pythonanywhere.com/main/product/${id}` , {
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

    const editImage = (id) =>{
  
    }


    return (
        <div className='Dashboard'>
                <div className='Box'>
                <div className='Form'>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 4, md: 8 }}>
      <Grid item xs={12} sm={6} md={4} className = {classes.root} justify="center">
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

                         {/*<TextField 
                            className = {classes.root}
                            label="Category"
                            name="category"
                            variant="outlined" 
                            placeholder="Category"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            autoComplete="off"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        
                      </InputAdornment>
                    ),
                }}/>*/}
            <FormControl className={classes.dropdown}>
            <FormLabel style={{color:"black" , justifyContent:"center" , alignItems:"center" ,marginTop:"-15px" , marginLeft:"10px" ,fontSize:"1.1rem"}} >Units</FormLabel>
            <Select
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              style={{marginTop:"-5px"}}>
              <MenuItem key="kg" value="kilogram">
                Kilogram
              </MenuItem>
              <MenuItem key="g" value="gram">
                Gram
              </MenuItem>
              <MenuItem key="l" value="litre">
                litre
              </MenuItem>
              <MenuItem key="ml" value="milli-litre">
                Milli-Litre
              </MenuItem>
              <MenuItem key="unit" value="unit">
                Unit
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

      </Grid>
      <Grid item xs={12} sm={6} md={4} className = {classes.root} justify="center">
      <TextField 
                            className = {classes.inputbox}
                            label="Minium - Quantity"
                            name="minqnty"
                            variant="outlined" 
                            placeholder="min-qnty"
                            value={min_quantity}
                            onChange={(e)=>setMinqnty(e.target.value)}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    < ShoppingCartIcon/>
                                  </InputAdornment>
                                ),
                            }}
                         />
                         <TextField 
                            className = {classes.inputbox}
                            label="Total Quantity"
                            name="max_quantity"
                            variant="outlined" 
                            placeholder="total quantity"
                            value={max_quantity}
                            onChange={(e)=>setMaxqnty(e.target.value)}
                            autoComplete="off"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AddShoppingCartIcon/>
                      </InputAdornment>
                    ),
                }}
                         />

                         <TextField 
                            className = {classes.inputbox}
                            label="Minimum Discount offered"
                            name="below_min_discount"
                            variant="outlined" 
                            placeholder="Minimum Discount Offered"
                            value={below_min_discount}
                            onChange={(e)=>setMinDis(e.target.value)}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <LocalOfferIcon/>
                                  </InputAdornment>
                                ),
                            }}
                         />
                          <TextField 
                            className = {classes.inputbox}
                            label="Maximum Discount offered"
                            name="above_min_discount"
                            variant="outlined" 
                            placeholder="above_min_discount"
                            value={above_min_discount}
                            onChange={(e)=>setMaxDis(e.target.value)}
                            autoComplete="off"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                         <LocalOfferIcon/>
                      </InputAdornment>
                    ),
                }}
                         />
            

                         {/*<TextField 
                         className = {classes.inputbox}
                         label="Units"
                         name="units"
                         variant="outlined" 
                         placeholder="units"
                         value={units}
                         onChange={(e)=>setUnits(e.target.value)}
                         autoComplete="off"
                         InputProps={{
                             endAdornment: (
                               <InputAdornment position="end">
                                 <ArrowBackIcon/>
                               </InputAdornment>
                             ),
                         }}
                        />*/}
            <FormControl className={classes.dropdown}>
            <FormLabel style={{color:"black" , justifyContent:"center" , alignItems:"center" , marginTop:"-15px" , marginLeft:"10px" ,fontSize:"1.1rem"}} >Units</FormLabel>
            <Select
              name="units"
              value={units}
              onChange={(e)=>setUnits(e.target.value)}
              style={{marginTop:"-5px"}}>
              <MenuItem key="kilogram" value="kg">
                Kilogram
              </MenuItem>
              <MenuItem key="gram" value="g">
                Gram
              </MenuItem>
              <MenuItem key="litre" value="l">
                litre
              </MenuItem>
              <MenuItem key="milli-litre" value="ml">
                Milli-Litre
              </MenuItem>
              <MenuItem key="unit" value="unit">
                Unit
              </MenuItem>
              </Select>
            </FormControl>
                        
      </Grid>
      </Grid>
      <Button onClick={handleSubmission} className={classes.button} variant="contained" style={{
          marginTop:"5vh",
          marginBottom:"5vh"}}>Add Items in stock </Button>

        
    </div>
                    
                </div>
                <div className='List'>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 4, md: 8 }}>
                {load.map((index) => (
                 <Grid item xs={2} sm={4} md={4} key={index} className={classes.card}>
                
                <Card sx={{ maxWidth: 620  }} className="card">
                <div>
                
                
                <CardMedia
                component="img"
                paddingTop="1.2vh"
                height="170"
                width="60"

                src={"https://communitybuying.pythonanywhere.com" + index.image}
                />
                </div>
                <div className='card-cont'>
                <div className="content">
                <div className='cont-left'>
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
                <div className='cont-block'>
                <div className='head-2'>
                <Typography gutterBottom variant="h5" component="div">
                
                </Typography>
                </div>
                <div className='sub-2'>
                <Typography gutterBottom  style={{fontSize:"1.1rem"}}>
                
                </Typography>
                </div>
                
                </div>

                </div>
                <div className='cont-left'>
                <div className="cont-block1">
                <div className='head-3' >
                <Typography gutterBottom  style={{paddingLeft:"5px" ,fontSize:"1.3rem" ,paddingTop:"1vh"}} className='sub-head-3'>
                <div style={{color:"red"}}>{index.below_min_dis} {`%`}<ArrowDropDownIcon style={{marginTop:"2px", color:"red"}}/></div>
                <div style={{color:"green"}}>{index.above_min_dis} {`%`}<ArrowDropUpIcon style={{marginTop:"2px"}}/></div>
                
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
                <Button size="large" onClick={() => deleteImage(index.id)}>Delete</Button>
                <Button size="large" onClick={() => editImage(index.id)}>Edit</Button>
                </CardActions>
                </div>
                </div>
                </Card>
                </Grid>
        ))}
      </Grid>
    </Box>

      </div>
    </div>
    )

}

export default Dashboard
