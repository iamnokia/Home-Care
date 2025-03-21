import React, { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography, Grid, Paper, Chip, Divider } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

// Define the enhanced service provider card component
const ServiceProviderCard = ({ id, name, surname, location, price, imageUrl, rating, category, gender, age, village, city, service }) => {
  const navigate = useNavigate();
  
  // Format price to have commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Kip";
  };
  
  // Handle viewing service details
  const handleViewDetails = () => {
    navigate(`/service-detail/${id}`);
  };
  
  return (
    <Box sx={{ 
      width: '100%', 
      border: '1px solid #eee', 
      borderRadius: 2, 
      overflow: 'hidden',
      mb: 3,
      boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0px 6px 12px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ height: 200, overflow: 'hidden' }}>
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name} {surname}</Typography>
          <Box sx={{ display: 'flex' }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 16, color: '#FFD700' }} />
            ))}
          </Box>
        </Box>
        
        {/* Service type with icon */}
        {service && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">{service}</Typography>
          </Box>
        )}
        
        {/* Category and gender/age info */}
        {(category || gender || age) && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
            {category && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 0.5 }}>
                <CategoryIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">{category}</Typography>
              </Box>
            )}
            {(gender || age) && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {gender}{age ? `, ${age} ປີ` : ''}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        {/* Location info */}
        {(village || city) ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            p: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            flexWrap: 'wrap'
          }}>
            {village && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: { xs: 0.5, sm: 0 }, minWidth: '45%' }}>
                <HomeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">{village}</Typography>
              </Box>
            )}
            {city && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationCityIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">{city}</Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{location}</Typography>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>
          {typeof price === 'number' ? formatPrice(price) : price}
        </Typography>
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleViewDetails}
          sx={{ 
            bgcolor: '#611463', 
            '&:hover': { bgcolor: '#611463' }, 
            textTransform: 'none',
            borderRadius: 10
          }}
        >
          ເບິ່ງລາຍລະອຽດ
        </Button>
      </Box>
    </Box>
  );
};

// More compact service category chip component
const ServiceCategoryChip = ({ icon, title, isActive, onClick }) => {
  return (
     <Chip
         icon={icon}
         label={title}
         onClick={onClick}
         sx={{
           // Base styling
           px: { xs: 1.8, md: 2.2 },
           py: { xs: 3, md: 3.5 },
           borderRadius: '24px',
           backgroundColor: isActive
             ? 'rgba(97, 20, 99, 0.04)'
             : 'rgba(255, 255, 255, 0.7)',
           backdropFilter: 'blur(12px)',
   
           // Border styling - gradient border for active state
           position: 'relative',
           border: isActive ? 'none' : '1px solid rgba(238, 238, 238, 0.8)',
           '&::before': isActive ? {
             content: '""',
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             borderRadius: '24px',
             padding: '2px',
             background: 'linear-gradient(45deg, #f7931e, #e44d26, #611463)',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             maskComposite: 'exclude',
             zIndex: 0,
           } : {},
   
           // Text styling
           color: isActive ? '#5D1277' : '#555',
   
           // Shadow effects
           boxShadow: isActive
             ? '0 8px 20px rgba(97, 20, 99, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
             : '0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
   
           // Icon styling
           '& .MuiChip-icon': {
             color: isActive ? '#f7931e' : '#611463',
             marginLeft: '10px',
             fontSize: '1.5rem',
             filter: isActive ? 'drop-shadow(0 2px 3px rgba(247, 147, 30, 0.3))' : 'none',
             transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
           },
   
           // Label styling
           '& .MuiChip-label': {
             padding: '8px 14px',
             fontSize: '0.95rem',
             letterSpacing: '0.02em',
             fontWeight: isActive ? 600 : 400,
             position: 'relative',
             zIndex: 1,
           },
   
           // Hover effects
           '&:hover': {
             backgroundColor: isActive
               ? 'rgba(97, 20, 99, 0.08)'
               : 'rgba(97, 20, 99, 0.02)',
             boxShadow: '0 10px 25px rgba(97, 20, 99, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
             transform: 'translateY(-3px) scale(1.02)',
             cursor: 'pointer',
             '& .MuiChip-icon': {
               transform: 'scale(1.15) rotate(-5deg)',
               color: isActive ? '#f7931e' : '#8E24AA',
             },
           },
   
           // Animation properties
           transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
           height: 'auto',
           m: 1,
   
           // Active state special glow effect
           '&::after': isActive ? {
             content: '""',
             position: 'absolute',
             top: '-2px',
             left: '-2px',
             right: '-2px',
             bottom: '-2px',
             borderRadius: '26px',
             background: 'linear-gradient(45deg, rgba(247, 147, 30, 0.4), rgba(97, 20, 99, 0.4))',
             filter: 'blur(8px)',
             opacity: 0.4,
             zIndex: -1,
           } : {},
         }}
       />
     );
   };
   
