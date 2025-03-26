import React, { useState, useRef, ChangeEvent } from "react";
import {
  Autocomplete, 
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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Fade,
  Divider,
  alpha,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
  Checkbox,
  Snackbar,
  Alert,
  AlertColor,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import previewImage from "@mui/icons-material/BookmarkBorder";
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import LaunchIcon from "@mui/icons-material/Launch";
import ErrorIcon from "@mui/icons-material/Error";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { LocationCity } from "@mui/icons-material";
import { LOCATION_PATH } from "../../../routes/path";


const districts: string[] = [
  'ຈັນທະບູລີ',
  'ສີສັດຕະນາກ',
  'ໄຊເສດຖາ',
  'ຫາດຊາຍຟອງ',
  'ນາຊາຍທອງ',
  'ສີໂຄດຕະບອງ',
  'ໄຊທານີ'
];
// Define types for errors
interface ErrorState {
  placeName?: string;
  [key: string]: string | undefined;
}

// Define TypeScript interfaces
interface LocationType {
  id: number;
  name: string;
  description: string;
  type: "home" | "work" | "other";
}

interface CountryCode {
  code: string;
  country: string;
}

interface ImageFile {
  file: File;
  preview: string;
}

interface ErrorState {
  placeName?: string;
  detailAddress?: string;
  phoneNumber?: string;
  mapLink?: string;
}

// Sample saved locations
const initialSavedLocations: LocationType[] = [
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

// Country codes for phone numbers
const countryCodes: CountryCode[] = [
  { code: "+856", country: "Laos" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+855", country: "Cambodia" },
  { code: "+95", country: "Myanmar" },
  { code: "+60", country: "Malaysia" },
  { code: "+65", country: "Singapore" },
];

const LocationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State hooks
  const [savedLocations, setSavedLocations] = useState<LocationType[]>(initialSavedLocations);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const [placeDetails, setPlaceDetails] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+856");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hasWhatsapp, setHasWhatsapp] = useState<boolean>(false);
  const [mapLink, setMapLink] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<ErrorState>({});
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  // Handle location selection
  const handleLocationSelect = (location: LocationType): void => {
    setSelectedLocation(location);
    setDetailAddress(location.description);
    setPlaceName(location.name);
  };

  // Handle delete location
  const handleDeleteLocation = (id: number, event: React.MouseEvent): void => {
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
  const handleConfirmLocation = (): void => {
    // Validation
    const newErrors: ErrorState = {};
    if (!placeName.trim()) newErrors.placeName = "ກະລຸນາໃສ່ຊື່ສະຖານທີ່";
    if (!detailAddress.trim()) newErrors.detailAddress = "ກະລຸນາໃສ່ລາຍລະອຽດທີ່ຢູ່";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "ກະລຸນາໃສ່ເບີໂທລະສັບ";
    if (!mapLink.trim()) newErrors.mapLink = "ກະລຸນາໃສ່ລິ້ງແຜນທີ່";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage("ກະລຸນາກວດສອບຂໍ້ມູນອີກຄັ້ງ");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Here you would typically save the selected location and navigate back
    setSnackbarMessage("ບັນທຶກທີ່ຢູ່ສຳເລັດແລ້ວ");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);

    // Navigate after successful save
    setTimeout(() => {
      navigate(LOCATION_PATH);
    }, 1500);
  };

  // Open Google Maps with the provided link
  const handleOpenGoogleMaps = (): void => {
    if (mapLink) {
      window.open(mapLink, '_blank');
    } else {
      window.open('https://www.google.com/maps', '_blank');
    }
  };

  // Handle image upload
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      // Check if adding new files would exceed the limit of 3
      if (images.length + newFiles.length > 3) {
        setSnackbarMessage("ສາມາດອັບໂຫລດຮູບພາບໄດ້ສູງສຸດ 3 ຮູບເທົ່ານັ້ນ");
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
        return;
      }

      const newImages: ImageFile[] = [...images];

      newFiles.forEach(file => {
        // Create a preview URL
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            newImages.push({
              file: file,
              preview: e.target.result as string
            });
            setImages([...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number): void => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Handle country code change
  const handleCountryCodeChange = (event: SelectChangeEvent): void => {
    setCountryCode(event.target.value);
  };

  // Get icon based on location type
  const getLocationIcon = (type: string): React.ReactElement => {
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
  const getLocationColor = (type: string): string => {
    switch (type) {
      default:
        return "#f7931e";
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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

          {/* Map link section */}
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
              <LinkIcon sx={{ mr: 1, color: "#611463" }} />
              ລິ້ງ Google Maps *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ວາງລິ້ງແຜນທີ່ຈາກ Google Maps ທີ່ນີ້"
              value={mapLink}
              onChange={(e) => {
                setMapLink(e.target.value);
                if (e.target.value.trim()) {
                  setErrors({ ...errors, mapLink: undefined });
                }
              }}
              error={!!errors.mapLink}
              helperText={errors.mapLink}
              required
              sx={{
                mb: 2,
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
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={handleOpenGoogleMaps}
                      startIcon={<LaunchIcon />}
                      sx={{
                        background: "#f79313",
                        "&:hover": {
                          background: "#611463",
                        },
                        borderRadius: 1.5,
                        px: 2,
                      }}
                    >
                      Google Maps
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ mb: 1, ml: 1 }}>
              ແນະນຳ: ສາມາດຄົ້ນຫາສະຖານທີ່ໃນ Google Maps ແລ້ວວາງລິ້ງຈາກນັ້ນບ່ອນນີ້
            </FormHelperText>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.6 }} />

          {/* Form for place name and details */}
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
              <LocationOnIcon sx={{ mr: 1, color: "#611463" }} />
              ຊື່ສະຖານທີ່ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ຊື່ອາຄານ, ທີ່ຢູ່, ຫລືຊື່ຮ້ານ"
              value={placeName}
              onChange={(e) => {
                setPlaceName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors({ ...errors, placeName: undefined });
                }
              }}
              error={!!errors.placeName}
              helperText={errors.placeName}
              required
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
                endAdornment: errors.placeName && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />

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
              ລາຍລະອຽດສະຖານທີ່ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              placeholder="ປ້ອນລາຍລະອຽດເພີ່ມເຕີມເຊັ່ນ: ໝາຍເລກອາຄານ, ຊັ້ນ, ຫ້ອງ"
              value={detailAddress}
              onChange={(e) => {
                setDetailAddress(e.target.value);
                if (e.target.value.trim()) {
                  setErrors({ ...errors, detailAddress: undefined });
                }
              }}
              error={!!errors.detailAddress}
              helperText={errors.detailAddress}
              required
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
                endAdornment: errors.detailAddress && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />
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
              <HouseOutlinedIcon sx={{ mr: 1, color: "#611463" }} />
              ບ້ານ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ປ້ອນຊື່ບ້ານເຊັ່ນ: ດົງໂດກ, ໜອງພະຍາ,..."
              value={placeName}
              onChange={(e) => {
                setPlaceName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors({ ...errors, placeName: undefined });
                }
              }}
              error={!!errors.placeName}
              helperText={errors.placeName}
              required
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
                endAdornment: errors.placeName && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />
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
              <LocationCityOutlinedIcon sx={{ mr: 1, color: "#611463" }} /> ເມືອງ *
      </Typography>
      
      <Autocomplete
        fullWidth
        options={districts}
        value={placeName}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          setPlaceName(newValue);
          if (newValue) {
            setErrors({ ...errors, placeName: undefined });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="ເລືອກເມືອງ"
            error={!!errors.placeName}
            helperText={errors.placeName}
            required
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
              ...params.InputProps,
              sx: { fontSize: "0.95rem", py: 0.5 },
              endAdornment: (
                <>
                  {errors.placeName && (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
          </Box>
          

          {/* Phone number section */}
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
              <PhoneIcon sx={{ mr: 1, color: "#611463" }} />
              ເບີໂທລະສັບ *
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha("#611463", 0.2),
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha("#611463", 0.5),
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#611463",
                      },
                    }}
                  >
                    {countryCodes.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="XX XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors({ ...errors, phoneNumber: undefined });
                    }
                  }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  required
                  sx={{
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
                    endAdornment: errors.phoneNumber && (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* WhatsApp Option */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasWhatsapp}
                  onChange={(e) => setHasWhatsapp(e.target.checked)}
                  sx={{
                    color: "#25D366",
                    '&.Mui-checked': {
                      color: "#25D366",
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <WhatsAppIcon sx={{ color: "#25D366", mr: 1 }} />
                  <Typography sx={{ fontSize: "0.95rem" }}>
                    ໝາຍເລກນີ້ໃຊ້ WhatsApp ໄດ້
                  </Typography>
                </Box>
              }
              sx={{ mb: 3 }}
            />
          </Box>

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
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
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