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
