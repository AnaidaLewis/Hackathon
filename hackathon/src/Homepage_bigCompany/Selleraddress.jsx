import React,{useState,useEffect} from 'react'
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
     
      const loadList = async () => {
        const result = await axios.get("http://communitybuying.pythonanywhere.com/main/address/",{
          headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw`},
        });
        setLoadImage(result);
        console.log(result);
        localStorage.setItem("address",result.data.address);
                  localStorage.setItem("city",result.data.city);
                  localStorage.setItem("pincode",result.data.pinCode);
                  localStorage.setItem("state",result.data.state);
                  localStorage.setItem("country",result.data.country);
                  localStorage.setItem("id",result.data.id);
        
      };

    const handleSubmission = async (e) => {
        const formData = new FormData();
        formData.append("address", address);
        formData.append("city", city);
        formData.append("pinCode", pincode);
        formData.append("state", state);
        formData.append("country", country);
    await fetch("http://communitybuying.pythonanywhere.com/main/address/", {
      method: "POST",
      body: formData,
      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw` },
    })
    .then((result)=>{
        var data = result.data;
        console.log(result.data);
        //console.log(result.data);
      loadList();
    })
    .catch(()=>{
      alert('Error in the Code');
    });
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
                    
                    axios.delete("http://communitybuying.pythonanywhere.com/main/address/" , {
                      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw`},
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
        <div className='box-add'>
            <div className='box-right-add'>
      <Grid component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
         //transition={ {duration:10 , yoyo:"5"}}

          item xs={12} sm={6} md={4} className = {classes.root} justify="center">
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
                         <TextField 
                         className = {classes.inputbox}
                         autoFocus="1"
                         label="Country"
                         name="country"
                         variant="outlined" 
                         placeholder="Country"
                         value={country}
                         onChange={(e)=>setCountry(e.target.value)}
                         required
                        />
                        
      <Button onClick={handleSubmission} variant="contained" style={{marginTop:"5vh" , marginLeft:"3vh" , fontSize:"1.15rem" }} className={classes.button}>Add Address</Button>

      </Grid>
        </div>
            <div className='box-left-detail'>
           

                <Grid item md={3}>
                    <div>
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
                </div>
                </Grid>
            </div>
            
        </div>
    )
}

export default Selleraddress
/*onClick={() => deleteImage(name.id)} */