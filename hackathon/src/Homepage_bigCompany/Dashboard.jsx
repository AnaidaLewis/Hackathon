import React,{useState,useEffect} from 'react'
import './Dashboard.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import { TextField 
,InputAdornment,Grid,Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Swal from 'sweetalert2'
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
    
}))
const Dashboard = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(13),
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
      const result = await axios.get(`https://community-buying.herokuapp.com/main/product/0/`,{
        headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw`},
      });
      setLoadImage(result.data);
      
      console.warn(load);
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
  
      
      await fetch(`https://community-buying.herokuapp.com/main/product/4/`, {
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
                  
                  axios.delete(`https://community-buying.herokuapp.com/main/product/${id}` , {
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
    return (
        <div className='Dashboard'>
                <div className='Box'>
                <div className='Form'>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 4, md: 8 }}>
      <Grid item xs={12} sm={6} md={4} className = {classes.root} justify="center">
      <TextField 
                            
                            autoFocus="1"
                            label="Name"
                            name="name"
                            variant="outlined" 
                            placeholder="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                         />
                         <TextField 
                            className = {classes.roots}
                            label="Company Name"
                            name="companyname"
                            variant="outlined" 
                            placeholder="Company Name"
                            value={companyname}
                            onChange={(e)=>setCompany(e.target.value)}
                            
                         />

                         <TextField 
                            className = {classes.root}
                            autoFocus="1"
                            label="Category"
                            name="category"
                            variant="outlined" 
                            placeholder="Category"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            required
                         />
                          <TextField 
                            className = {classes.inputbox}
                            autoFocus="1"
                            label="Price"
                            name="price"
                            variant="outlined" 
                            placeholder="Price"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            required
                         />
                         <TextField 
               className = {classes.inputbox}
               type="file"
               required
               variant="outlined" 
               name="Image"
               onChange={(e)=>setImage(e.target.files[0])}
             />

      </Grid>
      <Grid item xs={12} sm={6} md={4} className = {classes.root} justify="center">
      <TextField 
                            className = {classes.inputbox}
                            autoFocus="1"
                            label="Min-Qnty"
                            name="minqnty"
                            variant="outlined" 
                            placeholder="min-qnty"
                            value={min_quantity}
                            onChange={(e)=>setMinqnty(e.target.value)}
                            required
                         />
                         <TextField 
                            className = {classes.inputbox}
                            label="max_quantity"
                            name="max_quantity"
                            variant="outlined" 
                            placeholder="max_quantity"
                            value={max_quantity}
                            onChange={(e)=>setMaxqnty(e.target.value)}
                            
                         />

                         <TextField 
                            className = {classes.inputbox}
                            autoFocus="1"
                            label="below_min_discount"
                            name="below_min_discount"
                            variant="outlined" 
                            placeholder="below_min_discount"
                            value={below_min_discount}
                            onChange={(e)=>setMinDis(e.target.value)}
                            required
                         />
                          <TextField 
                            className = {classes.inputbox}
                            autoFocus="1"
                            label="above_min_discount"
                            name="above_min_discount"
                            variant="outlined" 
                            placeholder="above_min_discount"
                            value={above_min_discount}
                            onChange={(e)=>setMaxDis(e.target.value)}
                            required
                         />
            

                         <TextField 
                         className = {classes.inputbox}
                         autoFocus="1"
                         label="units"
                         name="units"
                         variant="outlined" 
                         placeholder="units"
                         value={units}
                         onChange={(e)=>setUnits(e.target.value)}
                         required
                        />
                        <Button onClick={handleSubmission}>Add Address</Button>


      </Grid>
      </Grid>
                
    </div>
                    
                </div>
                <div className='List'>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 4, md: 8 }}>
                {load.map((index) => (
                 <Grid item xs={2} sm={4} md={4} key={index}>
                
                <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src={"https://community-buying.herokuapp.com/" + index.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {index.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {index.id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteImage(index.id)}>Delete</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
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
