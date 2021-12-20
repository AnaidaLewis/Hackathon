import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const MainHomeScreen = () => {
  return (
    <div className="main">
      <div style={{ padding: "40px 60px" }}>
        <motion.h5 initial={{ x: "-100vw" }} animate={{ x: 0 }}>
          Welcome to our
        </motion.h5>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: "3.5rem", letterSpacing: 1.4 }}
        >
          Healthy Food <br />
          Collection !
        </motion.h1>
        <br />
        <Link to="/category" style={{textDecoration:'none'}}>
          <Button
            component={motion.div}
            variant="contained"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 1.2 }}
            color="warning"
          >
            Shop now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainHomeScreen;
