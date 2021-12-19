import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

var axios = require("axios");

const TwoStep = () => {
  const history = useHistory();
  const number = localStorage.getItem("number");
  //   const email = localStorage.getItem("email");
  console.log(number);

  const [phone,setPhone]=useState('+91'+number)
  const [code,setCode]=useState('')
  const [values, setValues] = useState({
    code: "",
    phone:number,
  });
  var data = JSON.stringify({
    code: `${code}`,
    phone: `${phone}`,
  });
  console.log(values);
  var config = {
    method: "post",
    url: "http://communitybuying.pythonanywhere.com/account/phone-verify/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
 
 
  return (
    <div>
      <br />
      <br />
      <center>
        <TextField
          onChange={(e)=>setCode(e.target.value)}
          type="text"
          label="Code"
        ></TextField>
        <TextField
          type="text"
          label="Phone number"
          value={91 + number}
          disabled
        ></TextField>
        <br />
        {/* <h1>Mail sent to {email} . Verify by linking the click</h1> */}
        <Button
          className="signupButton"
          size="large"
          fullWidth
          variant="contained"
          style={{ borderRadius: "20px" }}
          // style={{ fontSize: '1.1rem', marginRight: '15px' }}
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                history.push("/login");
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          Create account
        </Button>
        {/* <a href ={`mailto:${email}`}>Send Email</a> */}
      </center>
    </div>
  );
};

export default TwoStep;
