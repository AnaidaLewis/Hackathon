import React from 'react'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
const MainHomeScreen = () => {
    return (
        <div className='main'>
        <div style={{padding:'0 60px'}}>
        <motion.h5 initial={{x:'-100vw'}} animate={{x:0}} >Welcome to our</motion.h5>
        <motion.h1 initial={{x:'-100vw'}} animate={{x:0}} transition={{delay:.7}} style={{fontSize:'3.5rem',letterSpacing:1.4}}>Healthy Food <br/>Collection !</motion.h1>
         <br/>
        <Button component={motion.div} variant='contained' initial={{x:'-100vw'}} animate={{x:0}} transition={{delay:1.2}} color='warning'>Shop now</Button> 
        </div>
        </div>
    )
}

export default MainHomeScreen
