import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useCart} from "react-use-cart";
import {onlineStatus, offlineStatus} from './Status';
import {Link} from 'react-router-dom';
import './Style/Navigation.css';
import {Toast, Modal} from 'react-bootstrap';


const userId = localStorage.getItem('id');
const userName = localStorage.getItem('User');

const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));

// ========= Nav component
const NavigationBar = ({loggedIn, logOut}) => {
   // Online
   if (loggedIn) {
    onlineStatus(+ userId)
  } else {
    console.log('ok')
  };

  // Offline
  if (!loggedIn) {
    offlineStatus(+ userId)
  } else {
    console.log('ok')
  };

  const [anchorElNav,
    setAnchorElNav] = React.useState(null);
  const [anchorElUser,
    setAnchorElUser] = React.useState(null);
  const [openModal,
    setOpenModal] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{
      background: '#f8f9fa',
      color: '#000',
      padding : '12px'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            mr: 1
          }}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
            mr: 2,
            display: {
              xs: 'none',
              md: 'flex'
            },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#000',
            textDecoration: 'none'
          }}>
            LOGO
          </Typography>

          <Box
            sx={{
            flexGrow: 1,
            display: {
              xs: 'flex',
              md: 'none'
            }
          }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
              keepMounted
              transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
              display: {
                xs: 'block',
                md: 'none'
              }
            }}>
            {/* ======= pages ======= */}
            {/* Home */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="link-nav" to='/'>
                    <Typography textAlign="center">HOME</Typography>
                  </Link>
                </MenuItem>
            {/* Product */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="link-nav" to='/guitars'>
                    <Typography textAlign="center">PRODUCT</Typography>
                  </Link>
                </MenuItem>
                 {/* Contact */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="link-nav" to='/contact-us'>
                    <Typography textAlign="center">CONTACT</Typography>
                  </Link>
                </MenuItem>
                 {/* Sign-up */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="link-nav" to='/auth'>
                    <Typography textAlign="center">SIGN-UP/LOGIN</Typography>
                  </Link>
                </MenuItem>
      
            </Menu>

          </Box>
          <AdbIcon
            sx={{
            display: {
              xs: 'flex',
              md: 'none'
            },
            mr: 1
          }}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
            mr: 2,
            display: {
              xs: 'flex',
              md: 'none'
            },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}>
            LOGO
          </Typography>
           {/* Pages menu */}
            {/* Home */}
          <Box
            sx={{ flexGrow: 1, display: {  xs: 'none', md: 'flex' }  }}>
           
              <Link className="link-nav" to='/'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                  my: 2,
                  display: 'block',
                  color: '#000'
                }}>
                 HOME
                </Button>
              </Link>
           {/* Product */}
              <Link className="link-nav" to='/guitars'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                  my: 2,
                  display: 'block',
                  color: '#000'
                }}>
                 PRODUCT
                </Button>
              </Link>
           {/* Contact */}
              <Link className="link-nav" to='/contact-us'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                  my: 2,
                  display: 'block',
                  color: '#000'
                }}>
                 CONTACT
                </Button>
              </Link>
           {/* Sign up */}
              <Link className="link-nav" to='/auth'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                  my: 2,
                  display: 'block',
                  color: '#000'
                }}>
                 SIGN-UP/LOGIN
                </Button>
              </Link>
      
          </Box>
          {/* Shopping Cart */}
         
          <Link to="/cart">
            <IconButton aria-label="cart" color="inherit" size="large">
              <StyledBadge badgeContent={5} color="primary">
               
                <ShoppingCartIcon fontSize="inherit"
                 style={{ fontSize: "30px" }}/>
               
              </StyledBadge>
            </IconButton>
            </Link>
         {/* Settings */} 
          <Box sx={{
            flexGrow: 0
          }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                p: 0
              }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
              mt: '45px'
            }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
              keepMounted
              transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
                {/* Profile */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                {/* Home */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {/* Logout */}
              
               
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"  
                  color="error"
                  onClick={logOut}>
                  Logout
                  </Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
