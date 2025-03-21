import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  InputAdornment,
  Divider,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkIcon from "@mui/icons-material/Work";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LOCATION_DETAIL_PATH, PAYMENT_PATH, SERVICE_PATH } from "../../../routes/path";

const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.9rem",
  button: "1rem",
};

// Enhanced sample data with more details
const locations = [
  {
    id: 1,
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    image: "https://via.placeholder.com/40",
    category: "ແມ່ບ້ານ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
    price: 250000,
    priceFormatted: "250,000 KIP",
  },
];

// Sample discount codes
const discountCodes = {
  "WELCOME10": 10, // 10% discount
  "NEWUSER20": 20, // 20% discount
  "SPECIAL50": 50  // 50% discount
};

const LocationPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [address, setAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [note, setNote] = useState("");
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [appliedCode, setAppliedCode] = useState("");

  // Calculate totals whenever locations or discount changes
  useEffect(() => {
    const subtotal = locations.reduce((sum, item) => sum + item.price, 0);
    setTotalBeforeDiscount(subtotal);

    // Calculate discount amount based on percentage
    const discount = Math.round((subtotal * discountPercentage) / 100);
    setDiscountAmount(discount);

    // Calculate final total
    setFinalTotal(subtotal - discount);
  }, [discountPercentage, locations]);

  // Format number as currency
  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  // Handle discount code application
  const applyDiscountCode = () => {
    // Check if code exists
    if (discountCodes[discountCode]) {
      setDiscountPercentage(discountCodes[discountCode]);
      setAppliedCode(discountCode);
      setAlertMessage(`ສ່ວນຫຼຸດ ${discountCodes[discountCode]}% ໄດ້ຖືກນຳໃຊ້ແລ້ວ!`);
      setAlertSeverity("success");
      setAlertOpen(true);
    } else {
      setAlertMessage("ລະຫັດສ່ວນຫຼຸດບໍ່ຖືກຕ້ອງ");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #611463 0%, #8a1c8d 100%)',
      p: 2
    }}>
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: '100%',
            sm: '90%',
            md: '80%',
            lg: '60%',
          }
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: '100%',
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(97, 20, 99, 0.2)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Header with back button */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            position: 'relative'
          }}>
            <IconButton
              onClick={() => navigate('/service-detail/:id')}
              sx={{ 
                color: '#611463',
                '&:hover': {
                  backgroundColor: 'rgba(97, 20, 99, 0.08)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            
            {/* Title */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: fontSize.title,
                textAlign: "center",
                fontWeight: "bold",
                color: '#611463',
                flexGrow: 1,
                mb: 0, 
                background: 'linear-gradient(90deg, #611463 0%, #8a1c8d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              ຢືນຢັນຄຳສັ່ງ
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
          </Box>

          {/* Address Input (Clickable) */}
          <Box sx={{ mb: 4, mt: 3 }}>
            <Typography 
              color="textSecondary" 
              sx={{ 
                fontSize: fontSize.subtitle, 
                mb: 1,
                fontWeight: 500,
              }}
            >
              ທີ່ຢູ່
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ກົດເພື່ອໃສ່ຂໍ້ມູນ"
              value={address}
              onClick={() => navigate(LOCATION_DETAIL_PATH)}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: '#611463' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyboardArrowRightIcon sx={{ color: '#611463' }} />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: fontSize.text,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }
              }}
              sx={{
                backgroundColor: "#f8f6f9",
                cursor: "pointer",
                "&:hover": { 
                  backgroundColor: "#efe8f0",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(97, 20, 99, 0.15)'
                },
                fontSize: fontSize.text,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                borderRadius: 2,
                transition: 'all 0.3s ease',
              }}
            />
          </Box>

          {/* Service Items List */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ 
              fontSize: fontSize.subtitle, 
              mb: 2,
              color: '#611463',
              borderLeft: '4px solid #611463',
              pl: 1.5,
              py: 0.5,
            }}
          >
            ລາຍການເອີ້ນໃຊ້
          </Typography>

          <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 3, pr: 1 }}>
            {locations.map((location) => (
              <Card
                key={location.id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 15px rgba(97, 20, 99, 0.15)" 
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  {/* Main info row */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar 
                      src={location.image} 
                      sx={{ 
                        mr: 2, 
                        width: 56, 
                        height: 56,
                        border: '2px solid #f0f0f0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Box flexGrow={1} sx={{ textAlign: "left" }}>
                      <Typography sx={{ 
                        fontSize: fontSize.subtitle, 
                        fontWeight: "bold",
                        color: '#611463' 
                      }}>
                        {location.firstName} {location.surname}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <Typography variant="body2" sx={{ fontSize: '0.85rem', mr: 1.5, color: '#555' }}>
                          {location.service}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      fontWeight="bold" 
                      sx={{ 
                        fontSize: fontSize.text,
                        bgcolor: '#f8f6f9',
                        color: '#611463',
                        p: 1,
                        borderRadius: 2
                      }}
                    >
                      {location.priceFormatted}
                    </Typography>
                  </Box>

                  {/* Additional info row */}
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    flexWrap: "wrap"
                  }}>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      mr: 2, 
                      mb: { xs: 1, sm: 0 },
                      bgcolor: '#f8f6f9',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5
                    }}>
                      <CategoryIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                        {location.category}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center",
                      bgcolor: '#f8f6f9',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5
                    }}>
                      <PersonIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                        {location.gender}, {location.age} ປີ
                      </Typography>
                    </Box>
                  </Box>

                  {/* Location info row */}
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f0e9f1",
                    borderRadius: 2,
                    p: 1.5,
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                    borderLeft: '3px solid #8a1c8d'
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2, mb: { xs: 1, sm: 0 }, minWidth: "45%" }}>
                      <HomeIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                        {location.village}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationCityIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                        {location.city}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ 
            my: 3,
            borderColor: 'rgba(97, 20, 99, 0.1)',
            borderWidth: 1
          }} />

          {/* Two-column layout on larger screens */}
          <Grid container spacing={3}>
            {/* Left column - Discount and Notes */}
            <Grid item xs={12} md={6}>
              {/* Discount Code */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={isMobile ? 9 : 8}>
                  <TextField
                    label="ລະຫັດສ່ວນຫຼຸດ"
                    fullWidth
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferIcon sx={{ color: '#8a1c8d' }} fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: { 
                        fontSize: fontSize.text,
                        borderRadius: 2,
                      }
                    }}
                    InputLabelProps={{ 
                      sx: { 
                        fontSize: fontSize.text,
                        color: '#611463'
                      } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#611463',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#611463',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={isMobile ? 3 : 4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      height: "100%",
                      backgroundColor: "#611463",
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(97, 20, 99, 0.25)',
                      transition: 'all 0.3s ease',
                      "&:hover": { 
                        backgroundColor: "#4a0d4c",
                        boxShadow: '0 6px 12px rgba(97, 20, 99, 0.35)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={applyDiscountCode}
                  >
                    {isMobile ? <CheckIcon /> : "ນຳໃຊ້"}
                  </Button>
                </Grid>
              </Grid>

              {/* Applied Discount */}
              {appliedCode && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 1.5,
                    backgroundColor: "#e6f7e9",
                    borderRadius: 2,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    border: '1px solid #c8e6cc',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CheckIcon sx={{ color: "#2e7d32", mr: 1 }} />
                  <Typography sx={{ fontSize: fontSize.text, color: "#2e7d32" }}>
                    ນຳໃຊ້ລະຫັດ "{appliedCode}" - ສ່ວນຫຼຸດ {discountPercentage}%
                  </Typography>
                </Box>
              )}

              {/* Notes - Editable */}
              <TextField
                label="ໝາຍເຫດ"
                fullWidth
                sx={{ 
                  mb: { xs: 2, md: 0 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&.Mui-focused fieldset': {
                      borderColor: '#611463',
                    },
                  },
                  '& label.Mui-focused': {
                    color: '#611463',
                  },
                }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                multiline
                rows={isMobile ? 2 : 4}
                InputProps={{ 
                  sx: { 
                    fontSize: fontSize.text,
                  } 
                }}
                InputLabelProps={{ 
                  sx: { 
                    fontSize: fontSize.text,
                    color: '#611463'
                  } 
                }}
              />
            </Grid>

            {/* Right column - Price Summary */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "#f8f6f9",
                  mb: 2,
                  borderRadius: 3,
                  height: { md: '100%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(97, 20, 99, 0.1)',
                  border: '1px solid rgba(97, 20, 99, 0.08)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(97, 20, 99, 0.15)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(90deg, #611463, #8a1c8d)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: fontSize.subtitle,
                      fontWeight: "bold",
                      mb: 3,
                      color: "#611463",
                      borderBottom: '2px solid rgba(97, 20, 99, 0.1)',
                      paddingBottom: 1
                    }}
                  >
                    ສະຫຼຸບລາຄາ
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography sx={{ fontSize: fontSize.text, color: '#555' }}>
                        ລາຄາ:
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                      <Typography sx={{ fontSize: fontSize.text, fontWeight: 500 }}>
                        {formatCurrency(totalBeforeDiscount)}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography sx={{ fontSize: fontSize.text, color: '#555' }}>
                        ສ່ວນຫຼຸດ ({discountPercentage}%):
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                      <Typography sx={{ fontSize: fontSize.text, color: "#d32f2f", fontWeight: 500 }}>
                        -{formatCurrency(discountAmount)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, borderStyle: 'dashed', borderColor: 'rgba(97, 20, 99, 0.15)' }} />
                    </Grid>

                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", color: '#611463' }}>
                        ລາຄາລວມ:
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ textAlign: "right" }}>
                      <Typography 
                        sx={{ 
                          fontSize: fontSize.subtitle, 
                          fontWeight: "bold", 
                          color: "#007736",
                          bgcolor: 'rgba(0, 119, 54, 0.1)',
                          p: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}
                      >
                        {formatCurrency(finalTotal)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
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
              onClick={() => navigate('service-detail/:id')}
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 },
                borderRadius: 2,
                borderColor: '#d32f2f',
                color: '#d32f2f',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#b71c1c',
                  color: '#b71c1c',
                  backgroundColor: 'rgba(211, 47, 47, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              ຍົກເລີກ
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(PAYMENT_PATH)}
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #611463 0%, #8a1c8d 100%)',
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 },
                boxShadow: '0 4px 12px rgba(97, 20, 99, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6b1870 0%, #9a2c9d 100%)',
                  boxShadow: '0 6px 15px rgba(97, 20, 99, 0.4)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              ຢືນຢັນ
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
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '& .MuiAlert-message': {
                fontSize: fontSize.text
              }
            }}
            elevation={6}
            variant="filled"
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LocationPage;