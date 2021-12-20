import { Grid } from '@mui/material'
import React from 'react'
import BillingAddress from './BillingAddress'
import Total from './Total'

const Cart = () => {
    return (
        <div>
        <Grid container spacing={3}>
            <Grid item md={6}><BillingAddress></BillingAddress><Total></Total></Grid>
            <Grid item md={6}><Total></Total><Total></Total></Grid>
        </Grid>
        </div>
    )
}

export default Cart
