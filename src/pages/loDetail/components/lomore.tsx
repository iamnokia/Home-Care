import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Chip,
  Fade,
  Divider,
  alpha
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import WcIcon from "@mui/icons-material/Wc";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import StoreIcon from "@mui/icons-material/Store";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { LOCATION_PATH } from "../../../routes/path";
import { LocationCity } from "@mui/icons-material";

// Sample saved locations
const initialSavedLocations = [
  {
    id: 1,
    name: "ບ້ານເລກທີ 123, ຖະໜົນ 23 ສິງຫາ",
    description: "ຕຶກ ABC, ຊັ້ນ 3, ຫ້ອງ 302",
    type: "home",
  },
  {
    id: 2,
    name: "ອາຄານ XYZ",
    description: "ບ້ານເລກທີ 456, ຖະໜົນ ດົງປາລານ",
    type: "work",
  },
  {
    id: 3,
    name: "ຮ້ານກາເຟສີຂຽວ",
    description: "ບ້ານເລກທີ 789, ຖະໜົນ ໂພນຕ້ອງ",
    type: "other",
  },
];

// Sample recent locations
const recentLocations = [
  {
    id: 1,
    name: "ຮ້ານອາຫານ ພູຄຳ",
    description: "ບ້ານເລກທີ 321, ຖະໜົນ ສາຍໄໝ",
  },
  {
    id: 2,
    name: "ຕະຫຼາດ ດົງປາລານ",
    description: "ບ້ານເລກທີ 654, ຖະໜົນ ດົງປາລານ",
  },
];

const LocationDetailPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [savedLocations, setSavedLocations] = useState(initialSavedLocations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeDetails, setPlaceDetails] = useState("");
  const [ownerGender, setOwnerGender] = useState("male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setDetailAddress(location.description);
    setPlaceName(location.name);
  };

  // Handle delete location
  const handleDeleteLocation = (id, event) => {
    event.stopPropagation(); // Prevent triggering the onClick of parent ListItem
    const updatedLocations = savedLocations.filter(location => location.id !== id);
    setSavedLocations(updatedLocations);
    
    // If the deleted location was selected, reset selection
    if (selectedLocation && selectedLocation.id === id) {
      setSelectedLocation(null);
      setDetailAddress("");
      setPlaceName("");
    }
  };

  // Handle confirm location
  const handleConfirmLocation = () => {
    // Here you would typically save the selected location and navigate back
    navigate("/"); // Navigate back to the main page
  };

  // Handle image upload
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get icon based on location type
  const getLocationIcon = (type) => {
    switch (type) {
      case "home":
        return <HomeIcon />;
      case "work":
        return <BusinessIcon />;
      default:
        return <StoreIcon />;
    }
  };

  // Get color based on location type
  const getLocationColor = (type) => {
    switch (type) {
      default:
        return "#f7931e";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #611463 0%, #812e84 100%)",
        p: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: "100%", // full width on mobile
            sm: "90%", // slightly less on tablet
            md: "80%", // even less on desktop
            lg: "60%", // constrained on large screens
          },
        }}
      >
        {/* First Box */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            mb: 3,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
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
              sx={{ 
                mr: 2,
                backgroundColor: alpha("#611463", 0.08),
                "&:hover": {
                  backgroundColor: alpha("#611463", 0.12),
                },
              }}
            >
              <ArrowBackIcon sx={{ color: "#611463" }} />
            </IconButton>
            <Typography
              variant="h5"
              color="#611463"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              ການຈັດການທີ່ຢູ່ລະອຽດ
            </Typography>
          </Box>

          {/* Saved locations */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              color="#611463"
              sx={{ 
                fontSize: "1rem", 
                mb: 1.5, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center" 
              }}
            >
              <BookmarkIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              ທີ່ຢູ່ທີ່ບັນທຶກໄວ້
            </Typography>
            
            <List 
              sx={{ 
                p: 0,
                backgroundColor: alpha("#f5f5f5", 0.5),
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {savedLocations.map((location) => (
                <Fade in={true} key={location.id} timeout={300 + (location.id * 100)}>
                  <ListItem
                    button
                    onClick={() => handleLocationSelect(location)}
                    sx={{
                      mb: 0.5,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      backgroundColor: selectedLocation?.id === location.id 
                        ? alpha("#611463", 0.05) 
                        : "transparent",
                      "&:hover": { 
                        backgroundColor: alpha("#611463", 0.08),
                        transform: "translateY(-2px)",
                        transition: "transform 0.2s ease-in-out",
                      },
                      transition: "all 0.2s ease-in-out",
                      position: "relative",
                      overflow: "hidden",
                      "&::after": selectedLocation?.id === location.id ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        backgroundColor: getLocationColor(location.type),
                      } : {},
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: alpha(getLocationColor(location.type), 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {getLocationIcon(location.type)}
                    </Box>
                    
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: "0.95rem", fontWeight: 600, color: "#333" }}>
                          {location.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontSize: "0.85rem", color: "#666", mt: 0.5 }}>
                          {location.description}
                        </Typography>
                      }
                    />
                    
                    <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                      {selectedLocation?.id === location.id && (
                        <Chip 
                          color="primary"
                          size="small"
                          icon={<BookmarkIcon sx={{ fontSize: "1rem" }} />}
                          label="ເລືອກແລ້ວ" 
                          sx={{ 
                            backgroundColor: getLocationColor(location.type),
                            mr: 1.5,
                            fontSize: "0.75rem" 
                          }} 
                        />
                      )}
                      
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleDeleteLocation(location.id, e)}
                        sx={{ 
                          color: "#d32f2f",
                          p: 1,
                          backgroundColor: alpha("#d32f2f", 0.05),
                          "&:hover": { 
                            backgroundColor: alpha("#d32f2f", 0.1),
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                </Fade>
              ))}
            </List>
          </Box>
          
          {/* Action buttons */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/")}
                sx={{
                  py: 1.5,
                  color: "#f7931e",
                  borderColor: "#f7931e",
                  borderWidth: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#f7931e",
                    backgroundColor: alpha("#f7931e", 0.05),
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(247, 147, 30, 0.15)",
                  },
                }}
              >
                ແກ້ໄຂທີ່ຢູ່
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(LOCATION_PATH)}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                  transition: "all 0.2s",
                  "&:hover": { 
                    background: "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(97, 20, 99, 0.2)",
                  },
                }}
              >
                ຢືນຢັນໃຊ້ທີ່ຢູ່
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Second Box */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
          }}
        >
          <Typography
            variant="h5"
            color="#611463"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              mb: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationCity sx={{ mr: 1, fontSize: "1.8rem" }} />
            ເພີ່ມທີ່ຢູ່ໃໝ່
          </Typography>
       
          {/* Map section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ 
                fontSize: "1rem", 
                mb: 1.5, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center", 
              }}
            >
              <MyLocationIcon sx={{ mr: 1, color: "#611463" }} />
              ເລືອກຈາກແຜນທີ່
            </Typography>
            
            <Card
              sx={{
                borderRadius: 3,
                height: 220,
                boxShadow: "none",
                border: "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent sx={{ p: 0, height: "100%" }}>
                <Box
                  component="img"
                  src="/api/placeholder/800/400"
                  alt="Map"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    zIndex: 10,
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: "#fff",
                      color: "#611463",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: "#f3f3f3",
                      },
                    }}
                  >
                    <MyLocationIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.6 }} />

          {/* Form grid for location details */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Name of place */}
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontSize: "1rem", 
                  mb: 1.5, 
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center", 
                }}
              >
                <TitleIcon sx={{ mr: 1, color: "#611463" }} />
                ຊື່ສະຖານທີ່
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="ຊື່ສະຖານທີ່"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                sx={{
                  mb: 3,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#611463", 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#611463",
                      borderWidth: 2,
                    },
                  },
                }}
                InputProps={{
                  sx: { fontSize: "0.95rem", py: 0.5 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              {/* Detailed address */}
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontSize: "1rem", 
                  mb: 1.5, 
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center", 
                }}
              >
                <LocationOnIcon sx={{ mr: 1, color: "#611463" }} />
                ລາຍລະອຽດທີ່ຢູ່
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="ອາຄານ, ຊັ້ນ, ຫ້ອງ"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                multiline
                rows={2}
                sx={{
                  mb: 3,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#611463", 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#611463",
                      borderWidth: 2,
                    },
                  },
                }}
                InputProps={{
                  sx: { fontSize: "0.95rem" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              {/* Explanation of place */}
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontSize: "1rem", 
                  mb: 1.5, 
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center", 
                }}
              >
                <DescriptionIcon sx={{ mr: 1, color: "#611463" }} />
                ລາຍລະອຽດເພີ່ມເຕີມ
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="ລາຍລະອຽດເພີ່ມເຕີມກ່ຽວກັບສະຖານທີ່..."
                value={placeDetails}
                onChange={(e) => setPlaceDetails(e.target.value)}
                multiline
                rows={3}
                sx={{
                  mb: 3,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#611463", 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#611463",
                      borderWidth: 2,
                    },
                  },
                }}
                InputProps={{
                  sx: { fontSize: "0.95rem" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
  {/* Gender of house owner */}
  <Typography
    variant="subtitle1"
    sx={{ 
      fontSize: "1rem", 
      mb: 1.5, 
      fontWeight: 600,
      display: "flex",
      alignItems: "center", 
    }}
  >
    <WcIcon sx={{ mr: 1, color: "#611463" }} />
    ເພດຂອງເຈົ້າຂອງເຮືອນ
  </Typography>
  <FormControl 
    component="fieldset" 
    sx={{ 
      mb: 3, 
      width: "100%",
      p: 2,
      border: "1px solid",
      borderColor: alpha("#611463", 0.1),
      borderRadius: 2,
      backgroundColor: alpha("#f8f8f8", 0.5),
      transition: "all 0.2s",
      "&:hover": {
        borderColor: alpha("#611463", 0.3),
      }
    }}
  >
    <RadioGroup
      row
      value={ownerGender}
      onChange={(e) => setOwnerGender(e.target.value)}
    >
      <FormControlLabel
        value="male"
        control={
          <Radio
            sx={{
              color: alpha("#611463", 0.7),
              "&.Mui-checked": {
                color: "#611463",
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 500 }}>ຊາຍ</Typography>
        }
      />
      <FormControlLabel
        value="female"
        control={
          <Radio
            sx={{
              color: alpha("#611463", 0.7),
              "&.Mui-checked": {
                color: "#611463",
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 500 }}>ຍິງ</Typography>
        }
      />
      <FormControlLabel
        value="other"
        control={
          <Radio
            sx={{
              color: alpha("#611463", 0.7),
              "&.Mui-checked": {
                color: "#611463",
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 500 }}>ອື່ນໆ</Typography>
        }
      />
    </RadioGroup>
  </FormControl>

  {/* Phone number */}
  <Typography
    variant="subtitle1"
    sx={{ 
      fontSize: "1rem", 
      mb: 1.5, 
      fontWeight: 600,
      display: "flex",
      alignItems: "center", 
    }}
  >
    <PhoneIcon sx={{ mr: 1, color: "#611463" }} />
    ເບີໂທລະສັບ
  </Typography>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="020 XXXXXXXX"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    sx={{
      mb: 3,
      backgroundColor: "#fff",
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        transition: "all 0.2s",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha("#611463", 0.5),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#611463",
          borderWidth: 2,
        },
      },
    }}
    InputProps={{
      sx: { fontSize: "0.95rem", py: 0.5 },
    }}
  />
</Grid>
          </Grid>

          {/* Upload picture */}
          <Typography
            variant="subtitle1"
            sx={{ 
              fontSize: "1rem", 
              mb: 1.5, 
              fontWeight: 600,
              display: "flex",
              alignItems: "center", 
              mt: 1,
            }}
          >
            <CameraAltOutlinedIcon sx={{ mr: 1, color: "#611463" }} />
            ຮູບພາບຂອງສະຖານທີ່
          </Typography>
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: "none",
              border: "1px dashed",
              borderColor: alpha("#611463", 0.3),
              overflow: "hidden",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#611463",
                backgroundColor: alpha("#611463", 0.02),
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                {previewImage ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: 220,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box
                      component="img"
                      src={previewImage}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 5,
                    }}
                  >
                    <PhotoCameraIcon
                      sx={{ fontSize: 60, color: alpha("#611463", 0.7), mb: 2 }}
                    />
                    <Typography sx={{ color: "#666", mb: 2, textAlign: "center" }}>
                      ອັບໂຫລດຮູບພາບເພື່ອໃຫ້ຜູ້ໃຫ້ບໍລິການເຫັນສະຖານທີ່ຂອງທ່ານໄດ້ງ່າຍຂຶ້ນ
                    </Typography>
                  </Box>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(97, 20, 99, 0.15)",
                      px: 3,
                      py: 1.2,
                      transition: "all 0.2s",
                      "&:hover": { 
                        background: "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(97, 20, 99, 0.25)",
                      },
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    {previewImage ? "ປ່ຽນຮູບພາບ" : "ອັບໂຫລດຮູບພາບ"}
                  </Button>
                </label>
              </Box>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(LOCATION_PATH)}
                sx={{
                  py: 1.5,
                  color: "#d32f2f",
                  borderColor: "#d32f2f",
                  borderWidth: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#d32f2f",
                    backgroundColor: alpha("#d32f2f", 0.05),
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.15)",
                  },
                }}
              >
                ຍົກເລີກ
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmLocation}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                  transition: "all 0.2s",
                  "&:hover": { 
                    background: "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(97, 20, 99, 0.2)",
                  },
                }}
              >
                ບັນທຶກ
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LocationDetailPage;