import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
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
  Rating,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkIcon from "@mui/icons-material/Work";
import { PAYMENT_PATH, SERVICE_STATUS_PATH } from "../../../routes/path";

// Font size constants
const fontSize = {
  title: "1.5rem",
  subtitle: "1rem",
  text: "0.9rem",
  button: "1rem",
};

// Enhanced service data with more details (same as payment page)
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

const CommentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // State variables
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [commentError, setCommentError] = useState("");

  // Handle comment change
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    
    // Validate comment
    if (value.length > 500) {
      setCommentError("ຄຳເຫັນຍາວເກີນໄປ (ສູງສຸດ 500 ຕົວອັກສອນ)");
    } else {
      setCommentError("");
    }
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      setAlertMessage("ກະລຸນາໃສ່ຄຳເຫັນຂອງທ່ານ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    
    setAlertMessage("ສົ່ງຄຳເຫັນສຳເລັດແລ້ວ!");
    setAlertSeverity("success");
    setAlertOpen(true);
    
    // Navigate to confirmation page after a short delay
    setTimeout(() => {
      navigate(SERVICE_STATUS_PATH);
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
            <Typography 
              variant="h5"
              color="#611463"
                textAlign={'center'}
              sx={{
                fontSize: fontSize.title,
                fontWeight: "bold",
              }}
            >
              ໃຫ້ຄະແນນ
            </Typography>

          {/* Restructured Layout */}
          
          {/* Top Section - Service Details (Full Width) */}
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
                maxHeight: { xs: '200px', sm: '220px', md: '250px' },
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
          </Box>
          
          {/* Bottom Section - Rating and Comment (Side by Side) */}
          <Grid container spacing={3}>
            {/* Left Box - Rating */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <Typography
                  variant="subtitle1"
                  color="#611463"
                  sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
                >
                  ໃຫ້ຄະແນນ
                </Typography>
                
                {/* Rating Card */}
                <Card
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                    height: { xs: "auto", md: "290px" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    py: 4
                  }}>
                    <Typography
                      sx={{
                        fontSize: fontSize.subtitle,
                        fontWeight: "bold",
                        mt: -10,
                        mb: 6,
                        color: "#611463",
                      }}
                    >
                      ກະລຸນາໃຫ້ຄະແນນບໍລິການ
                    </Typography>
                    
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      size="large"
                      sx={{ 
                        mb: 2,
                        mt: 3,
                        '& .MuiRating-iconFilled': {
                          color: '#F7931e',
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            
            {/* Right Box - Comment Input */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="#611463"
                  sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
                >
                  ຄຳເຫັນຂອງທ່ານ
                </Typography>
                      
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                    height: { xs: "auto", md: "290px" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="ໃສ່ຄຳເຫັນທີ່ນີ້"
                      multiline
                      rows={8}
                      value={comment}
                      onChange={handleCommentChange}
                      sx={{ mb: 2, flex: 1 }}
                      error={!!commentError}
                      helperText={commentError || `${comment.length}/500 ຕົວອັກສອນ`}
                      InputProps={{
                        sx: { fontSize: fontSize.text }
                      }}
                    />
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
              onClick={() => navigate("/")}
            >
              ສົ່ງຄຳເຫັນ
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

export default CommentPage;