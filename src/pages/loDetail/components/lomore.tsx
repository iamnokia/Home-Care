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
  Chip,
  Fade,
  Divider,
  alpha,
  MenuItem,
  Select,
  FormHelperText,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LinkIcon from "@mui/icons-material/Link";
import LaunchIcon from "@mui/icons-material/Launch";
import ErrorIcon from "@mui/icons-material/Error";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import { LocationCity } from "@mui/icons-material";
import { LOCATION_PATH } from "../../../routes/path";
import useMainController from "../controllers";
import HomeIcon from "@mui/icons-material/Home";

const districts: string[] = [
  "CHANTHABULY",
  "SIKHOTTABONG",
  "XAYSETHA",
  "SISATTANAK",
  "NAXAITHONG",
  "XAYTANY",
  "HADXAIFONG",
];

interface CountryCode {
  code: string;
  country: string;
}



const LocationDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctrl = useMainController();

  const getLocationIcon = (type: string): React.ReactElement => {
    switch (type) {
      case "home":
        return <HomeIcon />;
      default:
        return <HomeIcon />;
    }
  };

  const displayedAddresses = ctrl?.showAllAddresses
    ? ctrl?.address
    : ctrl?.address.slice(0, 3);

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
              onClick={() => navigate(`/Location/${id}`)}
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
                alignItems: "center",
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
              {displayedAddresses.map((location) => (
                <Fade in={true} key={location.user_id}>
                  <ListItem
                    button
                    onClick={() => ctrl?.handleLocationSelect(location)}
                    sx={{
                      mb: 0.5,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      backgroundColor:
                        ctrl?.selectedLocation?.user_id === location.user_id
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
                      "&::after":
                        ctrl?.selectedLocation?.user_id === location.user_id
                          ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "4px",
                            backgroundColor: ctrl?.getLocationColor("home"),
                          }
                          : {},
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: alpha(
                          ctrl?.getLocationColor("home"),
                          0.1
                        ),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getLocationIcon("home")}
                    </Box>

                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          {location.address_name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{ fontSize: "0.85rem", color: "#666", mt: 0.5 }}
                        >
                          {location.address_description}{" ,"}
                          {location.village}{" ,"}
                          {location.city}
                        </Typography>
                        
                      }
                    />

                    <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                      {ctrl?.selectedLocation?.id === location.id && (
                        <Chip
                          color="primary"
                          size="small"
                          icon={<CheckCircleRoundedIcon sx={{ fontSize: "1rem" }} />}
                          label="ເລືອກແລ້ວ"
                          sx={{
                            backgroundColor: ctrl?.getLocationColor("້ome"),
                            mr: 1.5,
                            fontSize: "0.75rem",
                          }}
                        />
                      )}

                      <IconButton
                        size="small"
                        onClick={() => ctrl?.handleDeleteLocation()}
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
            {ctrl?.address.length > 3 && (
              <Button
                onClick={() => ctrl?.setShowAllAddresses(!ctrl?.showAllAddresses)}
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#611463",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  borderRadius: "24px",
                  background: "linear-gradient(to right, #f3e7f3, #faf5fa)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(97, 20, 99, 0.1)",
                  border: "1px solid #e0c9e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    background: "linear-gradient(to right, #e9d6eb, #f5ebf6)",
                    boxShadow: "0 4px 8px rgba(97, 20, 99, 0.15)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                {ctrl?.showAllAddresses ? "ເບິ່ງໜ້ອຍລົງ" : "ເບິ່ງເພີ່ມເຕີມ"}
                <span style={{ marginLeft: "5px", transition: "transform 0.3s" }}>
                  {ctrl?.showAllAddresses}
                </span>
              </Button>
            )}
          </Box>

          {/* Action buttons */}
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/Location/${id}`)}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                  transition: "all 0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
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
              value={ctrl?.mapLink ?? ""}
              onChange={(e) => {
                ctrl?.setMapLink(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({ ...ctrl?.errors, mapLink: undefined });
                }
              }}
              error={!!ctrl?.errors.mapLink}
              helperText={ctrl?.errors.mapLink}
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
                      onClick={ctrl?.handleOpenGoogleMaps}
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
              value={ctrl?.placeName ?? ""}
              onChange={(e) => {
                ctrl?.setPlaceName(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({ ...ctrl?.errors, placeName: undefined });
                }
              }}
              error={!!ctrl?.errors.placeName}
              helperText={ctrl?.errors.placeName}
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
                endAdornment: ctrl?.errors.placeName && (
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
              value={ctrl?.detailAddress ?? ""}
              onChange={(e) => {
                ctrl?.setDetailAddress(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({
                    ...ctrl?.errors,
                    detailAddress: undefined,
                  });
                }
              }}
              error={!!ctrl?.errors.detailAddress}
              helperText={ctrl?.errors.detailAddress}
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
                endAdornment: ctrl?.errors.detailAddress && (
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
              value={ctrl?.placeVillage ?? ""}
              onChange={(e) => {
                ctrl?.setVillage(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({ ...ctrl?.errors, placeVillage: undefined });
                }
              }}
              error={!!ctrl?.errors.placeVillage}
              helperText={ctrl?.errors.placeVillage}
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
                endAdornment: ctrl?.errors.placeName && (
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
              <LocationCityOutlinedIcon sx={{ mr: 1, color: "#611463" }} />{" "}
              ເມືອງ *
            </Typography>

            <Autocomplete
              fullWidth
              options={districts}
              value={ctrl?.placeCity ?? ""}
              onChange={(
                event: React.SyntheticEvent,
                newValue: string | null
              ) => {
                ctrl?.setCity(newValue ?? ""); // ✅ use the parameter, not ctrl?.newValue
                if (newValue) {
                  ctrl?.setErrors({ ...ctrl?.errors, placeCity: undefined });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="ເລືອກເມືອງ"
                  error={!!ctrl?.errors.placeCity}
                  helperText={ctrl?.errors.placeCity}
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
                        {ctrl?.errors.placeName && (
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

            <Grid container spacing={2} sx={{ mb: 2,  }}>
            
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="ໃສ່ເບີໂທລະສັບ"
                  value={ctrl?.phoneNumber}
                  onChange={(e) => {
                    ctrl?.setPhoneNumber(e.target.value);
                    if (e.target.value.trim()) {
                      ctrl?.setErrors({
                        ...ctrl?.errors,
                        phoneNumber: undefined,
                      });
                    }
                  }}
                  error={!!ctrl?.errors.phoneNumber}
                  helperText={ctrl?.errors.phoneNumber}
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
                    endAdornment: ctrl?.errors.phoneNumber && (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>

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
                {ctrl.images[0]?.preview ? (
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
                      src={ctrl.images[0].preview}
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
                    <Typography
                      sx={{ color: "#666", mb: 2, textAlign: "center" }}
                    >
                      ອັບໂຫລດຮູບພາບເພື່ອໃຫ້ຜູ້ໃຫ້ບໍລິການເຫັນສະຖານທີ່ຂອງທ່ານໄດ້ງ່າຍຂຶ້ນ
                    </Typography>
                  </Box>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={ctrl.handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{
                      background:
                        "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(97, 20, 99, 0.15)",
                      px: 3,
                      py: 1.2,
                      transition: "all 0.2s",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(97, 20, 99, 0.25)",
                      },
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    {ctrl.images[0]?.preview ? "ປ່ຽນຮູບພາບ" : "ອັບໂຫລດຮູບພາບ"}
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
                onClick={ctrl?.handleSubmit}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #611463 0%, #812e84 100%)",
                  transition: "all 0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #7a1980 0%, #974099 100%)",
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
