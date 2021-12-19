import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import image from "../Images/beetroot.jpg";

// import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

const Nav = (activePage) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  let value = {
    home: false,
    events: false,
    Committee: false,
    Resources: false,
    Blogs: false,
    contactUs: false,
  };
  // let page = activePage.activePage.activePage;
  // if (page === "Home") value.home = true;
  // else if (page === "Events") value.events = true;
  // else if (page === "Committee") value.Committee = true;
  // else if (page === "Resources") value.Resources = true;
  // else if (page === "Blogs") value.Blogs = true;
  // else if (page === "ContactUs") value.contactUs = true;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      style={{ background: "transparent", boxShadow: "none" }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img
              style={
                {
                  transform: "translateY(-30px)",
                }
              }
              width="60"
              src={image}
              alt="##"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <GiHamburgerMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <span >
                <Link className="headerLinks" to="/">
                  <MenuItem className="mobileNav" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Sign up</Typography>
                  </MenuItem>
                </Link>
                <Link className="headerLinks" to="/login">
                  <MenuItem className="mobileNav" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link className="headerLinks" to="/HomePage">
                  <MenuItem className="mobileNav" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Link>

                <Link className="headerLinks" to="/category/fruits">
                  <MenuItem className="mobileNav" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Category</Typography>
                  </MenuItem>
                </Link>
              </span>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img width="60" src={image} alt="acmIcon" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div style={{margin:'auto'}} >
              <Link disabled={value.home} className="headerLinks" to="/login">
                <button disabled={value.home} className="btn">
                  Login
                </button>
              </Link>
              <Link disabled={value.events} className="headerLinks" to="/">
                <button disabled={value.events} className="btn">
                  Signup
                </button>
              </Link>
              <Link
                disabled={value.Committee}
                className="headerLinks"
                to="/homePage"
              >
                <button disabled={value.Committee} className="btn">
                  Home
                </button>
              </Link>
              {/* <Link
                disabled={value.Resources}
                className="headerLinks"
                to="/Resources"
              >
                <button disabled={value.Resources} className="btn">
                  Resources
                </button>
              </Link> */}
              {/* <Link disabled={value.Blogs} className="headerLinks" to="/Blogs">
                <button disabled={value.Blogs} className="btn">
                  Blogs
                </button>
              </Link> */}
              <Link
                disabled={value.contactUs}
                className="headerLinks"
                to="/category/fruits"
              >
                <button disabled={value.contactUs} className="btn">
                  Category
                </button>
              </Link>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
