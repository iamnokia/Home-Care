import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  PersonOutline, 
  LockOutlined 
} from "@mui/icons-material";
import RegisterDialog from "./dialog-signup";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

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
    console.log("Logging in with:", fullName, password);
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
            borderRadius: 2,
            width: "450px",
            overflow: "hidden",
            m: 0,
            p: 0,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <DialogContent sx={{ p: 0, display: "flex", height: "auto" }}>
          {/* Form */}
          <Box sx={{ 
            flex: 1, 
            p: 3, 
            display: "flex", 
            flexDirection: "column",
            gap: 1.5 
          }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#003333", mb: 1 }}
            >
              Log In 
            </Typography>

            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />

            <TextField
              fullWidth
              placeholder="Password"
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
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                />
              }
              label={<Typography variant="body2">Keep me logged in</Typography>}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                bgcolor: "#611463",
                borderRadius: "24px",
                py: 1,
                textTransform: "none",
                mt: 0.5,
                "&:hover": {
                  bgcolor: "#f7931e",
                },
              }}
            >
              Log In
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Don't have an account ?&nbsp;
                <Link
                  onClick={handleOpenRegister}
                  sx={{
                    color: "#f7931e",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Sign up
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
