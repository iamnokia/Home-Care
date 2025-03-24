import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Link,
  InputAdornment,
  Paper,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  PersonOutline, 
  LockOutlined,  
  Email, 
} from "@mui/icons-material";
import RegisterDialog from "./dialog-signup";

// Assuming you have this logo image in your assets folder
// If not, replace with your actual logo path
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenRegister = () => {
    onClose();
    setRegisterDialogOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterDialogOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with:", email, password);
    // After successful login, close dialog
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: "500px",
            overflow: "hidden",
            m: 0,
            p: 0,
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          },
        }}
      >
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", height: "auto" }}>
          {/* Header with Gradient Background */}
          <Box 
            sx={{ 
              background: "linear-gradient(45deg, #611463 30%, #611463 90%)",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff"
            }}
          >
            <img 
              src={LOGO_HOMECARE} 
              alt="HomeCare Logo" 
              style={{ 
                maxWidth: isMobile ? "80px" : "100px", 
                marginBottom: "16px",
                filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.2))"
              }} 
            />
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{ 
                textAlign: "center",
                textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                textAlign: "center",
                mt: 1
              }}
            >
              Log in to access your HomeCare account
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ 
            p: 4, 
            display: "flex", 
            flexDirection: "column",
            gap: 2.5 
          }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#f7931e"
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#f7931e"
                  }
                }
              }}
            />



            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 8,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #f7931e 30%, #ffa726 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 10px 2px rgba(247, 147, 30, .4)"
                }
              }}
            >
              Log In
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Don't have an account?&nbsp;
                <Link
                  onClick={handleOpenRegister}
                  sx={{
                    color: "#f7931e",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    '&:hover': {
                      color: "#611463",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <RegisterDialog open={registerDialogOpen} onClose={handleCloseRegister} />
    </>
  );
};

export default LoginDialog;