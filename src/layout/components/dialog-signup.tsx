import React, { useState, useRef } from "react";
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
  CircularProgress,
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
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authenticationSlice";

// Assuming you have this logo image in your assets folder
// If not, replace with your actual logo path
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";
import { Status } from "../../enums/status";
import { Gender } from "../../enums/gender";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  // Form input refs
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Form input states (for controlled components)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {

    // Close the dialog
    onClose();

    try {
      setIsLoading(true);

      // Create payload from form values
      const payload = {
        username: usernameRef.current?.value,
        first_name: firstNameRef.current?.value,
        last_name: lastNameRef.current?.value,
        email: emailRef.current?.value,
        tel: phoneNumberRef.current?.value,
        password: passwordRef.current?.value,
        gender: gender,
        status: Status.ACTIVE
      };

      console.log("Register payload:", payload);

      // Make API call to register endpoint
      const response = await axios.post("https://homecare-pro.onrender.com/users/sign_up_user", payload);

      console.log("Register response:", response.data);

      // Check if registration was successful
      if (response.data) {
        // Show success message
        Swal.fire({
          title: "ສຳເລັດ!",
          text: "ສ້າງບັນຊີສຳເລັດແລ້ວ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });

        // Auto login after successful registration
        try {
          const loginResponse = await axios.post("https://homecare-pro.onrender.com/user/sign_in", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
          });

          if (loginResponse.data && loginResponse.data.user) {
            // Dispatch login success with user data
            dispatch(loginSuccess(loginResponse.data.user));
          }
        } catch (loginError) {
          console.error("Auto-login error:", loginError);
          // If auto-login fails, just close the dialog and let user try to login manually
        }


      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // Show error message
      Swal.fire({
        title: "ສ້າງບັນຊີບໍ່ສຳເລັດ",
        text: error.response?.data?.message || "ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
        icon: "error",
        confirmButtonText: "ລອງໃໝ່",
        confirmButtonColor: "#611463"
      });
    } finally {
      setIsLoading(false);
    }
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
          ສ້າງບັນຊີຂອງທ່ານ
        </Typography>
        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
            textAlign: "center",
            mt: 1
          }}
        >
          ເຂົ້າຮ່ວມ HomeCare ເພື່ອນຳໃຊ້ການບໍລິການດູແລບ້ານເຕັມຮູບແບບ
        </Typography>
      </Box>

      {/* Form */}
      <Box sx={{ flex: 1, p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          label="ຊື່ຜູ້ໃຊ້"
          variant="outlined"
          inputRef={usernameRef}
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
            label="ຊື່ຂອງທ່ານ"
            variant="outlined"
            inputRef={firstNameRef}
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
            label="ນາມສະກຸນ"
            variant="outlined"
            inputRef={lastNameRef}
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
          label="ເບີໂທລະສັບ"
          variant="outlined"
          inputRef={phoneNumberRef}
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
              ເພດ
            </FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <FormControlLabel
                value="MALE"
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
                value="FEMALE"
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
                value="OTHER"
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
          label="ທີ່ຢູ່ອີເມລ"
          type="email"
          variant="outlined"
          inputRef={emailRef}
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
          label="ລະຫັດຜ່ານ"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          inputRef={passwordRef}
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
              ຂ້ອຍຍອມຮັບ ແລະ ເຫັນດີກັບ{" "}
              <Link
                href="/Terms-privacy"
                sx={{
                  color: "#f7931e",
                  textDecoration: "none",
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: "underline",
                  },
                }}
              >
                ເງື່ອນໄຂ ແລະ ຂໍ້ກຳນົດ
              </Link>
            </Typography>
          }
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "ສ້າງບັນຊີ"}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            ຫຼື
          </Typography>
        </Divider>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ທ່ານມີບັນຊີຢູ່ແລ້ວແມ່ນບໍ່?&nbsp;
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
                ເຂົ້າສູ່ລະບົບທັນທີ
              </Link>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;