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
  Divider
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
import WorkIcon from '@mui/icons-material/Work';
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
        backgroundColor: "#611463",
        minHeight: "100vh",
        width: { xs: "100%", md: "90%", lg: "80%" },
        maxWidth: "1200px",
        padding: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: '20px',
        mt: '20px',
        borderRadius: { xs: '25px', sm: '50px' },
        mx: 'auto'
      }}
    >
      {/* Header with logo */}
      <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
        <img 
          src={Icon} 
          alt="HomeCare Logo" 
          style={{ 
            height: isMobile ? 60 : 80, 
            marginBottom: 12 
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#ffff", 
            fontWeight: "bold", 
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          ປະຫວັດການບໍລິການ
        </Typography>
      </Box>

      {/* Service Cards Container */}
      <Container 
        sx={{ 
          p: 1,
          width: "100%",
          height: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {services.map((service) => (
          <Card
            key={service.id}
            sx={{
              mb: 2,
              borderRadius: { xs: 3, sm: 4 },
              p: { xs: 2, sm: 3 },
              position: "relative",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              width: { xs: "95%", sm: "90%", md: "85%" },
              maxWidth: "900px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
              }
            }}
          >
            {/* Contract ID and Date Section */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              mb: 1.5, 
              alignItems: "center"
            }}>
              <Typography 
                sx={{ 
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#666",
                  fontWeight: "medium"
                }}
              >
                ເລກທີສັນຍາ: #10{service.id}M
              </Typography>
              
              <Typography 
                sx={{ 
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#666"
                }}
              >
                {formatDate(service.date)}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 2 : 0
            }}>
              {/* Provider Avatar and Details Container */}
              <Box sx={{ 
                display: "flex",
                alignItems: "flex-start",
                width: isMobile ? "100%" : "auto"
              }}>
                {/* Provider Avatar */}
                <Avatar 
                  src={service.avatar} 
                  alt={service.name}
                  sx={{ 
                    width: { xs: 50, sm: 60 }, 
                    height: { xs: 50, sm: 60 }, 
                    mr: 2,
                    mb: isMobile ? 1 : 0,
                    border: "2px solid #f7931e"
                  }}
                />
                
                {/* Provider Details */}
                <Box>
                  <Typography 
                    sx={{ 
                      color: "#611463", 
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      mb: 0.5,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {service.name} {service.surname}
                    <Box sx={{ display: "flex", ml: 1 }}>
                      {[...Array(service.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 14, color: '#FFD700' }} />
                      ))}
                    </Box>
                  </Typography>
                  
                  {/* Gender and Age */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <PersonIcon sx={{ fontSize: "0.9rem", color: "text.secondary", mr: 0.5 }} />
                    <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" }, color: "#666" }}>
                      {service.gender}, {service.age} ປີ
                    </Typography>
                  </Box>
                  
                  {/* Location with icons */}
                  <Box sx={{ 
                    p: 1,
                    mt: 0.5,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon sx={{ fontSize: "0.9rem", color: "text.secondary", mr: 0.5 }} />
                      <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" }, color: "#666" }}>
                        {service.village}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", ml: isMobile ? 0 : 1 }}>
                      <LocationCityIcon sx={{ fontSize: "0.9rem", color: "text.secondary", mr: 0.5 }} />
                      <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" }, color: "#666" }}>
                        {service.city}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* Service Type, Status and Price - Right aligned */}
              <Box 
                sx={{ 
                  marginLeft: isMobile ? 0 : "auto", 
                  textAlign: isMobile ? "left" : "right",
                  pr: isMobile ? 0 : 1,
                  mt: isMobile ? 0 : 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "flex-start" : "flex-end"
                }}
              >
                {/* Service Status */}
                <Chip 
                  label={service.status} 
                  size="small"
                  sx={{
                    bgcolor: "#e6f7ff",
                    color: "#0288d1",
                    fontWeight: "medium",
                    fontSize: "0.7rem",
                    mb: 1,
                    height: 24
                  }}
                />
                
                {/* Service Type with icon */}
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  flexDirection: isMobile ? "row" : "row-reverse",
                  mb: 0.5
                }}>
                  {getServiceIcon(service.occupation)}
                  <Typography 
                    sx={{ 
                      color: "#611463", 
                      fontWeight: "500",
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      mx: 0.5
                    }}
                  >
                    {service.category}
                  </Typography>
                </Box>
                
                {/* Service Description */}
                <Typography 
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.8rem" },
                    color: "#666",
                    mb: 0.5,
                    fontStyle: "italic"
                  }}
                >
                  {service.service}
                </Typography>
                
                <Divider sx={{ width: "100%", my: 1 }} />
                
                {/* Price in highlighted style */}
                <Typography 
                  sx={{ 
                    color: "#f7931e", 
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.1rem" }
                  }}
                >
                  {formatPrice(service.price)}
                </Typography>
              </Box>
            </Box>
            
            {/* Delete Button */}
            <IconButton 
              aria-label="delete"
              size="small" 
              onClick={() => handleDelete(service.id)}
              sx={{ 
                position: "absolute", 
                bottom: { xs: 8, sm: 12 }, 
                right: { xs: 8, sm: 430 },
                mt: 12,
                color: "#f44336",
                bgcolor: "rgba(244, 67, 54, 0.1)",
                padding: "6px",
                "&:hover": {
                  bgcolor: "rgba(244, 67, 54, 0.2)"
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default ServiceListing;