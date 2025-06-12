import React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  Avatar, 
  Container, 
  useMediaQuery, 
  useTheme,
  Chip,
  Paper,
  Grid,
  Badge,
  Button,
  alpha,
  CircularProgress,
  Stack
} from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WcIcon from '@mui/icons-material/Wc';
import PestControlIcon from '@mui/icons-material/PestControl';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BadgeIcon from '@mui/icons-material/Badge';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Icon from '../../../assets/icons/HomeCareLogo.png';
import useMainController from "../controller/index";

const ServiceListing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Get controller
  const ctrl = useMainController();
  
  // Get service icon based on occupation
  const getServiceIcon = (occupation: string) => {
    switch(occupation.toLowerCase()) {
      case 'cleaner':
        return <CleaningServicesIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'electrician':
        return <ElectricalServicesIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'ac technician':
        return <AcUnitIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'plumber':
        return <PlumbingIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'transportation':
        return <LocalShippingIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'bathroom specialist':
        return <WcIcon fontSize="small" sx={{ color: '#611463' }} />;
      case 'pest control':
        return <PestControlIcon fontSize="small" sx={{ color: '#611463' }} />;
      default:
        return <CategoryIcon fontSize="small" sx={{ color: '#611463' }} />;
    }
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'pending':
      case 'not start':
        return { bg: '#fff8e1', color: '#f57c00' };
      case 'cancelled':
        return { bg: '#ffebee', color: '#c62828' };
      case 'in progress':
        return { bg: '#e3f2fd', color: '#1565c0' };
      default:
        return { bg: '#e8f5e9', color: '#2e7d32' };
    }
  };
  
  // Translate status to Lao
  const translateStatus = (status: string): string => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'ສຳເລັດແລ້ວ';
      case 'pending':
      case 'not start':
        return 'ລໍຖ້າ';
      case 'cancelled':
        return 'ຍົກເລີກແລ້ວ';
      case 'in progress':
        return 'ກຳລັງດຳເນີນການ';
      default:
        return status;
    }
  };

  // Format date and time for better display
  const formatDateTime = (dateString: string): { date: string, time: string } => {
    if (!dateString) return { date: "ບໍ່ລະບຸ", time: "" };
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return { date: "ບໍ່ລະບຸ", time: "" };
      }
      
      const dateStr = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        timeZone: 'Asia/Vientiane'
      });
      
      const timeStr = date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Vientiane'
      });
      
      return { date: dateStr, time: timeStr };
    } catch (error) {
      console.error("Error formatting date time:", error);
      return { date: "ບໍ່ລະບຸ", time: "" };
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "linear-gradient(180deg, #611463 0%, #611463 100%)",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      {/* Header with gradient card */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(45deg, #611463 30%, #611463 90%)",
          borderRadius: "24px",
          padding: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: "1200px",
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 10px 20px rgba(97, 20, 99, 0.15)", 
          border: "2px solid rgba(255, 255, 255, 0.3)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box 
          sx={{ 
            width: "150px",
            height: "150px",
            position: "absolute",
            top: "-30px",
            right: "-30px",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            zIndex: 0
          }} 
        />
        
        <Box sx={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <Box 
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              p: 1.5,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <img 
              src={Icon} 
              alt="HomeCare Logo" 
              style={{ 
                height: isMobile ? 40 : 50,
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"
              }} 
            />
          </Box>
          
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold", 
                fontSize: { xs: "1.5rem", sm: "2rem" },
                textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                mb: 0.5
              }}
            >
              ປະຫວັດການບໍລິການ
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "0.85rem", sm: "1rem" },
              }}
            >
              ທ່ານໄດ້ໃຊ້ບໍລິການທັງໝົດ {ctrl.allServices.length} ຄັ້ງ
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Service Cards Container */}
      <Container 
        sx={{ 
          p: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px"
        }}
      >
        {/* Loading State */}
        {ctrl.loading && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexDirection: 'column',
              minHeight: '300px',
              width: '100%'
            }}
          >
            <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
            <Typography sx={{ color: 'white', fontSize: '1.1rem' }}>
              ກໍາລັງດາວໂຫຼດຂໍ້ມູນ...
            </Typography>
          </Box>
        )}
        
        {/* Error State */}
        {!ctrl.loading && ctrl.error && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexDirection: 'column',
              minHeight: '300px',
              width: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              p: 4
            }}
          >
            <ErrorOutlineIcon sx={{ color: 'white', fontSize: 60, mb: 2 }} />
            <Typography sx={{ color: 'white', fontSize: '1.1rem', textAlign: 'center', mb: 2 }}>
              {ctrl.error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => ctrl.fetchServiceOrders()}
              startIcon={<RefreshIcon />}
              sx={{
                bgcolor: 'white',
                color: '#611463',
                '&:hover': {
                  bgcolor: '#f7931e',
                  color: 'white'
                }
              }}
            >
              ລອງໃໝ່ອີກຄັ້ງ
            </Button>
          </Box>
        )}
        
        {/* Empty State */}
        {!ctrl.loading && !ctrl.error && ctrl.services.length === 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexDirection: 'column',
              minHeight: '300px',
              width: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              p: 4
            }}
          >
            <HistoryIcon sx={{ color: 'white', fontSize: 60, mb: 2 }} />
            <Typography sx={{ color: 'white', fontSize: '1.1rem', textAlign: 'center' }}>
              ທ່ານຍັງບໍ່ມີປະຫວັດການບໍລິການເທື່ອ
            </Typography>
          </Box>
        )}
        
        {/* Service Cards */}
        {!ctrl.loading && !ctrl.error && ctrl.services.map((service) => {
          // Check if this is a vehicle service
          const vehicleService = ctrl.isVehicleService(service.occupation === 'Transportation' ? 5 : 0);
          const { date, time } = formatDateTime(service.date);
          
          return (
            <Card
              key={service.id}
              sx={{
                mb: 3,
                borderRadius: "16px",
                p: 0,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                width: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 20px rgba(97, 20, 99, 0.1)"
                }
              }}
            >
              {/* Top bar with Contract ID, Date, Time, and Status */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                bgcolor: "#f9f9f9",
                borderBottom: "1px solid #eee",
                py: 1,
                px: 3,
                flexWrap: "wrap",
                gap: 1
              }}>
                {/* Contract ID */}
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  minWidth: "fit-content"
                }}>
                  <ReceiptIcon sx={{ 
                    fontSize: "0.9rem", 
                    color: "#611463", 
                    mr: 1 
                  }} />
                  <Typography 
                    sx={{ 
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      color: "#611463",
                      fontWeight: "600"
                    }}
                  >
                    ເລກທີສັນຍາ: #{String(service.id).padStart(3, '0')}M
                  </Typography>
                </Box>
                
                {/* Date and Time */}
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap"
                }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center"
                  }}>
                    <DateRangeIcon sx={{ 
                      fontSize: "0.9rem", 
                      color: "#611463", 
                      mr: 0.5 
                    }} />
                    <Typography 
                      sx={{ 
                        fontSize: { xs: "0.75rem", sm: "0.8rem" },
                        color: "#611463",
                      }}
                    >
                      {date}
                    </Typography>
                  </Box>
                  
                  {time && (
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center"
                    }}>
                      <AccessTimeIcon sx={{ 
                        fontSize: "0.9rem", 
                        color: "#f7931e", 
                        mr: 0.5 
                      }} />
                      <Typography 
                        sx={{ 
                          fontSize: { xs: "0.75rem", sm: "0.8rem" },
                          color: "#f7931e",
                        }}
                      >
                        {time}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {/* Status */}
                <Chip
                  label={translateStatus(service.status)}
                  size="small"
                  sx={{
                    bgcolor: getStatusColor(service.status).bg,
                    color: getStatusColor(service.status).color,
                    fontWeight: "600",
                    fontSize: "0.7rem",
                    height: 24
                  }}
                />
              </Box>

              {/* Main Card Content */}
              <Box sx={{ 
                p: 3,
                display: "flex", 
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 3 : 2,
                position: "relative"
              }}>
                {/* Left Section: Provider Info */}
                <Box sx={{ 
                  display: "flex",
                  alignItems: "flex-start",
                  width: isMobile ? "100%" : "60%"
                }}>
                  {/* Provider Avatar with Badge - FIXED: Always use employee avatar */}
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box sx={{ 
                        display: "flex", 
                        bgcolor: "#fff", 
                        borderRadius: "50%", 
                        p: 0.3,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}>
                        {getServiceIcon(service.occupation)}
                      </Box>
                    }
                  >
                    <Avatar 
                      src={service.avatar} // Always use employee avatar, not car image
                      alt={`${service.first_name} ${service.last_name}`}
                      sx={{ 
                        width: { xs: 70, sm: 80 }, 
                        height: { xs: 70, sm: 80 }, 
                        border: "3px solid #f7931e",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        mr: 2
                      }}
                    />
                  </Badge>
                  
                  {/* Provider Details */}
                  <Box sx={{ ml: 1 }}>
                    <Typography 
                      sx={{ 
                        color: "#611463", 
                        fontWeight: "bold",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        mb: 0.5,
                      }}
                    >
                      {service.first_name} {service.last_name}
                    </Typography>
                    
                    {/* Rating Stars */}
                    <Box sx={{ display: "flex", mb: 1.5 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon 
                          key={i} 
                          sx={{ 
                            fontSize: 16, 
                            color: i < service.rating ? '#FFD700' : '#e0e0e0',
                            mr: 0.3,
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.2)'
                            }
                          }}
                          onClick={() => ctrl.updateRating(service.id, i + 1)}
                        />
                      ))}
                    </Box>
                    
                    {/* Gender (Now properly translated to Lao) */}
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      mb: 1,
                      p: 1,
                      borderRadius: "8px",
                      bgcolor: alpha('#611463', 0.05),
                      width: "fit-content"
                    }}>
                      <PersonIcon sx={{ fontSize: "0.9rem", color: "#611463", mr: 0.5 }} />
                      <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, color: "#611463" }}>
                        {service.gender} {/* Now properly translated */}
                      </Typography>
                    </Box>
                    
                    {/* Location with icons - Now including city */}
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          p: 1,
                          borderRadius: "8px",
                          bgcolor: alpha('#f7931e', 0.05),
                        }}>
                          <HomeIcon sx={{ fontSize: "0.9rem", color: "#f7931e", mr: 0.5 }} />
                          <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, color: "#666" }}>
                            {service.address}
                          </Typography>
                          
                          {/* City information */}
                          <Box 
                            component="span" 
                            sx={{ 
                              display: "inline-flex", 
                              alignItems: "center", 
                              ml: 1,
                              bgcolor: alpha('#f7931e', 0.1),
                              px: 1,
                              py: 0.5,
                              borderRadius: "4px",
                            }}
                          >
                            <LocationCityIcon sx={{ fontSize: "0.8rem", color: "#f7931e", mr: 0.5 }} />
                            <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                              {ctrl.getLoCity(service.city)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    {/* Vehicle Information - Only for vehicle-based services */}
                    {vehicleService && service.carBrand && (
                      <Box sx={{
                        mt: 2,
                        p: 1.5,
                        backgroundColor: "rgba(97, 20, 99, 0.05)",
                        borderRadius: "8px",
                        border: "1px dashed rgba(97, 20, 99, 0.2)",
                        width: "100%"
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <DirectionsCarIcon sx={{ fontSize: '1rem', color: '#8a1c8d', mr: 0.7 }} />
                          <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#611463', fontWeight: "600" }}>
                            ຂໍ້ມູນພາຫະນະ
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                          <Grid item xs={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <TimeToLeaveIcon sx={{ fontSize: '0.8rem', color: '#8a1c8d', mr: 0.5 }} />
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                                {service.carBrand} {service.carModel}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CalendarTodayIcon sx={{ fontSize: '0.8rem', color: '#8a1c8d', mr: 0.5 }} />
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                                ປີ {service.carYear}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <BadgeIcon sx={{ fontSize: '0.8rem', color: '#8a1c8d', mr: 0.5 }} />
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                                {service.licensePlate}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Chip 
                              size="small"
                              label={`ລະຫັດລົດ: ${service.carId}`}
                              sx={{ 
                                height: 22, 
                                fontSize: '0.7rem',
                                backgroundColor: 'rgba(97, 20, 99, 0.1)',
                                color: '#611463',
                              }} 
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {/* Right Section: Service Info */}
                <Box 
                  sx={{ 
                    width: isMobile ? "100%" : "40%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMobile ? "flex-start" : "flex-end",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {/* Service Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "#fafafa",
                      border: "1px solid #eee",
                      width: "100%",
                      mb: 2
                    }}
                  >
                    {/* Service Category */}
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      mb: 1,
                      justifyContent: isMobile ? "flex-start" : "flex-start"
                    }}>
                      {getServiceIcon(service.occupation)}
                      <Typography 
                        sx={{ 
                          color: "#611463", 
                          fontWeight: "600",
                          fontSize: "0.95rem",
                          ml: 1
                        }}
                      >
                        {service.category}
                      </Typography>
                    </Box>
                    
                    {/* Service Description */}
                    <Typography 
                      sx={{ 
                        fontSize: "0.85rem",
                        color: "#555",
                        mb: 1,
                        lineHeight: 1.4
                      }}
                    >
                      {service.service}
                    </Typography>
                  </Paper>
                  
                  {/* Price Section */}
                  <Box 
                    sx={{ 
                      display: "flex", 
                      flexDirection: "column",
                      alignItems: isMobile ? "flex-start" : "flex-end",
                      width: "100%"
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666",
                        mb: 0.5,
                        fontSize: "0.75rem"
                      }}
                    >
                      ລາຄາທັງໝົດ
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: "#f7931e", 
                        fontWeight: "bold",
                        fontSize: { xs: "1.2rem", sm: "1.3rem" },
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {typeof service.price === 'number' && !isNaN(service.price) 
                        ? ctrl.formatPrice(service.price) 
                        : "ບໍ່ລະບຸ"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Container>
      
     
      {/* Pagination Buttons */}
      {!ctrl.loading && !ctrl.error && ctrl.allServices.length > 0 && (
        <Stack 
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            mb: 4,
            justifyContent: "center",
            width: "100%"
          }}
        >
          {/* Show Less Button - Only visible when showing more than 5 items */}
          {ctrl.showLessVisible && (
            <Button
              variant="contained"
              onClick={() => ctrl.showLess()}
              startIcon={<ExpandLessIcon />}
              sx={{
                borderRadius: "12px",
                bgcolor: "white",
                color: "#611463",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  bgcolor: "#f7931e",
                  color: "white"
                }
              }}
            >
              ເບິ່ງຫນ້ອຍລົງ
            </Button>
          )}
          
          {/* Show More Button - Only visible when there are more items to show */}
          {ctrl.hasMoreToLoad() && (
            <Button
              variant="contained"
              onClick={() => ctrl.loadMore()}
              endIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: "12px",
                bgcolor: "white",
                color: "#611463",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  bgcolor: "#f7931e",
                  color: "white"
                }
              }}
            >
              ເບິ່ງເພີ່ມເຕີມ
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default ServiceListing;