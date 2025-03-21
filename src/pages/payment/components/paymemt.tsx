import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  TextField,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import { LOCATION_PATH, PAYMENT_PATH, SERVICE_STATUS_PATH } from "../../../routes/path";

// Font size constants
const fontSize = {
  title: "1.5rem",
  subtitle: "1rem",
  text: "0.9rem",
  button: "1rem",
};

// Color scheme
const colors = {
  primary: "#611463",
  primaryLight: "#7b2981",
  primaryDark: "#4a0d4c",
  secondary: "#f8f0f9",
  accent: "#e6c9e9",
  success: "#1e8e3e",
  error: "#d93025",
  background: "#f9f9f9",
  cardBg: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#616161",
}

// Enhanced service data with more details
const serviceItems = [
  {
    id: 1,
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    price: 250000,
    priceFormatted: "250,000 KIP",
    image: "/api/placeholder/40/40",
    category: "ແມ່ບ້ານ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // State variables
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [appliedCode, setAppliedCode] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Get discount information from location state
  useEffect(() => {
    // Mock discount from previous page
    const discountFromPreviousPage = location.state?.discount || {
      code: "WELCOME10",
      percentage: 10
    };
    
    if (discountFromPreviousPage.code) {
      setAppliedCode(discountFromPreviousPage.code);
      setDiscountPercentage(discountFromPreviousPage.percentage);
    }
  }, [location]);

  // Calculate totals when component loads or discount changes
  useEffect(() => {
    const subtotal = serviceItems.reduce((sum, item) => sum + item.price, 0);
    setTotalBeforeDiscount(subtotal);
    
    // Calculate discount amount based on percentage
    const discount = Math.round((subtotal * discountPercentage) / 100);
    setDiscountAmount(discount);
    
    // Calculate final total
    const total = subtotal - discount;
    setFinalTotal(total);
    
    // Set initial payment amount to match final total
    setPaymentAmount(total.toString());
  }, [discountPercentage]);

  // Format currency
  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  // Handle payment amount change
  const handlePaymentAmountChange = (e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setPaymentAmount(value);
      
      // Calculate change
      const enteredAmount = parseInt(value) || 0;
      const changeAmount = enteredAmount - finalTotal;
      setChange(changeAmount >= 0 ? changeAmount : 0);
      
      // Validate payment amount
      if (enteredAmount < finalTotal) {
        setPaymentError("ຈຳນວນເງິນບໍ່ພຽງພໍ");
      } else {
        setPaymentError("");
      }
    }
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    const enteredAmount = parseInt(paymentAmount) || 0;
    
    if (enteredAmount < finalTotal) {
      setAlertMessage("ກະລຸນາໃສ່ຈຳນວນເງິນໃຫ້ພຽງພໍ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    
    setAlertMessage("ການຊຳລະເງິນສຳເລັດແລ້ວ!");
    setAlertSeverity("success");
    setAlertOpen(true);
    
    // Navigate to confirmation page after a short delay
    setTimeout(() => {
      navigate("/confirmation");
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: colors.primary,
        backgroundImage: "linear-gradient(135deg, #611463 0%, #7b2981 100%)",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: "100%",
            sm: "95%",
            md: "90%",
            lg: "80%",
          },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          {/* Decorative header accent */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #611463, #8a2be2)",
            }}
          />
          
          {/* Header with back button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              mt: 1,
            }}
          >
            <IconButton 
              onClick={() => navigate(LOCATION_PATH)} 
              sx={{ 
                mr: 2,
                color: colors.primary,
                backgroundColor: colors.secondary,
                "&:hover": {
                  backgroundColor: colors.accent,
                },
                transition: "all 0.2s ease"
              }}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h5"
              color={colors.primary}
              sx={{
                fontSize: fontSize.title,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PaymentsIcon sx={{ mr: 1 }} />
              ຊຳລະເງິນ
            </Typography>
          </Box>

          {/* Left and Right Sections */}
          <Grid container spacing={4}>
            {/* Left Section - Service Items */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  color={colors.primary}
                  sx={{ 
                    fontSize: fontSize.subtitle, 
                    mb: 2, 
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `2px solid ${colors.accent}`,
                    paddingBottom: 1
                  }}
                >
                  <ReceiptLongIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                  ລາຍລະອຽດການບໍລິການ
                </Typography>
                
                {/* Service Items */}
                <Box 
                  sx={{ 
                    mb: 2,
                    maxHeight: { xs: '250px', sm: '300px', md: '350px' },
                    overflowY: 'auto',
                    pr: 1,
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: colors.primary,
                      borderRadius: '10px',
                    },
                  }}
                >
                  {serviceItems.map((item) => (
                    <Card
                      key={item.id}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        border: `1px solid ${colors.accent}`,
                        "&:hover": { 
                          transform: "translateY(-3px)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        {/* Main info row */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                          <Avatar 
                            src={item.image} 
                            sx={{ 
                              mr: 2, 
                              width: 48, 
                              height: 48,
                              border: `2px solid ${colors.primary}`,
                            }} 
                          />
                          <Box flexGrow={1} sx={{ textAlign: "left" }}>
                            <Typography sx={{ 
                              fontSize: fontSize.text, 
                              fontWeight: "bold",
                              color: colors.primary 
                            }}>
                              {item.firstName} {item.surname}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mr: 1.5 }}>
                                {item.name}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography 
                            fontWeight="bold" 
                            sx={{ 
                              fontSize: fontSize.text,
                              color: colors.success,
                              bgcolor: "rgba(30, 142, 62, 0.1)",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                            }}
                          >
                            {item.priceFormatted}
                          </Typography>
                        </Box>
                        
                        {/* Additional info row */}
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          mb: 1.5,
                          flexWrap: "wrap"
                        }}>
                          <Chip
                            icon={<CategoryIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label={item.category}
                            size="small"
                            sx={{ 
                              mr: 1, 
                              mb: { xs: 1, sm: 0 },
                              bgcolor: "rgba(97, 20, 99, 0.1)",
                              color: colors.primary,
                              '& .MuiChip-icon': {
                                color: colors.primary,
                              }
                            }}
                          />
                          <Chip
                            icon={<PersonIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label={`${item.gender}, ${item.age} ປີ`}
                            size="small"
                            sx={{ 
                              bgcolor: "rgba(97, 20, 99, 0.05)",
                              color: colors.textSecondary,
                              '& .MuiChip-icon': {
                                color: colors.textSecondary,
                              }
                            }}
                          />
                        </Box>
                        
                        {/* Location info row */}
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          backgroundColor: colors.secondary, 
                          borderRadius: 1,
                          p: 1.5,
                          flexWrap: { xs: "wrap", sm: "nowrap" },
                          mt: 1
                        }}>
                          <Box sx={{ display: "flex", alignItems: "center", mr: 2, mb: { xs: 1, sm: 0 }, minWidth: "45%" }}>
                            <HomeIcon sx={{ fontSize: '0.9rem', color: colors.primaryLight, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: colors.textPrimary }}>
                              {item.village}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationCityIcon sx={{ fontSize: '0.9rem', color: colors.primaryLight, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: colors.textPrimary }}>
                              {item.city}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                
                {/* Applied Discount */}
                {appliedCode && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      color={colors.primary}
                      sx={{ 
                        fontSize: fontSize.subtitle, 
                        mb: 2, 
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: `2px solid ${colors.accent}`,
                        paddingBottom: 1
                      }}
                    >
                      <LocalOfferIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                      ສ່ວນຫຼຸດທີ່ນຳໃຊ້
                    </Typography>
                    
                    <Card
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                        background: "linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%)",
                        border: "1px dashed #3f51b5",
                      }}
                    >
                      <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <LocalOfferIcon sx={{ color: colors.primary, mr: 2, transform: "rotate(-45deg)" }} />
                        <Box flexGrow={1}>
                          <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium" }}>
                            ລະຫັດສ່ວນຫຼຸດ: <strong>{appliedCode}</strong>
                          </Typography>
                        </Box>
                        <Chip 
                          label={`${discountPercentage}%`} 
                          color="primary" 
                          size="small"
                          sx={{ 
                            backgroundColor: colors.primary,
                            fontWeight: "bold",
                            px: 0.5
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </Box>
            </Grid>
            
            {/* Right Section - Payment Input and Summary */}
            <Grid item xs={12} md={6}>
              {/* Payment Section */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  color={colors.primary}
                  sx={{ 
                    fontSize: fontSize.subtitle, 
                    mb: 2, 
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `2px solid ${colors.accent}`,
                    paddingBottom: 1
                  }}
                >
                  <PaymentsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                  ການຊຳລະເງິນ
                </Typography>
                
                {/* Payment Summary */}
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%)",
                    mb: 3,
                    borderRadius: 3,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "6px",
                      background: "linear-gradient(90deg, #611463, #8a2be2)",
                    }}
                  />
                  <CardContent sx={{ pt: 3 }}>
                    <Typography
                      sx={{
                        fontSize: fontSize.subtitle,
                        fontWeight: "bold",
                        mb: 2,
                        color: colors.primary,
                        textAlign: "center",
                      }}
                    >
                      ສະຫຼຸບການຊຳລະເງິນ
                    </Typography>
                    
                    <Box sx={{ p: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography sx={{ fontSize: fontSize.text }}>
                            ລາຄາ:
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium" }}>
                            {formatCurrency(totalBeforeDiscount)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={8}>
                          <Typography sx={{ fontSize: fontSize.text, display: "flex", alignItems: "center" }}>
                            <LocalOfferIcon sx={{ fontSize: "0.9rem", mr: 0.5, color: colors.error }} />
                            ສ່ວນຫຼຸດ ({discountPercentage}%):
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: fontSize.text, color: colors.error, fontWeight: "medium" }}>
                            -{formatCurrency(discountAmount)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />
                        </Grid>
                        
                        <Grid item xs={7}>
                          <Typography sx={{ 
                            fontSize: fontSize.subtitle, 
                            fontWeight: "bold" 
                          }}>
                            ລາຄາລວມ:
                          </Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ textAlign: "right" }}>
                          <Typography sx={{ 
                            fontSize: fontSize.subtitle, 
                            fontWeight: "bold", 
                            color: colors.success,
                            backgroundColor: "rgba(30, 142, 62, 0.1)",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            display: "inline-block"
                          }}>
                            {formatCurrency(finalTotal)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
                
                {/* Payment Input */}
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      sx={{
                        fontSize: fontSize.subtitle,
                        fontWeight: "bold",
                        mb: 2,
                        color: colors.primary,
                      }}
                    >
                      ໃສ່ຈຳນວນເງິນ
                    </Typography>
                    
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="ຈຳນວນເງິນ (KIP)"
                      value={paymentAmount}
                      onChange={handlePaymentAmountChange}
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                          },
                          '&:hover fieldset': {
                            borderColor: colors.primaryLight,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: colors.primary,
                        },
                      }}
                      error={!!paymentError}
                      helperText={paymentError}
                      InputProps={{
                        sx: { 
                          fontSize: fontSize.text,
                          borderRadius: "10px",
                        }
                      }}
                    />
                    
                    {parseInt(paymentAmount) > finalTotal && (
                      <Box sx={{ 
                        mt: 2, 
                        p: 2, 
                        backgroundColor: "rgba(30, 142, 62, 0.1)", 
                        borderRadius: 2,
                        border: "1px dashed rgba(30, 142, 62, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium" }}>
                          ເງິນທອນ:
                        </Typography>
                        <Typography sx={{ 
                          fontSize: fontSize.text, 
                          fontWeight: "bold",
                          color: colors.success
                        }}>
                          {formatCurrency(change)}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          
          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 150 },
                borderRadius: "10px",
                borderWidth: "2px",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderWidth: "2px",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }
              }}
              onClick={() => navigate(LOCATION_PATH)} 
            >
              ຍົກເລີກ
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 150 },
                backgroundColor: colors.primary,
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(97, 20, 99, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": { 
                  backgroundColor: colors.primaryDark,
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(97, 20, 99, 0.4)",
                },
                "&:disabled": {
                  backgroundColor: "#9e9e9e",
                  color: "#f5f5f5"
                }
              }}
              onClick={() => navigate(SERVICE_STATUS_PATH)} 
              disabled={parseInt(paymentAmount) < finalTotal}
            >
              ຊຳລະເງິນ
            </Button>
          </Stack>
        </Paper>
        
        {/* Snackbar Alert */}
        <Snackbar 
          open={alertOpen} 
          autoHideDuration={6000} 
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleAlertClose} 
            severity={alertSeverity} 
            sx={{ 
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default PaymentPage;