import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Signin.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import swal from "sweetalert";

import {
  Grid,
  OutlinedInput,
  IconButton,
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  FormHelperText,
  Tooltip,
  Button,
  Paper,
} from "@mui/material";
import Validation from "./Validation";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Swal from "sweetalert2";
var axios = require("axios");

const Signin = () => {
  const history = useHistory();

  const [notValid, setCorrectData] = useState(true);

  const [values, setValues] = useState({
    fname: "bap",
    lname: "bap",
    password: "bhumika13@",
    password2: "bhumika13@",
    email: "",
    // Role: "SELLER",
    phone: "",
    showPassword: false,
    showPassword2: false,
    twostep: true,
  });
  const responseFacebook = (response) => {
    console.log(response);
  };

  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };
  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [role, setRole] = useState("");
  const options = [
    { value: "BUYER", label: "Buyer" },
    { value: "SELLER", label: "Seller" },
  ];
  // signin integrated with backend
  var data = JSON.stringify({
    email: `${values.email}`,
    phone: `${"+91" + values.phone}`,
    password: `${values.password}`,
    twostep: `${values.twostep}`,
    Role: `${role.value}`,
    // Role: "SELLER",
  });
  console.log(role.value);
  //localStorage.setItem("role", Role);
  var config = {
    method: "post",

    url: "http://communitybuyingbackend.pythonanywhere.com//account/signup/",
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
    console.log(auth_token);
    console.log("ID Token: " + auth_token);
    authConfirm(auth_token);
    history.push("/login");

  }

  const phoneverify = (num) => {
    console.log(values);
    console.log(role);
    Swal.fire({
      title: "Enter the Verification code",
      input: "text",
      inputLabel: "Phone Verification",
      inputValidator: (num) => {
        if (!num) {
          return "You need to write something!";
        }
        if (num) {
          var data = JSON.stringify({
            code: `${num}`,
            phone: `${"+91" + values.phone}`,
          });
          console.log(values);
          var config = {
            method: "post",
            url: "http://communitybuyingbackend.pythonanywhere.com//account/phone-verify/",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };
          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              Swal.fire({
                icon: "success",
                title: "Verified",
                text: " Email verification pending ",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
              history.push("/login");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
    });
  };

  return (
    <div className="signin">
      <div style={{ fontSize: "1.5rem",padding:'0 20px 50px' }}>Sign In</div>
      {/* <div style={{marginBottom:"5vh"}}>Lorem ipsumvcbxvnxcvncbv dshfsdhfgfh sdhfgsgj sdfgsdgfhsdgfj </div> */}
      <Paper elevation={3} className="signinPaper">
        <Grid container spacing={5}>
          {/* inputs */}
          <Grid
            style={{ padding: "7%" }}
            component={motion.div}
            // style={{padding:'0 20%'}}
            transition={{ type: "spring", stiffness: 40 }}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            item
            md={6}
            xs={12}
          >
            <div>
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    required
                    autoFocus
                    color="secondary"
                    error={errors.firstName}
                    className="fields_space"
                    fullWidth
                    variant="outlined"
                    value={values.fname}
                    name="fname"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PermContactCalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChanges}
                  />
                  {errors.firstName ? (
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  ) : (
                    <FormHelperText style={{ visibility: "hidden" }}>
                      ..
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    error={errors.lastName}
                    required
                    name="lname"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PermContactCalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={values.lname}
                    onChange={handleChanges}
                  />
                  {errors.lastName ? (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  ) : (
                    <FormHelperText style={{ visibility: "hidden" }}>
                      ..
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </div>
            <br />
            <div>
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    color="secondary"
                    type="email"
                    error={errors.email}
                    name="email"
                    required
                    variant="outlined"
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
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="phone number"
                    type="text"
                    color="secondary"
                    error={errors.phone}
                    name="phone"
                    variant="outlined"
                    required
                    value={values.phone}
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
                  {errors.phone ? (
                    <FormHelperText error>{errors.phone}</FormHelperText>
                  ) : (
                    <FormHelperText style={{ visibility: "hidden" }}>
                      ..
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </div>
            <br />
            <div>
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                  <Tooltip
                    title="Minimum eight characters, at least one letter, one number and one special character are required"
                    arrow
                  >
                    <FormControl color="secondary" fullWidth variant="outlined">
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
                        required
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
                  </Tooltip>
                  {errors.password ? (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  ) : (
                    <FormHelperText style={{ visibility: "hidden" }}>
                      ..
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Tooltip
                    title="Minimum eight characters, at least one letter, one number and one special character are required"
                    arrow
                  >
                    <FormControl color="secondary" fullWidth variant="outlined">
                      <InputLabel
                        color="secondary"
                        htmlFor="outlined-adornment-password"
                      >
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword2 ? "text" : "password"}
                        value={values.password2}
                        required
                        color="secondary"
                        onChange={handleChanges}
                        error={errors.Cpassword}
                        name="password2"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              edge="end"
                            >
                              {values.showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                    </FormControl>
                  </Tooltip>
                  {errors.Cpassword ? (
                    <FormHelperText error>{errors.Cpassword}</FormHelperText>
                  ) : (
                    <FormHelperText style={{ visibility: "hidden" }}>
                      ..
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </div>
            <div>
              {/* <Tooltip
              title="Minimum eight characters, at least one letter, one number and one special character are required"
              arrow
            >
              <FormControl fullWidth variant="outlined">
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
            </Tooltip>
            {errors.password ? (
              <FormHelperText error>{errors.password}</FormHelperText>
            ) : (
              <FormHelperText style={{ visibility: "hidden" }}>
                ..
              </FormHelperText>
            )}
          </div>
          <div>
            <Tooltip
              title="Minimum eight characters, at least one letter, one number and one special character are required"
              arrow
            >
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword2 ? "text" : "password"}
                  value={values.password2}
                  onChange={handleChanges}
                  error={errors.Cpassword}
                  name="password2"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                        edge="end"
                      >
                        {values.showPassword2 ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Tooltip>
            {errors.Cpassword ? (
              <FormHelperText error>{errors.Cpassword}</FormHelperText>
            ) : (
              <FormHelperText style={{ visibility: "hidden" }}>
                ..
              </FormHelperText>
            )} */}
              {/* <input
              onChange={handleChanges}
              name="twostep"
              value={values.twostep}
            ></input> */}
            </div>
            <Select
              placeholder="ROLE"
              value={role}
              name="role"
              onChange={(e) => {
                setRole(e);
              }}
              options={options}
            />

            {notValid? 
            <Button
              fullWidth
              style={{margin:'20px 0'}}
              color="secondary"
              component={motion.div}
              disabled={!notValid}
              whileHover={{
                scale: 1.08,
                textShadow: "0 0 4px rgb(255,255,255)",
                transition: { duration: 0.3 },
              }}
              variant="contained"
              onClick={() => {
                setErrors(Validation(values));
                // console.log(role);
                // setRole(prompt("ADD role"));
              }}
              onMouseOver={() => {
                console.log(errors);
                if (
                  errors.fname == "" &&
                  errors.lname == "" &&
                  errors.phone == "" &&
                  errors.email == "" &&
                  errors.Cpassword == "" &&
                  errors.password == ""
                ) {
                  setCorrectData(false);
                }
              }}
              // if(role==''){
              //   alert("Error")
              // }
              // else{
              // axios(config)
              //   .then(function (response) {
              //     console.log(JSON.stringify(response.data));
              //     localStorage.setItem("number",values.phone)
              //     // localStorage.setItem("email",values.email)
              //     history.push(`/verfication`);
              //   })
              //   .catch(function (error) {
              //     console.log(error);
              //     swal("Account already exists!", "Try logging in", "error");
              //   });
              // }
              // }}}
            >
              Submit
            </Button>
            :
            <Button
              fullWidth
              style={{margin:'20px 0'}}
              component={motion.div}
              color="secondary"
              disabled={notValid}
              whileHover={{
                scale: 1.08,
                textShadow: "0 0 4px rgb(255,255,255)",
                transition: { duration: 0.3 },
              }}
              variant="contained"
              onClick={() => {
                // setErrors(Validation(values));
                console.log(role);
                // setRole(prompt("ADD role"))
                console.warn(errors);

                if (role == "") {
                  alert("Error");
                } else {
                  axios(config)
                    .then(function (response) {
                      console.log(JSON.stringify(response.data));
                      localStorage.setItem("number", values.phone);
                      phoneverify();
                      // localStorage.setItem("email",values.email)
                    })
                    .catch(function (error) {
                      console.log(error);
                     Swal.fire({
                       title:'Error',
                       text:"Account doesn't exist",
                       icon:'error',
                     })
                    });
                  // }
                }
              }}
            >
              Create Account
            </Button>}
            {/* <div className="google">
              <br />
              <span className="or">______________</span>
              <span>&nbsp; OR &nbsp;</span>
              <span className="or">______________</span>
              <br />
              <br />
              {/* <GoogleLogin
              clientId="647346603249-ctkhinc0kr2l7igmvkj7ddtcoiklgq03.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <br /> <br /> */}
            <GoogleLogin
                clientId="647346603249-ctkhinc0kr2l7igmvkj7ddtcoiklgq03.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<GoogleIcon />}
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
            {/* /* <GoogleLogin
              clientId="647346603249-ctkhinc0kr2l7igmvkj7ddtcoiklgq03.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  size="small"
                  startIcon={<GoogleIcon />}
                  // style={{ padding: "13px", marginBottom: "20px" }}
                  fullWidth
                  variant="outlined"
                  onClick={renderProps.onClick} disabled={renderProps.disabled}
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
            /> */} 
            {/* <Button
              size="small"
              startIcon={<GoogleIcon />}
              // style={{ padding: "13px", marginBottom: "20px" }}
              fullWidth
              variant="outlined"
              component={motion.div}
              whileHover={{ scale: 1.1 }}
            >
              &nbsp; Sign in with Google
            </Button> */}
            <br />
            {/* </div> */}
          </Grid>
          <Grid
          component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          item
          md={6}
          xs={12}
          style={{backgroundImage:'url(https://i.pinimg.com/originals/25/76/ab/2576ab3a50ccdae861fc5abcfa20a1dc.gif)'}}
        >

        </Grid>
        
        </Grid>
      </Paper>
    </div>
  );
};

export default Signin;
