import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

var axios = require("axios");

const TwoStep2 = () => {
  const history = useHistory();
  const number = localStorage.getItem("number");
  const token = localStorage.getItem("Access");
  //   const email = localStorage.getItem("email");
  //   console.log(number);

  //   const [phone,setPhone]=useState('+91'+number)
  const [code, setCode] = useState("");

  return (
    <div>
      <br />
      <br />
      <center>
        <TextField
          onChange={(e) => setCode(e.target.value)}
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
          onClick={async () => {
            console.log(token);
            console.log(code);
            const res = await axios.get(
              "http://communitybuyingbackend.pythonanywhere.com//account/send-twostep/",
              { params: { token: token, code: code } }
            );
            console.log(res);
          }}
        >
          Create account
        </Button>
        {/* <a href ={`mailto:${email}`}>Send Email</a> */}
      </center>
    </div>
  );
};

export default TwoStep2;
