import * as React from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const items=[
 {
  id: 1,
  label: "Requisicões",
  icon: "",
  url: "/requisicoes"
 },
 {
  id: 2,
  label: "Projetos",
  icon: "",
  url: "/projetos"
 }
]


export function AppMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu = (url) => {
    setAnchorEl(null);
    navigate(url);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1, m:0, p:0 }}>
      <AppBar position="static" sx={{ m:0, p:0 }}>
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
	    onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
              'aria-labelledby': 'basic-button',
              },
            }}
          >
          { items.map((item) => <MenuItem key={item.label} sx={{ flexGrow: 1, px: 4 }} onClick={()=> handleMenu(item.url)}>{item.label}</MenuItem>) }
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//            <MenuItem onClick={handleClose}>My account</MenuItem>
//            <MenuItem onClick={handleClose}>Logout</MenuItem>
