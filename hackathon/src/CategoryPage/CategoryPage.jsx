import { Grid,TableCell,TableContainer,Table,TableHead,TableRow } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryTable from './CategoryTable';
const CategoryPage = () => {
    
    const {type}=useParams();
    console.log({type});
    return (
        <div>
         <Grid container spacing={2}>
             <Grid item sm={12} md={6} >
              <CategoryTable/>
             </Grid>
         </Grid>
            helluuu {type}
        </div>
    )
}

export default CategoryPage
