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
  Radio,
  RadioGroup,
  Divider,
  InputAdornment,
  FormControl,
  FormLabel,
  Link,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Phone, 
  Email, 
  Lock,
  Man,
  Woman,
  Transgender,
  Badge
} from "@mui/icons-material";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void; // New prop for handling the switch to login
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = () => {
    console.log("Registering with:", {
      username,
      firstName,
      lastName,
      phoneNumber,
      gender,
      email,
      password,
      confirmPassword
    });
    onClose();
  };

  const handleOpenLogin = () => {
    onClose(); // Close register dialog
    if (onSwitchToLogin) {
      onSwitchToLogin(); // Open login dialog
    }
  };

  return (
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
      <DialogContent 
        sx={{ 
          p: 0, 
          display: "flex", 
          height: "auto", 
          maxHeight: "90vh", 
          overflowY: "auto" 
        }}
      >
        {/* Form */}
        <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#003333", mb: 1 }}
          >
            Sign Up 
          </Typography>

          <TextField
            fullWidth
            placeholder="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge fontSize="small" color="action" />
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

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" color="action" />
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
              placeholder="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" color="action" />
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
          </Box>

          <TextField
            fullWidth
            placeholder="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" color="action" />
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

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel 
                value="male" 
                control={<Radio size="small" />} 
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Man fontSize="small" sx={{ mr: 0.5 }} /> Male
                  </Box>
                } 
              />
              <FormControlLabel 
                value="female" 
                control={<Radio size="small" />} 
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Woman fontSize="small" sx={{ mr: 0.5 }} /> Female
                  </Box>
                } 
              />
              <FormControlLabel 
                value="other" 
                control={<Radio size="small" />} 
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Transgender fontSize="small" sx={{ mr: 0.5 }} /> Other
                  </Box>
                } 
              />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            placeholder="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" color="action" />
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
                  <Lock fontSize="small" color="action" />
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

          <TextField
            fullWidth
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">I agree to the Terms and Conditions</Typography>}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
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
            Sign Up
          </Button>
          
          {/* New section for switching to login */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Already have an account ?&nbsp;
              <Link
                onClick={handleOpenLogin}
                sx={{
                  color: "#f7931e",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;

