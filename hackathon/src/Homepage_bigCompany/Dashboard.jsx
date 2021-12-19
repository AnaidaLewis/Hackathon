import React,{useState} from 'react'
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
    const [image,setImage] = useState("");
    const [price,setPrice] = useState("");
    const [companyname,setCompany] = useState("")
    const [category, setCategory] = useState("");
    const [min_quantity,setMinqnty] = useState("");
    const [max_quantity,setMaxqnty] = useState("");
    const [below_min_discount, setMinDis] = useState(" ");
    const [above_min_discount, setMaxDis] = useState(" ");
    const [units,setUnits] = useState(" ");


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }
      };

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
                         autoFocus="1"
                         label="Image"
                         name="image"
                         variant="outlined" 
                         placeholder="Image"
                         value={image}
                         onChange={(e)=>setImage(e.target.value)}
                         required
                        />

      </Grid>
      <Grid item xs={12} sm={6} md={4} className = {classes.root} justify="center">
      <TextField 
                            className = {classes.inputbox}
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
                            className = {classes.inputbox}
                            label="Company Name"
                            name="companyname"
                            variant="outlined" 
                            placeholder="Company Name"
                            value={companyname}
                            onChange={(e)=>setCompany(e.target.value)}
                            
                         />

                         <TextField 
                            className = {classes.inputbox}
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
                         autoFocus="1"
                         label="Image"
                         name="image"
                         variant="outlined" 
                         placeholder="Image"
                         value={image}
                         onChange={(e)=>setImage(e.target.value)}
                         required
                        />


      </Grid>
      </Grid>
                
    </div>
                    
                </div>
                <div className='List'>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 4, md: 8 }}>
                {Array.from(Array(50)).map((_, index) => (
                 <Grid item xs={2} sm={4} md={4} key={index}>
                
                <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
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
