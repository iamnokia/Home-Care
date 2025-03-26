import React, { useState, useRef } from "react";
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
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined,  
  Email, 
} from "@mui/icons-material";
import RegisterDialog from "./dialog-signup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

// Assuming you have this logo image in your assets folder
// If not, replace with your actual logo path
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";
import { loginFailed, loginSuccess } from "../../store/authenticationSlice";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Use refs instead of state for form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

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

  const handleLogin = async () => {

    onClose();
    // Get values from refs
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    
    // Validate inputs
    if (!email || !password) {
      Swal.fire({
        title: "ກະລຸນາກວດສອບຂໍ້ມູນ",
        text: "ກະລຸນາປ້ອນອີເມວ ແລະ ລະຫັດຜ່ານ",
        icon: "warning",
        confirmButtonText: "ຕົກລົງ",
        confirmButtonColor: "#611463"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Make API call to login endpoint
      const response = await axios.post("https://homecare-pro.onrender.com/users/sign_in", {
        email,
        password
      });
      
      // Check if login was successful
      if (response.data) {
        console.log("Login response:", response.data);
        
        // Dispatch login success action with user data
        // We're assuming the API returns the user data directly
        dispatch(loginSuccess(response.data));
        
        // Show success message
        Swal.fire({
          title: "ສຳເລັດ!",
          text: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Dispatch login failed action
      dispatch(loginFailed());
      
      // Show error message
      Swal.fire({
        title: "ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ",
        text: "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
        icon: "error",
        confirmButtonText: "ລອງໃໝ່",
        confirmButtonColor: "#611463"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press for login
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
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
              ຍິນດີຕ້ອນຮັບອີກຄັ້ງ
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                textAlign: "center",
                mt: 1
              }}
            >
              ເຂົ້າສູ່ລະບົບເພື່ອເຂົ້າເຖິງບັນຊີ HomeCare ຂອງທ່ານ
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
              label="ທີ່ຢູ່ອີເມລ"
              variant="outlined"
              type="email"
              inputRef={emailRef}
              onKeyPress={handleKeyPress}
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
              label="ລະຫັດຜ່ານ"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              inputRef={passwordRef}
              onKeyPress={handleKeyPress}
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
              disabled={isLoading}
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
              {isLoading ? "ກຳລັງດຳເນີນການ..." : "ເຂົ້າສູ່ລະບົບ"}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ຫຼື
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ທ່ານຍັງບໍ່ທັນມີບັນຊີເທື່ອແມ່ນບໍ່?&nbsp;
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
                  ລົງທະບຽນຕອນນີ້
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