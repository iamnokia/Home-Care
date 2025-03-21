import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  Avatar, 
  IconButton, 
  Container, 
  useMediaQuery, 
  useTheme,
  Chip,
  Divider,
  Paper,
  Grid,
  Badge,
  Button,
  alpha,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
import Icon from '../../../assets/icons/HomeCareLogo.png';

const ServiceListing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Get service icon based on occupation
  const getServiceIcon = (occupation) => {
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
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'pending':
        return { bg: '#fff8e1', color: '#f57c00' };
      case 'cancelled':
        return { bg: '#ffebee', color: '#c62828' };
      case 'in progress':
        return { bg: '#e3f2fd', color: '#1565c0' };
      default:
        return { bg: '#e8f5e9', color: '#2e7d32' };
    }
  };
  
  // Enhanced sample data
  const [services, setServices] = useState([
    {
      id: 1,
      name: "ພົງວິໄລ",
      surname: "ສີວິໄລ",
      age: 25,
      gender: "ຊາຍ",
      village: "ບ້ານ ເສດຖີປ",
      city: "ວຽງຈັນ",
      occupation: "Cleaner",
      category: "ແມ່ບ້ານ",
      price: 200000,
      avatar: "/api/placeholder/40/40",
      rating: 5,
      service: "ທຳຄວາມສະອາດທົ່ວໄປ",
      date: "2025-02-15",
      status: "Completed"
    },
    {
      id: 2,
      name: "ທອງສະຫວັນ",
      surname: "ໄຊຍະວົງ",
      age: 31,
      gender: "ຊາຍ",
      village: "ບ້ານ ໂນນສະຫວ່າງ",
      city: "ວຽງຈັນ",
      occupation: "Electrician", 
      category: "ຊ່າງໄຟຟ້າ",
      price: 100000,
      avatar: "/api/placeholder/40/40",
      rating: 4,
      service: "ຕິດຕັ້ງອຸປະກອນໄຟຟ້າ",
      date: "2025-02-20",
      status: "Completed"
    },
    {
      id: 3,
      name: "ອຳມະລິນ",
      surname: "ອຸນາລົມ",
      age: 23,
      gender: "ຍິງ",
      village: "ບ້ານ ທ່າຄຳ",
      city: "ວຽງຈັນ",
      occupation: "AC Technician",
      category: "ຊ່າງແອ",
      price: 150000,
      avatar: "/api/placeholder/40/40",
      rating: 5,
      service: "ສ້ອມແປງແອໃນບ້ານ",
      date: "2025-03-05",
      status: "Completed"
    },
    {
      id: 4,
      name: "ສົມພອນ",
      surname: "ພົມມະວົງ",
      age: 35,
      gender: "ຊາຍ",
      village: "ບ້ານ ທ່າຄຳ",
      city: "ນະຄອນຫຼວງ",
      occupation: "Plumber",
      category: "ຊ່າງປະປາ",
      price: 200000,
      avatar: "/api/placeholder/40/40",
      rating: 4,
      service: "ແກ້ໄຂລະບົບນ້ຳປະປາ",
      date: "2025-03-10",
      status: "Completed"
    },
    {
      id: 5,
      name: "ພູວັງໄຊ",
      surname: "ບຸນຊົມ",
      age: 28,
      gender: "ຊາຍ",
      village: "ບ້ານ ເສດຖີປ",
      city: "ວຽງຈັນ",
      occupation: "Transportation",
      category: "ຂົນສົ່ງ",
      price: 300000,
      avatar: "/api/placeholder/40/40",
      rating: 5,
      service: "ຂົນສົ່ງເຄື່ອງຫຍ້າຍບ້ານ",
      date: "2025-03-15",
      status: "Completed"
    }
  ]);

  // Format price to have commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Function to delete a service
  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
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
              ທ່ານໄດ້ໃຊ້ບໍລິການທັງໝົດ {services.length} ຄັ້ງ
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
        {services.map((service) => (
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
            {/* Top bar with Contract ID, Date, and Delete Button */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              bgcolor: "#f9f9f9",
              borderBottom: "1px solid #eee",
              py: 1,
              px: 3,
            }}>
              {/* Contract ID */}
              <Box sx={{ 
                display: "flex", 
                alignItems: "center" 
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
                  ເລກທີສັນຍາ: #10{service.id}M
                </Typography>
              </Box>
              
              {/* Middle spacer */}
              <Box flexGrow={1} />
              
              {/* Date */}
              <Box sx={{ 
                display: "flex", 
                alignItems: "center",
                mr: 2
              }}>
                <DateRangeIcon sx={{ 
                  fontSize: "0.9rem", 
                  color: "#611463", 
                  mr: 1 
                }} />
                <Typography 
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.8rem" },
                    color: "#611463",
                  }}
                >
                  {formatDate(service.date)}
                </Typography>
              </Box>
              
              {/* Delete Button */}
              <Tooltip title="ລຶບຂໍ້ມູນ" arrow>
                <IconButton 
                  aria-label="delete"
                  size="small" 
                  onClick={() => handleDelete(service.id)}
                  sx={{ 
                    color: "#f44336",
                    bgcolor: "rgba(244, 67, 54, 0.1)",
                    padding: "4px",
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.2)"
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
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
                {/* Provider Avatar with Badge */}
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
                    src={service.avatar} 
                    alt={service.name}
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
                    {service.name} {service.surname}
                  </Typography>
                  
                  {/* Rating Stars */}
                  <Box sx={{ display: "flex", mb: 1.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        sx={{ 
                          fontSize: 16, 
                          color: i < service.rating ? '#FFD700' : '#e0e0e0',
                          mr: 0.3
                        }} 
                      />
                    ))}
                  </Box>
                  
                  {/* Gender and Age */}
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
                      {service.gender}, {service.age} ປີ
                    </Typography>
                  </Box>
                  
                  {/* Location with icons */}
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        p: 1,
                        borderRadius: "8px",
                        bgcolor: alpha('#f7931e', 0.05),
                      }}>
                        <HomeIcon sx={{ fontSize: "0.9rem", color: "#f7931e", mr: 0.5 }} />
                        <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, color: "#666" }}>
                          {service.village}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        p: 1,
                        borderRadius: "8px",
                        bgcolor: alpha('#f7931e', 0.05),
                      }}>
                        <LocationCityIcon sx={{ fontSize: "0.9rem", color: "#f7931e", mr: 0.5 }} />
                        <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, color: "#666" }}>
                          {service.city}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
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
                {/* Status Chip */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                  width: "100%",
                  mb: 2
                }}>
                  <Chip 
                    label={service.status} 
                    sx={{
                      bgcolor: getStatusColor(service.status).bg,
                      color: getStatusColor(service.status).color,
                      fontWeight: "600",
                      fontSize: "0.75rem",
                      height: 28,
                      px: 1,
                      borderRadius: "8px"
                    }}
                  />
                </Box>
                
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
                    {formatPrice(service.price)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Container>
      
      {/* Load More Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          mb: 4,
          borderRadius: "12px",
          bgcolor: "white",
          color: "#611463",
          px: 4,
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
    </Box>
  );
};

export default ServiceListing;