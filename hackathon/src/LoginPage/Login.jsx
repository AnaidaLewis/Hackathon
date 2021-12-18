import React, { useState } from "react";
import "./Signin.css";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import {
  Grid,
  OutlinedInput,
  IconButton,
  TextField,
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
var axios = require("axios");

const Login = () => {
  const history = useHistory();

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
    url: "https://community-buying.herokuapp.com/account/login/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return (
    <div className="signin">
      <div style={{ fontSize: "1.5rem", margin: "5vh" }}>Login</div>
      {/* <div style={{marginBottom:"6vh"}}>Lorem ipsumvcbxvnxcvncbv dshfsdhfgfh sdhfgsgj sdfgsdgfhsdgfj </div> */}
      <Grid container spacing={5}>
        {/* inputs */}

        <Grid
          component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ y: "-100vw" }}
          animate={{ y: 0 }}
          item
          md={12}
          xs={12}
        >
          <div style={{ marginBottom: "7px" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              name="email"
              variant="outlined"
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
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                error={errors.password}
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
              Minimum eight characters, at least one letter, one number and one
              special character are required
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
            variant="contained"
            onClick={() => {
              setErrors(Validation(values));
              axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  console.log(response.status);
                  // setTimeout(function () {
                  if (response.status == 200) {
                    console.warn(response.data["is two step enabled"]);
                    if (response.data["is two step enabled"] === true) {
                      history.push("/verfication");
                    } else
                      setTimeout(function () {
                        history.push("/homePage");
                      }, 50000);
                  }
                  //   setTimeout(()=>{
                  //   if(response.status==200)
                  //   history.push("/homePage");
                  //   else
                  //   alert('error bro')
                  //   }
                  // ,[3000]
                })
                .catch(function (error) {
                  console.log(error);
                  swal("Account already exists!", "Try logging in", "error");
                  history.push("/login");
                });
              // }
            }}
          >
            <Link
              to="HomePage"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              Login in Your Account
            </Link>
          </Button>
          <div className="google">
            <br />
            <span className="or">______________</span>
            <span>&nbsp; OR &nbsp;</span>
            <span className="or">______________</span>
            <br />
            <br />
            <Button
              size="small"
              startIcon={<GoogleIcon />}
              // style={{ padding: "13px", marginBottom: "20px" }}
              fullWidth
              variant="outlined"
              component={motion.div}
              whileHover={{ scale: 1.1 }}
            >
              &nbsp; log in with Google
            </Button>
            <br />
          </div>
        </Grid>

        {/* google facebook 
        <Grid
          component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          item
          md={6}
          xs={12}
        >
          <div className="social2">
            <Button
              startIcon={<GoogleIcon />}
              style={{ padding: "13px", marginBottom: "20px" }}
              fullWidth
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              variant="outlined"
            >
              &nbsp; Sign up with Google
            </Button>
            <br />
            <Button
              startIcon={<FacebookIcon />}
              style={{ padding: "13px", marginBottom: "20px" }}
              fullWidth
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              variant="outlined"
            >
              &nbsp;Sign up with Facebook
            </Button>
            <br />

            <Button
              startIcon={<TwitterIcon />}
              style={{ padding: "13px", marginBottom: "20px" }}
              fullWidth
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              variant="outlined"
            >
              &nbsp; Sign up with Twitter
            </Button>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Login;
