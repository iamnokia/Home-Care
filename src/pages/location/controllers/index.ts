import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import { CarModel } from "../../../models/car";
import axios from "axios";

// City definitions matching your requirements
export const CITIES = [
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
  // General fallbacks
  'vientiane': 'ວຽງຈັນ',
  'vientiane capital': 'ນະຄອນຫຼວງວຽງຈັນ'
};

// Function to translate English category to Lao
export const translateCategoryToLao = (englishCategory: string): string => {
  if (!englishCategory) return 'ອື່ນໆ';
  
  const normalizedCategory = englishCategory.toLowerCase().trim();
  
  // Direct match first
  if (categoryTranslation[normalizedCategory]) {
    return categoryTranslation[normalizedCategory];
  }
  
  // Partial matching for compound categories
  for (const [key, value] of Object.entries(categoryTranslation)) {
    if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
      return value;
    }
  }
  
  // If no match found, return the original with a fallback
  return englishCategory || 'ອື່ນໆ';
};

// Function to translate English gender to Lao
export const translateGenderToLao = (englishGender: string): string => {
  if (!englishGender) return 'ບໍ່ລະບຸ';
  
  const normalizedGender = englishGender.toLowerCase().trim();
  
  // Direct match
  if (genderTranslation[normalizedGender]) {
    return genderTranslation[normalizedGender];
  }
  
  // Partial matching
  for (const [key, value] of Object.entries(genderTranslation)) {
    if (normalizedGender.includes(key) || key.includes(normalizedGender)) {
      return value;
    }
  }
  
  // If no match found, return the original with a fallback
  return englishGender || 'ບໍ່ລະບຸ';
};

// Function to translate English city to Lao
export const translateCityToLao = (englishCity: string): string => {
  if (!englishCity) return 'ວຽງຈັນ';
  
  const normalizedCity = englishCity.toLowerCase().trim();
  
  // Direct match
  if (cityTranslation[normalizedCity]) {
    return cityTranslation[normalizedCity];
  }
  
  // Partial matching
  for (const [key, value] of Object.entries(cityTranslation)) {
    if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
      return value;
    }
  }
  
  // If no match found, return the original
  return englishCity || 'ວຽງຈັນ';
};

