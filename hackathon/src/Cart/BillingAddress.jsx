import { Button, Paper, TextField, InputAdornment } from "@mui/material";
import React, { useState, useMemo } from "react";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Select from "react-select";
import countryList from "react-select-country-list";
import { makeStyles } from "@mui/styles";

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
  
  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("city", city);
    formData.append("pinCode", pinCode);
    formData.append("state", state);
    formData.append("country", country);
await fetch("http://communitybuyingbackend.pythonanywhere.com//main/address/", {
  method: "POST",
  body: formData,
  headers: {"Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMTQyMDU2LCJpYXQiOjE2Mzk4ODI4NDEsImp0aSI6ImZlY2E5Y2UzOTdlZjQyYjBiMWNkZTA2YmJlNTQyMjIxIiwidXNlcl9pZCI6MX0.awey4ucXAKVNgXJm4pF_E5VmL7JUK7cxH2kO2-HGnnw` },
})
.then((result)=>{
    var data = result.data;
    console.log(result.data);
    //console.log(result.data);
})
.catch(()=>{
  alert('Error in the Code');
});
};
const options = useMemo(() => countryList().getData(), []);
const classes = useStyles();
  //const options = useMemo(() => countryList().getData(), []);
  return (
    <div style={{ padding: "60px" }} className={classes.root}>
      <Paper elevation={3}>
        <TextField
          id="outlined-basic"
          label="Address"
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
          fullWidth
          variant="outlined"
          value={pinCode}
          name="pincode"
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
          label="Address"
          required
          className="fields_space"
          fullWidth
          variant="outlined"
          value={city}
          name="address"
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
          onChange={(e)=>setCountry(e)}
          options={options}
        />
        
      </Paper>
      <center>
      <br/>
      <Button size="large" variant="outlined"  onClick={handleSubmission}>Submit</Button>
      </center>
    </div>
  );
};

export default BillingAddress;
