import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FreeIcon from "../../assets/icons/HomeCareLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import {
  SERVICE_PATH,
  HOME_PATH,
  HISTORY_PATH,
  CONTACT_US_PATH,
  SETTING_PATH
} from "../../routes/path";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Fade,
} from "@mui/material";
import LoginDialog from "../components/dialog-login";

// Modified pages array - removed LOGIN_PATH
const pages = [
  { to: HOME_PATH, label: "Home" },
  { to: SERVICE_PATH, label: "Service" },
  { to: HISTORY_PATH, label: "History" },
  { to: CONTACT_US_PATH, label: "Contact Us" },
];
const settings = [
  { to: SETTING_PATH, label: "Profile"}, // Fixed: Changed Label to label for consistency
  { to: SETTING_PATH, label: "Setting"},
  { to: "/", label: "Logout"}
];

function ResponsiveAppBar() {
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  // New state for login dialog
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Login dialog handlers
  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with:", email, password);
    // After successful login, close dialog
    handleCloseLoginDialog();
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #611463 0%, #7b1980 100%)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
      }}>
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: { xs: '85px', md: '100px' },
              py: 1.5,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "85px",
                height: "85px",
                mr: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                  zIndex: -1,
                  borderRadius: "50%",
                  filter: "blur(10px)"
                }
              }}
            >
              <img
                src={FreeIcon}
                alt=""
                style={{ 
                  width: "110px", 
                  height: "110px", 
                  marginTop: -12,
                  filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
                  transition: "all 0.5s ease",
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ 
                  p: 1.5,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(247, 147, 30, 0.1)',
                    transform: 'scale(1.05)',
                    borderColor: '#f7931e'
                  }
                }}
              >
                <MenuIcon fontSize="large" sx={{ 
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
                }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                TransitionComponent={Fade}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    borderRadius: 3,
                    mt: 2,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    minWidth: '250px'
                  }
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem 
                    key={page.to} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.to}
                    sx={{
                      borderLeft: page.to === currentPath ? '5px solid #f7931e' : 'none',
                      backgroundColor: page.to === currentPath ? 'rgba(247, 147, 30, 0.1)' : 'transparent',
                      py: 2,
                      pl: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(97, 20, 99, 0.08)',
                        pl: 4
                      }
                    }}
                  >
                    <Typography 
                      textAlign="left" 
                      fontSize="16px" 
                      fontWeight={page.to === currentPath ? "bold" : "normal"}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleOpenLoginDialog();
                  }}
                  sx={{
                    py: 2,
                    my: 1,
                    mx: 2,
                    backgroundColor: 'rgba(247, 147, 30, 0.9)',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(247, 147, 30, 1)',
                    }
                  }}
                >
                  <Typography 
                    textAlign="center" 
                    fontWeight="bold" 
                    color="white"
                    fontSize="16px"
                  >
                    Log in
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
                fontSize: { xs: "1.4rem", sm: "1.6rem" },
              }}
            >
              HomeCare
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 8,
                px: 4,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  bottom: "-20px",
                  height: "2px",
                  width: "40%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                  style={{
                    margin: "2px 0",
                    display: "flex",
                    textDecoration: "none",
                    fontSize: "19px",
                    boxSizing: "border-box",
                    color: page.to === currentPath ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                    borderBottom:
                      page.to === currentPath ? "3px solid #f7931e" : "none",
                    fontWeight: page.to === currentPath ? "bold" : "500",
                    position: "relative",
                    transition:
                      "transform 0.4s ease, color 0.3s ease-in-out, border-bottom 0.3s ease-in-out",
                    overflow: "hidden",
                    padding: "10px 5px",
                    alignItems: "center",
                    letterSpacing: "0.5px",
                    textShadow: page.to === currentPath ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    const indicator = e.currentTarget.querySelector('.hover-indicator') as HTMLElement;
                    if (indicator) indicator.style.left = '0';
                  }}
                  onMouseLeave={(e) => {
                    const indicator = e.currentTarget.querySelector('.hover-indicator') as HTMLElement;
                    if (indicator) indicator.style.left = '-100%';
                  }}
                >
                  {page.label}
                  <span
                    style={{
                      position: "absolute",
                      left: "-100%",
                      bottom: 0,
                      height: "3px",
                      width: "100%",
                      background: "linear-gradient(90deg, transparent, #f7931e, #ffb347)",
                      transition: "left 0.4s ease",
                      borderRadius: "10px 10px 0 0",
                      boxShadow: "0 -1px 5px rgba(247, 147, 30, 0.3)"
                    }}
                    className="hover-indicator"
                  />
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', gap: 3, alignItems: 'center' }}>
              <Button
                onClick={handleOpenLoginDialog}
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #f7931e 0%, #ffb347 100%)',
                  color: "white",
                  "&:hover": {
                    background: 'linear-gradient(45deg, #f7931e 30%, #ffb347 90%)',
                    transform: "translateY(-3px)",
                    boxShadow: '0 8px 16px rgba(247, 147, 30, 0.4)'
                  },
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "10px 28px",
                  fontSize: "17px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  transition: "all 0.4s ease",
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "all 0.4s ease",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                }}
              >
                Log in
              </Button>
              <Tooltip title="Open settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 1, 
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                      borderColor: '#f7931e'
                    },
                    backdropFilter: 'blur(5px)',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Avatar 
                    alt="" 
                    src="" 
                    sx={{ 
                      width: 42, 
                      height: 42,
                      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                      background: 'linear-gradient(135deg, #f7931e 0%, #ffb347 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.7)'
                    }} 
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    borderRadius: 2,
                    minWidth: '180px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                  }
                }}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.to + setting.label} 
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={setting.to}
                    sx={{
                      py: 1.5,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(97, 20, 99, 0.08)',
                        pl: 3
                      }
                    }}
                  >
                    <Typography textAlign="center" fontSize="15px">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Box
          sx={{
            background: 'linear-gradient(to right, #4e0e52 0%, #7b1980 50%, #4e0e52 100%)',
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            minHeight: 70,
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 5px 15px rgba(0, 0, 0, 0.15)',
            position: "relative"
          }}
        >
          <Grid sx={{ 
            px: { xs: 2, md: 20 }, 
            alignItems: "center", 
            display: "flex",
            width: { xs: '100%', md: 'auto' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            py: 1.5,
            position: "relative"
          }}>
            <TextField
              placeholder="Search..."
              variant="standard"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.97)",
                borderRadius: "25px",
                width: { xs: '100%', sm: '320px' },
                maxWidth: '450px',
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s ease',
                '&:hover': {
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25), 0 0 15px rgba(247, 147, 30, 0.3)',
                  transform: 'translateY(-3px)'
                },
                border: '1px solid rgba(255, 255, 255, 0.7)'
              }}
              InputProps={{
                style: {
                  height: 54,
                  paddingLeft: 22,
                  paddingRight: 22,
                  fontSize: '16px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                },
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ 
                      color: '#611463',
                      fontSize: '24px',
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        color: '#f7931e',
                        transform: 'scale(1.2)'
                      }
                    }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Box>
      </AppBar>

      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </>
  );
}
export default ResponsiveAppBar;