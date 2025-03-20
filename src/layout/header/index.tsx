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
  CONTACT_US_PATH
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
const settings = ["Profile", "Setting", "Logout"];

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
      <AppBar position="static" sx={{ bgcolor: "#611463" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "70px",
                height: "70px",
                mr: 2,
              }}
            >
              <img
                src={FreeIcon}
                alt=""
                style={{ width: "100px ", height: "100px", marginTop: 10 }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit" // Changed to inherit to make the icon white
              >
                <MenuIcon />
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
                TransitionComponent={Fade} // Added animation
                PaperProps={{
                  elevation: 8,
                  sx: {
                    borderRadius: 2,
                    mt: 1.5,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
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
                      borderLeft: page.to === currentPath ? '4px solid #f7931e' : 'none',
                      backgroundColor: page.to === currentPath ? 'rgba(247, 147, 30, 0.1)' : 'transparent',
                      py: 1.5,
                      pl: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(97, 20, 99, 0.08)',
                        pl: 3
                      }
                    }}
                  >
                    <Typography textAlign="left">{page.label}</Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleOpenLoginDialog();
                  }}
                  sx={{
                    py: 1.5,
                    backgroundColor: 'rgba(247, 147, 30, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(247, 147, 30, 0.2)',
                    }
                  }}
                >
                  <Typography textAlign="center" fontWeight="bold" color="#f7931e">Log in</Typography>
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
              }}
            >
              HomeCare
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 4,
                px: 2,
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                  style={{
                    margin: "2px 0",
                    display: "block",
                    textDecoration: "none",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    color: page.to === currentPath ? "#ffff" : "white",
                    borderBottom:
                      page.to === currentPath ? "3px solid #f7931e" : "none",
                    fontWeight: page.to === currentPath ? "bold" : "normal",
                    position: "relative",
                    transition:
                      "transform 0.3s ease-in-out, color 0.3s ease-in-out, border-bottom 0.3s ease-in-out",
                    overflow: "hidden",
                    padding: "4px 0",
                  }}
                >
                  {page.label}
                  <span
                    style={{
                      position: "absolute",
                      left: "-100%",
                      bottom: 0,
                      height: "2px",
                      width: "100%",
                      backgroundColor: "#f7931ee",
                      transition: "left 0.3s ease-in-out",
                    }}
                    className="hover-indicator"
                  />
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', gap: 2}}>
            <Button
                onClick={handleOpenLoginDialog}
                variant="contained"
                sx={{
                  backgroundColor: "#f7931e",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ffff",
                    color: 'black',
                  },
                  textTransform: "none",
                  borderRadius: "20px",
                  padding: "6px 16px",
                }}
              >
                Log in
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="" />
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
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Box
          sx={{
            bgcolor: "#611463",
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            minHeight: 50,
          }}
        >
          <Grid sx={{ px: 20, alignItems: "center", display: "flex" }}>
            <TextField
              placeholder="Search..."
              variant="standard"
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              }}
              InputProps={{
                style: {
                  height: 40,
                },
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
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