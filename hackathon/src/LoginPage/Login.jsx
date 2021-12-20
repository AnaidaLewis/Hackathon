import React, { useState } from "react";
import "./Signin.css";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { GoogleLogin } from "react-google-login";

import {
  Grid,
  OutlinedInput,
  IconButton,
  TextField,
  Paper,
  FormControl,
  InputAdornment,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Validation from "./Validation";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
var axios = require("axios");

const Login = () => {
  const history = useHistory();

  const token = localStorage.getItem("Access");
  const [code, setCode] = useState("");
  const [values, setValues] = useState({
    password: "bhumika13@",
    email: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
    localStorage.setItem("user", JSON.stringify(values.email));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  var data = JSON.stringify({
    email: `${values.email}`,
    password: `${values.password}`,
  });

  var config = {
    method: "post",
    url: "http://communitybuyingbackend.pythonanywhere.com//account/login/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  // Oauth
  async function authConfirm(token) {
    var item = { auth_token: token };

    let result = await fetch(
      "http://communitybuyingbackend.pythonanywhere.com//account/google/",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    try {
      result = await result;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  function responseGoogle(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var auth_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + auth_token);
    authConfirm(auth_token);
  }

  const otp = async (response) => {
    console.warn(response);
    const res = await axios.get(
      "http://communitybuyingbackend.pythonanywhere.com//account/send-twostep/",
      { params: { token: response } }
    );
    console.warn(res);
  };
  const phoneverify = async () => {
    Swal.fire({
      title: "Enter the Verification code",
      input: "text",
      inputLabel: "Phone Verification",
      inputValidator: async (num) => {
        console.log(num);
        if (!num) {
          return "You need to write something!";
        }
        if (num) {
          var data = JSON.stringify({
            code: `${num}`,
            phone: `${"+91" + values.phone}`,
          });
          console.log(values.phone);
          console.log(num);

          const res = await axios.get(
            "http://communitybuyingbackend.pythonanywhere.com//account/send-twostep/",
            { params: { token: token, code: code } }
          );

          history.push("/homePage");

          console.log(res);
        }
      },
    });
  };

  return (
    <div className="signin">
      <div style={{ fontSize: "1.5rem", margin: "5vh" }}>Login</div>
      {/* <div style={{marginBottom:"6vh"}}>Lorem ipsumvcbxvnxcvncbv dshfsdhfgfh sdhfgsgj sdfgsdgfhsdgfj </div> */}
      <Paper elevation={3} className="imgL">
        <Grid container spacing={5}>
          {/* inputs */}

          <Grid
            style={{ padding: "7%" }}
            component={motion.div}
            transition={{ type: "spring", stiffness: 40 }}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            item
            md={6}
            xs={12}
          >
            <div style={{ marginBottom: "7px" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                autoFocus
                type="email"
                name="email"
                variant="outlined"
                color="secondary"
                error={errors.email}
                value={values.email}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChanges}
              />
              {errors.email ? (
                <FormHelperText error>{errors.email}</FormHelperText>
              ) : (
                <FormHelperText style={{ visibility: "hidden" }}>
                  ..
                </FormHelperText>
              )}
            </div>
            <div style={{ transform: "translateX(-8px)" }}>
              <FormControl
                color="secondary"
                fullWidth
                sx={{ m: 1 }}
                variant="outlined"
              >
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  error={errors.password}
                  color="secondary"
                  onChange={handleChanges}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            {errors.password ? (
              <FormHelperText error>{errors.password}</FormHelperText>
            ) : (
              <FormHelperText style={{ fontSize: ".6rem" }}>
                Minimum eight characters, at least one letter, one number and
                one special character are required
              </FormHelperText>
            )}
            <br />
            <Button
              fullWidth
              component={motion.div}
              whileHover={{
                scale: 1.08,
                textShadow: "0 0 8px rgb(255,255,255)",
                transition: { duration: 0.3 },
              }}
              color="secondary"
              variant="contained"
              onClick={() => {
                setErrors(Validation(values));
                axios(config)
                  .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    console.log(response.status);
                    if (response.status == 200) {
                      otp(response.data.access);
                      console.log(response.data.access);

                      // console.warn(response.data["is two step enabled"]);
                      // if (response.data["is two step enabled"] === true) {

                      localStorage.setItem("Access", response.data.access);
                      phoneverify();

                      //   } else
                      //     setTimeout(function () {
                      //       history.push("/homePage");
                      //     }, 50000);
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                    swal("Account already exists!", "Try logging in", "error");
                    history.push("/login");
                  });
                // }
              }}
            >
              Login in Your Account
            </Button>
            <div className="google">
              <br />
              <span className="or">______________</span>
              <span>&nbsp; OR &nbsp;</span>
              <span className="or">______________</span>
              <br />
              <br />
              <GoogleLogin
                clientId="647346603249-ctkhinc0kr2l7igmvkj7ddtcoiklgq03.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    size="small"
                    startIcon={<GoogleIcon />}
                    color="secondary"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    // style={{ padding: "13px", marginBottom: "20px" }}
                    fullWidth
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    &nbsp; Sign in with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <br />
            </div>
          </Grid>
          <Grid
            component={motion.div}
            transition={{ type: "spring", stiffness: 40 }}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            item
            md={6}
            xs={12}
            className="loginImg"
          ></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
