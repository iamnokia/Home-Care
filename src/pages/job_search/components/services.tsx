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
import CategoryIcon from '@mui/icons-material/Category';

// Import the separated components
import ServiceProviderCard from "./ServiceProviderCard";
import ServiceCategoryChip from "./ServiceCategoryChip";
import { styles } from "./ServiceStyles";
import useMainController from "../controllers";

const Services = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState([]);
  
  // Get data from controller
  const { loading, data } = useMainController();

  // Define service categories
  const serviceCategories = [
    {
      id: 'all',
      title: 'ທັງຫມົດ',
      icon: <CategoryIcon />,
      categoryType: 'all'
    },
    {
      id: 'cleaning',
      title: 'ທຳຄວາມສະອາດ',
      icon: <CleaningServicesIcon />,
      categoryType: 'cleaning'
    },
    {
      id: 'electrical',
      title: 'ສ້ອມແປງໄຟຟ້າ',
      icon: <ElectricalServicesIcon />,
      categoryType: 'electrical'
    },
    {
      id: 'aircon',
      title: 'ສ້ອມແປງແອອາກາດ',
      icon: <AcUnitIcon />,
      categoryType: 'aircon'
    },
    {
      id: 'plumbing',
      title: 'ສ້ອມແປງປະປາ',
      icon: <PlumbingIcon />,
      categoryType: 'plumbing'
    },
    {
      id: 'moving',
      title: 'ແກ່ເຄື່ອງ',
      icon: <LocalShippingIcon />,
      categoryType: 'moving'
    },
    {
      id: 'bathroom',
      title: 'ດູດສ້ວມ',
      icon: <WcIcon />,
      categoryType: 'bathroom'
    },
    {
      id: 'pest',
      title: 'ກຳຈັດປວກ',
      icon: <PestControlIcon />,
      categoryType: 'pest'
    },
  ];

  // Map the API data to format expected by ServiceProviderCard
  const mapEmployeeToServiceProvider = (employee) => {
    // Convert cat_name to lowercase and simplify for categoryType
    // This assumes cat_name from API matches our service categories
    const getCategoryType = (catName) => {
      // Convert to lowercase and remove spaces for comparison
      const normalizedName = catName.toLowerCase();
      
      if (normalizedName.includes('cleaning') || normalizedName.includes('ທຳຄວາມສະອາດ')) return 'cleaning';
      if (normalizedName.includes('electrical') || normalizedName.includes('ໄຟຟ້າ')) return 'electrical';
      if (normalizedName.includes('aircon') || normalizedName.includes('air') || normalizedName.includes('ແອ')) return 'aircon';
      if (normalizedName.includes('plumbing') || normalizedName.includes('ປະປາ')) return 'plumbing';
      if (normalizedName.includes('moving') || normalizedName.includes('ຂົນສົ່ງ')) return 'moving';
      if (normalizedName.includes('bathroom') || normalizedName.includes('ຫ້ອງນ້ຳ')) return 'bathroom';
      if (normalizedName.includes('pest') || normalizedName.includes('ກຳຈັດແມງໄມ້')) return 'pest';
      return 'other';
    };

    // Get category type from cat_name
    const categoryType = getCategoryType(employee.cat_name);

    // Parse address to extract village and city
    // Assuming address format is "Village, City"
    const addressParts = (employee.address || '').split(',');
    const address = addressParts[0]?.trim() || 'N/A';
    const city = addressParts[1]?.trim() || 'N/A';

    // Determine if this is a car-based service (moving or bathroom)
    const isCarService = categoryType === 'moving' || categoryType === 'bathroom';

    return {
      id: employee.id,
      name: employee.first_name,
      surname: employee.last_name,
      location: employee.address,
      price: parseFloat(employee.price || 0),
      imageUrl: employee.avatar,
      rating: 5, // Default rating or could be added to your employee model
      category: employee.cat_name, // Use cat_name directly
      gender: employee.gender,
      age: 30, // This is missing from your model, you might want to add it
      address: address,
      city: city,
      categoryType: categoryType,
      // Car details for moving and bathroom categories
      // These fields would need to be added to your data model
      carId: isCarService ? `C${employee.id}` : undefined,
      carBrand: isCarService ? 'Toyota' : undefined, // Default or from your data
      carModel: isCarService ? 'Hilux' : undefined, // Default or from your data
      licensePlate: isCarService ? 'ກຂ-' + employee.id : undefined,
      carImageUrl: isCarService ? '/api/placeholder/400/300' : undefined
    };
  };

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      // Map the API data to the format expected by your UI
      const mappedProviders = data.map(mapEmployeeToServiceProvider);
      setFilteredProviders(mappedProviders);
    }
  }, [loading, data]);

  const handleCategoryClick = (categoryId) => {
    const selectedCategory = serviceCategories.find(cat => cat.id === categoryId);

    if (activeCategory === categoryId) {
      // If clicking the same category, clear filter
      setActiveCategory(null);
      setFilteredProviders(data.map(mapEmployeeToServiceProvider));
    } else {
      // Set active category and filter
      setActiveCategory(categoryId);

      if (selectedCategory.categoryType === 'all') {
        setFilteredProviders(data.map(mapEmployeeToServiceProvider)); // Show all
      } else {
        // Filter by category type
        const categoryType = selectedCategory.categoryType;
        
        // Filter employees by category type derived from cat_name
        const filtered = data
          .filter(employee => {
            // Use the same getCategoryType function to get the category type from cat_name
            const getCategoryType = (catName) => {
              // Convert to lowercase and remove spaces for comparison
              const normalizedName = catName.toLowerCase();
              
              if (normalizedName.includes('cleaning') || normalizedName.includes('ທຳຄວາມສະອາດ')) return 'cleaning';
              if (normalizedName.includes('electrical') || normalizedName.includes('ໄຟຟ້າ')) return 'electrical';
              if (normalizedName.includes('aircon') || normalizedName.includes('air') || normalizedName.includes('ແອ')) return 'aircon';
              if (normalizedName.includes('plumbing') || normalizedName.includes('ປະປາ')) return 'plumbing';
              if (normalizedName.includes('moving') || normalizedName.includes('ຂົນສົ່ງ')) return 'moving';
              if (normalizedName.includes('bathroom') || normalizedName.includes('ຫ້ອງນ້ຳ')) return 'bathroom';
              if (normalizedName.includes('pest') || normalizedName.includes('ກຳຈັດແມງໄມ້')) return 'pest';
              return 'other';
            };
            
            const employeeCategoryType = getCategoryType(employee.cat_name);
            return employeeCategoryType === categoryType;
          })
          .map(mapEmployeeToServiceProvider);
          
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
                `${serviceCategories.find(cat => cat.id === activeCategory)?.title}` :
                'ທັງໝົດ'}
            </Typography>
          </Box>

          {activeCategory && (
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                setActiveCategory(null);
                setFilteredProviders(data.map(mapEmployeeToServiceProvider));
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
                    setFilteredProviders(data.map(mapEmployeeToServiceProvider));
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