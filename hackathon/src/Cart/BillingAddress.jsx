import { Button, Paper, TextField, InputAdornment } from "@mui/material";
import React, { useState, useMemo } from "react";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Select from "react-select";
import countryList from "react-select-country-list";
const BillingAddress = () => {
  const [values, setValues] = useState({
    city: "",
    zipCode: "",
    address: "",
    state: "",
    country: "",
  });
  const [country, setCountry] = useState("");
  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };
  const changeHandler = (value) => {
    setCountry(value);
  };
  const options = useMemo(() => countryList().getData(), []);
  return (
    <div style={{ padding: "60px" }}>
      <Paper elevation={2}>
        <TextField
          id="outlined-basic"
          label="City"
          required
          autoFocus
          className="fields_space"
          fullWidth
          variant="outlined"
          value={values.city}
          name="city"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Zip Code"
          required
          className="fields_space"
          fullWidth
          variant="outlined"
          value={values.zipCode}
          name="zipCode"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          required
          className="fields_space"
          fullWidth
          variant="outlined"
          value={values.address}
          name="address"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="State"
          required
          className="fields_space"
          fullWidth
          variant="outlined"
          value={values.state}
          name="state"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChanges}
        />

        <Select
          placeholder="Country"
          value={country}
          onChange={changeHandler}
          options={options}
        />
      </Paper>
      <center>
      <br/>
      <Button size="large" variant="outlined">Submit</Button>
      </center>
    </div>
  );
};

export default BillingAddress;
