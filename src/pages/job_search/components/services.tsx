import { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography, Grid, Paper } from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WcIcon from '@mui/icons-material/Wc';
import PestControlIcon from '@mui/icons-material/PestControl';
import CategoryIcon from '@mui/icons-material/Category';

// Import the separated components
import ServiceProviderCard from "./ServiceProviderCard";
import ServiceCategoryChip from "./ServiceCategoryChip";
import { styles } from "./ServiceStyles";
import useMainController from "../controllers";
import { EmployeeModel } from "../../../models/employee";
import { CarModel } from "../../../models/car";

// Define types
interface ServiceCategory {
  id: string;
  title: string;
  icon: JSX.Element;
  categoryType: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  surname: string;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  gender: string;
  address: string;
  city: string;
  categoryType: string;
  cat_id: number; // Added category ID
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
}

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  
  // Get data from controller
  const ctrl = useMainController();

  // Define service categories
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'all',
      title: 'ທັງໝົດ',
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

  // Helper function to find car for a specific employee
  const findCarForEmployee = (employeeId: string, cars: CarModel[]): CarModel | undefined => {
    // Debug car data
    console.log("Finding car for employee ID:", employeeId);
    console.log("Available cars:", cars);
    
    // Check for type mismatches and cast if needed
    const car = cars.find(car => String(car.emp_id) === String(employeeId));
    console.log("Found car:", car);
    return car;
  };

  // Map the API data to format expected by ServiceProviderCard
  const mapEmployeeToServiceProvider = (employee: EmployeeModel): ServiceProvider => {
    // Convert cat_name to lowercase and simplify for categoryType
    const getCategoryType = (catName: string | undefined): string => {
      // Convert to lowercase and remove spaces for comparison
      const normalizedName = (catName || '').toLowerCase();
      
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

    // Extract village from address
    let village = 'N/A';
    
    if (employee.address && typeof employee.address === 'string' && employee.address.trim() !== '') {
      // Just extract the village/address part
      village = employee.address.split(',')[0]?.trim() || employee.address;
    }

    // Find the car if employee has category_id 5 and car data is available
    let carData: CarModel | undefined;
    
    if (employee.cat_id === 5 && ctrl?.car && ctrl.car.length > 0) {
      console.log(`Checking car data for employee ${employee.id} with cat_id ${employee.cat_id}`);
      carData = findCarForEmployee(employee.id, ctrl.car);
      
      // If no car found but we're in debug mode, create a fallback for testing
      if (!carData) {
        console.log("No car found for employee, creating temporary placeholder");
        // This is just a temporary debug fallback to verify rendering works
        carData = {
          id: `debug-car-${employee.id}`,
          emp_id: employee.id,
          car_brand: "Toyota",
          model: "Placeholder",
          license_plate: `TEST-${employee.id}`,
          car_image: "/api/placeholder/400/300",
          created_at: "",
          updated_at: ""
        };
      }
    }

    const result: ServiceProvider = {
      id: employee.id,
      name: employee.first_name,
      surname: employee.last_name,
      location: employee.address,
      price: parseFloat(employee.price?.toString() || '0'),
      imageUrl: employee.avatar,
      rating: 5, // Default rating
      category: employee.cat_name,
      gender: employee.gender,
      address: village, 
      city: employee.city || 'ວຽງຈັນ',
      categoryType: categoryType,
      cat_id: employee.cat_id, // Add the category ID for car display logic
    };

    // Add car details if available
    if (carData) {
      result.carId = carData.id;
      result.carBrand = carData.car_brand;
      result.carModel = carData.model;
      result.licensePlate = carData.license_plate;
    }

    return result;
  };

  useEffect(() => {
    if (!ctrl?.loading && ctrl?.data && ctrl?.data.length > 0) {
      // Debug car data in ctrl
      console.log("Controller car data:", ctrl?.car);
      
      // Map the API data to the format expected by your UI
      const mappedProviders = ctrl.data.map(employee => {
        console.log("Mapping employee with ID:", employee.id, "and cat_id:", employee.cat_id);
        return mapEmployeeToServiceProvider(employee);
      });
      
      console.log("Mapped service providers:", mappedProviders);
      setFilteredProviders(mappedProviders);
    }
  }, [ctrl?.loading, ctrl?.data, ctrl?.car]);

  const handleCategoryClick = (categoryId: string) => {
    const selectedCategory = serviceCategories.find(cat => cat.id === categoryId);

    if (activeCategory === categoryId) {
      // If clicking the same category, clear filter
      setActiveCategory(null);
      if (ctrl?.data && ctrl?.data.length > 0) {
        setFilteredProviders(ctrl.data.map(mapEmployeeToServiceProvider));
      }
    } else {
      // Set active category and filter
      setActiveCategory(categoryId);

      if (selectedCategory && selectedCategory.categoryType === 'all') {
        if (ctrl?.data && ctrl?.data.length > 0) {
          setFilteredProviders(ctrl.data.map(mapEmployeeToServiceProvider)); // Show all
        }
      } else if (selectedCategory) {
        // Filter by category type
        const categoryType = selectedCategory.categoryType;
        
        // Filter employees by category type derived from cat_name
        if (ctrl?.data && ctrl?.data.length > 0) {
          const filtered = ctrl.data
            .filter(employee => {
              // Use the same getCategoryType function to get the category type from cat_name
              const getCategoryType = (catName: string | undefined): string => {
                // Convert to lowercase and remove spaces for comparison
                const normalizedName = (catName || '').toLowerCase();
                
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
                src="/IconHomeCare.svg"
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
                if (ctrl?.data && ctrl?.data.length > 0) {
                  setFilteredProviders(ctrl.data.map(mapEmployeeToServiceProvider));
                }
              }}
              sx={styles.showAllButton}
              startIcon={<span style={{ fontSize: '0.8rem' }}>×</span>}
            >
              ເບິ່ງທັງໝົດ
            </Button>
          )}
        </Box>

        {ctrl?.loading ? (
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
                      price={provider.price}
                      imageUrl={provider.imageUrl}
                      rating={provider.rating}
                      category={provider.category}
                      gender={provider.gender}
                      address={provider.address}
                      city={provider.city}
                      cat_id={provider.cat_id}
                      carId={provider.carId}
                      carBrand={provider.carBrand}
                      carModel={provider.carModel}
                      licensePlate={provider.licensePlate}
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
                    if (ctrl?.data && ctrl?.data.length > 0) {
                      setFilteredProviders(ctrl.data.map(mapEmployeeToServiceProvider));
                    }
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