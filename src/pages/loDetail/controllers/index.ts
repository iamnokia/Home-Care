// Controller file: useMainController.ts

import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertColor, SelectChangeEvent } from "@mui/material";
import { LOCATION_PATH } from "../../../routes/path";
import { Useraddress } from "../../../models/useraddress";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { UserModel } from "../../../models/user";

export interface ImageFile {
  file: File;
  preview: string;
}

export interface ErrorState {
  placeName?: string;
  detailAddress?: string;
  placeVillage?: string;
  placeCity?: string;
  phoneNumber?: string;
  mapLink?: string;
  image?: string;
  [key: string]: string | undefined;
}

const useMainController = () => {
  const navigate = useNavigate();
  const API_BASE_URL = "https://homecare-pro.onrender.com";

  // State hooks for UI
  const [savedLocations, setSavedLocations] = useState<Useraddress[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Useraddress | null>(
    null
  );
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const [placeVillage, setVillage] = useState<string>("");
  const [placeCity, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+856");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hasWhatsapp, setHasWhatsapp] = useState<boolean>(false);
  const [mapLink, setMapLink] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [address, setAddress] = useState<Useraddress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<ErrorState>({});

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  // Get user addresses using the my_address endpoint
const handleGetData = async () => {
  setLoading(true);
  try {
    // Get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    
    if (!accessToken) {
      console.error("Access token not found in localStorage");  
      throw new Error("Authentication token missing");
    }
    
    // Make the API request with the token
    const res = await axios.get(
      `https://homecare-pro.onrender.com/address_users_details/my_address`,
      {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );
    
    // Get current user ID from userData in localStorage
    let userId = null;
    
    // Try to get from userData JSON
    try {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.id) {
          userId = parseInt(userData.id);
          console.log("Found user ID from userData:", userId);
        }
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
    
    // If not found, try other methods
    if (!userId) {
      // Check for raw JSON string with id field
      try {
        // From your screenshot, it looks like the raw userData is stored
        const userDataRaw = localStorage.getItem("userInfo") || localStorage.getItem("userData");
        if (userDataRaw) {
          const userData = JSON.parse(userDataRaw);
          if (userData && userData.id) {
            userId = parseInt(userData.id);
            console.log("Found user ID from userInfo/userData:", userId);
          }
        }
      } catch (error) {
        console.error("Error parsing userInfo/userData:", error);
      }
    }
    
    // If still not found, check for direct user_id or userId
    if (!userId) {
      const directId = localStorage.getItem("userId") || localStorage.getItem("user_id");
      if (directId && !isNaN(parseInt(directId))) {
        userId = parseInt(directId);
        console.log("Found user ID directly:", userId);
      }
    }
    
    // If we still don't have a userId, try to parse it from the email
    if (!userId) {
      const userEmail = localStorage.getItem("user_email");
      // This is just a fallback - in case you store the email in format "21:user@example.com"
      if (userEmail && userEmail.includes(":")) {
        const idPart = userEmail.split(":")[0];
        if (!isNaN(parseInt(idPart))) {
          userId = parseInt(idPart);
          console.log("Extracted user ID from email format:", userId);
        }
      }
    }
    
    // Process the addresses
    let userAddresses = [];
    
    if (userId) {
      // Filter addresses by user ID
      const allAddresses = Array.isArray(res?.data) ? res.data : [];
      if (res?.data && !Array.isArray(res.data)) {
        allAddresses.push(res.data);
      }
      
      userAddresses = allAddresses.filter(addr => addr.users_id === userId);
      console.log(`Filtered addresses for user ID ${userId}: ${userAddresses.length} addresses found`);
    } else {
      console.warn("No user ID found - unable to filter addresses by user");
      userAddresses = Array.isArray(res?.data) ? res.data : [];
      if (res?.data && !Array.isArray(res.data)) {
        userAddresses.push(res.data);
      }
    }
    
    setAddress(userAddresses);
    
    // If there's a previously selected address in localStorage, select it
    try {
      const selectedLocationString = localStorage.getItem("selectedLocation");
      if (selectedLocationString && userAddresses.length > 0) {
        const selectedLocationData = JSON.parse(selectedLocationString);
        if (selectedLocationData && selectedLocationData.id) {
          const savedLocation = userAddresses.find(loc => loc.id === selectedLocationData.id);
          if (savedLocation) {
            setSelectedLocation(savedLocation);
          }
        }
      }
    } catch (error) {
      console.error("Error processing selected location:", error);
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    
    // Check if the error is due to authentication issues
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      Swal.fire({
        title: "ເຂົ້າສູ່ລະບົບອີກຄັ້ງ",
        text: "ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງເພື່ອດຳເນີນການຕໍ່",
        icon: "warning",
        confirmButtonColor: "#611463",
        confirmButtonText: "ຕົກລົງ",
      });
      
      // You might want to redirect to login or trigger login dialog here
    } else {
      Swal.fire({
        title: "ຜິດພາດ",
        text: "ບໍ່ສາມາດໂຫລດຂໍ້ມູນທີ່ຢູ່ໄດ້",
        icon: "error",
        confirmButtonColor: "#611463",
        confirmButtonText: "ຕົກລົງ",
      });
    }
  } finally {
    setLoading(false);
  }
};

  // Validate form fields before submission
  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    if (!placeName?.trim()) {
      newErrors.placeName = "ກະລຸນາປ້ອນຊື່ສະຖານທີ່";
    }

    if (!detailAddress?.trim()) {
      newErrors.detailAddress = "ກະລຸນາປ້ອນລາຍລະອຽດທີ່ຢູ່";
    }

    if (!placeVillage?.trim()) {
      newErrors.placeVillage = "ກະລຸນາປ້ອນຊື່ບ້ານ";
    }

    if (!placeCity) {
      newErrors.placeCity = "ກະລຸນາເລືອກເມືອງ";
    }

    if (!phoneNumber?.trim()) {
      newErrors.phoneNumber = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
    } else if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ";
    } else if (phoneNumber.length < 8 || phoneNumber.length > 12) {
      newErrors.phoneNumber = "ເບີໂທລະສັບບໍ່ຖືກຕ້ອງ";
    }

    if (!mapLink?.trim()) {
      newErrors.mapLink = "ກະລຸນາປ້ອນລິ້ງ Google Maps";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// Add this at the component level (outside of handleSubmit)
const { data: userData, loggedIn } = useSelector((state) => state.auth);

// Handle form submission
const handleSubmit = async () => {
  // Validate form first
  if (!validateForm()) {
    Swal.fire({
      title: "ແຈ້ງເຕືອນ",
      text: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
      icon: "warning",
      confirmButtonColor: "#611463",
      confirmButtonText: "ຕົກລົງ",
    });
    return;
  }
  
  const result = await Swal.fire({
    title: "ຢືນຢັນການບັນທຶກ?",
    text: "ກົດຕົກລົງເພື່ອບັນທຶກຂໍ້ມູນທີ່ຢູ່ໃໝ່.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#611463",
    cancelButtonColor: "#d33",
    confirmButtonText: "ຕົກລົງ",
    cancelButtonText: "ຍົກເລີກ",
  });
  
  if (!result.isConfirmed) return;
  
  try {
    setLoading(true);
    
    // Get user ID, with fallbacks
    let userId = null;
    
    // First try from Redux state
    if (userData && userData.id) {
      userId = userData.id;
      console.log("Using user ID from Redux:", userId);
    } else {
      // If not in Redux, try localStorage
      try {
        const authTokenString = localStorage.getItem("authToken");
        if (authTokenString) {
          const authToken = JSON.parse(authTokenString);
          if (authToken.user && authToken.user.id) {
            userId = authToken.user.id;
            console.log("Using user ID from authToken:", userId);
          }
        }
      } catch (error) {
        console.error("Error getting user ID from localStorage:", error);
      }
      
      // If still not found, try userData in localStorage
      if (!userId) {
        try {
          const userDataString = localStorage.getItem("userData");
          if (userDataString) {
            const localUserData = JSON.parse(userDataString);
            if (localUserData && localUserData.id) {
              userId = localUserData.id;
              console.log("Using user ID from userData in localStorage:", userId);
            }
          }
        } catch (error) {
          console.error("Error getting user ID from userData in localStorage:", error);
        }
      }
    }
    
    // Check if we have a user ID
    if (!userId) {
      throw new Error("User ID not found. Please log in again.");
    }
    
    // Create a single FormData for both address data and image
    const formData = new FormData();
    formData.append("gender_owner", "MALE");
    formData.append("users_id", userId);
    formData.append("address_name", placeName);
    formData.append("google_link_map", mapLink);
    formData.append("address_description", detailAddress);
    formData.append("city", placeCity);
    formData.append("village", placeVillage);
    formData.append("tel", phoneNumber);
    
    // Append image if it exists
    if (images.length > 0) {
      formData.append("house_image", images[0].file);
    }
    
    // Get access token from localStorage or Redux
    let accessToken = null;
    
    // Try to get from authToken in localStorage first
    try {
      const authTokenString = localStorage.getItem("authToken");
      if (authTokenString) {
        const authToken = JSON.parse(authTokenString);
        if (authToken.accessToken) {
          accessToken = authToken.accessToken;
        }
      }
    } catch (error) {
      console.error("Error getting access token from localStorage:", error);
    }
    
    // If not found, try individual accessToken
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        accessToken = `Bearer ${accessToken}`;
      }
    }
    
    // Submit everything in a single request
    await axios.post(
      `${API_BASE_URL}/address_users_details/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": accessToken
        },
      }
    );
    
    Swal.fire({
      title: "ສຳເລັດ!",
      text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
      icon: "success",
      confirmButtonText: "ຕົກລົງ",
    });
    
    handleGetData();
    resetForm();
  } catch (error) {
    console.error("Error submitting address:", error);
    
    // Show more specific error message if user ID is missing
    if (error.message === "User ID not found. Please log in again.") {
      Swal.fire({
        title: "ຜິດພາດການລົງຊື່ເຂົ້າໃຊ້",
        text: "ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງ",
        icon: "error",
        confirmButtonColor: "#611463",
        confirmButtonText: "ຕົກລົງ",
      });
    } else {
      Swal.fire("ຜິດພາດ", "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້", "error");
    }
  } finally {
    setLoading(false);
  }
};

  // Handle image upload
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    // Check if adding new files would exceed the limit of 3
    if (images.length + newFiles.length > 3) {
      setErrors((prev) => ({
        ...prev,
        image: "ສາມາດອັບໂຫລດຮູບພາບໄດ້ສູງສຸດ 3 ຮູບເທົ່ານັ້ນ",
      }));
      setSnackbarMessage("ສາມາດອັບໂຫລດຮູບພາບໄດ້ສູງສຸດ 3 ຮູບເທົ່ານັ້ນ");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    const imagePromises = newFiles.map((file) => {
      return new Promise<ImageFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            preview: reader.result as string,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((newImageFiles) => {
        setImages((prev) => [...prev, ...newImageFiles]);
        // Clear image error if it exists
        if (errors.image) {
          setErrors({ ...errors, image: undefined });
        }
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  // Handle location selection
  const handleLocationSelect = (location: Useraddress): void => {
    setSelectedLocation(location);
    
    // Store each component separately
    localStorage.setItem("addressName", location.address_name);
    localStorage.setItem("addressVillage", location.village);
    localStorage.setItem("addressCity", location.city);
    
    // Also store the combined string for backwards compatibility
    const locationString = `${location.address_name}, ${location.village}, ${location.city}`;
    localStorage.setItem("selectedLocationName", locationString);

    // If you want to save more location information, you can store it as JSON
    localStorage.setItem(
      "selectedLocation",
      JSON.stringify({
        id: location.id,
        name: location.address_name,
        description: location.address_description,
        village: location.village,
        city: location.city,
        tel: location.tel
      })
    );
  };

  // Handle delete location
  const handleDeleteLocation = async () => {
    if (!selectedLocation?.id) {
      Swal.fire("ແຈ້ງເຕືອນ", "ກະລຸນາເລືອກທີ່ຢູ່ກ່ອນ", "warning");
      return;
    }

    const locationId = selectedLocation.id;

    const result = await Swal.fire({
      title: "ລຶບທີ່ຢູ່ນີ້?",
      text: "ທ່ານຈະບໍ່ສາມາດກູ້ຄືນໄດ້!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await axios.delete(
          `${API_BASE_URL}/address_users_details/delete/${locationId}`
        );

        Swal.fire({
          title: "ສຳເລັດ!",
          text: "ລຶບທີ່ຢູ່ແລ້ວ.",
          icon: "success",
          confirmButtonText: "ຕົກລົງ",
        });

        // Remove from localStorage
        localStorage.removeItem("selectedLocation");
        localStorage.removeItem("selectedLocationName");
        localStorage.removeItem("addressName");
        localStorage.removeItem("addressVillage");
        localStorage.removeItem("addressCity");

        // Reset selected location
        setSelectedLocation(null);
        
        // Refresh address list
        handleGetData();
      } catch (error) {
        console.error("Error deleting location:", error);
        Swal.fire("ຜິດພາດ", "ບໍ່ສາມາດລຶບທີ່ຢູ່ໄດ້", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open Google Maps with the provided link
  const handleOpenGoogleMaps = (): void => {
    if (mapLink) {
      window.open(mapLink, "_blank");
    } else {
      window.open("https://www.google.com/maps", "_blank");
    }
  };

  // Reset form function
  const resetForm = (): void => {
    // Reset UI state as well
    setMapLink("");
    setPlaceName("");
    setDetailAddress("");
    setVillage("");
    setCity("");
    setPhoneNumber("");
    setHasWhatsapp(false);
    setImages([]);
    setErrors({});
  };

  // Handle fields change
  const handleMapLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMapLink(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, mapLink: undefined });
    }
  };

  const handlePlaceNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPlaceName(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, placeName: undefined });
    }
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetailAddress(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, detailAddress: undefined });
    }
  };

  const handleVillageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setVillage(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, placeVillage: undefined });
    }
  };

  const handleDistrictChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ): void => {
    setCity(newValue || "");
    if (newValue) {
      setErrors({ ...errors, placeCity: undefined });
    }
  };

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
    
    if (numericValue.trim()) {
      setErrors({ ...errors, phoneNumber: undefined });
    }
  };

  const handleWhatsappChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHasWhatsapp(e.target.checked);
  };

  const handleCountryCodeChange = (event: SelectChangeEvent): void => {
    setCountryCode(event.target.value);
  };

  // Handle snackbar close
  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  // Handle cancel button
  const handleCancel = (): void => {
    navigate(LOCATION_PATH);
  };

  // Get color based on location type - kept for reference, typically would be in UI
  const getLocationColor = (type: string): string => {
    switch (type) {
      default:
        return "#f7931e";
    }
  };

  useEffect(() => {
    handleGetData();
  }, [])

  useEffect(() => {
    // Load previously selected location from localStorage if it exists
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        // We'll set the full location object when we fetch the addresses
      } catch (error) {
        console.error("Error parsing saved location:", error);
        localStorage.removeItem("selectedLocation");
      }
    }
  }, []);

  return {
    // Methods
    validateForm,
    handleSubmit,
    handleImageChange,
    handleLocationSelect,
    handleDeleteLocation,
    handleOpenGoogleMaps,
    resetForm,
    handleMapLinkChange,
    handlePlaceNameChange,
    handleDetailAddressChange,
    handleVillageChange,
    handleDistrictChange,
    handlePhoneNumberChange,
    handleWhatsappChange,
    handleCountryCodeChange,
    handleCloseSnackbar,
    handleCancel,
    getLocationColor,
    handleGetData,
    
    // State values and setters
    loading,
    showAllAddresses,
    setShowAllAddresses,
    address,
    savedLocations,
    setSavedLocations,
    selectedLocation,
    setSelectedLocation,
    detailAddress,
    setDetailAddress,
    placeName,
    setPlaceName,
    placeVillage,
    setVillage,
    placeCity,
    setCity,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    hasWhatsapp,
    setHasWhatsapp,
    mapLink,
    setMapLink,
    images,
    setImages,
    errors,
    setErrors,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    setSnackbarMessage,
    snackbarSeverity,
    setSnackbarSeverity,
  };
};

export default useMainController; 
