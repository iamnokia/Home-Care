import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { LOCATION_DETAIL_PATH, PAYMENT_PATH } from "../../../routes/path";
import useMainController from "../controllers/index";
import { EmployeeModel } from "../../../models/employee";
import { AlertColor } from "@mui/material/Alert";
import { Gender } from "../../../enums/gender";

// Define font size constants
const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.9rem",
  button: "1rem",
};

// Define the Location interface for the displayed service providers
interface Location {
  id: string;
  firstName: string;
  surname: string;
  image: string;
  category: string;
  gender: string;
  age: number;
  village: string;
  city: string;
  price: number;
  priceFormatted: string;
  service?: string;
  cat_id?: number; // Added category ID field
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  licensePlate?: string;
  carImage?: string;
}

const LocationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Get data from controller
  const { data, car, loading } = useMainController();

  // State variables
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [locations, setLocations] = useState<Location[]>([]);

  // Map employee data to location format
  useEffect(() => {
    if (data && data.length > 0) {
      const mappedLocations = data.map((employee: EmployeeModel) => {
        // Extract village from address
        let village = 'N/A';
        if (employee.address && typeof employee.address === 'string' && employee.address.trim() !== '') {
          village = employee.address.split(',')[0]?.trim() || employee.address;
        }

        // Format price with commas
        const formatPrice = (price: string): string => {
          const numPrice = parseFloat(price);
          return numPrice.toLocaleString() + " KIP";
        };

        // Calculate age (placeholder)
        const calculateAge = (): number => {
          try {
            const createdDate = new Date(employee.created_at);
            const today = new Date();
            const age = today.getFullYear() - createdDate.getFullYear();
            return age > 0 ? age : 21; // Default to 21 if calculation fails
          } catch (error) {
            return 21; // Default age
          }
        };

        // Map gender enum to display text
        const genderText = employee.gender === Gender.MALE ? "ຊາຍ" : "ຍິງ";

        // Safely extract the numeric category ID
        let categoryId: number | undefined;
        try {
          if (employee.cat_id !== undefined) {
            categoryId = typeof employee.cat_id === 'string' 
              ? parseInt(employee.cat_id, 10) 
              : employee.cat_id;
            
            // Check if parsing resulted in NaN
            if (isNaN(categoryId)) {
              categoryId = undefined;
            }
          }
        } catch (error) {
          console.error(`Error parsing cat_id for employee ${employee.id}:`, error);
          categoryId = undefined;
        }

        // Initialize location object with basic information
        const locationObject: Location = {
          id: employee.id,
          firstName: employee.first_name,
          surname: employee.last_name,
          image: employee.avatar || "https://via.placeholder.com/40",
          category: employee.cat_name,
          gender: genderText,
          age: calculateAge(),
          village: village,
          city: employee.city || "ວຽງຈັນ",
          price: parseFloat(employee.price),
          priceFormatted: formatPrice(employee.price),
          service: employee.cat_name, // Set service to category name
          cat_id: categoryId, // Add safely parsed category ID
          // Basic car details from employee (these might be null/undefined)
          carId: employee?.car_id,
          carBrand: employee?.car_brand,
          carModel: employee?.car_model,
          licensePlate: employee?.license_plate,
        };

        // For category ID 5 (moving service), try to find matching car data
        if (categoryId === 5 && car && car.length > 0) {
          // Find car that belongs to this employee
          const employeeCar = car.find(c => c.emp_id === employee.id);
          
          if (employeeCar) {
            // Update with detailed car information
            locationObject.carId = employeeCar.id || locationObject.carId;
            locationObject.carBrand = employeeCar.car_brand || locationObject.carBrand;
            locationObject.carModel = employeeCar.model || locationObject.carModel;
            locationObject.licensePlate = employeeCar.license_plate || locationObject.licensePlate;
            locationObject.carYear = employeeCar.created_at ? 
              new Date(employeeCar.created_at).getFullYear().toString() : undefined;
            locationObject.carImage = employeeCar.car_image || "https://via.placeholder.com/400/300";
          }
        }

        return locationObject;
      });

      setLocations(mappedLocations);
    }
  }, [data, car]);

  // Calculate total whenever locations change
  useEffect(() => {
    const total = locations.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);

    const savedLocationName = localStorage.getItem('selectedLocationName');

    // If a location name exists in localStorage, set it to the address state
    if (savedLocationName) {
      setAddress(savedLocationName);
    }
  }, [locations]);

  // Format number as currency
  const formatCurrency = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  // Handle alert close
  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: "#611463" }} />
      </Box>
    );
  }

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
              onClick={() => navigate(`/service-detail/${id}`)}
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
              value={address} // This will now show the value from localStorage
              onClick={() => navigate(`/Location-detail/${id}`)}
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

          <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3, pr: 1 }}>
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
                        {location.gender}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Car details - ONLY for category ID 5 */}
                  {location.cat_id === 5 && (
                    <>
                      {/* Enhanced car details with image (similar to ServiceDetailsPage) */}
                      <Box sx={{ 
                        display: "flex", 
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "center", sm: "flex-start" },
                        gap: 2,
                        mb: 2,
                        p: 2,
                        backgroundColor: '#f0e9f1',
                        borderRadius: 2,
                        border: '1px dashed rgba(97, 20, 99, 0.2)',
                        borderLeft: '3px solid #8a1c8d'
                      }}>
                        {/* Car image - only if available */}
                        {location.carImage && (
                          <Box sx={{
                            width: { xs: "100%", sm: "40%" },
                            height: { xs: 150, sm: 120 },
                            borderRadius: 2,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            flexShrink: 0,
                          }}>
                            <img
                              src={location.carImage}
                              alt="Vehicle"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        )}

                        {/* Car details */}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: '#611463', fontWeight: 600 }}>
                            ຂໍ້ມູນລົດ
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <TimeToLeaveIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555', fontWeight: 500 }}>
                                  {location.carBrand || 'N/A'} {location.carModel || 'N/A'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <BadgeIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                                  {location.licensePlate || 'N/A'}
                                </Typography>
                              </Box>
                            </Grid>
                            {location.carYear && (
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                                    ປີ {location.carYear}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Box>
                    </>
                  )}

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
            {/* Left column - Notes */}
            <Grid item xs={12} md={6}>
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
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", color: '#611463' }}>
                        ລາຄາລວມ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
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
                        {formatCurrency(totalAmount)}
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
              onClick={() => navigate(`/service-detail/${id}`)}
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
              onClick={() => navigate(`/payment/${id}`)}
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