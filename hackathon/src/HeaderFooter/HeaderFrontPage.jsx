import React from "react";
import { motion } from "framer-motion";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import "./header.css";
import { Link } from "react-router-dom";
const HeaderFrontPage = () => {
  return (
    <header>
      <div className="logo">
        <AccessAlarmIcon style={{ fontSize: "4rem" }}></AccessAlarmIcon>
        {/* <svg className="pizza-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path
            fill="none"
            d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
          />
          <path
            fill="none"
            d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
          />
        </svg> */}
      </div>
      <motion.div initial={{ y: -100 }} animate={{ y: -20 }} className="title">
        <h1>
          <Link
            className="in"
            to={"/login"}
          >
            Login
          </Link>
          <Link className="in" to={"/"}>
            Signin
          </Link>
        </h1>
      </motion.div>
    </header>
  );
};

export default HeaderFrontPage;
