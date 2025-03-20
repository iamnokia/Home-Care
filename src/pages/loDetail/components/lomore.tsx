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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Input,
  Divider,
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
import AddIcon from "@mui/icons-material/Add";
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { LOCATION_PATH } from "../../../routes/path";

const fontSize = {
  title: "1.5rem",
  subtitle: "1rem",
  text: "0.9rem",
  button: "1rem",
};

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
        return <LocationOnIcon />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: '#611463',
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
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            maxWidth: "100%",
            mx: "auto",
            mb: 3,
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
              ການຈັດການທີ່ຢູ່ລະອຽດ
            </Typography>
          </Box>

          {/* Saved locations */}
          <Typography
            variant="subtitle1"
            color="#611463"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "bold" }}
          >
            ທີ່ຢູ່ທີ່ບັນທຶກໄວ້
          </Typography>
          <List sx={{ mb: 3, p: 0 }}>
            {savedLocations.map((location) => (
              <ListItem
                key={location.id}
                button
                onClick={() => handleLocationSelect(location)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: selectedLocation?.id === location.id ? "#f0f0f0" : "transparent",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  position: "relative",
                }}
              >
                <ListItemIcon>{getLocationIcon(location.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium" }}>
                      {location.name}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ fontSize: fontSize.text, color: "text.secondary" }}>
                      {location.description}
                    </Typography>
                  }
                />
                {selectedLocation?.id === location.id && (
                  <BookmarkIcon sx={{ color: "#611463", mr: 1 }} />
                )}
                <IconButton 
                  size="small" 
                  onClick={(e) => handleDeleteLocation(location.id, e)}
                  sx={{ 
                    color: "#d32f2f",
                    "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.04)" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
          
          {/* Action buttons */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/")}
                sx={{
                  fontSize: fontSize.button,
                  py: 1.5,
                  color: "#f7931e",
                  borderColor: "#f7931e",
                  "&:hover": {
                    borderColor: "#f7931e",
                    backgroundColor: "rgba(211, 47, 47, 0.04)",
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
                  fontSize: fontSize.button,
                  py: 1.5,
                  backgroundColor: "#611463",
                  "&:hover": { backgroundColor: "#4a0d4c" },
                }}
              >
                ຢືນຢັນໃຊ້ທີ່ຢູ່
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Second Box */}
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
              sx={{
                fontSize: fontSize.title,
                fontWeight: "bold",
              }}
            >
              ເພີ່ມທີ່ຢູ່ໃໝ່
            </Typography>
       
          {/* Map section */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
            ເລືອກຈາກແຜນທີ່
          </Typography>
          <Card
            sx={{
              mb: 3,
              borderRadius: 2,
              height: 200,
              boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              overflow: "hidden",
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
            </CardContent>
          </Card>

          {/* Name of place */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
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
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="action" />
                </InputAdornment>
              ),
              sx: { fontSize: fontSize.text },
            }}
          />

          {/* Detailed address */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
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
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" />
                </InputAdornment>
              ),
              sx: { fontSize: fontSize.text },
            }}
          />

          {/* Explanation of place */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
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
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon color="action" />
                </InputAdornment>
              ),
              sx: { fontSize: fontSize.text },
            }}
          />

          {/* Gender of house owner */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
            ເພດຂອງເຈົ້າຂອງເຮືອນ
          </Typography>
          <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
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
                      color: "#611463",
                      "&.Mui-checked": {
                        color: "#611463",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: fontSize.text }}>ຊາຍ</Typography>
                }
              />
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    sx={{
                      color: "#611463",
                      "&.Mui-checked": {
                        color: "#611463",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: fontSize.text }}>ຍິງ</Typography>
                }
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    sx={{
                      color: "#611463",
                      "&.Mui-checked": {
                        color: "#611463",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: fontSize.text }}>ອື່ນໆ</Typography>
                }
              />
            </RadioGroup>
          </FormControl>

          {/* Phone number */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
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
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
              sx: { fontSize: fontSize.text },
            }}
          />

          {/* Upload picture */}
          <Typography
            variant="subtitle1"
            sx={{ fontSize: fontSize.subtitle, mb: 1, fontWeight: "medium" }}
          >
            ຮູບພາບຂອງສະຖານທີ່
          </Typography>
          <Card
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                  border: "1px dashed #ddd",
                }}
              >
                {previewImage ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={previewImage}
                      alt="Preview"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <PhotoCameraIcon
                    sx={{ fontSize: 48, color: "#aaa", mb: 1 }}
                  />
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
                      backgroundColor: "#611463",
                      "&:hover": { backgroundColor: "#4a0d4c" },
                      fontSize: fontSize.text,
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
                  fontSize: fontSize.button,
                  py: 1.5,
                  color: "#d32f2f",
                  borderColor: "#d32f2f",
                  "&:hover": {
                    borderColor: "#b71c1c",
                    backgroundColor: "rgba(211, 47, 47, 0.04)",
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
                  fontSize: fontSize.button,
                  py: 1.5,
                  backgroundColor: "#611463",
                  "&:hover": { backgroundColor: "#4a0d4c" },
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