import { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography, Grid, Paper, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
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
  categoryLao: string;
  gender: string;
  genderLao: string;
  address: string;
  city: string;
  cityLao: string;
  categoryType: string;
  cat_id: number;
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
}

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  
  // Get data from controller
  const ctrl = useMainController();

  // Translation mappings - English to Lao
  const categoryTranslation: Record<string, string> = {
    'cleaning': 'ທຳຄວາມສະອາດ',
    'electrical': 'ສ້ອມແປງໄຟຟ້າ',
    'aircon': 'ສ້ອມແປງແອອາກາດ',
    'air conditioning': 'ສ້ອມແປງແອອາກາດ',
    'plumbing': 'ສ້ອມແປງປະປາ',
    'moving': 'ແກ່ເຄື່ອງ',
    'transportation': 'ແກ່ເຄື່ອງ',
    'relocation': 'ແກ່ເຄື່ອງ',
    'bathroom': 'ດູດສ້ວມ',
    'toilet': 'ດູດສ້ວມ',
    'septic': 'ດູດສ້ວມ',
    'pest': 'ກຳຈັດປວກ',
    'pest control': 'ກຳຈັດປວກ',
    'extermination': 'ກຳຈັດປວກ',
    'house cleaning': 'ທຳຄວາມສະອາດ',
    'home cleaning': 'ທຳຄວາມສະອາດ',
    'electrical repair': 'ສ້ອມແປງໄຟຟ້າ',
    'electrical service': 'ສ້ອມແປງໄຟຟ້າ',
    'air conditioner repair': 'ສ້ອມແປງແອອາກາດ',
    'ac repair': 'ສ້ອມແປງແອອາກາດ',
    'plumbing repair': 'ສ້ອມແປງປະປາ',
    'water pipe repair': 'ສ້ອມແປງປະປາ',
    'moving service': 'ແກ່ເຄື່ອງ',
    'delivery': 'ແກ່ເຄື່ອງ',
    'septic cleaning': 'ດູດສ້ວມ',
    'sewage cleaning': 'ດູດສ້ວມ',
    'other': 'ອື່ນໆ',
    'general': 'ທົ່ວໄປ'
  };

  // Gender translation mapping
  const genderTranslation: Record<string, string> = {
    'male': 'ຊາຍ',
    'female': 'ຍິງ',
    'man': 'ຊາຍ',
    'woman': 'ຍິງ',
    'men': 'ຊາຍ',
    'women': 'ຍິງ',
    'boy': 'ຊາຍ',
    'girl': 'ຍິງ',
    'm': 'ຊາຍ',
    'f': 'ຍິງ',
    'other': 'ອື່ນໆ',
    'unknown': 'ບໍ່ລະບຸ'
  };

  // City translation mapping
  const cityTranslation: Record<string, string> = {
    'chanthabuly': 'ຈັນທະບູລີ',
    'chanthabouly': 'ຈັນທະບູລີ',
    'sikhottabong': 'ສີໂຄດຕະບອງ',
    'xaysetha': 'ໄຊເສດຖາ',
    'sisattanak': 'ສີສັດຕະນາກ',
    'naxaithong': 'ນາຊາຍທອງ',
    'xaytany': 'ໄຊທານີ',
    'hadxaifong': 'ຫາດຊາຍຟອງ',
    'vientiane': 'ວຽງຈັນ',
    'vientiane capital': 'ນະຄອນຫຼວງວຽງຈັນ'
  };

  // Translation functions
  const translateCategoryToLao = (englishCategory: string): string => {
    if (!englishCategory) return 'ອື່ນໆ';
    const normalizedCategory = englishCategory.toLowerCase().trim();
    if (categoryTranslation[normalizedCategory]) {
      return categoryTranslation[normalizedCategory];
    }
    for (const [key, value] of Object.entries(categoryTranslation)) {
      if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
        return value;
      }
    }
    return englishCategory || 'ອື່ນໆ';
  };

  const translateGenderToLao = (englishGender: string): string => {
    if (!englishGender) return 'ບໍ່ລະບຸ';
    const normalizedGender = englishGender.toLowerCase().trim();
    if (genderTranslation[normalizedGender]) {
      return genderTranslation[normalizedGender];
    }
    for (const [key, value] of Object.entries(genderTranslation)) {
      if (normalizedGender.includes(key) || key.includes(normalizedGender)) {
        return value;
      }
    }
    return englishGender || 'ບໍ່ລະບຸ';
  };

  const translateCityToLao = (englishCity: string): string => {
    if (!englishCity) return 'ວຽງຈັນ';
    const normalizedCity = englishCity.toLowerCase().trim();
    if (cityTranslation[normalizedCity]) {
      return cityTranslation[normalizedCity];
    }
    for (const [key, value] of Object.entries(cityTranslation)) {
      if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
        return value;
      }
    }
    return englishCity || 'ວຽງຈັນ';
  };

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
    console.log("Finding car for employee ID:", employeeId);
    console.log("Available cars:", cars);
    const car = cars.find(car => String(car.emp_id) === String(employeeId));
    console.log("Found car:", car);
    return car;
  };

  // Map the API data to format expected by ServiceProviderCard
  const mapEmployeeToServiceProvider = (employee: EmployeeModel): ServiceProvider => {
    const getCategoryType = (catName: string | undefined): string => {
      const normalizedName = (catName || '').toLowerCase();
      if (normalizedName.includes('cleaning') || normalizedName.includes('ທຳຄວາມສະອາດ')) return 'cleaning';
      if (normalizedName.includes('electrical') || normalizedName.includes('ໄຟຟ້າ')) return 'electrical';
      if (normalizedName.includes('aircon') || normalizedName.includes('air') || normalizedName.includes('ແອ')) return 'aircon';
      if (normalizedName.includes('plumbing') || normalizedName.includes('ປະປາ')) return 'plumbing';
      if (normalizedName.includes('moving') || normalizedName.includes('transport') || normalizedName.includes('ຂົນສົ່ງ')) return 'moving';
      if (normalizedName.includes('bathroom') || normalizedName.includes('toilet') || normalizedName.includes('septic') || normalizedName.includes('ຫ້ອງນ້ຳ')) return 'bathroom';
      if (normalizedName.includes('pest') || normalizedName.includes('ກຳຈັດແມງໄມ້')) return 'pest';
      return 'other';
    };

    const categoryType = getCategoryType(employee.cat_name);
    let village = 'N/A';
    
    if (employee.address && typeof employee.address === 'string' && employee.address.trim() !== '') {
      village = employee.address.split(',')[0]?.trim() || employee.address;
    }

    let carData: CarModel | undefined;
    if (employee.cat_id === 5 && ctrl?.car && ctrl.car.length > 0) {
      console.log(`Checking car data for employee ${employee.id} with cat_id ${employee.cat_id}`);
      carData = findCarForEmployee(employee.id, ctrl.car);
    }

    const actualRating = ctrl?.getEmployeeRating ? ctrl.getEmployeeRating(employee.id) : 5;
    console.log(`Employee ${employee.id} (${employee.first_name} ${employee.last_name}) rating: ${actualRating}`);

    const categoryLao = translateCategoryToLao(employee.cat_name);
    const genderLao = translateGenderToLao(employee.gender);
    const cityLao = translateCityToLao(employee.city);

    const result: ServiceProvider = {
      id: employee.id,
      name: employee.first_name,
      surname: employee.last_name,
      location: employee.address,
      price: parseFloat(employee.price?.toString() || '0'),
      imageUrl: employee.avatar,
      rating: actualRating,
      category: employee.cat_name,
      categoryLao: categoryLao,
      gender: employee.gender,
      genderLao: genderLao,
      address: village, 
      city: employee.city || 'ວຽງຈັນ',
      cityLao: cityLao,
      categoryType: categoryType,
      cat_id: employee.cat_id,
    };

    if (carData) {
      result.carId = carData.id;
      result.carBrand = carData.car_brand;
      result.carModel = carData.model;
      result.licensePlate = carData.license_plate;
    }

    return result;
  };

  // Search filter function
  const filterProviders = (providers: ServiceProvider[], query: string, categoryFilter: string | null): ServiceProvider[] => {
    let filtered = [...providers];

    if (categoryFilter && categoryFilter !== 'all') {
      const categoryType = serviceCategories.find(cat => cat.id === categoryFilter)?.categoryType;
      if (categoryType && categoryType !== 'all') {
        filtered = filtered.filter(provider => provider.categoryType === categoryType);
      }
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();
      filtered = filtered.filter(provider => {
        const searchableFields = [
          provider.name,
          provider.surname,
          provider.address,
          provider.gender,
          provider.genderLao,
          provider.category,
          provider.categoryLao,
          provider.price.toString(),
          provider.city,
          provider.cityLao,
          provider.carBrand,
          provider.carModel,
          provider.licensePlate,
        ];

        return searchableFields.some(field => 
          field?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    return filtered;
  };

  useEffect(() => {
    if (!ctrl?.loading && ctrl?.data && ctrl?.data.length > 0) {
      console.log("Controller car data:", ctrl?.car);
      console.log("Controller employee ratings:", ctrl?.employeeRatings);
      
      const mappedProviders = ctrl.data.map(employee => {
        console.log("Mapping employee with ID:", employee.id, "and cat_id:", employee.cat_id);
        return mapEmployeeToServiceProvider(employee);
      });
      
      console.log("Mapped service providers with Lao categories:", mappedProviders);
      setAllProviders(mappedProviders);
      
      const filtered = filterProviders(mappedProviders, searchQuery, activeCategory);
      setFilteredProviders(filtered);
    }
  }, [ctrl?.loading, ctrl?.data, ctrl?.car, ctrl?.employeeRatings]);

  useEffect(() => {
    const filtered = filterProviders(allProviders, searchQuery, activeCategory);
    setFilteredProviders(filtered);
  }, [searchQuery, activeCategory, allProviders]);

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Box sx={styles.mainContainer}>
      {/* Floating decorative elements */}
      <Box sx={styles.floatingDecorativeElement} />

      {/* Service Categories Section */}
      <Box sx={styles.categoriesSection}>
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

      {/* Search Section - Modern Design */}
      <Box sx={{ 
        mb: 4,
        mt:-2, 
        px: { xs: 1, md: 2 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -15,
            left: -15,
            right: -15,
            bottom: -15,
            borderRadius: '50px',
            background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.1), rgba(247, 147, 30, 0.1))',
            filter: 'blur(20px)',
            opacity: 0.6,
            zIndex: 0,
          }
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="ຄົ້ນຫາ..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #611463, #f7931e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                    boxShadow: '0 4px 15px rgba(97, 20, 99, 0.3)',
                  }}>
                    <SearchIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Box
                    onClick={handleClearSearch}
                    sx={{ 
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'rgba(97, 20, 99, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        background: '#611463',
                        transform: 'scale(1.1)',
                        '& .MuiSvgIcon-root': {
                          color: '#fff'
                        }
                      }
                    }}
                  >
                    <ClearIcon sx={{ color: '#611463', fontSize: '1.2rem', transition: 'color 0.3s ease' }} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              position: 'relative',
              zIndex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 2px 4px rgba(97, 20, 99, 0.08)',
                height: '60px',
                '& fieldset': {
                  border: '1px solid rgba(97, 20, 99, 0.1)',
                  transition: 'all 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: '#f7931e',
                  boxShadow: '0 0 0 1px rgba(247, 147, 30, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#611463',
                  borderWidth: '2px',
                  boxShadow: '0 0 0 3px rgba(97, 20, 99, 0.15)',
                },
              },
              '& .MuiInputBase-input': {
                padding: '12px 10px',
                fontSize: '1.1rem',
                color: '#611463',
                fontWeight: 500,
                '&::placeholder': {
                  opacity: 0.7,
                  color: '#611463',
                  fontWeight: 400,
                  fontSize: '1rem',
                },
              },
            }}
          />
          
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              bottom: '-24px',
              left: '20px',
              color: 'rgba(97, 20, 99, 0.6)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&::before': {
                content: '"✨"',
                fontSize: '0.8rem',
              }
            }}
          >
            ຄົ້ນຫາຕາມຊື່, ປະເພດບໍລິການ, ທີ່ຢູ່, ແລະອື່ນໆ...
          </Typography>
        </Box>
      </Box>

      {/* Services Section with Improved Layout */}
      <Box sx={styles.servicesSection}>
        <Box sx={styles.filterResultsContainer}>
          <Box sx={styles.filterTitleContainer}>
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
              }}
              sx={styles.showAllButton}
              startIcon={<span style={{ fontSize: '0.8rem' }}>×</span>}
            >
              ເບິ່ງທັງໝົດ
            </Button>
          )}
        </Box>

        {ctrl?.loading ? (
          <Box sx={{ 
            maxWidth: '1600px', 
            mx: 'auto', 
            px: { xs: 1, md: 2 } 
          }}>
            <Grid container spacing={2.5} justifyContent="center">
              {[...Array(6)].map((_, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={2} 
                  xl={2} 
                  key={index}
                  sx={{ 
                    maxWidth: { xs: '100%', sm: '280px' },
                    mx: 'auto'
                  }}
                >
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
          </Box>
        ) : (
          <>
            {filteredProviders.length > 0 ? (
              <Box sx={{ 
                maxWidth: '1600px', 
                mx: 'auto', 
                px: { xs: 1, md: 2 } 
              }}>
                <Grid container spacing={2.5} justifyContent="center">
                  {filteredProviders.map((provider) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={4} 
                      lg={2.4} 
                      xl={2} 
                      key={provider.id}
                      sx={{ 
                        maxWidth: { xs: '100%', sm: '280px' },
                        mx: 'auto'
                      }}
                    >
                      <ServiceProviderCard
                        id={provider.id}
                        name={provider.name}
                        surname={provider.surname}
                        price={provider.price}
                        imageUrl={provider.imageUrl}
                        rating={provider.rating}
                        category={provider.categoryLao}
                        gender={provider.genderLao}
                        address={provider.address}
                        city={provider.cityLao}
                        cat_id={provider.cat_id}
                        carId={provider.carId}
                        carBrand={provider.carBrand}
                        carModel={provider.carModel}
                        licensePlate={provider.licensePlate}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  {searchQuery 
                    ? `ບໍ່ພົບຜົນຄົ້ນຫາສຳລັບ "${searchQuery}"`
                    : "ບໍ່ພົບການບໍລິການໃນປະເພດນີ້."}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
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