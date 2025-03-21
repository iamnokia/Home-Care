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
  useTheme,
  useMediaQuery,
  Paper,
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

// Assuming you have this logo image in your assets folder
// If not, replace with your actual logo path
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <DialogContent 
        sx={{ 
          p: 0, 
          display: "flex", 
          flexDirection: "column",
          height: "auto", 
          maxHeight: "90vh", 
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        }}
      >
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
            Create Account
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.9,
              textAlign: "center",
              mt: 1
            }}
          >
            Join HomeCare to get premium home services
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ flex: 1, p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge fontSize="small" color="action" />
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

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" color="action" />
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
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" color="action" />
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
          </Box>

          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" color="action" />
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

          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: "rgba(97, 20, 99, 0.05)",
              border: "1px solid rgba(97, 20, 99, 0.1)"
            }}
          >
            <FormControl component="fieldset">
              <FormLabel 
                component="legend" 
                sx={{ 
                  color: "#611463", 
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  mb: 1
                }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel 
                  value="male" 
                  control={
                    <Radio 
                      sx={{
                        color: "#611463",
                        '&.Mui-checked': {
                          color: "#611463",
                        },
                      }}
                    />
                  } 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Man fontSize="small" sx={{ mr: 0.5 }} /> Male
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="female" 
                  control={
                    <Radio 
                      sx={{
                        color: "#611463",
                        '&.Mui-checked': {
                          color: "#611463",
                        },
                      }}
                    />
                  } 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Woman fontSize="small" sx={{ mr: 0.5 }} /> Female
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="other" 
                  control={
                    <Radio 
                      sx={{
                        color: "#611463",
                        '&.Mui-checked': {
                          color: "#611463",
                        },
                      }}
                    />
                  } 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Transgender fontSize="small" sx={{ mr: 0.5 }} /> Other
                    </Box>
                  } 
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          <TextField
            fullWidth
            label="Email Address"
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
            label="Confirm Password"
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
              sx: {
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#f7931e"
                }
              }
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                sx={{
                  color: "#611463",
                  '&.Mui-checked': {
                    color: "#611463",
                  },
                }}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link
                  href="#"
                  sx={{
                    color: "#f7931e",
                    textDecoration: "none",
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Terms and Conditions
                </Link>
              </Typography>
            }
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
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
            Create Account
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Already have an account?&nbsp;
              <Link
                onClick={handleOpenLogin}
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
                Log in now
              </Link>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;