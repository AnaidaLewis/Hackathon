import React from "react";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
// import "../Header/Header.css";
const HeadSocial = () => {
  return (
    <div className="HeaderSocial">
    <IconContext.Provider value={{size:'1.2rem',className:'iconPosition'}}>

      <a href="https://www.instagram.com/djsanghvi_acm/?hl=en" className="socialLinks">
        <BsInstagram />
        &nbsp; djsanghvi_acm
      </a>
      <a href="https://www.facebook.com/djscoe.acm.5" className="socialLinks">
        <BsFacebook />
        &nbsp; djscoe.acm
      </a>
      <a href="https://in.linkedin.com/company/dj-sanghvi-acm" className="socialLinks">
        <BsLinkedin />
        &nbsp; DJ Sanghvi ACM
      </a>
    </IconContext.Provider>
    </div>
  );
};

export default HeadSocial;