// Distance fee calculation function based on your exact requirements
export const calculateDistanceFee = (employeeCity: string, userCity: string): { fee: number; reason: string } => {
  if (!employeeCity || !userCity) {
    return { fee: 0, reason: 'ກະລຸນາເລືອກທີ່ຕັ້ງທັງໝົດ' };
  }

  if (employeeCity === userCity) {
    return { fee: 0, reason: 'ທີ່ຕັ້ງດຽວກັນ - ບໍ່ມີຄ່າທີ່ທາງ' };
  }

  // Convert to lowercase for consistent comparison
  const empCity = employeeCity.toLowerCase();
  const usrCity = userCity.toLowerCase();

  // Define distance fee rules based on your exact requirements
  const distanceRules: { [key: string]: { [key: string]: number } } = {
    // if employee_address is in Chanthabouly 
    // but user_address is on sikhottabong, xayseththa, sisattanak is 10,000, 
    // but if they are on Xaythany, Naxaiythong and hatxaiyfong is 15,000
    'chanthabouly': {
      'sikhottabong': 10000,
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'naxaithong': 15000,
      'hadxaifong': 15000
    },
    
    // if employee_address is in sikhottabong 
    // but user_address is on chanthabouly, sisattanak is 10,000, 
    // but if they are on Naxaiythong, xayseththa is 15,000 
    // and hatxaiyfong and Xaythany is 20,000
    'sikhottabong': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'naxaithong': 15000,
      'xaysetha': 15000,
      'hadxaifong': 20000,
      'xaytany': 20000
    },
    
    // if employee_address is in Naxaiythong 
    // but user_address is on chanthabouly, sikhottabong is 15,000, 
    // but if they are on sisattanak, xayseththa is 20,000 
    // and hatxaiyfong and Xaythany is 25,000
    'naxaithong': {
      'chanthabouly': 15000,
      'sikhottabong': 15000,
      'sisattanak': 20000,
      'xaysetha': 20000,
      'hadxaifong': 25000,
      'xaytany': 25000
    },
    
    // if employee_address is in Xaythany 
    // but user_address is on chanthabouly, xayseththa is 15,000, 
    // but if they are on sisattanak, hatxaiyfong is 20,000 
    // and Naxaiythong and sikhottabong is 25,000
    'xaytany': {
      'chanthabouly': 15000,
      'xaysetha': 15000,
      'sisattanak': 20000,
      'hadxaifong': 20000,
      'naxaithong': 25000,
      'sikhottabong': 25000
    },
    
    // if employee_address is in xayseththa 
    // but user_address is on chanthabouly, sisattanak, Xaythany and hatxaiyfong is 10,000, 
    // but if they are on Naxaiythong, sikhottabong is 15,000 
    'xaysetha': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'xaytany': 10000,
      'hadxaifong': 10000,
      'naxaithong': 15000,
      'sikhottabong': 15000
    },
    
    // if employee_address is in hatxaiyfong 
    // but user_address is on xayseththa, sisattanak is 10,000, 
    // but if they are on Xaythany, sikhottabong and chanthabouly is 15,000 
    // and Naxaiythong is 25,000
    'hadxaifong': {
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'sikhottabong': 15000,
      'chanthabouly': 15000,
      'naxaithong': 25000
    },
    
    // if employee_address is in sisattanak 
    // but user_address is on sikhottabong, chanthabouly, xaiysetha and hadxaiyfong is 10,000, 
    // and Naxaiythong and xaiythany is 20,000
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
    reason = 'ບໍ່ມີຄ່າທີ່ທາງສຳລັບເສັ້ນທາງນີ້';
  } else if (fee === 10000) {
    reason = 'ຄ່າທີ່ທາງໃກ້ຄຽງ (10,000 Kip)';
  } else if (fee === 15000) {
    reason = 'ຄ່າທີ່ທາງປານກາງ (15,000 Kip)';
  } else if (fee === 20000) {
    reason = 'ຄ່າທີ່ທາງໄກ (20,000 Kip)';
  } else if (fee === 25000) {
    reason = 'ຄ່າທີ່ທາງໄກຫຼາຍ (25,000 Kip)';
  }

  return { fee, reason };
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
};

// Helper function to get city display name in Lao
export const getCityDisplayName = (cityValue: string): string => {
  const city = CITIES.find(c => c.value === cityValue.toLowerCase());
  return city ? city.lo : translateCityToLao(cityValue);
};

// Helper function to convert city name to value
export const getCityValueFromName = (cityName: string): string => {
  // Handle common variations and normalize the city name
  const normalizedName = cityName.toLowerCase().replace(/\s+/g, '');
  
  // Try to find exact match first
  let city = CITIES.find(c => 
    c.value === normalizedName || 
    c.en.toLowerCase() === normalizedName ||
    c.lo === cityName
  );

  // If no exact match, try partial matching
  if (!city) {
    city = CITIES.find(c => 
      c.en.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(c.en.toLowerCase()) ||
      c.value.includes(normalizedName) ||
      normalizedName.includes(c.value)
    );
  }

  return city ? city.value : normalizedName;
};

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [car, setCar] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleNaVigate = (path: string) => {
    navigate(path);
  };

  const handleGetDataById = async (): Promise<void> => {
    try {
      setLoading(true);
      // Using the id parameter in the URL
      const res = await axios.get(`https://homecare-pro.onrender.com/employees/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCarByCatId = async (): Promise<void> => {
    try {
      // Using the id parameter in the URL
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_emp_car_employees/5", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCar(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      handleGetCarByCatId(),
      id ? handleGetDataById() : Promise.resolve()
    ]).finally(() => {
      setLoading(false);
    });
  }, [id]); // Add id to the dependency array so it refetches when id changes

  return {
    car,
    loading,
    data,
    handleNaVigate,
    navigate,
    id, // Return the id so it can be used in the component
    // Export utility functions for use in components
    calculateDistanceFee,
    formatCurrency,
    getCityDisplayName,
    getCityValueFromName,
    CITIES,
    // Export translation functions
    translateCategoryToLao,
    translateGenderToLao,
    translateCityToLao
  };
};

export default useMainController;