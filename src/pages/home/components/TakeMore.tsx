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
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';

// Define the enhanced service provider card component
const ServiceProviderCard = ({ id, name, surname, location, price, imageUrl, rating, category, gender, age, village, city, service }) => {
  // Format price to have commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Kip";
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
            <WorkIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
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
        px: 1,
        py: 2.5,
        borderRadius: 50,  // Updated to rounded style
        bgcolor: isActive ? 'rgba(93, 18, 119, 0.1)' : 'white',
        border: isActive ? '2px solid #f7931e' : '1px solid #eee',
        color: '#611463',
        '& .MuiChip-icon': { 
          color: '#611463',
          marginLeft: '8px',
          fontSize: '1.2rem'
        },
        '&:hover': {
          bgcolor: 'rgba(93, 18, 119, 0.05)',
          cursor: 'pointer'
        },
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.3s ease',
        height: 'auto',
        m: 0.5
      }}
    />
  );
};

const HomeCareServices = () => {
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
      service: 'ດູດຝຸ່ນ, ທຳຄວາມສະອາດ'
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
      service: 'ຕິດຕັ້ງອຸປະກອນໄຟຟ້າ'
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
      service: 'ສ້ອມແປງແອໃນບ້ານ'
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
      service: 'ແກ້ໄຂລະບົບນ້ຳປະປາ'
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
      service: 'ຂົນສົ່ງເຄື່ອງຫຍ້າຍບ້ານ'
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
      service: 'ສ້ອມແປງຫ້ອງນ້ຳ'
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
      service: 'ກຳຈັດແມງໄມ້, ຫນູ'
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
      service: 'ທຳຄວາມສະອາດທົ່ວໄປ'
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
    <Box sx={{ minHeight: "auto", py: 5, px: { xs: 2, md: 4 } }}>
      {/* Service Categories Section - More compact design */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          textAlign="center" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            color: '#611463'
          }}
        >
          HomeCare's Service
        </Typography>
        
        <Paper 
          elevation={0}
          sx={{ 
            p: 2, 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            
            border: '1px solid #eee',
            borderRadius: 2,
            mx: 'auto',
            maxWidth: 900
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
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              ml: { xs: 0, md: 1 }
            }}
          >
            {activeCategory ? 
              `${serviceCategories.find(cat => cat.id === activeCategory)?.title} Services` : 
              'Top Services'}
          </Typography>
          
          {activeCategory && (
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => {
                setActiveCategory(null);
                setFilteredProviders(serviceProviders);
              }}
              sx={{ 
                color: '#611463', 
                borderColor: '#611463',
                '&:hover': { borderColor: '#f7931e' }
              }}
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