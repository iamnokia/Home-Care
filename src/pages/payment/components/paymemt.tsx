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
import WorkIcon from "@mui/icons-material/Work";
import { LOCATION_PATH, PAYMENT_PATH, SERVICE_STATUS_PATH } from "../../../routes/path";

// Font size constants
const fontSize = {
  title: "1.5rem",
  subtitle: "1rem",
  text: "0.9rem",
  button: "1rem",
};

// Enhanced service data with more details
const serviceItems = [
  {
    id: 1,
    name: "ດູດຝຸ່ນ, ທຳຄວາມສະອາດ",
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
        backgroundColor: '#611463',
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
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            maxWidth: "100%",
            mx: "auto",
          }}
        >
          {/* Header with back button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <IconButton 
              onClick={() => navigate(LOCATION_PATH)} 
              sx={{ mr: 2 }}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="#611463"
              sx={{
                fontSize: fontSize.title,
                fontWeight: "bold",
        
              }}
            >
              ຊຳລະເງິນ
            </Typography>
          </Box>

          {/* Left and Right Sections */}
          <Grid container spacing={3}>
            {/* Left Section - Service Items */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  color="#611463"
                  sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
                >
                  ລາຍລະອຽດ
                </Typography>
                
                {/* Service Items */}
                <Box 
                  sx={{ 
                    mb: 2,
                    maxHeight: { xs: '250px', sm: '300px', md: '350px' },
                    overflowY: 'auto',
                    pr: 1
                  }}
                >
                  {serviceItems.map((item) => (
                    <Card
                      key={item.id}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                        transition: "transform 0.2s",
                        "&:hover": { transform: "translateY(-2px)" }
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        {/* Main info row */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                          <Avatar src={item.image} sx={{ mr: 2, width: 48, height: 48 }} />
                          <Box flexGrow={1} sx={{ textAlign: "left" }}>
                            <Typography sx={{ fontSize: fontSize.text, fontWeight: "bold" }}>
                              {item.firstName} {item.surname}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                              <WorkIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mr: 1.5 }}>
                                {item.name}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography fontWeight="bold" sx={{ fontSize: fontSize.text }}>
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
                          <Box sx={{ display: "flex", alignItems: "center", mr: 2, mb: { xs: 1, sm: 0 } }}>
                            <CategoryIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {item.category}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {item.gender}, {item.age} ປີ
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Location info row */}
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          backgroundColor: "#f5f5f5", 
                          borderRadius: 1,
                          p: 1,
                          flexWrap: { xs: "wrap", sm: "nowrap" }
                        }}>
                          <Box sx={{ display: "flex", alignItems: "center", mr: 2, mb: { xs: 1, sm: 0 }, minWidth: "45%" }}>
                            <HomeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {item.village}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationCityIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
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
                      color="#611463"
                      sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
                    >
                      ສ່ວນຫຼຸດທີ່ນຳໃຊ້
                    </Typography>
                    
                    <Card
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                        backgroundColor: "#f0f7ff",
                      }}
                    >
                      <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <LocalOfferIcon sx={{ color: "#611463", mr: 2 }} />
                        <Box flexGrow={1}>
                          <Typography sx={{ fontSize: fontSize.text }}>
                            ລະຫັດສ່ວນຫຼຸດ: <strong>{appliedCode}</strong>
                          </Typography>
                        </Box>
                        <Chip 
                          label={`${discountPercentage}%`} 
                          color="primary" 
                          size="small"
                          sx={{ 
                            backgroundColor: "#611463",
                            fontWeight: "bold"
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
                  color="#611463"
                  sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
                >
                  ການຊຳລະເງິນ
                </Typography>
                
                {/* Payment Summary */}
                <Card
                  sx={{
                    backgroundColor: "#f9f9f9",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: fontSize.subtitle,
                        fontWeight: "bold",
                        mb: 2,
                        color: "#611463",
                      }}
                    >
                      ສະຫຼຸບການຊຳລະເງິນ
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: fontSize.text }}>
                          ລາຄາ:
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <Typography sx={{ fontSize: fontSize.text }}>
                          {formatCurrency(totalBeforeDiscount)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: fontSize.text }}>
                          ສ່ວນຫຼຸດ ({discountPercentage}%):
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <Typography sx={{ fontSize: fontSize.text, color: "#d32f2f" }}>
                          -{formatCurrency(discountAmount)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      
                      <Grid item xs={7}>
                        <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold" }}>
                          ລາຄາລວມ:
                        </Typography>
                      </Grid>
                      <Grid item xs={5} sx={{ textAlign: "right" }}>
                        <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", color: "#007736" }}>
                          {formatCurrency(finalTotal)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                {/* Payment Input */}
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: fontSize.subtitle,
                        fontWeight: "bold",
                        mb: 2,
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
                      sx={{ mb: 2 }}
                      error={!!paymentError}
                      helperText={paymentError}
                      InputProps={{
                        sx: { fontSize: fontSize.text }
                      }}
                    />
                    
                    {parseInt(paymentAmount) > finalTotal && (
                      <Box sx={{ mt: 2, p: 2, backgroundColor: "#f0fff4", borderRadius: 1 }}>
                        <Typography sx={{ fontSize: fontSize.text, fontWeight: "bold" }}>
                          ເງິນທອນ: {formatCurrency(change)}
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
                backgroundColor: "#611463",
                "&:hover": { backgroundColor: "#4a0d4c" },
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
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default PaymentPage;