import React, { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography, Grid, Paper } from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WcIcon from '@mui/icons-material/Wc';
import PestControlIcon from '@mui/icons-material/PestControl';
import { useNavigate } from "react-router-dom";
import ads from "../../../assets/icons/HomeCareAds.png";

// Import the separated components
import ServiceProviderCard from "./ServiceProviderCard";
import ServiceCategoryChip from "./ServiceCategoryChip";
import { styles } from "./ServiceStyles";

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState([]);

  // Service categories data with categoryType for filtering
  const serviceCategories = [
    { id: 1, title: 'ທຳຄວາມສະອາດ', icon: <CleaningServicesIcon />, categoryType: 'cleaning' },
    { id: 2, title: 'ສ້ອມແປງໄຟຟ້າ', icon: <ElectricalServicesIcon />, categoryType: 'electrical' },
    { id: 3, title: 'ສ້ອມແປງແອ', icon: <AcUnitIcon />, categoryType: 'ac' },
    { id: 4, title: 'ສ້ອມແປງນ້ຳປະປາ', icon: <PlumbingIcon />, categoryType: 'plumbing' },
    { id: 5, title: 'ແກ່ເຄື່ອງ', icon: <LocalShippingIcon />, categoryType: 'moving' },
    { id: 6, title: 'ດູດສ້ວມ', icon: <WcIcon />, categoryType: 'bathroom' },
    { id: 7, title: 'ກຳຈັດປວກ', icon: <PestControlIcon />, categoryType: 'pest' },
  ];

  // Enhanced mock service providers data with car information for moving and bathroom services
  const serviceProviders = [
    {
      id: 1,
      name: 'ອຳມະລິນ',
      surname: 'ອຸນາລົມ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ',
      price: 250000,
      imageUrl: {ads},
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
      rating: 4,
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
      // Car information for moving service
      carId: 'M001',
      carBrand: 'Toyota',
      carModel: 'Hiace',
      licensePlate: 'ກຂ 1234',
      carImageUrl: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'ສົມຈິດ',
      surname: 'ແກ້ວສະຫວັນ',
      location: 'ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ',
      price: 200000,
      imageUrl: '/api/placeholder/400/300',
      rating: 3,
      categoryType: 'bathroom',
      category: 'ຊ່າງຫ້ອງນ້ຳ',
      gender: 'ຊາຍ',
      age: 45,
      village: 'ບ້ານ ຂອນແກ່ນ',
      city: 'ປາກເຊ',
      // Car information for bathroom service
      carId: 'B002',
      carBrand: 'Isuzu',
      carModel: 'D-Max',
      licensePlate: 'ຄງ 5678',
      carImageUrl: '/api/placeholder/400/300'
    },
    {
      id: 7,
      name: 'ພອນສະຫວັນ',
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
      rating: 4,
      categoryType: 'cleaning',
      category: 'ທຳຄວາມສະອາດ',
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
    <Box sx={styles.mainContainer}>
      {/* Floating decorative elements */}
      <Box sx={styles.floatingDecorativeElement} />

      {/* Service Categories Section */}
      <Box sx={styles.categoriesSection}>
        {/* Creative decorative element */}
        <Box sx={styles.decorativeDotsContainer}>
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{
              ...styles.decorativeDot,
              transform: `scale(${1 - i * 0.15})`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </Box>

        <Typography variant="h4" textAlign="center" sx={styles.sectionTitle}>
          ປະເພດການບໍລິການ
        </Typography>
        
        <Paper elevation={0} sx={styles.categoriesContainer}>
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
      <Box sx={styles.divider} />

      {/* Services Section with Filter Result Title */}
      <Box sx={styles.servicesSection}>
        <Box sx={styles.filterResultsContainer}>
          <Box sx={styles.filterTitleContainer}>
            {/* Icon container */}
            <Box sx={styles.iconContainer}>
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

            <Typography variant="h5" sx={styles.filterTitle}>
              {activeCategory ?
                `${serviceCategories.find(cat => cat.id === activeCategory)?.title}...` :
                'ການບໍລິການທັງໝົດ'}
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
              sx={styles.showAllButton}
              startIcon={<span style={{ fontSize: '0.8rem' }}>×</span>}
            >
              ເບິ່ງທັງໝົດ
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
                      {...provider} // Pass all provider properties
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
                  ການບໍລິການທັງໝົດ
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Services;