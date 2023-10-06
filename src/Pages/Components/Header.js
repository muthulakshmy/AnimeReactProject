import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import DropDown from './DropDown'

const Header = () => {
  return (
  
      <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  MY ANIME WEBAPP
                </Typography>
   
                <DropDown />
              </Toolbar>
            </AppBar>
          </Box>
      
   
  )
}

export default Header
