import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import ChatIcon from '@mui/icons-material/Chat'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate } from "react-router-dom";
// import AdbIcon from '@mui/icons-material/Adb';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import { SvgIcon } from '@mui/material';

const settings = ['Logout'];

function Navbar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    //setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate("/iLogin");
  };

  const handleChatClick = () => {
    navigate('/ichat'); // Navigate to the "/wechat" route
  };

  // const[link, navigate] = React.useState('')

  const handleNavigate = () => {
    navigate("/ihome");
  //    var roleName = sessionStorage.getItem("name")
  // if (roleName === "ADMIN" ) {
  //      // navigate("/Adminpage")
        
  //     } 
  //     else if (roleName === "RTO") {
  //      // navigate("/rtoHomePage")
  //     }
  //     else if (roleName === "CLERK") {
  //     //  navigate("/clerkHomePage")
  //     }
  //     else if (roleName === "COP") {
  //     //  navigate("/copHomePage")
  //     }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" style={{backgroundColor:'orange'}}>
        <Toolbar disableGutters>
          {/* <EmojiTransportationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img src='mdhealth.png' width='80px' height='70px' onClick={handleNavigate}/>
          <SvgIcon sx={{fontSize:'30px'}}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
          <Typography
            variant="h6"
            
            noWrap
            onClick={handleNavigate} 
            component="a"
            
            // href={link}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              paddingLeft:'5px',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
           Home
          </Typography>

          {/* <EmojiTransportationIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            // href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TMS
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >

            </Button>

          </Box>
          <Typography variant="h5" sx={{
            pr: 60
          }}>
            MD Health Insurance
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
          <Button sx={{marginRight:'20px',backgroundColor:'#303F9F '  }}
      variant="contained"
      startIcon={<ChatIcon />}
      size="large"
      onClick={handleChatClick}
    >
      Chat
    </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="M"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component='a' textAlign="center" sx={{ textDecoration: 'none' }}>{setting} </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;