const HomeCareServices = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState([]);

  // Service categories data with categoryType for filtering
  const serviceCategories = [
    { id: 1, title: 'Cleaning', icon: <CleaningServicesIcon />, categoryType: 'cleaning' },
    { id: 2, title: 'Electrical', icon: <ElectricalServicesIcon />, categoryType: 'electrical' },
    { id: 3, title: 'AC Repair', icon: <AcUnitIcon />, categoryType: 'ac' },
    { id: 4, title: 'Plumbing', icon: <PlumbingIcon />, categoryType: 'plumbing' },
    { id: 5, title: 'Moving', icon: <LocalShippingIcon />, categoryType: 'moving' },
    { id: 6, title: 'Bathroom', icon: <WcIcon />, categoryType: 'bathroom' },
    { id: 7, title: 'Pest Control', icon: <PestControlIcon />, categoryType: 'pest' },
  ];

  // Enhanced mock service providers data with additional fields
  const serviceProviders = [
    { 
      id: 1, 
      name: 'ອຳມະລິນ', 
      surname: 'ອຸນາລົມ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ', 
      price: 250000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'cleaning',
      category: 'ແມ່ບ້ານ',
      gender: 'ຍິງ',
      age: 21,
      village: 'ບ້ານ ໂນນສະຫວ່າງ',
      city: 'ວຽງຈັນ',
    },
    { 
      id: 2, 
      name: 'ສົມພອນ', 
      surname: 'ພົມມະວົງ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ', 
      price: 100000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'electrical',
      category: 'ຊ່າງໄຟຟ້າ',
      gender: 'ຊາຍ',
      age: 35,
      village: 'ບ້ານ ຊຽງຢືນ',
      city: 'ວຽງຈັນ',
    },
    { 
      id: 3, 
      name: 'ວິໄລ', 
      surname: 'ແກ້ວມະນີ',
      location: 'ເມືອງວັງວຽງກາງ, ຊີສັດຕະນາກ', 
      price: 150000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'ac',
      category: 'ຊ່າງແອ',
      gender: 'ຊາຍ',
      age: 28,
      village: 'ບ້ານ ທົ່ງສາງ',
      city: 'ຊີສັດຕະນາກ',
    },
    { 
      id: 4, 
      name: 'ບຸນມີ', 
      surname: 'ສິນທະວົງ',
      location: 'ເມືອງວັງວຽງກາງ, ຊີສັດຕະນາກ', 
      price: 200000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'plumbing',
      category: 'ຊ່າງປະປາ',
      gender: 'ຊາຍ',
      age: 40,
      village: 'ບ້ານ ຫ້ວຍຮັງ',
      city: 'ຊີສັດຕະນາກ',
    },
    { 
      id: 5, 
      name: 'ນາງ ວັນນະສອນ', 
      surname: 'ພູທອງ',
      location: 'ເມືອງຫຼວງ, ໂຮງໝໍ', 
      price: 300000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'moving',
      category: 'ຂົນສົ່ງ',
      gender: 'ຍິງ',
      age: 32,
      village: 'ບ້ານ ນາດີ',
      city: 'ເມືອງຫຼວງ',
    },
    { 
      id: 6, 
      name: 'ສົມຈິດ', 
      surname: 'ແກ້ວສະຫວັນ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ', 
      price: 200000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'bathroom',
      category: 'ຊ່າງຫ້ອງນ້ຳ',
      gender: 'ຊາຍ',
      age: 45,
      village: 'ບ້ານ ຂອນແກ່ນ',
      city: 'ປາກເຊ',
    },
    { 
      id: 7, 
      name: 'ພອນສາ', 
      surname: 'ແກ້ວມະນີ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ', 
      price: 100000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'pest',
      category: 'ກຳຈັດສັດຕູພືດ',
      gender: 'ຊາຍ',
      age: 38,
      village: 'ບ້ານ ຈອມແກ້ວ',
      city: 'ປາກເຊ',
    },
    { 
      id: 8, 
      name: 'ນາງ ສຸລິຍາ', 
      surname: 'ພົມມະຈັນ',
      location: 'ເມືອງວັງວຽງກາງ, ຊີສັດຕະນາກ', 
      price: 150000, 
      imageUrl: '/api/placeholder/400/300', 
      rating: 5,
      categoryType: 'cleaning',
      category: 'ແມ່ບ້ານ',
      gender: 'ຍິງ',
      age: 25,
      village: 'ບ້ານ ຫນອງໄຮ',
      city: 'ວັງວຽງ',
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      setFilteredProviders(serviceProviders); // Initially show all providers
    }, 1000);
  }, []);

  const handleCategoryClick = (categoryId) => {
    const selectedCategory = serviceCategories.find(cat => cat.id === categoryId);
    
    if (activeCategory === categoryId) {
      // If clicking the same category, clear filter
      setActiveCategory(null);
      setFilteredProviders(serviceProviders);
    } else {
      // Set active category and filter
      setActiveCategory(categoryId);
      
      if (selectedCategory.categoryType === 'all') {
        setFilteredProviders(serviceProviders); // Show all
      } else {
        // Filter by category type
        const filtered = serviceProviders.filter(
          provider => provider.categoryType === selectedCategory.categoryType
        );
        setFilteredProviders(filtered);
      }
    }
  };

  return (
    <Box sx={{
      minHeight: "auto",
      py: 7,
      px: { xs: 2, md: 4 },
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }
    }}>
      {/* Service Categories Section - More compact design */}
      <Box sx={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(97, 20, 99, 0.03) 0%, rgba(153, 50, 204, 0.03) 100%)",
              top: -200,
              right: -200,
              filter: "blur(80px)",
              animation: "float 15s ease-in-out infinite alternate",
              "@keyframes float": {
                "0%": { transform: "translateY(0) rotate(0deg)" },
                "100%": { transform: "translateY(20px) rotate(5deg)" }
              }
            }} />
      
            {/* Service Categories Section - Creative design */}
            <Box sx={{
              mb: 6,
              position: "relative",
              zIndex: 1
            }}>
              {/* Creative decorative element */}
              <Box sx={{
                position: "absolute",
                top: -35,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 10,
                display: "flex",
                justifyContent: "space-between"
              }}>
                {[...Array(5)].map((_, i) => (
                  <Box key={i} sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, #611463 ${i * 20}%, #9932CC ${100 - i * 20}%)`,
                    transform: `scale(${1 - i * 0.15})`,
                    opacity: 0.7,
                    animation: "pulse 3s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                    "@keyframes pulse": {
                      "0%": { transform: `scale(${1 - i * 0.15})` },
                      "50%": { transform: `scale(${1 - i * 0.15 + 0.1})` },
                      "100%": { transform: `scale(${1 - i * 0.15})` }
                    }
                  }} />
                ))}
              </Box>
      
              <Typography
                variant="h4"
                textAlign="center"
                sx={{
                  mb: 3.5,
                  fontWeight: 'bold',
                  background: "linear-gradient(135deg, #611463 30%, #9932CC 90%)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  letterSpacing: "-0.5px",
                  position: "relative",
                  animation: "shimmer 6s ease-in-out infinite",
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: "0% 0%" },
                    "50%": { backgroundPosition: "100% 100%" },
                    "100%": { backgroundPosition: "0% 0%" }
                  },
                  textShadow: "0 10px 20px rgba(97, 20, 99, 0.1)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -15,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 2,
                    background: "linear-gradient(90deg, transparent 0%, #9932CC 50%, transparent 100%)"
                  }
                }}
              >
                HomeCare's Services
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  mx: 'auto',
                  maxWidth: 900,
      
                  // Enhanced border styling
                  border: 'none',
                  borderRadius: '16px',
                  position: 'relative',
      
                  // Glass effect background
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(15px)',
      
                  // Advanced shadow
                  boxShadow: '0 15px 35px rgba(97, 20, 99, 0.07), 0 5px 15px rgba(0, 0, 0, 0.03)',
      
                  // Decorative elements
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, #611463, #f7931e, #9932CC, #611463)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientBorder 8s ease infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: 0.8,
                  },
      
                  // Corner accent
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    width: 80,
                    height: 80,
                    borderRadius: '0 16px 0 80px',
                    background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.12), rgba(247, 147, 30, 0.08))',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  },
      
                  // Inner light reflection
                  '& > div:first-of-type::before': {
                    content: '""',
                    position: 'absolute',
                    top: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    opacity: 0.6,
                    transform: 'rotate(-45deg)',
                    pointerEvents: 'none',
                  },
                }}
              >
          {serviceCategories.map((category) => (
            <ServiceCategoryChip
              key={category.id}
              icon={category.icon}
              title={category.title}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </Paper>
      </Box>
      
       {/* Divider */}
            <Box
              sx={{
                borderBottom: '1px solid #e0e0e0',
                width: '100%',
                my: 4
              }}
            />
      
            {/* Services Section with Filter Result Title */}
            <Box sx={{
              mb: 6,
              position: 'relative',
              perspective: '1000px',
      
              // Floating decorative elements
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.6), rgba(97, 20, 99, 0))',
                borderRadius: '50%',
                filter: 'blur(15px)',
                top: '-20px',
                left: '5%',
                animation: 'floatElement 6s ease-in-out infinite alternate',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.4), rgba(247, 147, 30, 0))',
                borderRadius: '50%',
                filter: 'blur(20px)',
                bottom: '-30px',
                right: '8%',
                animation: 'floatElement 8s ease-in-out infinite alternate-reverse',
                zIndex: 0,
              },
      
              // Animation keyframes
              '@keyframes floatElement': {
                '0%': { transform: 'translateY(0px) rotate(0deg)' },
                '100%': { transform: 'translateY(20px) rotate(10deg)' },
              },
              '@keyframes glowPulse': {
                '0%': { opacity: 0.7 },
                '50%': { opacity: 0.3 },
                '100%': { opacity: 0.7 },
              },
              '@keyframes rotateGradient': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              }
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                position: 'relative',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                p: { xs: 2.5, md: 3 },
      
                // 3D effect container
                transform: 'rotateX(2deg)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      
                // Glass effect styling
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 10px 25px rgba(97, 20, 99, 0.08), 0 2px 10px rgba(247, 147, 30, 0.05)',
      
      
                // Background texture
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '16px',
                  background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23611463\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.5,
                  zIndex: -1,
                },
      
                // Accent stripe
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #611463, #f7931e, #9932CC)',
                  borderRadius: '16px 16px 0 0',
                  zIndex: 2,
                },
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  {/* Animated icon */}
                  <Box sx={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    mr: 2,
                    background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.1), rgba(97, 20, 99, 0.03))',
                    boxShadow: '0 4px 8px rgba(97, 20, 99, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(45deg, rgba(97, 20, 99, 0.3), rgba(247, 147, 30, 0.3))',
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      animation: 'glowPulse 3s infinite ease-in-out',
                      opacity: 0.5,
                    },
                    '& svg': {
                      fontSize: '1.5rem',
                      color: '#611463',
                      position: 'relative',
                      zIndex: 2,
                    }
                  }}>
                    {/* Icon would go here - placeholder */}
                    <img
                      src="/public/IconHomeCare.svg"
                      alt="HomeCare Icon"
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain',
                        filter: activeCategory ? 'drop-shadow(0 2px 4px rgba(247, 147, 30, 0.4))' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
      
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      position: 'relative',
                      color: '#611463',
                      textShadow: '0 2px 10px rgba(97, 20, 99, 0.1)',
                      letterSpacing: '0.5px',
                      // Animated title text
                      background: activeCategory ?
                        'linear-gradient(90deg, #611463, #9932CC)' :
                        'linear-gradient(90deg, #611463, #611463)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      // Underline effect
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: '60%',
                        height: 3,
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #611463, rgba(247, 147, 30, 0.5))',
                        transition: 'all 0.5s ease',
                        className: 'title-underline',
                      },
                    }}
                  >
                    {activeCategory ?
                      `${serviceCategories.find(cat => cat.id === activeCategory)?.title} Services` :
                      'All Services'}
                  </Typography>
                </Box>
      
                {activeCategory && (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => {
                      setActiveCategory(null);
                      setFilteredProviders(serviceProviders);
                    }}
                    sx={{
                      background: 'rgba(97, 20, 99, 0.04)',
                      color: '#611463',
                      borderRadius: '30px',
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      boxShadow: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      border: '1px solid rgba(97, 20, 99, 0.1)',
      
                      // Button background hover effect
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, #611463, #9932CC)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: 0,
                      },
      
                      // Text and icon container
                      '& .MuiButton-startIcon': {
                        marginRight: '8px',
                        position: 'relative',
                        zIndex: 1,
                      },
      
                      // Button label
                      '& .MuiButton-label': {
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s ease',
                      },
      
                      // Hover effects
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 10px 20px rgba(97, 20, 99, 0.15)',
      
                        '&::before': {
                          opacity: 1,
                        },
                        color: 'white',
                      }
                    }}
                    startIcon={<span style={{ fontSize: '0.8rem' }}>×</span>}
                  >
                    Show All
                  </Button>
                )}
              </Box>
        
        {loading ? (
          <Grid container spacing={3} sx={{ px: { xs: 1, md: 2 } }}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="rectangular" height={160} sx={{ borderRadius: '8px 8px 0 0' }} />
                  <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={36} sx={{ mt: 1, borderRadius: 1 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {filteredProviders.length > 0 ? (
              <Grid container spacing={3} sx={{ px: { xs: 1, md: 2 } }}>
                {filteredProviders.map((provider) => (
                  <Grid item xs={12} sm={6} md={3} key={provider.id}>
                    <ServiceProviderCard 
                      id={provider.id}
                      name={provider.name}
                      surname={provider.surname}
                      location={provider.location}
                      price={provider.price}
                      imageUrl={provider.imageUrl}
                      rating={provider.rating}
                      category={provider.category}
                      gender={provider.gender}
                      age={provider.age}
                      village={provider.village}
                      city={provider.city}
                      service={provider.service}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No services found in this category.
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => {
                    setActiveCategory(null);
                    setFilteredProviders(serviceProviders);
                  }}
                  sx={{ 
                    mt: 2,
                    bgcolor: '#611463', 
                    '&:hover': { bgcolor: '#611463' }
                  }}
                >
                  Show All Services
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomeCareServices;