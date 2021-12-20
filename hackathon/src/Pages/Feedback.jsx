import React from "react";
import { TextField, Button, InputAdornment, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./Feedback.css";
import EmailIcon from "@mui/icons-material/Email";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";

import { motion } from "framer-motion";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "18rem",
      marginBottom: "5vh",
    },
  },
  message: {
    "& .MuiFilledInput-root": {
      width: "18rem",
      height: "10rem",
    },
    "& .MuiFilledInput-input": {
      width: "18rem",
      height: "8rem",
      paddingBottom: "-5vh",
    },
    "& .MuiInputAdornment-root": {
      marginBottom: "7rem",
    },
  },
  icons: {
    "& .MuiSvgIcon-root": {
      width: "5vh",
      height: "5vh",
    },
    borderWidth: "5px",
    borderColor: "black",
    padding: "3vh",
  },
  submit: {
    "&.MuiButton-root": {
      width: "8rem",
      fontSize: "1.2rem",
    },
  },
}));
const Feedback = () => {
  const classes = useStyles();
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className={classes.root}
    >
      <Paper elevation={2}>
        <div className="box">
          <div className="social-media-feedback">
            <div className="title-feedback">
              Contact Us
              <div style={{ fontSize: "0.7rem" }}>
                Contact us for more exciting information
              </div>
            </div>
            <div className="icons-feedback">
              <div className={classes.icons}>
                <LocationOnIcon />
              </div>
              <div className={classes.icons}>
                <EmailIcon />
              </div>
              <div className={classes.icons}>
                <PhoneIcon />
              </div>
            </div>
          </div>
          <div className="feedback-details">
            <div className="detail-1">
              <div className="detail-left">
                <TextField
                  className="inputfield"
                  autoFocus="1"
                  label="Your Name"
                  name="firstname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PermContactCalendarIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="inputfield"
                  autoFocus="1"
                  label="Your Email Address"
                  name="firstname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="inputfield"
                  autoFocus="1"
                  label="Phone Number"
                  name="firstname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="detail-right">
                <TextField
                  className={classes.message}
                  autoFocus="1"
                  label="Message Us"
                  name="firstname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MessageIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="detail-2">
              <div style={{ fontSize: "1.2rem" }}>Interested in ?</div>
              <div className="feedback-buttons">
                <div>
                  <Button
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    Outlined
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    Outlined
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    Outlined
                  </Button>
                </div>
              </div>
              <div className="feedback-submit">
                <Button
                  variant="contained"
                  className={classes.submit}
                  component={motion.div}
                  whileHover={{
                    scale: 1.08,
                    textShadow: "0 0 2px rgb(255,255,255)",
                    transition: { duration: 0.3 },
                  }}
                >
                  Submit <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Feedback;
