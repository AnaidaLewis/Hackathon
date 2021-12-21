import { Button, Paper, TextField, InputAdornment } from "@mui/material";
import React, { useState, useMemo ,useEffect } from "react";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Select from "react-select";
import countryList from "react-select-country-list";
import { makeStyles } from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root:{
      "& .MuiFormControl-root":{
          padding:"7px",
      },
  },
}))
const BillingAddress = () => {
    const [address,setAdd] = useState("");
    const [city,setCity] = useState("");
    const [pinCode,setPincode] = useState("");
    const [country,setCountry] = useState("")
    const [state, setState] = useState("");
    const[load,setLoadImage]=useState(" ");
    useEffect(() => {
      loadList();
    },[]);
    
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
    const formData = new FormData();
    formData.append("address", address);
    formData.append("city", city);
    formData.append("pinCode", pinCode);
    formData.append("state", state);
    formData.append("country", country);

    const result = await axios.post("http://communitybuyingbackend.pythonanywhere.com/main/address/",{
      headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjY2OTY0LCJpYXQiOjE2NDAwMDc3NjQsImp0aSI6IjRlODYzYTRjODljYjRkYzI4YTkxZDQ1ZmUzY2NhMzQ1IiwidXNlcl9pZCI6Mn0.IaJZTneTHCpl3HT4Y3YlDcUkXmQ7guTWPigmG5e8Hgc`},
      data:formData,
    })
.then((result)=>{
    console.log(result);
}).then((data)=>{

})
.catch(()=>{
  alert('Error in the Code');
});
};
const options = useMemo(() => countryList().getData(), []);
const classes = useStyles();
  return (
    <div style={{ padding: "60px" }} className={classes.root}>
      
        <TextField
          id="outlined-basic"
          label="Address"
          autoComplete="off"
          color="secondary"
          required
          autoFocus
          className="fields_space"
          fullWidth
          variant="outlined"
          value={address}
          name="address"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e)=>setAdd(e.target.value)}
                            
        />
        <TextField
          id="outlined-basic"
          label="Pin Code"
          required
          className="fields_space"
          autoComplete="off"
          color="secondary"
          fullWidth
          variant="outlined"
          value={pinCode}
          name="pinCode"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e)=>setPincode(e.target.value)}
         
                            
        />
        <TextField
          id="outlined-basic"
          label="City"
          required
          className="fields_space"
          autoComplete="off"
          color="secondary"
          fullWidth
          variant="outlined"
          value={city}
          name="city"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e)=>setCity(e.target.value)}
                            
        />
        <TextField
          id="outlined-basic"
          label="State"
          required
          className="fields_space"
          fullWidth
          variant="outlined"
          autoComplete="off"
          color="secondary"
          value={state}
          name="state"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e)=>setState(e.target.value)}
        />

        <Select
          placeholder="Country"
          value={country}
          autoComplete="off"
          color="secondary"
          onChange={(e)=>setCountry(e)}
          options={options}
        />
        
      <center>
      <br/>
      <Button size="large" variant="outlined"  onClick={handleSubmission}>Submit</Button>
      </center>
    </div>
  );
};

export default BillingAddress;
