/*import {
  Grid,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';

import React from "react";

const Category = [
  {
    label: "Exotic vegetables",
  },
  {
    label: "Meat & Seafood",
  },
  {
    label: "Daily essentials",
  },
  {
    label: "Dairy Products",
  },
  {
    label: "Healthy Food",
  },
  {
    label: "Indian Grocery",
  },
  {
    label: "Fruits",
  },
  {
    label: "Bakery Items",
  },
];

const CategoryTable = () => {
  return (
    <div>
    
      <TableContainer style={{width:'300px'}} component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor:'#d1c75a'}} align="center">Categories</TableCell>
            </TableRow>
          </TableHead>
          {Category.map((x) => {
            return (
              <TableRow>
                <TableCell align="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: 700,
                      color:'black'
                    }}
                    to={`${x.label}`}
                  >
                    <p>{x.label}</p>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
*/
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Grid,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  root:{
    "& .MuiAppBar-root":{
      height:"10vh",

    },
    "& .MuiPaper-root":{
    }
  }



}))

const drawerWidth = 300;
const Category = [
  {
    label: "Exotic vegetables",
  },
  {
    label: "Meat & Seafood",
  },
  {
    label: "Daily essentials",
  },
  {
    label: "Dairy Products",
  },
  {
    label: "Healthy Food",
  },
  {
    label: "Indian Grocery",
  },
  {
    label: "Fruits",
  },
  {
    label: "Bakery Items",
  },
];


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes=useStyles();
  return (
    <Box sx={{ display: 'flex' }} className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            style={{marginBottom:"5vh"}}
          >
            <MenuIcon />
          </IconButton>
          {Category.map((x)=>{
            return(
              <Typography variant="h6" noWrap style={{marginBottom:"5vh"}}>
                Category
             </Typography>
            );
          })}
         
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
      <TableContainer style={{width:'300px'}} component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor:'#d1c75a'}} align="center">Categories</TableCell>
            </TableRow>
          </TableHead>
          {Category.map((x) => {
            return (
              <TableRow>
                <TableCell align="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: 700,
                      color:'black'
                    }}
                    to={`${x.label}`}
                  >
                    <p>{x.label}</p>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
