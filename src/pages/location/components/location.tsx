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
  Divider,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Snackbar,
  Alert,
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

// City definitions with English and Lao names
const CITIES = [
  { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ', value: 'chanthabouly' },
  { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ', value: 'sikhottabong' },
  { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ', value: 'xaysetha' },
  { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ', value: 'sisattanak' },
  { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ', value: 'naxaithong' },
  { en: 'XAYTANY', lo: 'ໄຊທານີ', value: 'xaytany' },
  { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ', value: 'hadxaifong' }
];

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

// Gender translation mapping - English to Lao
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

// City translation mapping - English to Lao (Vientiane Districts)
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

// Helper function to normalize city names
const normalizeCityName = (cityName: string): string => {
  if (!cityName) return '';
  
  let normalized = cityName.toLowerCase().replace(/\s+/g, '');
  
  const cityMappings: { [key: string]: string } = {
    'chanthabuly': 'chanthabouly',
    'chanthabouly': 'chanthabouly',
    'ຈັນທະບູລີ': 'chanthabouly',
    'sikhottabong': 'sikhottabong', 
    'ສີໂຄດຕະບອງ': 'sikhottabong',
    'xaysetha': 'xaysetha',
    'ໄຊເສດຖາ': 'xaysetha',
    'sisattanak': 'sisattanak',
    'ສີສັດຕະນາກ': 'sisattanak',
    'naxaithong': 'naxaithong',
    'ນາຊາຍທອງ': 'naxaithong',
    'xaytany': 'xaytany',
    'ໄຊທານີ': 'xaytany',
    'hadxaifong': 'hadxaifong',
    'ຫາດຊາຍຟອງ': 'hadxaifong'
  };
  
  return cityMappings[normalized] || normalized;
};

// Distance fee calculation function
const calculateDistanceFee = (employeeCity: string, userCity: string): { fee: number; reason: string } => {
  if (!employeeCity || !userCity) {
    return { fee: 0, reason: 'ບໍ່ສາມາດກຳນົດທີ່ຕັ້ງໄດ້' };
  }

  const empCity = normalizeCityName(employeeCity);
  const usrCity = normalizeCityName(userCity);

  if (empCity === usrCity) {
    return { fee: 8000, reason: 'ທີ່ຕັ້ງດຽວກັນ - ຄ່າບໍລິການພື້ນຖານ' };
  }

  const distanceRules: { [key: string]: { [key: string]: number } } = {
    'chanthabouly': {
      'sikhottabong': 10000,
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'naxaithong': 15000,
      'hadxaifong': 15000
    },
    'sikhottabong': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'naxaithong': 15000,
      'xaysetha': 15000,
      'hadxaifong': 20000,
      'xaytany': 20000
    },
    'naxaithong': {
      'chanthabouly': 15000,
      'sikhottabong': 15000,
      'sisattanak': 20000,
      'xaysetha': 20000,
      'hadxaifong': 25000,
      'xaytany': 25000
    },
    'xaytany': {
      'chanthabouly': 15000,
      'xaysetha': 15000,
      'sisattanak': 20000,
      'hadxaifong': 20000,
      'naxaithong': 25000,
      'sikhottabong': 25000
    },
    'xaysetha': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'xaytany': 10000,
      'hadxaifong': 10000,
      'naxaithong': 15000,
      'sikhottabong': 15000
    },
    'hadxaifong': {
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'sikhottabong': 15000,
      'chanthabouly': 15000,
      'naxaithong': 25000
    },
    'sisattanak': {
      'sikhottabong': 10000,
      'chanthabouly': 10000,
      'xaysetha': 10000,
      'hadxaifong': 10000,
      'naxaithong': 20000,
      'xaytany': 20000
    }
  };

  const fee = distanceRules[empCity]?.[usrCity] || 0;
  
  let reason = '';
  if (fee === 0) {
    reason = 'ບໍ່ມີຂໍ້ມູນຄ່າໄລຍະທາງສຳລັບເສັ້ນທາງນີ້';
  } else if (fee === 8000) {
    reason = 'ທີ່ຕັ້ງດຽວກັນ - ຄ່າບໍລິການພື້ນຖານ';
  } else if (fee === 10000) {
    reason = 'ຄ່າໄລຍະທາງໃກ້ຄຽງ';
  } else if (fee === 15000) {
    reason = 'ຄ່າໄລຍະທາງປານກາງ';
  } else if (fee === 20000) {
    reason = 'ຄ່າໄລຍະທາງໄກ';
  } else if (fee === 25000) {
    reason = 'ຄ່າໄລຍະທາງໄກຫຼາຍ';
  }

  return { fee, reason };
};

// Define the Location interface with Lao translations
interface Location {
  id: string;
  firstName: string;
  surname: string;
  image: string;
  category: string;
  categoryLao: string;
  gender: string;
  genderLao: string;
  age: number;
  village: string;
  city: string;
  cityLao: string;
  price: number;
  priceFormatted: string;
  service?: string;
  serviceLao?: string;
  cat_id?: number;
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
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [distanceFee, setDistanceFee] = useState<number>(0);
  const [distanceFeeReason, setDistanceFeeReason] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [locations, setLocations] = useState<Location[]>([]);
  const [userCity, setUserCity] = useState<string>("");
  const [employeeCity, setEmployeeCity] = useState<string>("");

  // Map employee data to location format with translations
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
          return numPrice.toLocaleString() + " ກີບ";
        };

        // Calculate age (placeholder)
        const calculateAge = (): number => {
          try {
            const createdDate = new Date(employee.created_at);
            const today = new Date();
            const age = today.getFullYear() - createdDate.getFullYear();
            return age > 0 ? age : 21;
          } catch (error) {
            return 21;
          }
        };

        // Translate to Lao using our translation functions
        const genderLao = translateGenderToLao(employee.gender);
        const categoryLao = translateCategoryToLao(employee.cat_name);
        const cityLao = translateCityToLao(employee.city || "");

        // Safely extract the numeric category ID
        let categoryId: number | undefined;
        try {
          if (employee.cat_id !== undefined) {
            categoryId = typeof employee.cat_id === 'string'
              ? parseInt(employee.cat_id, 10)
              : employee.cat_id;

            if (isNaN(categoryId)) {
              categoryId = undefined;
            }
          }
        } catch (error) {
          console.error(`Error parsing cat_id for employee ${employee.id}:`, error);
          categoryId = undefined;
        }

        // Initialize location object with translations
        const locationObject: Location = {
          id: employee.id,
          firstName: employee.first_name,
          surname: employee.last_name,
          image: employee.avatar || "https://via.placeholder.com/40",
          category: employee.cat_name,
          categoryLao: categoryLao,
          gender: employee.gender,
          genderLao: genderLao,
          age: calculateAge(),
          village: village,
          city: employee.city || "ວຽງຈັນ",
          cityLao: cityLao,
          price: parseFloat(employee.price),
          priceFormatted: formatPrice(employee.price),
          service: employee.cat_name,
          serviceLao: categoryLao,
          cat_id: categoryId,
          carId: employee?.car_id,
          carBrand: employee?.car_brand,
          carModel: employee?.car_model,
          licensePlate: employee?.license_plate,
        };

        // For category ID 5 (moving service), try to find matching car data
        if (categoryId === 5 && car && car.length > 0) {
          const employeeCar = car.find(c => c.emp_id === employee.id);

          if (employeeCar) {
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
      
      // Auto-set employee city from first location data
      if (mappedLocations.length > 0 && mappedLocations[0].city) {
        const normalizedEmployeeCity = normalizeCityName(mappedLocations[0].city);
        setEmployeeCity(normalizedEmployeeCity);
      }
    }
  }, [data, car]);

  // Auto-get user city from localStorage
  useEffect(() => {
    const savedUserCity = localStorage.getItem('addressCity');
    if (savedUserCity) {
      const normalizedUserCity = normalizeCityName(savedUserCity);
      setUserCity(normalizedUserCity);
    }
  }, []);

  // Calculate base amount whenever locations change
  useEffect(() => {
    const base = locations.reduce((sum, item) => sum + item.price, 0);
    setBaseAmount(base);

    const savedLocationName = localStorage.getItem('selectedLocationName');
    if (savedLocationName) {
      setAddress(savedLocationName);
    }
  }, [locations]);

  // Auto-calculate distance fee when cities are available
  useEffect(() => {
    if (employeeCity && userCity) {
      const result = calculateDistanceFee(employeeCity, userCity);
      setDistanceFee(result.fee);
      setDistanceFeeReason(result.reason);
    } else {
      setDistanceFee(0);
      setDistanceFeeReason('ກຳລັງກຳນົດທີ່ຕັ້ງ...');
    }
  }, [employeeCity, userCity]);

  // Calculate total amount
  useEffect(() => {
    setTotalAmount(baseAmount + distanceFee);
  }, [baseAmount, distanceFee]);

  // Format number as currency
  const formatCurrency = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
  };

  // Handle alert close
  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    localStorage.setItem('totalAmountWithDistanceFee', totalAmount.toString());
    localStorage.setItem('distanceFee', distanceFee.toString());
    localStorage.setItem('baseAmount', baseAmount.toString());
    
    navigate(`/payment/${id}`);
  };

  // Loading component
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "white",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(97,20,99,0.05) 0%, rgba(97,20,99,0) 70%)",
            animation: "pulse 3s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.3 },
              "50%": { transform: "scale(1.1)", opacity: 0.1 },
              "100%": { transform: "scale(1)", opacity: 0.3 }
            }
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,147,30,0.05) 0%, rgba(247,147,30,0) 70%)",
            animation: "pulse 3s infinite ease-in-out 1s",
          }}
        />

        <Box
          sx={{
            position: "relative",
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "4px solid rgba(97,20,99,0.1)",
              borderTop: "4px solid #611463",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" }
              }
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "70%",
              height: "70%",
              border: "4px solid rgba(247,147,30,0.1)",
              borderBottom: "4px solid #f7931e",
              borderRadius: "50%",
              animation: "spinReverse 1.2s linear infinite",
              "@keyframes spinReverse": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(-360deg)" }
              }
            }}
          />
          <Box
            sx={{
              width: "20px",
              height: "20px",
              background: "linear-gradient(135deg, #611463, #f7931e)",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#611463",
            mt: 2,
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "1px",
            animation: "fadeInOut 1.5s infinite ease-in-out",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.5 }
            }
          }}
        >
          ກຳລັງໂຫຼດ...
        </Typography>

        <Box
          sx={{
            display: "flex",
            mt: 1,
            gap: "8px",
            alignItems: "center"
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: i === 1 ? "#f7931e" : "#611463",
                borderRadius: "50%",
                opacity: 0.7,
                animation: "bounce 1.4s infinite ease-in-out",
                animationDelay: `${i * 0.2}s`,
                "@keyframes bounce": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.5)" }
                }
              }}
            />
          ))}
        </Box>
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
            <Box sx={{ width: 40 }} />
          </Box>

          {/* Address Input */}
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

            <Box
              onClick={() => navigate(`/Location-detail/${id}`)}
              sx={{
                display: 'flex',
                alignItems: 'center',
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
                py: 1.5,
                px: 2,
                border: '1px solid rgba(0, 0, 0, 0.23)',
              }}
            >
              <LocationOnIcon sx={{ color: '#611463', mr: 1 }} />

              <Box sx={{ flexGrow: 1 }}>
                {address ? (
                  <>
                    <Typography
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: fontSize.text,
                        lineHeight: 1.2
                      }}
                    >
                      {localStorage.getItem("addressName") || ""}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        fontSize: fontSize.text,
                        color: 'text.secondary'
                      }}
                    >
                      {localStorage.getItem("addressVillage") || ""}, {translateCityToLao(localStorage.getItem("addressCity") || "")}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ color: 'text.secondary', fontSize: fontSize.text }}>
                    ກົດເພື່ອໃສ່ຂໍ້ມູນ
                  </Typography>
                )}
              </Box>

              <KeyboardArrowRightIcon sx={{ color: '#611463' }} />
            </Box>
          </Box>

          {/* Distance Fee Display */}
          {(employeeCity || userCity) && distanceFee > 0 && (
            <Box sx={{ mb: 3 }}>
              <Card
                sx={{
                  backgroundColor: "#f0e9f1",
                  borderRadius: 2,
                  border: '1px solid rgba(97, 20, 99, 0.1)',
                  borderLeft: '3px solid #8a1c8d'
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <DirectionsCarIcon sx={{ fontSize: '1rem', color: '#8a1c8d', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#611463', fontWeight: 600 }}>
                       ຄ່າໄລຍະທາງ
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 1.5
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '60%' }}>
                      <Box sx={{ 
                        bgcolor: 'rgba(97, 20, 99, 0.1)', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1,
                        border: '1px solid rgba(97, 20, 99, 0.2)'
                      }}>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#611463', fontWeight: 500 }}>
                          {employeeCity ? translateCityToLao(employeeCity) : 'ບໍ່ທາງ'}
                        </Typography>
                      </Box>

                      <KeyboardArrowRightIcon sx={{ fontSize: '1.2rem', color: '#8a1c8d', mx: 0.5 }} />

                      <Box sx={{ 
                        bgcolor: 'rgba(97, 20, 99, 0.1)', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1,
                        border: '1px solid rgba(97, 20, 99, 0.2)'
                      }}>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#611463', fontWeight: 500 }}>
                          {userCity ? translateCityToLao(userCity) : 'ບໍ່ທາງ'}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: "bold",
                        color: distanceFee === 8000 ? "#10b981" : "#f7931e",
                        bgcolor: distanceFee === 8000 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(247, 147, 30, 0.1)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        border: `1px solid ${distanceFee === 8000 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(247, 147, 30, 0.3)'}`
                      }}
                    >
                      +{formatCurrency(distanceFee)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.8rem', 
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      {distanceFeeReason}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

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
                          {location.serviceLao}
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
                        {location.categoryLao}
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
                        {location.genderLao}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Car details - ONLY for category ID 5 */}
                  {location.cat_id === 5 && (
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
                        {location.cityLao}
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

          {/* Two-column layout */}
          <Grid container spacing={3}>
            {/* Left column - Notes */}
            <Grid item xs={12} md={6}>
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
                      <Typography sx={{ fontSize: fontSize.text, fontWeight: "500", color: '#374151' }}>
                        ລາຄາພື້ນຖານ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        sx={{
                          fontSize: fontSize.text,
                          fontWeight: "bold",
                          color: "#374151"
                        }}
                      >
                        {formatCurrency(baseAmount)}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: fontSize.text, fontWeight: "500", color: '#374151' }}>
                        ຄ່າໄລຍະທາງ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        sx={{
                          fontSize: fontSize.text,
                          fontWeight: "bold",
                          color: distanceFee === 8000 ? "#10b981" : (distanceFee > 0 ? "#f7931e" : "#6b7280")
                        }}
                      >
                        {formatCurrency(distanceFee)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1, borderColor: 'rgba(97, 20, 99, 0.2)' }} />
                    </Grid>

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
              onClick={handleProceedToPayment}
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