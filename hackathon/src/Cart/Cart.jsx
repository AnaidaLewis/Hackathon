import { Grid } from '@mui/material'
import React from 'react'
import BillingAddress from './BillingAddress'
import Total from './Total'
import OrderHistory from './OrderHistory'
import PlaceOrder from './PlaceOrder'
const Cart = () => {
    return (
        <div>
        <Grid container spacing={3}>
            <Grid item md={6} xs={12}><BillingAddress/><Total/></Grid>
            <Grid item md={6} xs={12}><OrderHistory/></Grid>
        </Grid>
        </div>
    )
}

export default Cart
/*<BillingAddress></BillingAddress>}*/