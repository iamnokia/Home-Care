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
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Snackbar,
  Alert,
  Chip,
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
  title: "1.5rem",
  subtitle: "1rem",
  text: "0.9rem",
  button: "1rem",
};

// Enhanced sample data with more details
const locations = [
  {
    id: 1,
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    service: "ດູດຝຸ່ນ, ທຳຄວາມສະອາດ",
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
      backgroundColor: '#611463',
      p: 2
    }}>
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: '100%',  // full width on mobile
            sm: '90%',   // slightly less on tablet
            md: '80%',   // even less on desktop
            lg: '60%',
          }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            maxWidth: '100%',
            mx: 'auto',
          }}
        >
          <IconButton
            onClick={() => navigate('/service-detail/:id')}
            sx={{ mr: 2 }}
            >
            <ArrowBackIcon />
            </IconButton>
          {/* Title */}
          <Typography
            variant="h5"
            color="#611463"
            gutterBottom
            sx={{
              fontSize: fontSize.title,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            ຢືນຢັນຄຳສັ່ງ
          </Typography>

          {/* Address Input (Clickable) */}
          <Box sx={{ mb: 3, mt: 3 }}>
            <Typography color="textSecondary" sx={{ fontSize: fontSize.subtitle, mb: 1 }}>
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
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyboardArrowRightIcon color="action" />
                  </InputAdornment>
                )
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0e0e0" },
                fontSize: fontSize.text,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Service Items List */}
          <Typography
            variant="subtitle1"
            color="#611463"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: fontSize.subtitle, mb: 2 }}
          >
            ລາຍການເອີ້ນໃຊ້
          </Typography>

          <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
            {locations.map((location) => (
              <Card
                key={location.id}
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
                    <Avatar src={location.image} sx={{ mr: 2, width: 48, height: 48 }} />
                    <Box flexGrow={1} sx={{ textAlign: "left" }}>
                      <Typography sx={{ fontSize: fontSize.text, fontWeight: "bold" }}>
                        {location.firstName} {location.surname}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <WorkIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mr: 1.5 }}>
                          {location.service}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography fontWeight="bold" sx={{ fontSize: fontSize.text }}>
                      {location.priceFormatted}
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
                        {location.category}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {location.gender}, {location.age} ປີ
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
                        {location.village}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationCityIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {location.city}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

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
                          <LocalOfferIcon color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: { fontSize: fontSize.text }
                    }}
                    InputLabelProps={{ sx: { fontSize: fontSize.text } }}
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
                      "&:hover": { backgroundColor: "#4a0d4c" }
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
                    backgroundColor: "#f0f7ff",
                    borderRadius: 1
                  }}
                >
                  <CheckIcon sx={{ color: "green", mr: 1 }} />
                  <Typography sx={{ fontSize: fontSize.text, color: "green" }}>
                    ນຳໃຊ້ລະຫັດ "{appliedCode}" - ສ່ວນຫຼຸດ {discountPercentage}%
                  </Typography>
                </Box>
              )}

              {/* Notes - Editable */}
              <TextField
                label="ໝາຍເຫດ"
                fullWidth
                sx={{ mb: { xs: 2, md: 0 } }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                multiline
                rows={isMobile ? 2 : 4}
                InputProps={{ sx: { fontSize: fontSize.text } }}
                InputLabelProps={{ sx: { fontSize: fontSize.text } }}
              />
            </Grid>

            {/* Right column - Price Summary */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "#f9f9f9",
                  mb: 2,
                  borderRadius: 2,
                  height: { md: '100%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: fontSize.subtitle,
                      fontWeight: "bold",
                      mb: 2,
                      color: "#611463"
                    }}
                  >
                    ສະຫຼຸບລາຄາ
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
              onClick={() => navigate('service-detail/:id')}
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 }
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
                bgcolor: "#611463",
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 },
                '&:hover': {
                  bgcolor: "#7a1a7d",  // A slightly lighter shade for hover effect
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',  // Add shadow on hover
                  transform: 'translateY(-2px)'  // Slight lift effect on hover
                },
                transition: 'all 0.3s ease'  // Smooth transition for hover effects
              }}
            >
              ຢືນຢັນ
            </Button>
          </Stack>
        </Paper>

        {/* Snackbar Alert */}
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LocationPage;